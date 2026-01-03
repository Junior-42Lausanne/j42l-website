import Button from "./sub_components/button"
import { Service } from "../logic/getCardSection";
import { getStrapiMedia } from "../utils/utils";

export default function ServiceTile({service}: {service: Service}) {

	const image = getStrapiMedia(service.backgroundImage.url);
	const target = service.link.url;

	return (
		<div
			className="flex flex-col h-[650px] font-poppins justify-between
						text-white bg-cover bg-center pt-[10%] pb-[30px] px-[30px] gap-[20px] w-full max-w-[420px]"
			style={{backgroundImage:`url("${image}")`}}>
			<div className="flex flex-col gap-[30px] mt-[55%]">
				<h3 className="text-h3 font-[1000]">{service.heading}</h3>
				<ul className="list-disc pl-[20px] space-y-2 mb-[20px]">
				{service.text[0].children.map((item, i) => (
					<li key={i}>{item.children[0].text}</li>
				))}
				</ul>
			</div>
			<Button text="Découvrir" path={target} color='white' fullWidth={true} />
		</div>
	);
}
