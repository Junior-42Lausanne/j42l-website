import qs from "qs";
import HeroSection from "@/app/components/HeroSection"
import { getStrapiData, blockRenderer, Block } from "@/app/utils/utils"

const queryHero = qs.stringify({
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

/*
* The logic:
* API call for current page
* loop through the blocks to call corresponse section component
*/
export default async function Home() {
	try {
		const strapiData = await getStrapiData("/api/accueil", queryHero);
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
