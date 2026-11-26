export const dynamic = "force-dynamic";

import qs from "qs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
	getStrapiData,
	getStrapiMetadata,
	PAGE_BLOCKS_POPULATE,
} from "@/utils/fetchStrapiData";
import { blockRenderer, type Block } from "@/utils/render";
import { ALLOWED_LOCALES, type LangParams, type Locale } from "@/utils/type";

const path = "/api/accueil";

function getQueryHome(locale: Locale) {
	return qs.stringify(
		{
			locale,
			populate: {
				blocks: {
					on: PAGE_BLOCKS_POPULATE,
				},
			},
		},
		{ encodeValuesOnly: true }
	);
}

export async function generateMetadata({
	params,
}: {
	params: LangParams;
}): Promise<Metadata> {
	const { lang: locale } = await params;
	if (!ALLOWED_LOCALES.includes(locale)) {
		return {};
	}

	let metaTitle = null;
	let metaDescription = null;
	if (locale === "de") {
		metaTitle = "Startseite - J42L";
		metaDescription = "Junior 42 Lausanne";
	} else if (locale === "fr") {
		metaTitle = "Accueil - J42L";
		metaDescription = "Junior 42 Lausanne";
	} else {
		metaTitle = "Home - J42L";
		metaDescription = "Junior 42 Lausanne";
	}
	const metadata = await getStrapiMetadata(
		path,
		metaTitle,
		metaDescription,
		locale
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
export default async function Home({
	params,
}: {
	params: LangParams;
}) {
	const { lang: locale } = await params;
	if (!ALLOWED_LOCALES.includes(locale)) {
		notFound();
	}

	let strapiData;
	try {
		strapiData = await getStrapiData(path, getQueryHome(locale));
	} catch (error) {
		console.error(`Page Home. ${error}`);
		throw error;
	}

	if (strapiData.type === "NOT_FOUND") {
		notFound();
	}

	const { blocks } = strapiData.data?.data ?? {};
	if (!Array.isArray(blocks) || blocks.length === 0) {
		notFound();
	}

	return (
		<div>
			{blocks.map((block: Block) => blockRenderer(block, locale))}
		</div>
	);
}
