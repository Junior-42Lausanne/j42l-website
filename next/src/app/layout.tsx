import "./globals.css";
import Script from "next/script";

const navBootstrapScript = `
(function () {
  try {
    var threshold = 32;
    var readyDelayFrames = 8;
    var key = "j42l:nav-scroll:" + window.location.pathname;

    function getScrollY() {
      return window.scrollY || window.pageYOffset || 0;
    }

    function setDetached(detached) {
      if (detached) {
        document.documentElement.setAttribute("data-nav-detached", "true");
      } else {
        document.documentElement.removeAttribute("data-nav-detached");
      }
    }

    function saveScroll() {
      sessionStorage.setItem(key, String(getScrollY()));
    }

    var storedScroll = Number(sessionStorage.getItem(key) || "0") || 0;
    var currentScroll = getScrollY();
    var navigation = performance.getEntriesByType("navigation")[0];
    var isRestore = navigation && (
      navigation.type === "reload" ||
      navigation.type === "back_forward"
    );

    setDetached((isRestore ? Math.max(storedScroll, currentScroll) : currentScroll) > threshold);

    var frame = 0;
    var count = 0;

    function stabilize() {
      var y = getScrollY();

      if (isRestore) {
        y = Math.max(y, Number(sessionStorage.getItem(key) || "0") || 0);
      }

      setDetached(y > threshold);
      sessionStorage.setItem(key, String(y));

      count += 1;

      if (count < readyDelayFrames) {
        frame = window.requestAnimationFrame(stabilize);
        return;
      }

      document.documentElement.setAttribute("data-nav-ready", "true");
    }

    frame = window.requestAnimationFrame(stabilize);

    window.addEventListener("scroll", saveScroll, { passive: true });
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("beforeunload", saveScroll);
  } catch (error) {
    document.documentElement.setAttribute("data-nav-ready", "true");
  }
})();
`;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    id="nav-bootstrap"
                    dangerouslySetInnerHTML={{ __html: navBootstrapScript }}
                />
            </head>

            <body>
                {children}

                <Script
                    src="https://analytics.j42l.ch/script.js"
                    data-website-id="a83bec4c-2654-4cc6-a97b-266d5297cb16"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}