// lib/ai.ts
// Claude API helper untuk PagePulse

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function callClaude(
  systemPrompt: string,
  messages: ClaudeMessage[],
  maxTokens: number = 1024
): Promise<string> {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Claude API error');
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

// ==========================================
// AI Functions
// ==========================================

interface ReadingHistory {
  book_title: string;
  book_author?: string;
  rating?: number;
  duration_seconds?: number;
  pages_read?: number;
}

// 1. AI Book Recommendations
export async function getAIRecommendations(readingHistory: ReadingHistory[]): Promise<string> {
  const systemPrompt = `You are a literary expert and book recommendation specialist. 
Based on the user's reading history, provide 3-5 personalized book recommendations.
For each recommendation, include:
- Book title and author
- Why they might like it (based on their history)
- A brief description
- Genre
Format your response in a friendly, encouraging tone. Keep it concise.`;

  const historySummary = readingHistory
    .map(h => `- "${h.book_title}"${h.book_author ? ` by ${h.book_author}` : ''}${h.rating ? ` (rated ${h.rating}/5)` : ''}`)
    .join('\n');

  const messages: ClaudeMessage[] = [
    { role: 'user', content: `Here's my reading history:\n${historySummary}\n\nWhat books would you recommend for me?` }
  ];

  return callClaude(systemPrompt, messages, 800);
}

// 2. AI Reading Summary
export async function getAIReadingSummary(bookTitle: string, pages: number, minutes: number): Promise<string> {
  const systemPrompt = `You are a motivational reading coach. 
Provide a short, encouraging summary of the user's reading session.
Include:
- Positive reinforcement
- A fun fact about reading
- A motivational quote about books
Keep it under 150 words and make it personal.`;

  const messages: ClaudeMessage[] = [
    { role: 'user', content: `I just finished a reading session: "${bookTitle}", read ${pages} pages in ${minutes} minutes. Give me a motivational summary!` }
  ];

  return callClaude(systemPrompt, messages, 300);
}

// 3. AI Discussion Starter
export async function getAIDiscussionStarter(bookTitle: string): Promise<string> {
  const systemPrompt = `You are a book club discussion leader. 
Generate 3 thought-provoking discussion questions about a specific book.
Make questions open-ended and engaging. Keep it concise.`;

  const messages: ClaudeMessage[] = [
    { role: 'user', content: `Generate 3 discussion questions for the book: "${bookTitle}"` }
  ];

  return callClaude(systemPrompt, messages, 500);
}

// 4. AI Goal Suggestions
export async function getAIGoalSuggestions(
  recentMinutes: number[],
  recentPages: number[]
): Promise<string> {
  const systemPrompt = `You are a reading habit coach.
Based on the user's recent reading data, suggest realistic monthly goals.
Include:
- Recommended minutes per day
- Recommended pages per month
- Tips to achieve the goals
Be encouraging and specific. Keep it under 200 words.`;

  const avgMinutes = recentMinutes.length > 0 
    ? Math.round(recentMinutes.reduce((a, b) => a + b, 0) / recentMinutes.length) 
    : 0;
  const avgPages = recentPages.length > 0 
    ? Math.round(recentPages.reduce((a, b) => a + b, 0) / recentPages.length) 
    : 0;

  const messages: ClaudeMessage[] = [
    { role: 'user', content: `My recent reading: average ${avgMinutes} minutes/day, ${avgPages} pages/day. What monthly goals should I set?` }
  ];

  return callClaude(systemPrompt, messages, 500);
}