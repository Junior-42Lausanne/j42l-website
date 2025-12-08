import qs from "qs";
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils"

const path = "/api/accueil";

const queryHero = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

export const metadata = async () => {
	return getStrapiMetadata(path,
							"Home - J42L",
							"Junior 42 Lausanne");
}

/*
* The logic:
* API call for current page
* loop through the blocks to call corresponse section component
*/
export default async function Home() {
	try {
		const strapiData = await getStrapiData(path, queryHero);
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
	} catch(error) {
		console.log(`Error: ${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
