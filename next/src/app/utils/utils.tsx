import qs from 'qs';
import TextSection, { TextSectionProps } from "@/app/components/TextSection";
import FooterCTASection, { FooterCTASectionProps } from "@/app/components/FooterCTASection";
import TextSectionWithTitle, { TextSectionWithTitleProps } from "@/app/components/TextSectionWithTitle";
import MemberSection, { MemberSectionProps } from "@/app/components/MemberSection";
import NavBarLink, { NavBarLinkProps } from '@/app/components/sub_components/NavBarLink';
import NavBarDropdown, {NavBarDropdownProps} from "@/app/components/sub_components/NavBarDropdown";
import HeroSection, { HeroSectionProps } from '../components/HeroSection';
import ServicesSection, { ServicesSectionProps } from '../components/ServicesSection';

export type Block = HeroSectionProps |
					TextSectionProps |
					FooterCTASectionProps | 
					TextSectionWithTitleProps |
					MemberSectionProps |
          ServicesSectionProps;

export function blockRenderer(block: Block) {
	if (!block) {
		return null;
	}

	const key = `${block.__component}-${block.id}`;

	switch (block.__component) {
		case "layout.hero":
			return <HeroSection key={key} {...block} />;
		case "layout.member-section":
			return <MemberSection key={key} {...block} />;
		case "layout.text-section-with-title":
			return <TextSectionWithTitle key={key} {...block} />;
		case "layout.text-section":
			return <TextSection key={key} {...block} />;
		case "layout.footer-cta":
			return <FooterCTASection key={key} {...block} />;
		case "layout.services":
			return <ServicesSection key={key} {...block} />;
		default:
			return null;
	}
}


export type menuItem = NavBarLinkProps | NavBarDropdownProps;

export function menuRenderer(item: menuItem) {
	if (!item) {
		return null;
	}
	switch (item.__component) {
		case "composants.link":
			return <NavBarLink key={item.id} {...item} />;
		case "composants.dropdown-link":
			return <NavBarDropdown key={item.id} {...item} />;
		default:
			return null;
	}
}

const baseUrl = "http://strapi-app:1337";
// const baseUrl = "http://localhost:1337";

/*
* Strapi API call, uncomment the console.dir() to log the returned json
* param1: url to call, this corresponse to Strapi Single Types url. Eg: "/api/accueil"
* param2: the query converted by qs
*/
export async function getStrapiData(path: string, query: string) {
	const url = new URL(path, baseUrl);
	url.search = query;
	const response = await fetch(url.href);
	if (response.status == 404) {
		console.error("Ressources not found");
		return {type: "NOT_FOUND" as const};
	}
	if (!response.ok) {
		console.error("Strapi error");
		throw new Error(`STRAPI_ERROR_${response.status}`);
	}
	const data = await response.json();

	// console.dir(data, {depth: null});
	
	return {type: "OK" as const, data};
}

/*
* Strapi API call for global single type, 
* uncomment the console.dir() to log the returned json
*/
export async function getStrapiGlobalData() {
	const url = new URL("/api/global", baseUrl);
	url.search = qs.stringify({
		populate: {
			global: {
				on: {
					'layout.nav-bar': {
						populate: {
							'logo': {
								populate: "*",
							},
							'cta': {
								populate: "*",
							},
							'social': {
								populate: "*",
							}
						},
					},
					'layout.footer': {
						populate: "*",
					},
				},
			},
		},
	});
	const response = await fetch(url.href);
	if (!response.ok) {
		console.error("Strapi fetch error: global");
		throw new Error(`STRAPI_GLOBAL_ERROR_${response.status}`);
	}
	const data = await response.json();

	// console.dir(data, {depth: null});
	
	return data;
}

/*
* Strapi API call for NavBarMenu single type, 
* uncomment the console.dir() to log the returned json
*/
export async function getStrapiNavBarMenuData() {
	const url = new URL("/api/navbar-menu", baseUrl);
	url.search = qs.stringify({
		populate: {
			menu: {
				on: {
					"composants.dropdown-link": {
						populate: "*",
					},
					'composants.link': {
						populate: "*",
					},
				}
			},
		},
	});
	const response = await fetch(url.href);
	if (!response.ok) {
		console.error("Strapi navbar error");
		throw new Error(`STRAPI_NAVBAR_ERROR_${response.status}`);
	}
	const data = await response.json();

	// console.dir(data, {depth: null});
	
	return data;
}

/*
* get the correct Strapi domain based on dev or prod
*/
export function getStrapiURL(): string {
	return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

/*
* get the correct Strapi media url
* param1: media path
*/
export function getStrapiMedia(url: string): string {
	if (url.startsWith("data:"))
		return url;
	if (url.startsWith("http") || url.startsWith("//"))
		return url;
	return `${getStrapiURL()}${url}`;
}

export async function getStrapiMetadata(path: string, fallbackTitle: string, fallbackDescription: string) {
	const url = new URL(path, baseUrl);
	url.search = qs.stringify({
		fields: ["title", "description"],
	})
	try {
		const response = await fetch(url.href);
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Fail to get metadata`);
			return {
				title: fallbackTitle,
				description: fallbackDescription,
			};
		}
		const data = await response.json();
		return {
			title: data?.data?.title || fallbackTitle,
			description: data?.data?.description || fallbackDescription,
		};
	} catch (err) {
		console.error("Strapi fetch metadata failed");
		return {
				title: fallbackTitle,
				description: fallbackDescription,
		};
	}
}
