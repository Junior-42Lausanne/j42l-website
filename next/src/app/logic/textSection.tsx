import { ThemeColor } from "@/app/utils/type";
import { convertStrapiText } from "@/app/utils/utils";
import { TextSectionProps } from "../components/textSection";

/*
* Get the TextSection object for the text section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getTextSection(strapiData: unknown): TextSectionProps {
	const textSection = strapiData as {
		__component: string,
		title: string,
		text: {
			type: string,
			children: {
				type: string,
				text: string,
			}[];
		}[];
		image: {
			alternativeText: string,
			url: string,
			height: number,
			width: number,
		}
		button: {
			buttonText: string,
			url: string,
			color: ThemeColor,
			fullWidth: boolean,
			external: boolean,
		}
		textColor: ThemeColor,
		backgroundColor: ThemeColor,
	};

	return {
		title: textSection.title,
		text: convertStrapiText(textSection.text),
		image: {
			source: textSection.image.url,
			alt: textSection.image.alternativeText,
			height: textSection.image.height,
			width: textSection.image.width,
		},
		button: {
			text: textSection.button.buttonText,
			path: textSection.button.url,
			color: textSection.button.color,
			fullWidth: textSection.button.fullWidth,
			external: textSection.button.external,
		},
		textColor: textSection.textColor,
		backgroundColor: textSection.backgroundColor,
	}
}