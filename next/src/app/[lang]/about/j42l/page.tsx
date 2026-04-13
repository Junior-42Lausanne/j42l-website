export const dynamic = "force-dynamic";

import qs from 'qs';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"
import type { LangParams, Locale } from "@/utils/type";

const path = "/api/j42l";
function getQueryJ42l(locale: Locale) {
	return qs.stringify({
		locale: locale,
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
}

export async function generateMetadata({
	params,
}: {
	params: LangParams
}): Promise<Metadata> {
	const { lang: locale } = await params;
	let metaTitle = null;
	let metaDescription = null;
	if (locale === "de") {
		metaTitle = "J42l - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else if (locale === "fr") {
		metaTitle = "J42l - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else {
		metaTitle = "J42l - J42L"
		metaDescription = "Junior 42 Lausanne"
	}
	const metadata = await getStrapiMetadata(
		path,
		metaTitle,
		metaDescription,
		locale
	);
	console.log(metadata)
	return {
		title: metadata.title,
		description: metadata.description,
	};
}
export default async function J42l({
	params,
}: {
	params: LangParams
}) {
	try {
		const { lang: locale } = await params;
		const strapiData = await getStrapiData(path, getQueryJ42l(locale));
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
		console.error(`Page About/J42L. ${error}`);
		throw error;
	}
}
