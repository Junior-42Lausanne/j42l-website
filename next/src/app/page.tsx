import qs from "qs";
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils"

const path = "/api/accueil";
const queryHero = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

const strapiMetadata = await getStrapiMetadata(
	path,
	"Home - J42L",
	"Junior 42 Lausanne",
);

export const metadata: Metadata = {
	title: strapiMetadata.title,
	description: strapiMetadata.description,
};


/*
* The logic:
* API call for current page
* loop through the blocks to call corresponse section component
*/
export default async function Home() {
	try {
		const strapiData = await getStrapiData(path, queryHero);
		if (strapiData.type == "NOT_FOUND") {
			return notFound();
		}
		const { blocks } = strapiData.data?.data;
		if (!Array.isArray(blocks) || blocks.length === 0) {
			return notFound();
		}
		return (
			<div>
				{
					blocks.map((block: Block) => blockRenderer(block))
				}
			</div>
		)
	} catch(error) {
		console.error("Strapi fetch error: page Home");
		throw error;
	}
}
