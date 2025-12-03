import { ThemeColor } from "@/app/utils/type";

export default function getNavBar(strapiData: unknown) {
	const navBar = strapiData as {
		__component: string,
		logo: {
			logo: {
				alternativeText: string,
				url: string,
				height: number,
				width: number,
			},
			url: string,
			external: boolean,
		},
		navBarMenu: {
			text: string,
			url: string,
			external: boolean,
		}[],
		cta: {
			text: string,
			path: string,
			color: ThemeColor,
			fullWidth: boolean,
			external: boolean,
		},
		social: {
			icon?: {
				alternativeText: string,
				url: string,
				height: number,
				width: number,
			},
			url: string,
			external: boolean,
		},
	}
}