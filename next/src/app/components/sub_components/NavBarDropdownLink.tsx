import { NavBarLinkProps } from "./NavBarLink";
import Link from 'next/link';

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
} : Readonly<NavBarLinkProps>) {
const styles = `inline-flex font-poppins text-navButton text-navButton--font-weight 
				text-center text-white pt-[5px] pb-[5px] pl-[10px] pr-[10px]`;

	if (external) {
		return (
			<a href={url}
				target="_blank"
				className={styles} >
				{linkText}
			</a>
		);
	}
	return (
		<Link href={url} className={styles} >
			{linkText}
		</Link>
	);
}