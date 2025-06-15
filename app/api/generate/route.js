import { generateResponseStream } from '@/lib/aiHelper';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';
import { CHAT_PROMPT } from '@/app/data/prompt';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
  try {
    const body = await req.json();
    const { userPrompt, workspaceId } = body;

    // Get current workspace messages
    const workspace = await convex.query(api.workspace.GetWorkspace, {
      workspaceId
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    // Always prepend the system prompt
    const aiMessages = [
      { role: 'system', content: CHAT_PROMPT },
      ...workspace.messages,
      { role: 'user', content: userPrompt }
    ];

    const aiMessagesString = aiMessages.map(m => `${m.role}: ${m.content}`).join('\n');
    const aiReply = await generateResponseStream(aiMessagesString);

    // Create new messages array with both user prompt and AI response (for storage)
    const updatedMessages = [
      ...workspace.messages,
      { role: 'user', content: userPrompt },
      { role: 'assistant', content: aiReply }
    ];

    // Update workspace with new messages
    await convex.mutation(api.workspace.updateMessages, {
      workspaceId,
      messages: updatedMessages
    });

    return Response.json({ success: true, message: aiReply });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
