export const dynamic = "force-dynamic";

import qs from 'qs';
import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"
import type { LangParams, Locale } from "@/utils/type";

const path = "/api/member";
function getQueryMember(locale: Locale) {
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
		metaTitle = "Mitglied - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else if (locale === "fr") {
		metaTitle = "Membre - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else {
		metaTitle = "Member - J42L"
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

export default async function Member({
	params,
}: {
	params: LangParams
}) {
	try {
		const { lang: locale } = await params;
		const strapiData = await getStrapiData(path, getQueryMember(locale));
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
