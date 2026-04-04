import "./globals.css";
import Script from "next/script";
import { getStrapiGlobalData } from "../utils/fetchStrapiData";
import NavBar from "../sections/NavBar";
import Footer from "../sections/Footer";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let global = null;
	let navBar = null;
	let footer = null;
	try {
		const globalData = await getStrapiGlobalData();
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
		<html lang="fr">
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
					? <NavBar blocks={navBar} />
					: null
			}
			<div>{children}</div>
			{
				global
					? <Footer blocks={footer} />
					: null
			}
			</body>
		</html>
	);
}
