export interface titleProps {
	text: string;
}

export default function customTitle(content: titleProps) {
	return (
		<div className="flex flex-row justify-center">
			<img className="w-[55px]" src="/graphic/elements/svg/triangle black.svg" />
			<h2 className="font-poppins text-black text-h2 text-center pr-[50px] pl-[50px]">{content.text}</h2>
			<img className="w-[55px] rotate-180" src="/graphic/elements/svg/triangle black.svg" />
		</div>
	)
}