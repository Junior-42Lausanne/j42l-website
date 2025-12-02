import {ButtonType} from "../../utils/type";

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
}: Readonly<ButtonType>) {
	return (
		<a
		href={path}
		className={`block font-poppins text-button text-center 
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}`}
		style={{ color }}
		>
		{text}
		</a>
	);
}