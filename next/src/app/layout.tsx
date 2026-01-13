import { notFound } from 'next/navigation';
import "./globals.css";
import { getStrapiGlobalData } from "./utils/utils";
import NavBar from "./components/NavBar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let global = null;
	try {
		const globalData = await getStrapiGlobalData();
		global = globalData?.data?.global ?? null;
	} catch (err) {
		console.error("Strapi fetch error: global");
		global = null;
	}
	return (
		<html lang="en">
			<body>
			{
				global
					? <NavBar blocks={global[0]} />
					: null
			}
			<div>{children}</div>
			</body>
		</html>
	);
}
