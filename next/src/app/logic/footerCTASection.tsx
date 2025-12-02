import {FooterCTAType} from "../utils/type"

/*
* Get the FooterSection object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getfooterCTA(strapiData: unknown, defaultFooterCTA: FooterCTAType): FooterCTAType {
	const data = strapiData as {
		data? : {
			blocks?: {
				__component?: string,
				text?: string,
				button?: {
					buttonText?: string,
					url?: string,
				}
			}[];
		};
	};

	const blocks = data.data?.blocks;
	if (!Array.isArray(blocks)) {
		console.log("Fail to get Strapi data, fallback to default footer CTA")
		return defaultFooterCTA;
	}
	const footerCTA = blocks.find(
		(b) => b.__component === "layout.footer-cta"
	);
	if (footerCTA) {
		return {
			footerCTAText: footerCTA.text ?? defaultFooterCTA.footerCTAText,
			footerCTAButton: {
				text: footerCTA.button?.buttonText ?? defaultFooterCTA.footerCTAButton.text,
				path: footerCTA.button?.url ?? defaultFooterCTA.footerCTAButton.path,
			}
		}
	}

	console.log("Fail to get Strapi data, fallback to default footer CTA")
	return defaultFooterCTA;
}