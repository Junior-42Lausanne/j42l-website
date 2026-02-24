export const dynamic = "force-dynamic";

import qs from "qs";
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "../utils/fetchStrapiData";
import { blockRenderer, Block, } from "../utils/render"
import SectionTitle from "@/components/SectionTitle";

const path = "/api/accueil";
const queryHero = qs.stringify({
	populate: {
		blocks: {
			on: {
				"layout.hero": {
					populate: "*",
				},
				"layout.text-section": {
					populate: "*",
				},
				"layout.text-section-with-title": {
					populate: "*",
				},
				"layout.member-section": {
					populate: "*",
				},
				"layout.footer-cta": {
					populate: "*",
				},
				'layout.anchor-tag': {
					populate: "*",
				},
				"layout.testimonial-section": {
					populate: "*",
				},
				"layout.partner-carousel-section": {
					populate: {
						sectionTitle: true,
						partners: {
							populate: "*",
						},
					},
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

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getStrapiMetadata(
    path,
    "Home - J42L",
    "Junior 42 Lausanne",
  );

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

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
		console.error(`Page Home. ${error}`);
		throw error;
	}
}
