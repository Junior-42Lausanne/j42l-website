export interface FooterNavButtonProps{
	text: string;
	buttonPath: string;
}

export default function footerNavButton(content: FooterNavButtonProps) {
	return (
		<a className="font-poppins text-h5 text-white text-center" href={content.buttonPath}>{content.text}</a>
	)
}