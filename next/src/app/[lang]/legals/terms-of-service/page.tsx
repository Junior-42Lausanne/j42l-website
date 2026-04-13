export const dynamic = "force-dynamic";

import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "../../../../utils/fetchStrapiData";
import { blockRenderer, Block, } from "../../../../utils/render"

const path = "/api/terms-of-service";
const queryToS = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getStrapiMetadata(
	path,
	"Terms of Service - J42L",
	"Junior 42 Lausanne",
  );

  return {
	title: metadata.title,
	description: metadata.description,
  };
}

export default async function ToS() {
	try {
		const strapiData = await getStrapiData(path, queryToS);
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
		console.error(`Page Terms of Service. ${error}`);
		throw error;
	}
}
