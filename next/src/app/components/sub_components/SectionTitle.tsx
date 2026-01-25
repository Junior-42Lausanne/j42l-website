import { ThemeColor } from "@/app/utils/type";

export type SectionTitleProps = {
	color: ThemeColor,
	children: React.ReactNode,
}

export default function SectionTitle({
	color,
	children,
}: Readonly<SectionTitleProps>) {
	const styles = {
		wrap: "flex flex-col justify-center \
			md:flex-row",
		leftTriangleWrap: "flex flex-col justify-start items-start",
		leftTriabgle: `w-0 h-0 border-t-[2rem] border-r-[2rem] border-${color} border-r-transparent
				md:border-t-[3rem] md:border-r-[3rem]
				lg:border-t-[4rem] lg:border-r-[4rem]`,
		text: `font-poppins text-${color} text-h3 font-bold text-center px-[0rem]
			md:text-h2 md:px-[3.125rem]
			xl:px-[10rem]`,
		rightTriangleWrap: "flex flex-col justify-end items-end",
		rightTriangle: `w-0 h-0 border-b-[2rem] border-l-[2rem] border-${color} border-l-transparent
				md:border-b-[3rem] md:border-l-[3rem]
				lg:border-b-[4rem] lg:border-l-[4rem]`,
	}
	return ( 
		<div className={styles.wrap}>
			<div className={styles.leftTriangleWrap}>
				<div className={styles.leftTriabgle}></div>
			</div>
			<h2 className={styles.text}>
				{children}
			</h2>
			<div className={styles.rightTriangleWrap}>
				<div className={styles.rightTriangle}></div>
			</div>
		</div>
	)
}