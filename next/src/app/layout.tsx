import "./globals.css";
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
