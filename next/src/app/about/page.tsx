import qs from 'qs';
import HeroSection from "@/app/components/HeroSection";
import { getStrapiData, blockRenderer, Block } from "@/app/utils/utils";

const queryAbout = qs.stringify({
	populate: {
		hero: {
			fields: ["heading", "subheading", "triangleColor"],
			populate: {
				backgroundImage: {
					fields: ["url", "alternativeText", "width", "height"]
				},
				button: true,
			}
		},
		blocks: {
			on: {
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

export default async function About() {
	try {
		const strapiData = await getStrapiData("/api/about", queryAbout);
		const hero = strapiData.data.hero;
		const { blocks } = strapiData.data;
		return (
			<div>
				<HeroSection hero={hero} />
				{
					blocks
						? blocks.map((block: Block) => blockRenderer(block))	
						: <div>No block!</div>
				}
			</div>
		)
	} catch (error) {
		console.log(`Error loading page. Error: ${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
