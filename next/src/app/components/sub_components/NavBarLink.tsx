'use client';

import { Mode } from '@/app/utils/type';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export type NavBarLinkProps = {
	id: number,
	__component: "composants.link",
	linkText: string,
	url: string,
	external: boolean,
	mode: Mode,
}

/*
* Component for nav bar single link
* linkText: link label
* url: where the link point to
* external: external link or not
*/
export default function NavBarLink({
	linkText,
	url,
	external,
	mode,
} : Readonly<NavBarLinkProps> ){
	const pathName = usePathname();
	const onCurrentPage = pathName === url;

	if (mode === 'desktop') {
		const styles = {
		normal: `inline-flex font-poppins text-navButton font-normal
					text-center text-white py-[0.1rem] px-[0.1rem]
					lg:py-[0.25rem] lg:px-[0.25rem] 
					xl:py-[0.3125rem] xl:px-[0.625rem]`,
		currentPage: "border-b-[0.2rem] border-white",
		hover: "hover:underline hover:font-bold",
		}

		if (external) {
			return (
				<a href={url}
					target="_blank"
					className={`${styles.normal} ${onCurrentPage ? styles.currentPage : styles.hover}`} >
					{linkText}
				</a>
			);
		}
		return (
			<Link href={url} className={`${styles.normal} ${onCurrentPage ? styles.currentPage : styles.hover}`}>
				{linkText}
			</Link>
		);
	} else if (mode === 'mobile') {
		const styles = {
			normal: `font-poppins text-h5 font-normal text-right text-white py-[0.315rem] px-[0.625rem] \
					md:px-[1rem] md:text-h4`,
			currentPage: "border-l-[0.2rem] border-r-[0.2rem] border-white",
			active: "active:text-orange",
		}

		if (external) {
			return (
				<a href={url}
					target="_blank"
					className={`${styles.normal} ${onCurrentPage ? styles.currentPage : styles.active}`} >
					{linkText}
				</a>
			);
		}
		return (
			<Link href={url} className={`${styles.normal} ${onCurrentPage ? styles.currentPage : styles.active}`}>
				{linkText}
			</Link>
		);
	}
	return null;
}