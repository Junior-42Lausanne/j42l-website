import { ThemeColor } from "@/app/utils/type";
import { HeroType } from "@/app/components/heroSection"

/*
* Get the Hero object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getHero(strapiData: unknown): HeroType {
	const data = strapiData as {
		data: {
			hero: {
			heading: string,
			subheading: string,
			backgroundImage: {
				alternativeText: string,
				url: string,
				height: number,
				width: number,
			};
			button: {
				buttonText: string,
				url: string,
				color: ThemeColor,
				fullWidth: boolean,
				external: boolean,
			};
			};
		};
	};
	
	const heroArray = data.data.hero;
	return {
		heroHeading: heroArray.heading,
		heroSubHeading: heroArray.subheading,
		heroButton: {
			text: heroArray.button.buttonText,
			path: heroArray.button.url,
			color: heroArray.button.color,
			fullWidth: heroArray.button.fullWidth,
			external: heroArray.button.external,
		},
		heroBackground: {
			source: heroArray.backgroundImage.url,
			alt: heroArray.backgroundImage.alternativeText,
			height: heroArray.backgroundImage.height,
			width: heroArray.backgroundImage.width,
		}
	}
}