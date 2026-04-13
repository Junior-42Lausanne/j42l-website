export const dynamic = "force-dynamic";

import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "@/utils/fetchStrapiData";
import { blockRenderer, Block, } from "@/utils/render"
import type { LangParams, Locale } from "@/utils/type";

const path = "/api/prototype-service";
function getQueryPrototype(locale: Locale) {
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
          "layout.services": {
            populate: {
              servicesTitle: true,
              servicesAccordions: {
                populate: {
                  image: true,
                  triggerbg: true,
                  ctaButton: true,
                },
              },
            },
          },
          "layout.testimonial-section": {
            populate: "*",
          },
          'layout.footer-cta': {
            populate: "*",
          },
        },
      },
    },
  },
  { encodeValuesOnly: true });
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
    metaTitle = "Prototyp - J42L"
    metaDescription = "Junior 42 Lausanne"
  } else if (locale === "fr") {
    metaTitle = "Prototype - J42L"
    metaDescription = "Junior 42 Lausanne"
  } else {
    metaTitle = "Prototype - J42L"
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

export default async function Prototype({
  params,
}: {
  params: LangParams
}) {
  try {
    const { lang: locale } = await params;
    const strapiData = await getStrapiData(path, getQueryPrototype(locale));
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
		console.error(`Page Prototype. ${error}`);
		throw error;
	}
}
