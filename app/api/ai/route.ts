// app/api/ai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  getAIRecommendations, 
  getAIReadingSummary, 
  getAIDiscussionStarter, 
  getAIGoalSuggestions 
} from '@/lib/ai';

// Rate limiting sederhana (in-memory)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 request per menit
const WINDOW_MS = 60 * 1000; // 1 menit

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Validasi input
function validateInput(body: any): string | null {
  if (!body || typeof body !== 'object') return 'Invalid request body';
  if (!body.action) return 'Action is required';
  
  const validActions = ['recommendations', 'summary', 'discussion', 'goals'];
  if (!validActions.includes(body.action)) return 'Invalid action';

  // Batasi panjang input
  if (body.bookTitle && body.bookTitle.length > 200) return 'Book title too long';
  if (body.pages && (isNaN(body.pages) || body.pages < 0 || body.pages > 10000)) return 'Invalid pages';
  if (body.minutes && (isNaN(body.minutes) || body.minutes < 0 || body.minutes > 1440)) return 'Invalid minutes';

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Autentikasi user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Pakai service role key
    );

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Rate limiting berdasarkan user ID
    if (!checkRateLimit(user.id)) {
      return NextResponse.json({ 
        error: 'Too many requests. Please slow down.' 
      }, { status: 429 });
    }

    // 3. Parse & validasi body
    const body = await request.json();
    const validationError = validateInput(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { action, ...params } = body;
    let result: string;

    switch (action) {
      case 'recommendations':
        result = await getAIRecommendations(params.readingHistory || []);
        break;
      case 'summary':
        result = await getAIReadingSummary(params.bookTitle, params.pages, params.minutes);
        break;
      case 'discussion':
        result = await getAIDiscussionStarter(params.bookTitle);
        break;
      case 'goals':
        result = await getAIGoalSuggestions(params.recentMinutes || [], params.recentPages || []);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'AI service error' }, 
      { status: 500 }
    );
  }
}