export const dynamic = "force-dynamic";

import qs from 'qs';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getStrapiData, getStrapiMetadata } from "../../../utils/fetchStrapiData";
import { blockRenderer, Block, } from "../../../utils/render"

const path = "/api/automation-service";
const queryAutomation = qs.stringify(
  {
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
  { encodeValuesOnly: true }
);

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getStrapiMetadata(
    path,
    "Automation - J42L",
    "Junior 42 Lausanne",
  );

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Automation() {
	try {
		const strapiData = await getStrapiData(path, queryAutomation);
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
		console.error(`Page Automation. ${error}`);
		throw error;
	}
}
