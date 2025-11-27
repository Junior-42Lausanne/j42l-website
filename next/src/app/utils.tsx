import qs from "qs"

// const homePageQuery = qs.stringify({
// 	populate: {
// 		block: {

// 		}
// 	}
// })

export default async function getStrapiData(path: string): Promise<any> {
	const baseUrl = "http://strapi-app:1337";
	try {
		const response = await fetch(baseUrl + path);
		const data = await response.json();
		return data
	} catch (error) {
		console.error(error);
		return null;
  }
}
