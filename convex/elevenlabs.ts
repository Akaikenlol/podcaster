// import { ElevenLabsClient, play } from "elevenlabs";
// import axios from "axios";
// import { v } from "convex/values";
// import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
// import { action } from "./_generated/server";

// const elevenlabs = new ElevenLabsClient({
// 	apiKey: process.env.ELEVENLABS_API_KEY,
// });

// export const generateAudioAction = action({
// 	args: { input: v.string(), voice: v.string() },
// 	handler: async (_, { voice, input }: any) => {
// 		try {
// 			// Make a req
// 			const response = await elevenlabs.generate({
// 				voice: voice as SpeechCreateParams["voice"],
// 				text: input,
// 				model_id: "eleven_turbo_v2",
// 			});
// 		} catch (error) {
// 			console.log("Error generating audio with ElevenLabs API", error);
// 			throw new Error("Fail to generate audio");
// 		}
// 	},
// });
