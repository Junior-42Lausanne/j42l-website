import HeroSection from "@/app/components/HeroSection"
import { getStrapiData, query, blockRenderer, Block } from "@/app/utils/utils"

/*
* The logic:
* API call for current page
* loop through the blocks to call corresponse section component
*/
export default async function About() {
	try {
		const strapiData = await getStrapiData("/api/about", query);
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
