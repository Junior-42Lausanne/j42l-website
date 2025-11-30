import {TextSectionType} from "../components/type";
import {convertStrapiText} from "../utils";

export default function getHomeTextSection(strapiData: unknown): TextSectionType {
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
	const textSectionDefault = {
		textSectionTitle: "Bienvenue",
		textSectionText: `La Junior 42 Lausanne (J42L) est une association étudiante affiliée au réseau Junior Enterprises Switzerland.
 
Composée d’étudiants passionnés de 42 Lausanne, et étant la plus grande Junior Entreprise du réseau mondial 42, notre mission est d’offrir des solutions informatiques de qualité, allant de la conceptualisation à des développements sur mesure. 
   En étroite collaboration avec 42 Lausanne, nous donnons vie à des projets innovants, reliant éducation et industrie au sein de l’écosystème 42.`,
		textSectionImage: {
			src: "/graphic/elements/svg/J_Orange.svg",
			alt: "J42l Symbol",
			height: 188,
			width: 123,
		},
		textSectionButton: {
			text: "Notre Histoire",
			path: "https://www.bing.com",
		},
	}

	const blocks = data.data?.blocks;
	if (!Array.isArray(blocks))
		return textSectionDefault;
	const textSection = blocks.find(
		(b) => b.__component === "layout.text-section"
	);
	if (textSection) {
		return {
			textSectionTitle: textSection.title ?? textSectionDefault.textSectionTitle,
			textSectionText: convertStrapiText(textSection.text) ?? textSectionDefault.textSectionText,
			textSectionImage: {
				src: textSection.image?.url ?? textSectionDefault.textSectionImage.src,
				alt: textSection.image?.alternativeText ?? textSectionDefault.textSectionImage.alt,
				height: textSection.image?.height ?? textSectionDefault.textSectionImage.height,
				width: textSection.image?.width ?? textSectionDefault.textSectionImage.width,
			},
			textSectionButton: {
				text: textSection.button?.buttonText ?? textSectionDefault.textSectionButton.text,
				path:textSection.button?.url ?? textSectionDefault.textSectionButton.path,
			}
		}
	}
	
	return textSectionDefault;
}