import { ThemeColor } from "@/app/utils/type";

export type SectionTitleProps = {
	color?: ThemeColor,
	children: React.ReactNode,
}

/*
* Component for title of each section
* text: title text
* color: color of the triangles. Optional field, default is black
*/
export default function SectionTitle({
	color = 'black',
	children,
}: Readonly<SectionTitleProps>) {
	return ( 
		<div className="flex flex-row justify-center">
			<div className="flex flex-col justify-start items-start">
				<div className={`w-0 h-0 border-t-[2rem] border-r-[2rem] border-${color} border-r-transparent`}></div>
			</div>
			<h2 className={`font-poppins text-${color} text-h2 text-center pr-[50px] pl-[50px]`}>{children}</h2>
			<div className="flex flex-col justify-end items-end">
				<div className={`w-0 h-0 border-l-[2rem] border-b-[2rem] border-${color} border-l-transparent`}></div>
			</div>
		</div>
	)
}