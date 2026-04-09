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
