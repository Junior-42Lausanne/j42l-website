import Link from 'next/link';

export type NavBarLinkProps = {
	text: string,
	url: string,
	external: boolean,
}

/*
* Component for button
* text: link text
* url: where the link point to
* external: external link or not
*/
export default function NavBarLink({
	text,
	url,
	external,
} : Readonly<NavBarLinkProps> ){
	const styles = `inline-flex font-poppins text-navButton text-navButton--font-weight 
				text-center text-white pt-[5px] pb-[5px] pl-[10px] pr-[10px]`;

	if (external) {
		return (
			<a href={url}
				target="_blank"
				className={styles} >
				{text}
			</a>
		);
	}
	return (
		<Link href={url} className={styles}>
			{text}
		</Link>
	);
}