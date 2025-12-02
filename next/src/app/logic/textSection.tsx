import {TextSectionType} from "../utils/type";
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
				}
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
				path:textSection.button?.url ?? defaultTextSection.textSectionButton.path,
			}
		}
	}
	
	console.log("Fail to get Strapi data, fallback to default textSection")
	return defaultTextSection;
}