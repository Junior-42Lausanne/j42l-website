import { getStrapiGlobalData } from "@/utils/fetchStrapiData";
import HtmlLang from "@/components/HtmlLang";
import NavBar from "@/sections/NavBar";
import Footer from "@/sections/Footer";
import { siteLayout } from "@/styles/siteStyles";
import type { Locale } from "@/utils/type";

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const { lang } = await params;

	const allowedLocales = ["en", "fr", "de"] as const;

	const locale: Locale = allowedLocales.includes(lang as Locale)
		? (lang as Locale)
		: "en";

	let global = null;
	let navBar = null;
	let footer = null;

	try {
		const globalData = await getStrapiGlobalData(locale);
		global = globalData?.data?.global ?? null;

		if (Array.isArray(global)) {
			for (const block of global) {
				if (block.__component === "layout.nav-bar") {
					navBar = block;
					continue;
				}

				if (block.__component === "layout.footer") {
					footer = block;
				}
			}
		}
	} catch (error) {
		console.error(`Global data. ${error}`);
	}

	return (
		<div className={siteLayout.page}>
			<HtmlLang locale={locale} />

			{global && navBar ? (
				<NavBar locale={locale} blocks={navBar} />
			) : null}

			<main className={siteLayout.main}>
				{children}
			</main>

			{global && footer ? (
				<Footer locale={locale} blocks={footer} />
			) : null}
		</div>
	);
}