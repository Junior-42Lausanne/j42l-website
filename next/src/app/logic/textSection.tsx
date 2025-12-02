import {TextSectionType, Color} from "@/app/utils/type";
import {convertStrapiText} from "@/app/utils/utils";

/*
* Get the TextSection object for the text section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getTextSection(strapiData: unknown, defaultTextSection: TextSectionType): TextSectionType {
	const textSection = strapiData as {
		__component?: string,
		title?: string,
		text?: {
			type?: string,
			children?: {
				type?: string,
				text?: string,
			}[];
		}[];
		image?: {
			alternativeText?: string,
			url?: string,
			height?: number,
			width?: number,
		}
		button?: {
			buttonText?: string,
			url?: string,
			color?: Color,
			fullWidth?: boolean,
			external?: boolean,
		}
		textColor?: Color,
		backgroundColor?: Color,
	};

	if (textSection && textSection.__component === 'layout.text-section') {
		return {
			textSectionTitle: textSection.title ?? defaultTextSection.textSectionTitle,
			textSectionText: convertStrapiText(textSection.text) ?? defaultTextSection.textSectionText,
			textSectionImage: {
				source: textSection.image?.url ?? defaultTextSection.textSectionImage.source,
				alt: textSection.image?.alternativeText ?? defaultTextSection.textSectionImage.alt,
				height: textSection.image?.height ?? defaultTextSection.textSectionImage.height,
				width: textSection.image?.width ?? defaultTextSection.textSectionImage.width,
			},
			textSectionButton: {
				text: textSection.button?.buttonText ?? defaultTextSection.textSectionButton.text,
				path: textSection.button?.url ?? defaultTextSection.textSectionButton.path,
				color: textSection.button?.color ?? defaultTextSection.textSectionButton.color,
				fullWidth: textSection.button?.fullWidth ?? defaultTextSection.textSectionButton.fullWidth,
				external: textSection.button?.external ?? defaultTextSection.textSectionButton.external,
			},
			textSectionTextColor: textSection.textColor ?? defaultTextSection.textSectionTextColor,
			textSectionBackgroundColor: textSection.backgroundColor ?? defaultTextSection.textSectionBackgroundColor,
		}
	}
	
	console.log("Fallback to default textSection");
	return defaultTextSection;
}