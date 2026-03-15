'use client'

import { type NavBarLinkProps } from "./NavBarLink";
import Link from 'next/link';
import { usePathname } from "next/navigation";

/*
* Component for nav bar dropdown link
* linkText: link label
* url: where the link point to
* external: external link or not
*/
export default function NavBarDropdownLink({
	linkText,
	url,
	external,
	mode,
} : Readonly<NavBarLinkProps>) {
	const pathName = usePathname();
	const onCurrentPage = pathName === url;

	if (mode === 'desktop') {
		const styles = {
			text: `inline-flex font-poppins text-navButton 
						text-center w-[12.5rem] pt-[0.625rem] pb-[0.625rem] pl-[0.625rem]`,
			currentPage: "bg-orange text-white font-bold",
			default: "bg-black text-white font-bold hover:bg-orange hover:text-black \
						opacity-80 hover:opacity-100",
		}

		if (external) {
			return (
				<a href={url}
					target="_blank"
					className={`${styles.text} ${onCurrentPage ? styles.currentPage : styles.default}`}>
					{linkText}
				</a>
			);
		}
		return (
			<Link href={url} className={`${styles.text} ${onCurrentPage ? styles.currentPage : styles.default}`} >
				{linkText}
			</Link>
		);
	} else if (mode === 'mobile') {
		const styles = {
			wrap: "flex flex-row gap-[0.5rem] w-full py-[0.625rem] pr-[1rem] items-baseline justify-end cursor-pointer \
					md:pr-[2rem]",
			text: `font-poppins text-h5 font-normal text-right \
					md:text-h4`,
			triangle: "border-b-[0.5rem] border-r-[0.5rem] border-white border-r-transparent \
					md:border-b-[0.7rem] md:border-r-[0.7rem]",
			currentPage: "border-r-[0.2rem] border-l-[0.2rem] border-orange text-orange",
			active: "text-orange active:text-white",
		}

		if (external) {
			return (
				<div className={`${styles.wrap} ${onCurrentPage ? styles.currentPage : styles.active}`}>
					<a href={url}
						target="_blank"
						className={styles.text} >
						{linkText}
					</a>
					<div className={styles.triangle}></div>
				</div>
			);
		}
		return (
			<div className={`${styles.wrap} ${onCurrentPage ? styles.currentPage : styles.active}`}>
				<Link href={url} className={styles.text}>
					{linkText}
				</Link>
				<div className={styles.triangle}></div>
			</div>
		);
	}
	return null;
}