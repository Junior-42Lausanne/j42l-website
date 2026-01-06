import {ButtonType} from "../../utils/type";

/*
* Component for button
* text: button text
* path: where the button point to
* color: color of the text. Optional field, default is orange
* fullwidth: button width fill the container or not. Optional field, default is false
*/
export default function Button({
	text,
	path,
	color = 'orange',
	fullWidth = false,
	className = ''
	}: Readonly<ButtonType>) {
	return (
		<a
		href={path}
		className={`font-poppins text-button text-center
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"} ${className}`}
		style={{ color }}
		>
		{text}
		</a>
	);
}