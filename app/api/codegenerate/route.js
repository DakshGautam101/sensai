import { generateCodeResponseStream } from "@/lib/codeAiHelper";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log('Code generation API: Received request');
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const result = await generateCodeResponseStream(prompt);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Code generation API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 