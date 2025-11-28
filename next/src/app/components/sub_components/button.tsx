import {Color} from "../type";

export interface buttonType {
	text: string;
	path: string;
	color: Color;
	fullWidth?: boolean
}

export default function Button({
	text,
	path,
	color,
	fullWidth = false
	}: buttonType) {
	return (
		<a
		href={path}
		className={`font-poppins text-button text-center 
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${fullWidth ? "w-full" : "inline-block"}`}
		style={{ color }}
		>
		{text}
		</a>
	);
}