import { Hedvig_Letters_Sans } from "next/font/google";
import {Hero} from "../components/type"

export default function getHomeHero(strapiData: unknown): Hero {
	const data = strapiData as {
	data?: {
		hero?: {
		heading?: string;
		subheading?: string;
		backgroundImage?: {
			altText?: string;
			url?: string;
			height?: number;
			width?: number;
		};
		button?: {
			buttonText?: string;
			url?: string;
		};
		}[];
	};};
	const heroArray = data.data?.hero;

	const heroDefault = {
		heroHeading: "Votre vision réalisée par les étudiants de 42 Lausanne",
		heroSubHeading: "Propulsant l'innovation en tant que plus grande Junior Entreprise du réseau 42 – où de jeunes consultants IT donnent vie à vos projets digitaux.",
		heroButtonText: "nos Services",
		heroButtonPath: "https://www.bing.com",
		heroBackground: {
			src: "/stock photo/home background.jpg",
			alt: "Orange dot connection background",
			height: 5000,
			width: 4000,
		}
	}

	if (heroArray && heroArray.length > 0) {
		return {
			heroHeading: heroArray[0].heading ?? heroDefault.heroHeading,
			heroSubHeading: heroArray[0].subheading ?? heroDefault.heroSubHeading,
			heroButtonText: heroArray[0].button?.buttonText ?? heroDefault.heroButtonText,
			heroButtonPath: heroArray[0].button?.url ?? heroDefault.heroButtonPath,
			heroBackground: {
				src: heroArray[0].backgroundImage?.url ?? heroDefault.heroBackground.src,
				alt: heroArray[0].backgroundImage?.altText ?? heroDefault.heroBackground.alt,
				height: heroArray[0].backgroundImage?.height ?? heroDefault.heroBackground.height,
				width: heroArray[0].backgroundImage?.width ?? heroDefault.heroBackground.width
			}
		}
	}
	  
	return heroDefault;
}