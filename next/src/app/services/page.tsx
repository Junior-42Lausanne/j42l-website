export const dynamic = "force-dynamic";

import qs from "qs";
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"

const path = "/api/accueil";
const queryHero = qs.stringify({
	populate: {
		blocks: {
			on: {
				"layout.footer-cta": {
					populate: "*",
				},
				"layout.card-section": {
					populate: {
						title: true,
						cards: {
							populate: {
								button: true,
								backgroundImage: {
									fields: ["url", "alternativeText"],
								},
							},
						},
					},
				},
			},
		},
	}
})

export function generateMetadata(): Metadata {
  return {
    title: "List of services - J42L",
    description: "All services, Junior 42 Lausanne",
  };
}

export default async function Services() {
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
		console.error(`Page Services. ${error}`);
		throw error;
	}
}
