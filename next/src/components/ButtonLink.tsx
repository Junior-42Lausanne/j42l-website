import Link from 'next/link';
import { type ThemeColor } from '../utils/type';

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
	const styles = `block font-poppins text-h5 font-semibold text-center text-${color}
					pt-[0.625rem] pb-[0.625rem] pl-[1.25rem] pr-[1.25rem] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}
					active:bg-orange active:text-black
					hover:bg-orange hover:text-black`;
	if (url.startsWith("#")) {
		return (
			<Link href={url} className={styles}>
				{children}
			</Link>
		);

	} else if (external) {
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