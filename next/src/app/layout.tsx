import { notFound } from 'next/navigation';
import "./globals.css";
import { getStrapiGlobalData } from "./utils/utils";
import NavBar from "./components/NavBar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	try {
		const globalData = await getStrapiGlobalData();
		if (!globalData?.data?.global) {
			return notFound();
		}
		// console.dir(globalData, {depth: null});
		const {global} = globalData?.data;
		if (!global || global.length === 0 || !global[0]) {
			return notFound();
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
	} catch(error) {
		console.log(`Error: ${error}`);
		return notFound();
	}
}
