import Link from 'next/link';
import { ThemeColor } from '@/app/utils/type';

/*
* yes, this is button
*/
export type ButtonLinkProps = {
	url: string,
	color: ThemeColor,
	fullWidth?: boolean,
	external?: boolean,
	children: React.ReactNode,
}

/*
* Component for button
* url: where the button point to
* color: color of the text.
* fullwidth: button width fill the container or not.
* external: external link or not
* children: text
*/
export default function ButtonLink({
	url,
	color,
	fullWidth = false,
	external = false,
	children,
}: Readonly<ButtonLinkProps>) {
	const styles = `block font-poppins text-button text-button--font-weight text-center text-${color}
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}`;
	
	if (external) {
		return (
			<a href={url}
				target="_blank"
				className={styles} >
				{children}
			</a>
		);
	}
	return (
		<Link href={url} className={styles}>
			{children}
		</Link>
	);
}