export interface buttonProps {
	text: string;
	path: string;
	color: string;
	fullWitdh: boolean;
}

export default function customButton(content: buttonProps) {
	let widthClass;

	if (content.color !== "white" && content.color !== "orange")
		return null;
	if (content.fullWitdh === true)
		widthClass = "w-full";
	else
		widthClass = "inline-block";
	return (
	<a href={content.path} className={widthClass}>
		<button className={`font-poppins text-button text-center 
							pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-[2px] border-orange ${widthClass}`}
							style={{color:`${content.color}`}}>
			{content.text}</button>
	</a>
	)
}