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
		if (!strapiData?.data?.blocks)
			throw new Error("No Home page content");
		const { blocks } = strapiData.data;
		return (
			<div>
				{
					blocks.map((block: Block) => blockRenderer(block))
				}
			</div>
		)
	} catch(error) {
		console.log(`${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
