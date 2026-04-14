import { getStrapiGlobalData } from "@/utils/fetchStrapiData";
import NavBar from "@/sections/NavBar";
import Footer from "@/sections/Footer";
import { Locale } from "@/utils/type";
import HtmlLang from "@/components/HtmlLang";

export default async function LocaleLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: Promise<{lang: string}>;
}>) {
	const { lang } = await params;

	const allowedLocales = ["en", "fr", "de"] as const;
	let locale: Locale;
	if (!allowedLocales.includes(lang as Locale)) {
		locale = "en"
	} else {
		locale = lang as Locale;
	}

	let global = null;
	let navBar = null;
	let footer = null;
	try {
		const globalData = await getStrapiGlobalData(locale);
		global = globalData?.data?.global ?? null;
		for (let i = 0; i < global.length; i++) {
			if (global[i].__component === 'layout.nav-bar') {
				navBar = global[i];
				continue;
			}
			if (global[i].__component === "layout.footer") {
				footer = global[i];
				continue;
			}
		}
	} catch (error) {
		console.error(`Global data. ${error}`);
	}
	return (
		
		<div>
			<HtmlLang locale={locale} />
			{
				global
					? <NavBar locale={locale} blocks={navBar} />
					: null
			}
			<div>{children}</div>
			{
				global
					? <Footer locale={locale} blocks={footer} />
					: null
			}
		</div>
	);
}
