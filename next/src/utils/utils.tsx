/*
* get the correct Strapi domain based on dev or prod
*/
export function getStrapiURL(): string {
	const base = process.env.NEXT_PUBLIC_STRAPI_URL;
	if (!base) {
		throw new Error("Missing NEXT_PUBLIC_STRAPI_URL");
	}
	return base;
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
