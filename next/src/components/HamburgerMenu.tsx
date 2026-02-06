'use client';

import { menuRenderer, type menuItem } from "../utils/render";
import { type IconProps, type CtaProps } from "../sections/NavBar";
import ButtonLink from "../components/ButtonLink";
import StrapiImage from "../components/StrapiImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export type HamburgerProp = {
    menu: menuItem[],
    cta: CtaProps,
    social: IconProps[],
}

export default function HamburgerMenu({menu, cta, social} : HamburgerProp) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    const styles = {
        hamburgerWrap: "flex flex-col relative\
                lg:hidden",
        hamburger: "flex flex-col w-[2.25rem] gap-[0.3rem] cursor-pointer",
        hamburgerBarOpen: "w-full h-[0.2rem] bg-white transition-all duration-400",
        hamburgerThirdBarOpen: "w-2/3 self-end h-[0.2rem] bg-white transition-all duration-400",
        HamburgerFirstBarClose: "rotate-45 translate-y-[0.45rem]",
        hamburgerSecondBarClose: "opacity-0",
        hamburgerThirdBarClose: "w-full -rotate-45 -translate-y-[0.45rem]",
        showNavPanel: "flex flex-col fixed inset-y-0 right-0 w-2/3 h-screen z-5 py-[2rem] px-[2rem] gap-[3rem] \
                    bg-black top-[3.875rem] overflow-hidden transition-all duration-300 transform translate-x-0 \
                    md:w-2/5",
        hideNavPanel: "flex flex-col fixed inset-y-0 right-0 w-2/3 h-screen z-5 py-[2rem] px-[2rem] gap-[3rem] \
                    bg-black top-[3.875rem] overflow-hidden transition-all duration-300 transform translate-x-full \
                    md:w-2/5",
        navLinkWrap: "flex flex-col gap-[0.5rem] \
                    md:gap-[0.7rem]",
        button: "flex flex-col w-full animate-pulse",
        iconWrap: "flex flex-row justify-end gap-[0.625rem] items-center",
        icon: "relative w-[30px] h-[30px]",
    }

    return (
        <div className={styles.hamburgerWrap}>
            <div className={styles.hamburger} onClick={() => setIsNavOpen((prev) => !prev)}>
                <div className={`${styles.hamburgerBarOpen} ${isNavOpen ? styles.HamburgerFirstBarClose : ""}`}></div>
                <div className={`${styles.hamburgerBarOpen} ${isNavOpen ? styles.hamburgerSecondBarClose : ""}`}></div>
                <div className={`${styles.hamburgerThirdBarOpen} ${isNavOpen ? styles.hamburgerThirdBarClose : ""}`}></div>
            </div>
            <div className={isNavOpen ? styles.showNavPanel : styles.hideNavPanel}>
                <div className={styles.navLinkWrap}>
                    {
                        menu
                        ? menu.map((item : menuItem) => menuRenderer(item, 'mobile'))
                        : null
                    }
                </div>
                <div className={styles.button}>
                    <ButtonLink {...cta}>
                        {cta.buttonText}
                    </ButtonLink>
                </div>
                <div className={styles.iconWrap}>
						{social.map((item) => (
							<div key={item.icon.id} className={styles.icon}>
								{item.external ? (
									<a href={item.url} target="_blank">
										<StrapiImage
											alternativeText={item.icon.alternativeText}
											className=""
											height={item.icon.height}
											url={item.icon.url}
											width={item.icon.width} />
									</a>
								) : (
									<Link href={item.url}>
										<StrapiImage
											alternativeText={item.icon.alternativeText}
											className=""
											height={item.icon.height}
											url={item.icon.url}
											width={item.icon.width} />
									</Link>
								)}
							</div>
						))}
					</div>
            </div>
        </div>
    )
} 