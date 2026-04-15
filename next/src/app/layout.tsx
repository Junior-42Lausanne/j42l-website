import "./globals.css";
import Script from "next/script";

export default async function RootLayout({
    children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  return (
	<html>
		<head>
			<Script
				src="https://analytics.j42l.ch/script.js"
				data-website-id="a83bec4c-2654-4cc6-a97b-266d5297cb16"
				strategy="afterInteractive"
			/>
		</head>
		<body>{children}</body>
	</html>
  );
}
