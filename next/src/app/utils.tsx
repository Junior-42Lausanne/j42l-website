export default async function getStrapiData(path: string) {
  const baseUrl = "http://strapi-app:1337";
  try {
	const response: Response = await fetch(baseUrl + path);
	const data = await response.json();
	return data
  } catch (error) {
	console.error(error);
  }
}