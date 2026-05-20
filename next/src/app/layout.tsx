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
					// strategy="afterInteractive"
					id="nav-scroll-state" 
					strategy="beforeInteractive">
					{`
						(function () {
							try {
								var key = "j42l:last-scroll-y";

								function markNavState(value) {
									if (value > 32) {
										document.documentElement.setAttribute("data-nav-detached", "true");
									} else {
										document.documentElement.removeAttribute("data-nav-detached");
									}
								}

								var stored = Number(sessionStorage.getItem(key) || "0");
								markNavState(stored);

								window.addEventListener("scroll", function () {
									sessionStorage.setItem(key, String(window.scrollY || 0));
								}, { passive: true });

								window.addEventListener("pagehide", function () {
									sessionStorage.setItem(key, String(window.scrollY || 0));
								});
							} catch (error) {}
						})();
					`}
				</Script>

			</head>
			<body>{children}</body>
		</html>
	);
}
