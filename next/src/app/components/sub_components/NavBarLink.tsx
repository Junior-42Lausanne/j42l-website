import Link from 'next/link';

export type NavBarLinkProps = {
	id?: number,
	linkText: string,
	url: string,
	external: boolean,
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
} : Readonly<NavBarLinkProps> ){
	const styles = `inline-flex font-poppins text-navButton font-normal
				text-center text-white pt-[0.3125rem] pb-[0.3125rem] pl-[0.625rem] pr-[0.625rem]
				hover:underline hover:font-bold`;

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
		<Link href={url} className={styles}>
			{linkText}
		</Link>
	);
}