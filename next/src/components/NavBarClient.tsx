"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "motion/react";
import { useState } from "react";

//  menuRenderer, --> @utils/render

import ButtonLink from "@/components/ButtonLink";
import HamburgerMenu from "@/components/HamburgerMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import StrapiImage from "@/components/StrapiImage";
import { type menuItem } from "@/utils/render";
import type { Locale } from "@/utils/type";
import type { CtaProps, IconProps, LogoProps } from "@/sections/NavBar";

import NavBarLink from "@/components/NavBarLink";
import NavBarDropdown from "@/components/NavBarDropdown";

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
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenuItemId, setHoveredMenuItemId] = useState<number | null>(null);

    const [isDetached, setIsDetached] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 12);
        setIsDetached(latest > 24);
    });

    const navTransition = {
        type: "spring",
        stiffness: 170,
        damping: 24,
        mass: 0.9,
    } as const;

    const hoveredMenuItemIndex =
        hoveredMenuItemId === null
            ? -1
            : menu.findIndex((item) => item.id === hoveredMenuItemId);


    return (
        <motion.header
            animate={{
                paddingLeft: isDetached ? "2rem" : "0rem",
                paddingRight: isDetached ? "2rem" : "0rem",
                paddingTop: isDetached ? "1rem" : "0rem",
            }}
            transition={navTransition}
            className="fixed inset-x-0 top-0 z-50"
        >
            <motion.nav
                aria-label="Main navigation"
                animate={{
                    width: isDetached ? "calc(100% - 4rem)" : "100%",
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
                        ? "0 24px 90px rgba(0,0,0,0.34)"
                        : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={navTransition}
                className={[
                    "mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-6",
                    "border-white/10 backdrop-blur-xl",
                    "will-change-[width,max-width,border-radius,padding,background-color,box-shadow]",
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
                            isScrolled ? "rounded-full" : "rounded-none",
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

                <div className="hidden items-center justify-end gap-3 lg:flex">
                    <NavBarCta cta={cta} />

                    <div
                        className={[
                            "transition-all duration-500",
                            isScrolled ? "h-7 w-px bg-white/10" : "h-7 w-px bg-white/8",
                        ].join(" ")}
                    />

                    <SocialLinks social={social} />

                    <div
                        className={[
                            "transition-all duration-500",
                            isScrolled ? "h-7 w-px bg-white/10" : "h-7 w-px bg-white/8",
                        ].join(" ")}
                    />

                    <LanguageSwitcher currentLocale={locale} />
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
    if (cta.external) {
        return (
            <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-orange px-4 text-sm font-semibold text-[#14120e] transition duration-300 hover:bg-[#ffad3d]"
            >
                <span>{cta.buttonText}</span>
                <ArrowUpRight
                    className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                />
            </a>
        );
    }

    return (
        <Link
            href={cta.url}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-orange px-4 text-sm font-semibold text-[#14120e] transition duration-300 hover:bg-[#ffad3d]"
        >
            <span>{cta.buttonText}</span>
            <ArrowUpRight
                className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
            />
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
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] p-2 transition duration-300 hover:border-orange/35 hover:bg-orange/10">
                        <StrapiImage
                            alternativeText={item.icon.alternativeText}
                            className=""
                            height={item.icon.height}
                            url={item.icon.url}
                            width={item.icon.width}
                        />
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