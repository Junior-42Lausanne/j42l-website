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
		section: "flex flex-row py-[100px] justify-between min-h-[600px] max-w-[70%] mx-auto",
		leftTriangleDiv: "flex flex-ol justify-start items-start",
		leftTriangle: "w-0 h-0 border-t-[6rem] border-r-[6rem] border-orange border-r-transparent",
		conteintWrap: "flex flex-col items-center justify-center gap-[80px]",
		text: "font-poppins text-center text-black text-h2 place-items-center",
		rightTriangleDiv: "flex flex-col justify-end items-end",
		rightTriangle: "w-0 h-0 border-l-[6rem] border-b-[6rem] border-orange border-l-transparent",
	}

	return (
		<div className={styles.section}>
			<div className={styles.leftTriangleDiv}>
				<div className={styles.leftTriangle}></div>
			</div>
			<div className={styles.conteintWrap}>
				<h2 className={styles.text}>{text}</h2>
				<ButtonLink {...button}>
				{button.buttonText}
			</ButtonLink>
			</div>
			<div className={styles.rightTriangleDiv}>
				<div className={styles.rightTriangle}></div>
			</div>
		</div>
	)

}