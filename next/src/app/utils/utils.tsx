import qs from 'qs';
import TextSection, { TextSectionProps } from "@/app/components/TextSection";
import FooterCTASection, { FooterCTASectionProps } from "@/app/components/FooterCTASection";
import TextSectionWithTitle, { TextSectionWithTitleProps } from "@/app/components/TextSectionWithTitle";
import MemberSection, { MemberSectionProps } from "@/app/components/MemberSection";
import NavBarLink, { NavBarLinkProps } from '@/app/components/sub_components/NavBarLink';
import NavBarDropdown, {NavBarDropdownProps} from "@/app/components/sub_components/NavBarDropdown";
import HeroSection, { HeroSectionProps } from '../components/HeroSection';

type HeroSectionBlock = HeroSectionProps["blocks"] & {
	id: number,
	__component: "layout.hero",
}

type MemberSectionBlock = MemberSectionProps["blocks"] & {
	id: number,
	__component: "layout.member-section",
}

type TextSectionWithTitleBlock = TextSectionWithTitleProps["blocks"] & {
	id: number,
	__component: "layout.text-section-with-title",
};

type TextSectionBlock = TextSectionProps["blocks"] & {
	id: number,
	__component: "layout.text-section",
};

type FooterCTASectionBlock = FooterCTASectionProps["blocks"] & {
	id: number,
	__component: "layout.footer-cta",
};

export type Block = HeroSectionBlock |
					TextSectionBlock | 
					FooterCTASectionBlock | 
					TextSectionWithTitleBlock |
					MemberSectionBlock;

export function blockRenderer(block: Block) {
	if (!block) {
		return null;
	}
	switch (block.__component) {
		case "layout.hero":
			return <HeroSection key={block.id} blocks={block} />;
		case "layout.member-section":
			return <MemberSection key={block.id} blocks={block} />;
		case "layout.text-section-with-title":
			return <TextSectionWithTitle key={block.id} blocks={block} />;
		case "layout.text-section":
			return <TextSection key={block.id} blocks={block} />;
		case "layout.footer-cta":
			return <FooterCTASection key={block.id} blocks={block} />;
		default:
			return null;
	}
}

type SingleLink = NavBarLinkProps & {
	id: number,
	__component: "composants.link",
}

type DropdownLink = NavBarDropdownProps & {
	id: number,
	__component: "composants.dropdown-link",
}

export type menuItem = SingleLink | DropdownLink;

export function menuRenderer(item: menuItem) {
	if (!item) {
		return null;
	}
	switch (item.__component) {
		case "composants.link":
			return <NavBarLink key={item.id} 
								linkText={item.linkText}
								url={item.url}
								external={item.external} />;
		case "composants.dropdown-link":
			return <NavBarDropdown key={item.id}
									label={item.label}
									links={item.links} />;
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
	try {
		const response = await fetch(url.href);
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Error loading page.`);
			return null;
		}
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data;
	} catch (error) {
		console.error(`Error loading page.`);
		return null;
	}
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
	try {
		const response = await fetch(url.href);
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Fail to load global content (navbar/footer).`);
			return null;
		}
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data;
	} catch (error) {
		console.error(`Fail to load global content (navbar/footer).`)
		return null;
	}
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
	try {
		const response = await fetch(url.href);
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Fail to get navBar menu.`);
			return null;
		}
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data;
	} catch (error) {
		console.error(`Fail to get navBar menu.`);
		return null;
	}
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
	} catch (error) {
		console.error(`Fail to get metadata`);
		return {
				title: fallbackTitle,
				description: fallbackDescription,
		};
	}
}
