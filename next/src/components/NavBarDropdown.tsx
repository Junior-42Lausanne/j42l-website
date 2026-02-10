'use client'

import { type NavBarLinkProps } from "./NavBarLink";
import NavBarDropdownLink from "./NavBarDropdownLink";
import { type Mode } from "@/utils/type";
import { usePathname } from "next/navigation";

export type NavBarDropdownProps = {
	id: number,
	__component: "composants.dropdown-link",
	label: string,
	links: NavBarLinkProps[],
	mode: Mode,
}

/*
* Component for nav bar menu dropdown
* label: menulabel
* links: list of dropdown links
*/
export default function NavBarDropdown( {
	label,
	links,
	mode,
} : Readonly<NavBarDropdownProps> ) {
	const pathName = usePathname();
	const onCurrentPage = links.some(link => pathName === link.url);

	if (mode === 'desktop') {
		const styles = {
			linkWrap: "relative group",
			label: "inline-flex font-poppins text-navButton text-navButton--font-weight \
					text-center text-white pt-[0.315rem] pb-[0.315rem] pl-[0.625rem] pr-[0.625rem] \
					cursor-pointer",
			hover: "hover:font-bold hover:underline",
			active: "border-b-[0.2rem] border-white",
			submenuWrap: `absolute left-0 top-full pt-[0.625rem] hidden
						group-hover:block`,
		};

		return (
			<div className={styles.linkWrap}>
				<div className={`${styles.label} ${onCurrentPage ? styles.active : styles.hover}`}>
					{label}
				</div>
				<div className={styles.submenuWrap}>
					{
						links
						? links.map((link : NavBarLinkProps) => <NavBarDropdownLink key={link.id} {...link} mode={mode}/>)
						: null
					}
				</div>
			</div>
		);
	} else if (mode === 'mobile') {
		const styles = {
			linkWrap: "font-poppins text-right text-white",
			label: `text-h5 font-normal text-right py-[0.315rem] px-[0.625rem] \
					md:px-[1rem] md:text-h4`,
			submenuWrap: `flex flex-col right-3 top-full`,
		};

		return (
			<div className={styles.linkWrap}>
				<div className={styles.label}>
					{label}
				</div>
				<div className={styles.submenuWrap}>
					{
						links
						? links.map((link : NavBarLinkProps) => <NavBarDropdownLink key={link.id} {...link} mode={mode}/>)
						: null
					}
				</div>
			</div>
		);
	}
	return null;
}