import {StrapiRawText} from "./components/type";

export async function getStrapiData<T>(path: string, query: string): Promise<T | null> {
	const baseUrl = "http://strapi-app:1337";
	const url = new URL(path, baseUrl);
	url.search = query;
	try {
		const response = await fetch(url.href);
		const data = await response.json();

		// console.dir(data, {depth: null});
		
		return data
	} catch (error) {
		console.error(error);
		return null;
  }
}

export function getStrapiURL(): string {
	return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null): string | null {
	if (url === null)
		return null;
	if (url.startsWith("data:"))
		return url;
	if (url.startsWith("http") || url.startsWith("//"))
		return url;
	return `${getStrapiURL()}${url}`;
}

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