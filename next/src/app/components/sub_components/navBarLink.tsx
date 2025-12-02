import Link from 'next/link';
import { NavBarLinkType } from '@/app/utils/type';

export default function NavBarLink({
	text,
	url,
	external,
} : Readonly<NavBarLinkType> ){
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