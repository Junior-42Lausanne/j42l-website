import {TextSectionType, Color} from "../utils/type";
import {convertStrapiText} from "../utils/utils";

/*
* Get the TextSection object for the text section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getTextSection(strapiData: unknown, defaultTextSection: TextSectionType): TextSectionType {
	const data = strapiData as {
		data?: {
			blocks?: {
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
				}
				textColor?: Color,
				backgroundColor?: Color,
			}[];
		};
	};

	const blocks = data.data?.blocks;
	if (!Array.isArray(blocks)) {
		console.log("Fail to get Strapi data, fallback to default textSection")
		return defaultTextSection;
	}
	const textSection = blocks.find(
		(b) => b.__component === "layout.text-section"
	);
	if (textSection) {
		return {
			textSectionTitle: textSection.title ?? defaultTextSection.textSectionTitle,
			textSectionText: convertStrapiText(textSection.text) ?? defaultTextSection.textSectionText,
			textSectionImage: {
				src: textSection.image?.url ?? defaultTextSection.textSectionImage.src,
				alt: textSection.image?.alternativeText ?? defaultTextSection.textSectionImage.alt,
				height: textSection.image?.height ?? defaultTextSection.textSectionImage.height,
				width: textSection.image?.width ?? defaultTextSection.textSectionImage.width,
			},
			textSectionButton: {
				text: textSection.button?.buttonText ?? defaultTextSection.textSectionButton.text,
				path: textSection.button?.url ?? defaultTextSection.textSectionButton.path,
				color: textSection.button?.color ?? defaultTextSection.textSectionButton.color,
				fullWidth: textSection.button?.fullWidth ?? defaultTextSection.textSectionButton.fullWidth,
			},
			textSectionTextColor: textSection.textColor ?? defaultTextSection.textSectionTextColor,
			textSectionBackgroundColor: textSection.backgroundColor ?? defaultTextSection.textSectionBackgroundColor,
		}
	}
	
	console.log("Fail to get Strapi data, fallback to default textSection")
	return defaultTextSection;
}