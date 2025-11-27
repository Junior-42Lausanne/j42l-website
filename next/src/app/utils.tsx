export async function getStrapiData<T>(path: string, query: string): Promise<T | null> {
	const baseUrl = "http://strapi-app:1337";
	const url = new URL(path, baseUrl);
	url.search = query;
	try {
		const response = await fetch(url.href);
		const data = await response.json();
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