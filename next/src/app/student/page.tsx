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
	"Student - J42L",
	"Junior 42 Lausanne",
);

export const metadata: Metadata = {
	title: strapiMetadata.title,
	description: strapiMetadata.description,
};

export default async function Student() {
	try {
		const strapiData = await getStrapiData(path, queryStudent);
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
		console.error("Strapi fetch error: page Student");
		throw error;
	}
}
