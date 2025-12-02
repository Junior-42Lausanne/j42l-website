import { NavBarType, Color } from "@/app/utils/type";

export default function getNavBar(strapiData: unknown, defaultNavBar: NavBarType) {
	const navBar = strapiData as {
		__component?: string,
		logo?: {
			logo?: {
				alternativeText?: string,
				url?: string,
				height?: number,
				width?: number,
			},
			url?: string,
			external?: boolean,
		},
		navBarMenu?: {
			text?: string,
			url?: string,
			external?: boolean,
		}[],
		cta?: {
			text?: string,
			path?: string,
			color?: Color,
			fullWidth?: boolean,
			external?: boolean,
		},
		social?: {
			icon?: {
				alternativeText?: string,
				url?: string,
				height?: number,
				width?: number,
			},
			url?: string,
			external?: boolean,
		},
	}

	console.log("Fallback to default navBar");
	return defaultNavBar;
}