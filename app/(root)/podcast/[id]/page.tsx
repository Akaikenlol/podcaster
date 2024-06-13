"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { podcastData } from "@/constants";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const PodcastDetails = ({
	params: { podcastId },
}: {
	params: { podcastId: Id<"podcasts"> };
}) => {
	const podcast = podcastId
		? useQuery(api.podcasts.getPodcastById, { podcastId })
		: null;

	const similarPodcasts = podcastId
		? useQuery(api?.podcasts.getPodcastByVoiceType, {
				podcastId,
			})
		: null;

	// if (!similarPodcasts || !podcast) return <LoaderSpinner />;

	return (
		<section className="flex w-full flex-col">
			<header className="mt-9 flex items-center justify-between">
				<h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
				<figure className="flex gap-3">
					<Image
						src={"/icons/headphone.svg"}
						width={24}
						height={24}
						alt="headphone"
					/>
					<h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
				</figure>
			</header>
			<PodcastDetailPlayer />
			<p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
				{podcast?.podcastDescription}
			</p>

			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h1 className="text-16 font-bold text-white-1">Transcription</h1>
					<p className="text-16 font-medium text-white-2">
						{podcast?.voicePrompt}
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h1 className="text-16 font-bold text-white-1">Thumbnail Prompt</h1>
					<p className="text-16 font-medium text-white-2">
						{podcast?.imagePrompt}
					</p>
				</div>
			</div>

			<section className="mt-8 flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>

				{/* {similarPodcasts && similarPodcasts.length > 0 ? (
					<div className="podcast_grid">
						{similarPodcasts?.map(
							({ _id, podcastDescription, imageUrl, podcastTitle }) => (
								<PodcastCard
									key={_id}
									imgURL={imageUrl}
									title={podcastTitle}
									description={podcastDescription}
									podcastId={_id}
								/>
							)
						)}
					</div>
				) : (
					<div>
						<EmptyState/>
					</div>
				)} */}

				{similarPodcasts && similarPodcasts.length >= 0 ? (
					<div className="podcast_grid">
						{podcastData?.map(({ title, podcastDescription, imgURL, id }) => (
							<PodcastCard
								podcastId={id}
								title={title}
								description={podcastDescription}
								imgURL={imgURL}
								key={id}
							/>
						))}
					</div>
				) : (
					<div>
						<EmptyState
							title="No Similar Podcasts Found"
							buttonLink="/discover"
							buttonText="Discover More Podcasts"
						/>
					</div>
				)}
			</section>
		</section>
	);
};

export default PodcastDetails;
