import qs from 'qs';
import type { Locale } from '@/utils/type';

const baseUrl = "http://strapi-app:1337";
// const baseUrl = "http://localhost:1337";

const SLUG_SEGMENT_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const PAGE_BLOCKS_POPULATE = {
	"layout.hero": {
		populate: "*",
	},
	"layout.text-section": {
		populate: "*",
	},
	"layout.text-section-with-title": {
		populate: "*",
	},
	"layout.member-section": {
		populate: {
			title: true,
			members: {
				populate: {
					photo: true,
					social: {
						populate: "*",
					},
				},
			},
		},
	},
	"layout.footer-cta": {
		populate: "*",
	},
	"layout.card-section": {
		populate: {
			title: true,
			cards: {
				populate: {
					button: true,
					backgroundImage: {
						fields: ["url", "alternativeText", "width", "height"],
					},
				},
			},
		},
	},
	"layout.contact-section": {
		populate: "*",
	},
	"layout.services": {
		populate: {
			servicesTitle: true,
			servicesAccordions: {
				populate: {
					image: true,
					triggerbg: true,
					ctaButton: true,
				},
			},
		},
	},
	"layout.legal-section": {
		populate: "*",
	},
	"layout.testimonial-section": {
		populate: "*",
	},
	"layout.partner-carousel-section": {
		populate: {
			sectionTitle: true,
			partners: {
				populate: "*",
			},
		},
	},
	"layout.anchor-tag": {
		populate: "*",
	},
} as const;

function buildPageRouteFilters(segments: string[]) {
	if (
		segments.length === 0 ||
		!segments.every((segment) => SLUG_SEGMENT_REGEX.test(segment))
	) {
		return null;
	}

	const menu = segments.length === 1 ? null : segments.slice(0, -1).join("/");
	const pageSlug = segments[segments.length - 1];

	if (menu === null) {
		return {
			slug: { $eq: pageSlug },
			$or: [{ menu: { $null: true } }, { menu: { $eq: "" } }],
		};
	}

	return {
		menu: { $eq: menu },
		slug: { $eq: pageSlug },
	};
}

function humanizeSlug(slug?: string): string {
	if (!slug) return "J42L";
	if (slug.toLowerCase() === "j42l") return "J42L";
	return slug
		.split("-")
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function withBrandSuffix(title: string): string {
	const trimmed = title.trim();
	if (!trimmed) return "J42L";
	return /[-|]\s*j42l$/i.test(trimmed) ? trimmed : `${trimmed} - J42L`;
}

/*
* Strapi API call to get Page Data
* param1: url to call, this corresponds to Strapi endpoint url. Eg: "/api/accueil"
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
* Strapi API call to resolve a subpage from the Page Collection Type (/api/pages)
*/
export async function getStrapiPageBySlug(segments: string[], locale: Locale) {
	const filters = buildPageRouteFilters(segments);
	if (!filters) {
		return { type: "NOT_FOUND" as const };
	}

	const query = qs.stringify(
		{
			locale,
			filters,
			populate: {
				blocks: {
					on: PAGE_BLOCKS_POPULATE,
				},
			},
			pagination: {
				pageSize: 1,
			},
		},
		{ encodeValuesOnly: true }
	);

	const result = await getStrapiData("/api/pages", query);
	if (result.type === "NOT_FOUND") {
		return { type: "NOT_FOUND" as const };
	}

	const page = result.data?.data?.[0];
	if (!page) {
		return { type: "NOT_FOUND" as const };
	}

	return { type: "OK" as const, data: page };
}

/*
* Strapi API call for Global
*/
export async function getStrapiGlobalData(locale : Locale) {
	const url = new URL("/api/global", baseUrl);
	url.search = qs.stringify({
		locale: locale,
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
export async function getStrapiNavBarMenuData(locale: Locale) {
	const url = new URL("/api/navbar-menu", baseUrl);
	url.search = qs.stringify({
		locale: locale,
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
export async function getStrapiContactDetailsData(locale: Locale) {
	const url = new URL("/api/contact-information", baseUrl);
	url.search = qs.stringify({
		locale: locale,
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
* Strapi API call for Single Type Page Meta Data (e.g. /api/accueil)
*/
export async function getStrapiMetadata(
	path: string,
	fallbackTitle: string,
	fallbackDescription: string,
	locale: Locale
) {
	const url = new URL(path, baseUrl);
	url.search = qs.stringify({
		locale: locale,
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
			title: data?.data?.metaTitle || fallbackTitle,
			description: data?.data?.metaDescription || fallbackDescription,
		};
	} catch (error) {
		console.error(`Meta data, using default. ${error}`);
		return {
				title: fallbackTitle,
				description: fallbackDescription,
		};
	}
}

/*
* Strapi API call for Collection Type Subpage Meta Data (/api/pages)
*/
export async function getStrapiPageMetadata(
	segments: string[],
	locale: Locale
) {
	const fallbackTitle = withBrandSuffix(humanizeSlug(segments.at(-1)));
	const fallbackDescription = "Junior 42 Lausanne";
	const filters = buildPageRouteFilters(segments);
	if (!filters) {
		return {
			title: fallbackTitle,
			description: fallbackDescription,
		};
	}

	const url = new URL("/api/pages", baseUrl);
	url.search = qs.stringify(
		{
			locale,
			filters,
			fields: ["title", "metaTitle", "metaDescription"],
			pagination: {
				pageSize: 1,
			},
		},
		{ encodeValuesOnly: true }
	);

	try {
		const response = await fetch(url.href, { cache: "no-store" });
		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			console.error(`Fail to get page metadata, using default.`);
			return {
				title: fallbackTitle,
				description: fallbackDescription,
			};
		}
		const json = await response.json();
		const page = json?.data?.[0];
		return {
			title:
				page?.metaTitle ||
				(page?.title ? withBrandSuffix(page.title) : fallbackTitle),
			description: page?.metaDescription || fallbackDescription,
		};
	} catch (error) {
		console.error(`Page meta data, using default. ${error}`);
		return {
			title: fallbackTitle,
			description: fallbackDescription,
		};
	}
}
