import React from 'react';
import DailyDetails from "@/features/dailies/components/daily-details";

async function DailyDetailsPage({params}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<div className="page-container">
			<DailyDetails
				dailyDate={slug}
			/>
		</div>
	);
}

export default DailyDetailsPage;