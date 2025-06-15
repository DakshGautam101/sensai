import { GoogleGenAI } from '@google/genai';
import {CHAT_PROMPT} from '@/app/data/prompt';

export async function generateResponseStream(userInput) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: `${CHAT_PROMPT}\n\nUser: ${userInput}` }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-exp',
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText.trim();
}
