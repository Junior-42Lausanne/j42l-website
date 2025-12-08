import qs from 'qs';
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

export const metadata = async () => {
	return getStrapiMetadata(path,
							"About - J42L",
							"Junior 42 Lausanne");
}

export default async function About() {
	try {
		const strapiData = await getStrapiData(path, queryAbout);
		const { blocks } = strapiData.data;
		return (
			<div>
				{
					blocks
						? blocks.map((block: Block) => blockRenderer(block))	
						: null
				}
			</div>
		)
	} catch (error) {
		console.log(`Error: ${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
