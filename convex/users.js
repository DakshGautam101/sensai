import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createUser =mutation({
    args:{
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string() 
    },
    handler: async(ctx,args) => {
        //If the user already exists, return the user
        const user = await ctx.db.query("users").filter((q)=>q.eq(q.field("email"), args.email)).collect();
        console.log("User found:", user);
        //If not, create a new user
        if(user?.length == 0) {
            const result = await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                picture: args.picture,
                uid: args.uid
            });
            // console.log("User created:", result);
        }
    }
})

export const GetUser = query({
    args : {
        email: v.string()
    },
    handler: async (ctx, args) => {
        //Fetch the user from the DB
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
        console.log("User fetched:", user);
        return user[0];
    }
})

export const signOut = mutation({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        try {
            // Clear any user-specific data if needed
            // For now, we'll just return success as the frontend handles the state
            return { success: true };
        } catch (error) {
            throw new Error("Failed to sign out: " + error.message);
        }
    }
})