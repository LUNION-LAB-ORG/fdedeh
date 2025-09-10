import React from 'react';
import {IDailyContent} from "@/features/dailies/types";

function DailyIntroduction({introduction}: { introduction: string }) {
	return (
		<p
			className="text-justify text-pretty italic"
		>
			{introduction}
		</p>
	);
}

export default DailyIntroduction;