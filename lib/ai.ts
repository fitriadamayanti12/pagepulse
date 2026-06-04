// lib/ai.ts
// DeepSeek AI - GRATIS, kualitas setara GPT-4

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function callDeepSeek(
  messages: DeepSeekMessage[],
  maxTokens: number = 1024
): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not set. Please add it to .env.local');
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Response:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('DeepSeek rate limit reached. Please try again later.');
      }
      if (response.status === 401) {
        throw new Error('Invalid DeepSeek API key. Please check your DEEPSEEK_API_KEY.');
      }
      if (response.status === 402) {
        throw new Error('DeepSeek credits exhausted. Please top up or wait for renewal.');
      }
      
      throw new Error(`DeepSeek API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error('DeepSeek API Error:', error.message);
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
}

// 1. AI Book Recommendations
export async function getAIRecommendations(readingHistory: ReadingHistory[]): Promise<string> {
  const historySummary = readingHistory
    .map(h => `- "${h.book_title}"${h.book_author ? ` by ${h.book_author}` : ''}${h.rating ? ` (rated ${h.rating}/5)` : ''}`)
    .join('\n');

  const messages: DeepSeekMessage[] = [
    { role: 'system', content: 'You are a literary expert. Provide 3-5 personalized book recommendations based on reading history. Include: title, author, why they might like it, brief description, genre. Be friendly and concise.' },
    { role: 'user', content: `Here's my reading history:\n${historySummary}\n\nWhat books would you recommend?` }
  ];

  return callDeepSeek(messages, 800);
}

// 2. AI Reading Summary
export async function getAIReadingSummary(bookTitle: string, pages: number, minutes: number): Promise<string> {
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: 'You are a motivational reading coach. Provide a short, encouraging summary of a reading session. Include positive reinforcement and a motivational quote. Keep it under 150 words.' },
    { role: 'user', content: `I just read "${bookTitle}", ${pages} pages in ${minutes} minutes. Give me a motivational summary!` }
  ];

  return callDeepSeek(messages, 300);
}

// 3. AI Discussion Starter
export async function getAIDiscussionStarter(bookTitle: string): Promise<string> {
  const messages: DeepSeekMessage[] = [
    { role: 'system', content: 'You are a book club leader. Generate 3 thought-provoking discussion questions about a specific book.' },
    { role: 'user', content: `Generate 3 discussion questions for: "${bookTitle}"` }
  ];

  return callDeepSeek(messages, 500);
}

// 4. AI Goal Suggestions
export async function getAIGoalSuggestions(recentMinutes: number[], recentPages: number[]): Promise<string> {
  const avgMinutes = recentMinutes.length > 0 ? Math.round(recentMinutes.reduce((a, b) => a + b, 0) / recentMinutes.length) : 0;
  const avgPages = recentPages.length > 0 ? Math.round(recentPages.reduce((a, b) => a + b, 0) / recentPages.length) : 0;

  const messages: DeepSeekMessage[] = [
    { role: 'system', content: 'You are a reading habit coach. Suggest realistic monthly goals based on recent data. Include recommended minutes/day, pages/month, and tips. Be encouraging and specific.' },
    { role: 'user', content: `My recent averages: ${avgMinutes} min/day, ${avgPages} pages/day. What monthly goals should I set?` }
  ];

  return callDeepSeek(messages, 500);
}