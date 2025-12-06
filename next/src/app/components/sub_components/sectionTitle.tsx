import { ThemeColor } from "@/app/utils/type";

export type SectionTitleProps = {
	color: ThemeColor,
	children: React.ReactNode,
}

/*
* Component for title of each section
* text: title text
* color: color of the triangles. Optional field, default is black
*/
export default function SectionTitle({
	color,
	children,
}: Readonly<SectionTitleProps>) {
	const styles = {
		wrap: "flex flex-row justify-center",
		leftTriangleWrap: "flex flex-col justify-start items-start",
		text: `font-poppins text-${color} text-h2 text-center px-[50px]`,
		rightTriangleWrap: "flex flex-col justify-end items-end",
	}
	return ( 
		<div className={styles.wrap}>
			<div className={styles.leftTriangleWrap}>
				<div className={`w-0 h-0 border-t-[2rem] border-r-[2rem] border-${color} border-r-transparent`}></div>
			</div>
			<h2 className={styles.text}>
				{children}
			</h2>
			<div className={styles.rightTriangleWrap}>
				<div className={`w-0 h-0 border-l-[2rem] border-b-[2rem] border-${color} border-l-transparent`}></div>
			</div>
		</div>
	)
}