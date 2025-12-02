import TextSection from "./components/textSection"
import HeroSection from "./components/heroSection"
import FooterCTA from "./components/footerCTA"
import getHero from "./logic/hero"
import getTextSection from "./logic/textSection"
import getfooterCTA from "./logic/footerCTASection"
import { homeHeroDefault, homeTextSectionDefault, homeFooterCTADefault } from "./homeDefault"
import { getStrapiData, query } from "./utils/utils"

/*
* The logic:
* API call for corresponse page
* parse the data for each section object
* pass the object to corresponse component
*/
export default async function Home() {
	const strapiData = await getStrapiData("/api/accueil", query);
	const {blocks} = strapiData.data;
	const hero = getHero(strapiData, homeHeroDefault);
	const textSection1 = getTextSection(blocks[0], homeTextSectionDefault);
	const footerCTA = getfooterCTA(blocks[1], homeFooterCTADefault);
	
	return (
		<div>
			<HeroSection background={hero.heroBackground}
							title={hero.heroHeading}
							subTitle={hero.heroSubHeading}
							haveSubtitle={true}
							triangleColor='orange'
							button={{...hero.heroButton}} />
			<TextSection {...textSection1} />
			<FooterCTA {...footerCTA} />
		</div>
	)
}

