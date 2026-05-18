"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
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
    const [isDetached, setIsDetached] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenuItemId, setHoveredMenuItemId] = useState<number | null>(null);
    const [isContactPreviewOpen, setIsContactPreviewOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // 24 / 32
        setIsScrolled(latest > 24);
        setIsDetached(latest > 32);
    });
    const navTransition = {
        type: "spring",
        stiffness: 200,
        damping: 24,
        mass: 0.9,
    } as const;

    const hoveredMenuItemIndex =
        hoveredMenuItemId === null
            ? -1
            : menu.findIndex((item) => item.id === hoveredMenuItemId);


    return (
        <>
            <AnimatePresence>
                {isContactPreviewOpen ? (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="pointer-events-none fixed inset-0 z-40 bg-[#060504]/55"
                    />
                ) : null}
            </AnimatePresence>

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
                            ? "0 24px 90px rgba(0,0,0,0)"
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

                    <div className="hidden items-center justify-end gap-2 lg:flex">
                        <NavBarCta
                            cta={cta}
                            onOpenChange={setIsContactPreviewOpen}
                        />

                        <div className="h-7 w-px bg-white/10" />

                        <SocialLinks social={social} />

                        <div className="h-7 w-px bg-white/10" />

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
        </>
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

function NavBarCta({
    cta,
    onOpenChange,
}: {
    cta: CtaProps;
    onOpenChange: (isOpen: boolean) => void;
}) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const collapsedWidth = Math.max(168, cta.buttonText.length * 8 + 58);

    const contactItems = [
        {
            label: "Email",
            value: "contact@j42l.ch",
            href: "mailto:contact@j42l.ch",
        },
        {
            label: "Phone",
            value: "+41 XX XXX XX XX",
            href: "tel:+41XXXXXXXXX",
        },
        {
            label: "Address",
            value: "Lausanne, Switzerland",
            href: null,
        },
    ];

    function openContactPreview() {
        setIsContactOpen(true);
        onOpenChange(true);
    }

    function closeContactPreview() {
        setIsContactOpen(false);
        onOpenChange(false);
    }

    const buttonContent = (
        <>
            <span className="relative z-20 whitespace-nowrap">
                {cta.buttonText}
            </span>

            <ArrowUpRight
                className="relative z-20 ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5"
                aria-hidden="true"
            />
        </>
    );

    return (
        <div
            className="relative z-50 h-10 shrink-0"
            style={{ width: collapsedWidth }}
            onMouseEnter={openContactPreview}
            onMouseLeave={closeContactPreview}
        >
            <motion.div
                animate={{
                    width: collapsedWidth,
                    height: isContactOpen ? 244 : 40,
                    borderRadius: isContactOpen ? "1.45rem" : "999px",
                }}
                transition={{
                    duration: 0.34,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                    "absolute left-0 top-0 overflow-visible bg-orange text-[#14120e]",
                    "shadow-[0_18px_60px_rgba(244,152,25,0.16)]",
                ].join(" ")}
            >
                {cta.external ? (
                    <a
                        href={cta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/contact relative z-20 flex h-10 items-center justify-start rounded-full px-4 text-sm font-semibold"
                    >
                        {buttonContent}
                    </a>
                ) : (
                    <Link
                        href={cta.url}
                        className="group/contact relative z-20 flex h-10 items-center justify-start rounded-full px-4 text-sm font-semibold"
                    >
                        {buttonContent}
                    </Link>
                )}

                <AnimatePresence>
                    {isContactOpen ? (
                        <motion.div
                            initial={{
                                opacity: 0,
                                width: collapsedWidth,
                                height: 0,
                                y: -2,
                                clipPath: "inset(0 0 100% 0 round 0 0 1.45rem 1.45rem)",
                            }}
                            animate={{
                                opacity: 1,
                                width: 460,
                                height: 244,
                                y: 0,
                                clipPath: "inset(0 0 0% 0 round 0 0 1.45rem 1.45rem)",
                            }}
                            exit={{
                                opacity: 0,
                                width: collapsedWidth,
                                height: 0,
                                y: -2,
                                clipPath: "inset(0 0 100% 0 round 0 0 1.45rem 1.45rem)",
                            }}
                            transition={{
                                duration: 0.36,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={[
                                "absolute right-0 top-10 overflow-hidden",
                                "rounded-bl-[1.45rem] rounded-br-[1.45rem] rounded-tl-[1.45rem]",
                                "bg-orange text-[#14120e]",
                                "shadow-[0_30px_90px_rgba(0,0,0,0.34),0_18px_70px_rgba(244,152,25,0.18)]",
                                "will-change-[width,height,opacity,clip-path,transform]",
                            ].join(" ")}
                        >
                            <div className="px-6 pb-6 pt-5">
                                <div className="h-px w-full bg-[#14120e]/15" />

                                <p className="mt-5 max-w-[21rem] text-xl font-semibold leading-6 tracking-[-0.045em]">
                                    Let’s frame your project properly.
                                </p>

                                <div className="mt-6 space-y-3">
                                    {contactItems.map((item) => {
                                        const inner = (
                                            <div className="grid grid-cols-[5.5rem_1fr] gap-4 text-left">
                                                <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#14120e]/48">
                                                    {item.label}
                                                </span>

                                                <span className="truncate text-sm font-semibold text-[#14120e]/86">
                                                    {item.value}
                                                </span>
                                            </div>
                                        );

                                        if (item.href) {
                                            return (
                                                <a
                                                    key={item.label}
                                                    href={item.href}
                                                    className="block rounded-xl px-2 py-1.5 transition hover:bg-[#14120e]/8"
                                                >
                                                    {inner}
                                                </a>
                                            );
                                        }

                                        return (
                                            <div key={item.label} className="rounded-xl px-2 py-1.5">
                                                {inner}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </motion.div>
        </div>
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
                            "focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-[#181612]",
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