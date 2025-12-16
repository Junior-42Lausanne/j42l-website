import Link from 'next/link';
import { ThemeColor } from '@/app/utils/type';

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
					pt-[0.625rem] pb-[0.625rem] pl-[1.25rem] pr-[1.25rem] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}
					hover:bg-orange hover:text-black`;
	
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