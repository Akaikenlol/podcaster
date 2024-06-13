"use client";
import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";
import React from "react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
	const trendingPodcast = useQuery(api.podcasts.getTrendingPodcasts);
	return (
		<div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
			<section className="flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

				<div className="podcast_grid">
					{/* {trendingPodcast?.map(
						({ podcastTitle, podcastDescription, imageUrl, _id }) => (
							<PodcastCard
								key={_id}
								imgURL={imageUrl}
								title={podcastTitle}
								description={podcastDescription}
								podcastId={_id}
							/>
						)
					)} */}
					{podcastData.map(({ title, podcastDescription, imgURL, id }) => (
						<PodcastCard
							podcastId={id}
							title={title}
							description={podcastDescription}
							imgURL={imgURL}
							key={id}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
