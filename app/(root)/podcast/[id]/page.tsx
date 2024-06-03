import React from "react";

const PodcastDetails = ({ params }: { params: { id: string } }) => {
	return (
		<div>
			<p className="text-white-1">Podcast Details for ID: {params.id}</p>
		</div>
	);
};

export default PodcastDetails;
