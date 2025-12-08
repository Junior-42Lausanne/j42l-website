import qs from 'qs';
import HeroSection from "@/app/components/HeroSection";
import { getStrapiData, blockRenderer, Block } from "@/app/utils/utils";

const queryStudent = qs.stringify({
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
			populate: "*",
		},
	}
})

export default async function Web() {
	try {
		const strapiData = await getStrapiData("/api/web-service", queryStudent);
		const hero = strapiData.data.hero;
		const { blocks } = strapiData.data;
		return (
			<div>
				<HeroSection hero={hero} />
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
