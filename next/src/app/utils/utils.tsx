import { StrapiLongTextProps } from "../components/textSection";
import TextSection from "../components/textSection";
import FooterCTASection from "../components/footerCTASection";
import qs from "qs";

export function blockRenderer(block: any) {
	switch (block.__component) {
		case "layout.text-section":
			return <TextSection key={block.id} blocks={block} />;
		case "layout.footer-cta":
			return <FooterCTASection key={block.id} blocks={block} />;
		default:
			return null;
	}
}

const baseUrl = "http://strapi-app:1337";
// const baseUrl = "http://localhost:1337";

/*
* query for Strapi API call
* this query is converted by qs and then append to the url
*/
export const query = qs.stringify({
	populate: {
		hero: {
			fields: ["heading", "subheading", "triangleColor"],
			populate: {
				backgroundImage: {
					fields: ["url", "alternativeText", "width", "height"]
				},
				button: true,
			}
		},
		blocks: {
			populate: "*",
		},
	}
})

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
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/*
* Strapi API call for global single type, uncomment the console.dir() to log the returned json
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
							'navBarMenu': {
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
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data;
	} catch (error) {
		console.error(error);
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
	if (url.startsWith("http") || url.startsWith("//"))
		return url;
	return `${getStrapiURL()}${url}`;
}

/*
* Convert Strapi long text to string
* param1: Strapi text object to convert
* 
* this might be change later to for rich text support
*/
export function convertStrapiText(strapiText: StrapiLongTextProps) : string {
	const paragraphs = strapiText.map(block => {
		const text = block.children?.map(c => c.text ?? "").join("");
		return text ?? "";
	}).filter(p => p.length > 0);
	return paragraphs.join("\n");
}