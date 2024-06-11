import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUrl = mutation({
	args: {
		storageId: v.id("_storage"),
	},
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.storageId);
	},
});

export const createPodcast = mutation({
	args: {
		podcastTitle: v.string(),
		podcastDescription: v.string(),
		audioUrl: v.string(),
		imageUrl: v.string(),
		voiceType: v.string(),
		imagePrompt: v.string(),
		voicePrompt: v.string(),
		views: v.number(),
		audioDuration: v.number(),
		audioStorageId: v.id("_storage"),
		imageStorageId: v.id("_storage"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User is not authenticated");
		}

		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("email"), identity.email))
			.collect();

		if (user.length === 0) {
			throw new Error("User not found");
		}

		const podcast = await ctx.db.insert("podcasts", {
			...args,
			user: user[0]._id,
			author: user[0].name,
			authorId: user[0].clerkId,
			authorImageUrl: user[0].imageUrl,
		});
	},
});

export const getTrendingPodcast = query({
	handler: async (ctx) => {
		const podcast = await ctx.db.query("podcasts").collect();

		return podcast;
	},
});
