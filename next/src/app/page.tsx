import HeroSection from "@/app/components/heroSection"
import { getStrapiData, query, blockRenderer } from "@/app/utils/utils"

/*
* The logic:
* API call for corresponse page
* parse the data for each section object
* pass the object to corresponse component
*/
export default async function Home() {
	const strapiData = await getStrapiData("/api/accueil", query);
	const hero = strapiData.data.hero;
	const { blocks } = strapiData.data;
	
	return (
		<div>
			<HeroSection hero={hero} />
			{
				blocks
					? blocks.map((block: any) => blockRenderer(block))	
					: <div>No block!</div>
			}
		</div>
	)
}

