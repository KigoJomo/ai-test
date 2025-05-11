import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: "You are the user's helpful assistant called Aq",
    messages,
  });

  return result.toDataStreamResponse();
}
