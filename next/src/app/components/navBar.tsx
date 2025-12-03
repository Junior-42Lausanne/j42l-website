import NavBarLink, { NavBarLinkProps } from "@/app/components/sub_components/navBarLink";
import ButtonLink, { ButtonProps } from "@/app/components/sub_components/button";
import { StrapiImageType } from "@/app/utils/type";

export type logoProps = {
	logo: StrapiImageType,
	url: string,
	external: boolean,
}

export type socialProps = {
	icon: StrapiImageType,
	url: string,
	external: boolean,
}

export type NavBarProps = {
	logo: logoProps,
	navBarMenu: NavBarLinkProps[],
	cta: ButtonProps,
	social: socialProps[],
}