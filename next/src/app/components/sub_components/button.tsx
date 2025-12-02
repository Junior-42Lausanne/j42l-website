import { ButtonType } from "@/app/utils/type";
import Link from 'next/link';

/*
* Component for button
* text: button text
* path: where the button point to
* color: color of the text.
* fullwidth: button width fill the container or not.
*/
export default function Button({
	text,
	path,
	color,
	fullWidth,
	external,
}: Readonly<ButtonType>) {
	const styles = `block font-poppins text-button text-button--font-weight text-center text-${color}
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}`;
	
	if (external) {
		return (
			<a href={path}
				target="_blank"
				className={styles} >
				{text}
			</a>
		);
	}
	return (
		<Link href={path} className={styles}>
			{text}
		</Link>
	);
}