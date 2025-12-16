import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils";

const path = "/api/automation-service";
const queryAutomation = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

const strapiMetadata = await getStrapiMetadata(
	path,
	"Automation - J42L",
	"Junior 42 Lausanne",
);

export const metadata: Metadata = {
	title: strapiMetadata.title,
	description: strapiMetadata.description,
};

export default async function Automation() {
	try {
		const strapiData = await getStrapiData(path, queryAutomation);
		if (!strapiData?.data?.blocks) {
			return notFound();
		}
		const { blocks } = strapiData.data;
		if (blocks.length === 0) {
			return notFound();
		}
		return (
			<div>
				{
					blocks.map((block: Block) => blockRenderer(block))
				}
			</div>
		)
	} catch (error) {
		console.error(`${error}`);
		return notFound();
	}
}
