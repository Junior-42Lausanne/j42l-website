import {Color} from "./type";

export interface buttonProps {
	text: string;
	path: string;
	color: Color;
	fullWidth?: boolean;
}

export default function customButton({
	text,
	path,
	color,
	fullWidth = false
	}: buttonProps) {
	let widthClass: string;

	if (fullWidth === true)
		widthClass = "w-full";
	else
		widthClass = "inline-block";
	return (
		<a
		href={path}
		className={`font-poppins text-button text-center 
					pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-2 border-orange ${widthClass}`}
		style={{ color }}
		>
		{text}
		</a>
	);
}