import Script from "next/script";
import { getStrapiGlobalData } from "../../utils/fetchStrapiData";
import NavBar from "../../sections/NavBar";
import Footer from "../../sections/Footer";
import { LangParams } from "@/utils/type";

export default async function LocaleLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: LangParams;
}>) {
	const { lang: locale } = await params;

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
		<html lang={locale}>
			<head>
				<Script
					src="https://analytics.j42l.ch/script.js"
					data-website-id="a83bec4c-2654-4cc6-a97b-266d5297cb16"
					strategy="afterInteractive"
				/>
			</head>
			<body>
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
			</body>
		</html>
	);
}
