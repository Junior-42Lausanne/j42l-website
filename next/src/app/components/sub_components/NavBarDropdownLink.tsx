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
	const styles = {
		text: `inline-flex font-poppins text-h5 font-normal 
					text-center text-black bg-pale_orange w-[12.5rem] pt-[0.625rem] pb-[0.625rem] pl-[0.625rem]
					hover:bg-orange hover:text-white hover:font-bold`,
	}

	if (external) {
		return (
			<a href={url}
				target="_blank"
				className={styles.text} >
				{linkText}
			</a>
		);
	}
	return (
		<Link href={url} className={styles.text} >
			{linkText}
		</Link>
	);
}