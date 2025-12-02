import {HeroType, Color} from "@/app/utils/type";

/*
* Get the Hero object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getHero(strapiData: unknown, defaultHero: HeroType): HeroType {
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
				external?: boolean,
			};
			};
		};
	};
	
	const heroArray = data?.data?.hero;
	if (heroArray) {
		return {
			heroHeading: heroArray.heading ?? defaultHero.heroHeading,
			heroSubHeading: heroArray.subheading ?? defaultHero.heroSubHeading,
			heroButton: {
				text: heroArray.button?.buttonText ?? defaultHero.heroButton.text,
				path: heroArray.button?.url ?? defaultHero.heroButton.path,
				color: heroArray.button?.color ?? defaultHero.heroButton.color,
				fullWidth: heroArray.button?.fullWidth ?? defaultHero.heroButton.fullWidth,
				external: heroArray.button?.external ?? defaultHero.heroButton.external,
			},
			heroBackground: {
				source: heroArray.backgroundImage?.url ?? defaultHero.heroBackground.source,
				alt: heroArray.backgroundImage?.alternativeText ?? defaultHero.heroBackground.alt,
				height: heroArray.backgroundImage?.height ?? defaultHero.heroBackground.height,
				width: heroArray.backgroundImage?.width ?? defaultHero.heroBackground.width,
			}
		}
	}
	
	console.log("Fallback to default hero");
	return defaultHero;
}