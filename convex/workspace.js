import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Define the message schema
const messageSchema = v.object({
    role: v.string(),
    content: v.string()
});

export const ListWorkspaces = query({
    args: {
        userId: v.optional(v.id('users'))
    },
    handler: async (ctx, args) => {
        try {
            let query = ctx.db.query('workspace');
            
            // If userId is provided, filter by user
            if (args.userId) {
                query = query.filter((q) => q.eq(q.field('user'), args.userId));
            }
            
            return await query.collect();
        } catch (error) {
            throw new ConvexError("Failed to list workspaces: " + error.message);
        }
    }
});

export const CreateWorkspace = mutation({
    args: {
        messages: v.array(messageSchema),
        user: v.id('users')
    },
    handler: async (ctx, args) => {
        try {
            const workspaceId = await ctx.db.insert('workspace', {
                messages: args.messages,
                user: args.user,
                fileData: null
            });
            return workspaceId;
        } catch (error) {
            throw new ConvexError("Failed to create workspace: " + error.message);
        }
    }
});

export const GetWorkspace = query({
    args: {
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args) => {
        try {
            const result = await ctx.db.get(args.workspaceId);
            if (!result) {
                throw new ConvexError("Workspace not found");
            }
            return result;
        } catch (error) {
            throw new ConvexError("Failed to get workspace: " + error.message);
        }
    }
});

export const updateMessages = mutation({
    args: {
        workspaceId: v.id('workspace'),
        messages: v.array(messageSchema)
    },
    handler: async (ctx, args) => {
        try {
            const workspace = await ctx.db.get(args.workspaceId);
            if (!workspace) {
                throw new ConvexError("Workspace not found");
            }

            // Create the complete workspace object with all required fields
            const updatedWorkspace = {
                messages: args.messages,
                user: workspace.user,
                fileData: workspace.fileData || null
            };

            await ctx.db.patch(args.workspaceId, updatedWorkspace);
            return { success: true };
        } catch (error) {
            throw new ConvexError("Failed to update messages: " + error.message);
        }
    }
});