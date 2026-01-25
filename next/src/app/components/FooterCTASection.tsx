import ButtonLink from "./sub_components/ButtonLink";
import { ThemeColor } from "../utils/type";

export type FooterCTASectionProps = {
	id: number,
	__component: "layout.footer-cta",
	text: string,
	button: {
		url: string;
		color: ThemeColor;
		fullWidth?: boolean;
		external?: boolean;
		buttonText: string;
	},
}

export default function FooterCTASection({
	text,
	button,
} : FooterCTASectionProps) {
	if (!text || !button) {
		return null;
	}
	const styles = {
		section: "flex flex-col px-[1.25rem] py-[6.25rem] justify-center \
				md:px-[2rem]\
				lg:px-[4.25rem] \
				xl:px-[15rem]",
		leftTriangleDiv: "flex flex-col justify-start items-start",
		containtWrap: "flex flex-col items-center justify-center my-[3.25rem] gap-[5rem] px-[2rem] \
				xl:min-w-[25rem]",
		text: "font-poppins text-center text-black text-h2 place-items-center leading-[1.1] \
				xl:w-4/5",
		rightTriangleDiv: "flex flex-col justify-end items-end",
	}

	return (
		<div className={styles.section}>
			<div className={styles.leftTriangleDiv}>
				<div className="w-0 h-0 border-t-[4rem] border-r-[4rem] border-orange border-r-transparent"></div>
			</div>
			<div className={styles.containtWrap}>
				<h1 className={styles.text}>{text}</h1>
				<ButtonLink {...button}>
					{button.buttonText}
				</ButtonLink>
			</div>
			<div className={styles.rightTriangleDiv}>
				<div className="w-0 h-0 border-l-[4rem] border-b-[4rem] border-orange border-l-transparent"></div>
			</div>
		</div>
	)
}