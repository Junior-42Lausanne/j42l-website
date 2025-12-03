import ButtonLink from "./sub_components/button";
import { ThemeColor } from "../utils/type";

export type FooterCTASectionProps = {
	blocks: {
		text: string,
		button: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		},
	}
}

export default function FooterCTASection({ blocks } : FooterCTASectionProps) {
	const {text, button} = blocks;
	const styles = {
		section: "flex flex-row pt-[100px] pb-[100px] justify-center",
		leftTriangleDiv: "flex flex-col justify-start items-start",
		conteintWrap: "flex flex-col items-center justify-center gap-[80px] mt-[100px] mb-[100px]",
		text: "font-poppins text-center text-black text-h2 place-items-center w-4/5",
		rightTriangleDiv: "flex flex-col justify-end items-end",
	}

	return (
		<div className={styles.section}>
			<div className={styles.leftTriangleDiv}>
				<div className="w-0 h-0 border-t-[4rem] border-r-[4rem] border-orange border-r-transparent"></div>
			</div>
			<div className={styles.conteintWrap}>
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