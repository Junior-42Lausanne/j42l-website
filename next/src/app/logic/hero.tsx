import {Hero, Color} from "../utils/type";

/*
* Get the Hero object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getHero(strapiData: unknown, defaultHero: Hero): Hero {
	const data = strapiData as {
		data?: {
			hero?: {
			heading?: string,
			subheading?: string,
			backgroundImage?: {
				alternativeText?: string,
				url?: string,
				height?: number,
				width?: number,
			};
			button?: {
				buttonText?: string,
				url?: string,
				color?: Color,
				fullWidth?: boolean,
			};
			}[];
		};
	};
	
	const heroArray = data?.data?.hero;
	if (heroArray && heroArray.length > 0) {
		return {
			heroHeading: heroArray[0].heading ?? defaultHero.heroHeading,
			heroSubHeading: heroArray[0].subheading ?? defaultHero.heroSubHeading,
			heroButton: {
				text: heroArray[0].button?.buttonText ?? defaultHero.heroButton.text,
				path: heroArray[0].button?.url ?? defaultHero.heroButton.path,
				color: heroArray[0].button?.color ?? defaultHero.heroButton.color,
				fullWidth: heroArray[0].button?.fullWidth ?? defaultHero.heroButton.fullWidth,
			},
			heroBackground: {
				source: heroArray[0].backgroundImage?.url ?? defaultHero.heroBackground.source,
				alt: heroArray[0].backgroundImage?.alternativeText ?? defaultHero.heroBackground.alt,
				height: heroArray[0].backgroundImage?.height ?? defaultHero.heroBackground.height,
				width: heroArray[0].backgroundImage?.width ?? defaultHero.heroBackground.width,
			}
		}
	}
	
	console.log("Fallback to default hero");
	return defaultHero;
}