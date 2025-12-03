import { ThemeColor } from "@/app/utils/type";
import { FooterCTAProps } from "../components/footerCTA";

/*
* Get the FooterSection object for the hero section
* param1: the data returned by Strapi to parse
* param2: the default object for corresponse page in case of problem with strapiData
*/
export default function getfooterCTA(strapiData: unknown): FooterCTAProps {
	const footerCTA = strapiData as {
		__component: string,
		text: string,
		button: {
			buttonText: string,
			url: string,
			color: ThemeColor,
			fullWidth: boolean,
			external: boolean,
		}
	};

	return {
		text: footerCTA.text,
		button: {
			text: footerCTA.button.buttonText,
			path: footerCTA.button.url,
			color: footerCTA.button.color,
			fullWidth: footerCTA.button.fullWidth,
			external: footerCTA.button.external,
		}
	}
}