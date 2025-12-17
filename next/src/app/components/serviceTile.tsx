import Button from "./sub_components/button"
import { Service } from "../logic/getCardSection";
import { getStrapiMedia } from "../utils/utils";

export default function ServiceTile({service}: {service: Service}) {

	const text = (
		<ul className="list-disc pl-[20px]">
			{service.text[0].children.map((item, i) => (
				<li key={i}>{item.children[0].text}</li>
			))}
		</ul>
	);
	const image = getStrapiMedia(service.backgroundImage.url);
	const target = service.link.url;

	return (
		<div
			className="flex flex-col gap-[10vw]"
			style={{backgroundImage:`url("${image}")`}}>
			<h2 className="text-h2">{service.heading}</h2>
			<div className="text-h5 h-[150px]">{text}</div>
			<div className="flex flex-col items-center">
				<Button text="Découvrir" path={target} color='white' fullWidth={true} />
			</div>
		</div>
	);
}

/*
"flex flex-col justify-end h-[650px] w-[400px] font-poppins
						text-white bg-cover bg-center
						pl-[20px] pr-[20px] pt-[30px] pb-[30px] gap-[20px]"
*/