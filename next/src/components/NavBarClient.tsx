"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";

import HamburgerMenu from "@/components/HamburgerMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavBarDropdown from "@/components/NavBarDropdown";
import NavBarLink from "@/components/NavBarLink";
import StrapiImage from "@/components/StrapiImage";
import type { CtaProps, IconProps, LogoProps } from "@/sections/NavBar";
import type { menuItem } from "@/utils/render";
import type { Locale } from "@/utils/type";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

function readInitialDetachedState() {
    if (typeof document === "undefined") {
        return false;
    }

    return document.documentElement.dataset.navDetached === "true";
}

type NavBarClientProps = {
    locale: Locale;
    menu: menuItem[];
    logo: LogoProps;
    cta: CtaProps;
    social: IconProps[];
};

export default function NavBarClient({
    locale,
    menu,
    logo,
    cta,
    social,
}: NavBarClientProps) {
    const { scrollY } = useScroll();

    const [isDetached, setIsDetached] = useState(readInitialDetachedState);
    const [isScrolled, setIsScrolled] = useState(readInitialDetachedState);
    const [canAnimateNav, setCanAnimateNav] = useState(false);
    const [hoveredMenuItemId, setHoveredMenuItemId] = useState<number | null>(null);

    useIsomorphicLayoutEffect(() => {
        let frame = 0;
        let frameCount = 0;

        function syncFromScroll() {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 8);
            setIsDetached(currentScrollY > 32);

            if (currentScrollY > 32) {
                document.documentElement.dataset.navDetached = "true";
            } else {
                document.documentElement.removeAttribute("data-nav-detached");
            }
        }

        function syncLoop() {
            syncFromScroll();
            frameCount += 1;

            if (frameCount < 6) {
                frame = window.requestAnimationFrame(syncLoop);
                return;
            }

            setCanAnimateNav(true);
        }

        setCanAnimateNav(false);
        syncFromScroll();
        frame = window.requestAnimationFrame(syncLoop);

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!canAnimateNav) {
            return;
        }

        setIsScrolled(latest > 8);

        setIsDetached((current) => {
            if (latest < 4) {
                document.documentElement.removeAttribute("data-nav-detached");
                return false;
            }

            if (latest > 36) {
                document.documentElement.dataset.navDetached = "true";
                return true;
            }

            return current;
        });
    });

    const navTransition = {
        type: "spring",
        stiffness: 200,
        damping: 24,
        mass: 0.9,
    } as const;

    const navTransitionWhenReady = canAnimateNav
        ? navTransition
        : { duration: 0 };

    const hoveredMenuItemIndex =
        hoveredMenuItemId === null
            ? -1
            : menu.findIndex((item) => item.id === hoveredMenuItemId);

    // if (!isNavReady) {
    //     return null;
    // }

    return (
        <motion.header
            suppressHydrationWarning
            initial={false}
            animate={{
                paddingLeft: isDetached ? "2rem" : "0rem",
                paddingRight: isDetached ? "2rem" : "0rem",
                paddingTop: isDetached ? "1rem" : "0rem",
            }}
            transition={navTransitionWhenReady}
            className="fixed inset-x-0 top-0 z-50"
        >
            <motion.nav
                suppressHydrationWarning
                initial={false}
                aria-label="Main navigation"
                animate={{
                    width: "100%",
                    maxWidth: isDetached ? 1280 : 2400,
                    borderRadius: isDetached ? "1.75rem" : "0rem",
                    paddingLeft: isDetached ? "1rem" : "3rem",
                    paddingRight: isDetached ? "1rem" : "3rem",
                    paddingTop: isDetached ? "0.75rem" : "1rem",
                    paddingBottom: isDetached ? "0.75rem" : "1rem",
                    backgroundColor: isDetached
                        ? "rgba(24, 22, 18, 0.82)"
                        : "rgba(24, 22, 18, 0.94)",
                    boxShadow: isDetached
                        ? "0 24px 90px rgba(0,0,0,0)"
                        : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={navTransitionWhenReady}
                className={[
                    "mx-auto grid w-full grid-cols-[auto_1fr_auto] items-center gap-6",
                    "px-12 py-4",
                    "border-white/10 backdrop-blur-xl",
                    "will-change-[max-width,border-radius,padding,background-color,box-shadow]",
                    isDetached ? "border" : "border-b",
                ].join(" ")}
            >
                <div className="relative flex min-w-[8rem] items-center">
                    <LogoLink logo={logo} />
                </div>

                <div className="hidden min-w-0 items-center justify-center lg:flex">
                    <div
                        className={[
                            "relative flex min-w-0 items-center justify-center gap-0",
                            "transition-all duration-500 ease-out",
                            isDetached ? "rounded-full" : "rounded-none",
                        ].join(" ")}
                        onMouseLeave={() => setHoveredMenuItemId(null)}
                    >
                        {menu?.map((item: menuItem, index) => {
                            const isHovered = hoveredMenuItemId === item.id;
                            const isAdjacentToHovered =
                                hoveredMenuItemIndex !== -1 &&
                                Math.abs(index - hoveredMenuItemIndex) === 1;

                            if (item.__component === "composants.link") {
                                return (
                                    <NavBarLink
                                        key={item.id}
                                        {...item}
                                        mode="desktop"
                                        isHovered={isHovered}
                                        isAdjacentToHovered={isAdjacentToHovered}
                                        onHoverStart={() => setHoveredMenuItemId(item.id)}
                                        onHoverEnd={() => undefined}
                                    />
                                );
                            }

                            if (item.__component === "composants.dropdown-link") {
                                return (
                                    <NavBarDropdown
                                        key={item.id}
                                        {...item}
                                        mode="desktop"
                                        isHovered={isHovered}
                                        isAdjacentToHovered={isAdjacentToHovered}
                                        onHoverStart={() => setHoveredMenuItemId(item.id)}
                                        onHoverEnd={() => undefined}
                                    />
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>

                <div className="hidden items-center justify-end gap-2 lg:flex">
                    <NavBarCta cta={cta} />

                    <div className="h-7 w-px bg-white/10" />

                    <SocialLinks social={social} />

                    <div className="h-7 w-px bg-white/10" />

                    <LanguageSwitcher currentLocale={locale} isDetached={isDetached} />
                </div>

                <div className="flex items-center justify-self-end lg:hidden">
                    <HamburgerMenu
                        menu={menu}
                        cta={cta}
                        social={social}
                        locale={locale}
                    />
                </div>
            </motion.nav>
        </motion.header>
    );
}

function LogoLink({ logo }: { logo: LogoProps }) {
    const content = (
        <div className="relative flex h-10 w-[6.25rem] items-center">
            <StrapiImage
                alternativeText={logo.logo.alternativeText}
                className=""
                height={logo.logo.height}
                url={logo.logo.url}
                width={logo.logo.width}
            />
        </div>
    );

    if (logo.external) {
        return (
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <Link href={logo.url}>{content}</Link>;
}

function NavBarCta({ cta }: { cta: CtaProps }) {
    const className = [
        "group/contact inline-flex h-10 items-center justify-center rounded-full",
        "bg-orange px-4 text-sm font-semibold text-[#14120e]",
        "shadow-[0_18px_60px_rgba(244,152,25,0.16)]",
        "transition-colors duration-300 ease-out hover:bg-[#ffad3d]",
        "outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
    ].join(" ");

    const content = (
        <>
            <span className="whitespace-nowrap">
                {cta.buttonText}
            </span>

            <ArrowUpRight
                className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5"
                aria-hidden="true"
            />
        </>
    );

    if (cta.external) {
        return (
            <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {content}
            </a>
        );
    }

    return (
        <Link href={cta.url} className={className}>
            {content}
        </Link>
    );
}

function SocialLinks({ social }: { social: IconProps[] }) {
    if (!social?.length) {
        return null;
    }

    return (
        <div className="flex items-center gap-1">
            {social.map((item) => {
                const content = (
                    <span
                        className={[
                            "group/social relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full",
                            "border border-white/10 bg-white/[0.035] p-2",
                            "transition duration-300 ease-out hover:border-orange/30 hover:bg-orange/10",
                            "outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                        ].join(" ")}
                    >
                        <span className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-orange/10 transition duration-300 group-hover/social:scale-100" />

                        <span className="relative z-10 flex h-full w-full items-center justify-center opacity-80 transition duration-300 group-hover/social:opacity-100">
                            <StrapiImage
                                alternativeText={item.icon.alternativeText}
                                className=""
                                height={item.icon.height}
                                url={item.icon.url}
                                width={item.icon.width}
                            />
                        </span>
                    </span>
                );

                if (item.external) {
                    return (
                        <a
                            key={`${item.url}-${item.icon.url}`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.icon.alternativeText ?? "Social link"}
                        >
                            {content}
                        </a>
                    );
                }

                return (
                    <Link
                        key={`${item.url}-${item.icon.url}`}
                        href={item.url}
                        aria-label={item.icon.alternativeText ?? "Social link"}
                    >
                        {content}
                    </Link>
                );
            })}
        </div>
    );
}