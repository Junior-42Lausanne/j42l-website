import Image from 'next/image'

export interface titleProps {
	text: string;
}

export default function customTitle(content: titleProps) {
	return (
		<div className="flex flex-row justify-center">
			<Image src="/graphic/elements/svg/triangle black.svg" alt="triangle" width={55} height={55}/>
			<h2 className="font-poppins text-black text-h2 text-center pr-[50px] pl-[50px]">{content.text}</h2>
			<Image className="rotate-180" src="/graphic/elements/svg/triangle black.svg" alt="triangle" width={55} height={55}/>
		</div>
	)
}