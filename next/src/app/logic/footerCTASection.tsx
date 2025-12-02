import {FooterCTAType, Color} from "../utils/type"

/*
* Get the FooterSection object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getfooterCTA(strapiData: unknown, defaultFooterCTA: FooterCTAType): FooterCTAType {
	const footerCTA = strapiData as {
		__component?: string,
		text?: string,
		button?: {
			buttonText?: string,
			url?: string,
			color?: Color,
			fullWidth?: boolean,
		}
	};

	if (footerCTA && footerCTA.__component === 'layout.footer-cta') {
		return {
			footerCTAText: footerCTA.text ?? defaultFooterCTA.footerCTAText,
			footerCTAButton: {
				text: footerCTA.button?.buttonText ?? defaultFooterCTA.footerCTAButton.text,
				path: footerCTA.button?.url ?? defaultFooterCTA.footerCTAButton.path,
				color: footerCTA.button?.color ?? defaultFooterCTA.footerCTAButton.color,
				fullWidth: footerCTA.button?.fullWidth ?? defaultFooterCTA.footerCTAButton.fullWidth,
			}
		}
	}

	console.log("Fallback to default footer CTA");
	return defaultFooterCTA;
}