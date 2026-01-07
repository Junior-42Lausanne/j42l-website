import qs from 'qs';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils";

const path = "/api/about";
const queryAbout = qs.stringify({
	populate: {
		blocks: {
			on: {
				'layout.hero': {
					populate: "*",
				},
				'layout.member-section': {
					populate: {
						title: true,
						members: {
							populate: {
								photo: {
									populate: "*",
								},
								social: {
									populate: "*",
								},
							},
						},
					},
				},
				'layout.text-section-with-title': {
					populate: "*",
				},
				'layout.footer-cta': {
					populate: "*",
				},
			}
		},
	}
})

const strapiMetadata = await getStrapiMetadata(
	path,
	"About - J42L",
	"Junior 42 Lausanne",
);

export const metadata: Metadata = {
	title: strapiMetadata.title,
	description: strapiMetadata.description,
};

export default async function About() {
	try {
		const strapiData = await getStrapiData(path, queryAbout);
		if (!strapiData || !strapiData.data || !Array.isArray(strapiData.data.blocks)) {
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
