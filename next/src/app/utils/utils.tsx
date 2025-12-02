import {StrapiRawText} from "./type";
import qs from "qs";

/*
* query for Strapi API call
* this query is converted by qs and then append to the url
*/
export const query = qs.stringify({
	populate: {
		hero: {
			fields: ["heading", "subheading"],
			populate: {
				backgroundImage: {
				fields: ["url", "alternativeText", "width", "height"]
				},
				button: {
				fields: ["buttonText", "url", "color", "fullWidth"],
				}
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
	const baseUrl = "http://strapi-app:1337";
	// const baseUrl = "http://localhost:1337";
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

/*
* Convert Strapi long text to string
* param1: Strapi text object to convert
* 
* this might be change later to for rich text support
*/
export function convertStrapiText(strapiText?: StrapiRawText) : string | null {
	if (!strapiText)
		return null;
	try {
		const paragraphs = strapiText.map(block => {
			const text = block.children?.map(c => c.text ?? "").join("");
			return text ?? "";
		}).filter(p => p.length > 0);
		return paragraphs.join("\n");
	} catch {
		return null;
	}
}