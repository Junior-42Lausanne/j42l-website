import Link from 'next/link';

export type NavBarLinkProps = {
	id: string,
	url: string,
	external: boolean,
	children: React.ReactNode,
}

/*
* Component for button
* id: use as key for map()
* url: where the link point to
* external: external link or not
* children: text
*/
export default function NavBarLink({
	id,
	url,
	external,
	children,
} : Readonly<NavBarLinkProps> ){
	const styles = `inline-flex font-poppins text-navButton text-navButton--font-weight 
				text-center text-white pt-[5px] pb-[5px] pl-[10px] pr-[10px]`;

	if (external) {
		return (
			<div>
				<a href={url}
					target="_blank"
					className={styles} >
					{children}
				</a>
			</div>
		);
	}
	return (
		<div>
			<Link href={url} className={styles}>
				{children}
			</Link>
		</div>
	);
}