export const dynamic = "force-dynamic";

import qs from "qs";
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"
import type { LangParams, Locale } from "@/utils/type";

const path = "/api/accueil";
function getQueryHero(locale: Locale) {
	return qs.stringify({
		locale: locale,
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
		metaTitle = "Startseite - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else if (locale === "fr") {
		metaTitle = "Accueil - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else {
		metaTitle = "Home - J42L"
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

/*
* The logic:
* API call for current page
* loop through the blocks to call corresponse section component
*/
export default async function Home({
	params,
}: {
	params: LangParams
}) {
	try {
		const { lang: locale } = await params;
		const strapiData = await getStrapiData(path, getQueryHero(locale));
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
