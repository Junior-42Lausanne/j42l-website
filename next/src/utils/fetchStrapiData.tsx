import qs from 'qs';

const baseUrl = "http://strapi-app:1337";
// const baseUrl = "http://localhost:1337";

/*
* Strapi API call to get Page Data
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
		throw new Error(`STRAPI_ERROR_${response.status}`);
	}
	const data = await response.json();
	
	return {type: "OK" as const, data};
}

/*
* Strapi API call for Global
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
						populate: {
							'logo': {
								populate: "*",
							},
							'generalNavigation': {
								populate: "*",
							},
							'serviceNavigation': {
								populate: "*",
							},
							'externalNavigation': {
								populate: "*",
							},
							'social': {
								populate: "*",
							},
							'cta': {
								populate: "*",
							},
							'legalNavigation': {
								populate: "*",
							}
						},
					},
				},
			},
		},
	});
	const response = await fetch(url.href);
	if (!response.ok) {
		throw new Error(`STRAPI_GLOBAL_ERROR_${response.status}`);
	}
	const data = await response.json();
	
	return data;
}

/*
* Strapi API call for NavBar Menu
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
		throw new Error(`STRAPI_NAVBAR_ERROR_${response.status}`);
	}
	const data = await response.json();
	
	return data;
}

/*
* Strapi API call for Contact Detail
*/
export async function getStrapiContactDetailsData() {
	const url = new URL("/api/contact-information", baseUrl);
	url.search = qs.stringify({
		populate: "*",
	});
	const response = await fetch(url.href);
	if (!response.ok) {
		throw new Error(`STRAPI_CONTACT_INFORMATION_ERROR_${response.status}`);
	}
	const data = await response.json();

	return data;
}

/*
* Strapi API call for Page Meta Data
*/
export async function getStrapiMetadata(path: string, fallbackTitle: string, fallbackDescription: string) {
	const url = new URL(path, baseUrl);
	url.search = qs.stringify({
		fields: ["metaTitle", "metaDescription"],
	})
	try {
		const response = await fetch(url.href, { cache: 'no-store' });
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Fail to get metadata, using default.`);
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
		console.error(`Meta data, using default. ${error}`);
		return {
				title: fallbackTitle,
				description: fallbackDescription,
		};
	}
}
