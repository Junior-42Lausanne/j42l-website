export const dynamic = "force-dynamic";

import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"
import type { LangParams, Locale } from "@/utils/type";

const path = "/api/contact";
function getQueryContact(locale: Locale) {
	return qs.stringify({
		locale: locale,
		populate: {
			blocks: {
				populate: "*",
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
		metaTitle = "Kontakt - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else if (locale === "fr") {
		metaTitle = "Contact - J42L"
		metaDescription = "Junior 42 Lausanne"
	} else {
		metaTitle = "Contact - J42L"
		metaDescription = "Junior 42 Lausanne"
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

export default async function Contact({
	params,
}: {
	params: LangParams
}) {
	try {
		const { lang: locale } = await params;
		const strapiData = await getStrapiData(path, getQueryContact(locale));
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
		console.error(`Page Contact. ${error}`);
		throw error;
	}
}
