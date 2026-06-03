// app/api/ai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAIRecommendations, 
  getAIReadingSummary, 
  getAIDiscussionStarter, 
  getAIGoalSuggestions 
} from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    return NextResponse.json({ error: error.message || 'AI service error' }, { status: 500 });
  }
}