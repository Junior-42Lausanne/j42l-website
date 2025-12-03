import NavBarLink, { NavBarLinkProps } from "@/app/components/sub_components/navBarLink";
import ButtonLink, { ButtonLinkProps } from "@/app/components/sub_components/button";
import { StrapiImageProps } from "@/app/components/sub_components/strapiImage";

export type logoProps = {
	logo: StrapiImageProps,
	url: string,
	external: boolean,
}

export type socialProps = {
	icon: StrapiImageProps,
	url: string,
	external: boolean,
}

export type NavBarProps = {
	blocks: {
		logo: logoProps,
		navBarMenu: NavBarLinkProps[],
		cta: ButtonLinkProps,
		social: socialProps,
	},
}

