export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
	getStrapiPageBySlug,
	getStrapiPageMetadata,
} from "@/utils/fetchStrapiData";
import { blockRenderer, type Block } from "@/utils/render";
import { ALLOWED_LOCALES, type SlugPageParams } from "@/utils/type";

export async function generateMetadata({
	params,
}: {
	params: SlugPageParams;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!ALLOWED_LOCALES.includes(lang)) {
		return {};
	}

	const metadata = await getStrapiPageMetadata(slug, lang);
	return {
		title: metadata.title,
		description: metadata.description,
	};
}

export default async function DynamicSubpage({
	params,
}: {
	params: SlugPageParams;
}) {
	const { lang, slug } = await params;

	if (!ALLOWED_LOCALES.includes(lang)) {
		notFound();
	}

	let pageResult;
	try {
		pageResult = await getStrapiPageBySlug(slug, lang);
	} catch (error) {
		console.error(`Page /${lang}/${slug.join("/")}. ${error}`);
		throw error;
	}

	if (pageResult.type === "NOT_FOUND") {
		notFound();
	}

	const { blocks } = pageResult.data;
	if (!Array.isArray(blocks) || blocks.length === 0) {
		notFound();
	}

	return (
		<div>
			{blocks.map((block: Block) => blockRenderer(block, lang))}
		</div>
	);
}
