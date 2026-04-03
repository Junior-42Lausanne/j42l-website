export const dynamic = "force-dynamic";

import qs from 'qs';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"

const path = "/api/member";
const queryMembers = qs.stringify({
	populate: {
		blocks: {
			on: {
				'layout.hero': {
					populate: "*",
				},
				'layout.anchor-tag': {
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

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getStrapiMetadata(
	path,
	"About Members - J42L",
	"Junior 42 Lausanne",
  );

  return {
	title: metadata.title,
	description: metadata.description,
  };
}

export default async function AboutMembers() {
	try {
		const strapiData = await getStrapiData(path, queryMembers);
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
		console.error(`Page About/Members. ${error}`);
		throw error;
	}
}
