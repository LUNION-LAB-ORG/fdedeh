import React from 'react';
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {IDailyContent} from "@/features/dailies/types";

const colors = [
	"bg-blue-100 text-blue-800 hover:bg-blue-200",
	"bg-green-100 text-green-800 hover:bg-green-200",
	"bg-red-100 text-red-800 hover:bg-red-200",
	"bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
	"bg-purple-100 text-purple-800 hover:bg-purple-200",
	"bg-pink-100 text-pink-800 hover:bg-pink-200",
	"bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
];

function DailyContent(props: { content: IDailyContent; index: number }) {
	const hashtag = props.content.hashtag?.hashtag;

	return (
		<div className="text-justify">
			{hashtag && (
				<Badge className={cn("mb-3 text-base", colors[props.index % colors.length])}>
					{hashtag}
				</Badge>
			)}
			<div dangerouslySetInnerHTML={{__html: props.content.body}}></div>
		</div>
	);
}

export default DailyContent;