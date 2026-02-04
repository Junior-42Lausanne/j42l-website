import "./globals.css";
import { getStrapiGlobalData } from "./utils/utils";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';

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
	} catch (err) {
		console.error("Strapi fetch error: global");
	}
	return (
		<html lang="fr">
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
