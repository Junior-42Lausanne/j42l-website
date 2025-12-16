import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils";

const path = "/api/student";
const queryStudent = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

const strapiMetadata = await getStrapiMetadata(
	path,
	"Contact - J42L",
	"Junior 42 Lausanne",
);

export const metadata: Metadata = {
	title: strapiMetadata.title,
	description: strapiMetadata.description,
};

export default async function Student() {
	try {
		const strapiData = await getStrapiData(path, queryStudent);
		if (!strapiData?.data?.blocks) {
			return notFound();
		}
		const { blocks } = strapiData.data;
		return (
			<div>
				{
					blocks.map((block: Block) => blockRenderer(block))
				}
			</div>
		)
	} catch(error) {
		console.error(`${error}`);
		return notFound();
	}
}
