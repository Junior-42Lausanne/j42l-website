export interface FooterNavButtonProps{
	text: string;
	buttonPath: string;
}

export default function FooterNavButton({
	text, 
	buttonPath
	}: FooterNavButtonProps) {
	return (
		<a className="font-poppins text-h5 text-white text-center" href={buttonPath}>{text}</a>
	)
}