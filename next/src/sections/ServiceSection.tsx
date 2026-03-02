import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import { type ThemeColor } from "../utils/type";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { type StrapiImageProps } from "../components/StrapiImage"


export type ServiceProps = {
	id: number;
	title: string;
	text: BlocksContent;
	button: {
		id: number;
		url: string;
		buttonText: string;
		color: ThemeColor;
		external?: boolean;
		fullWidth?: boolean;
	};
	backgroundImage: StrapiImageProps;
}

export type ServiceCardSectionProps = {
	id: number;
	__component: "layout.card-section";
	title: {
		title: string;
		color: ThemeColor;
	};
	cards: ServiceProps[];
}

export default function ServiceCardSection({
	title,
	cards,
}: ServiceCardSectionProps) {
	return (
		<section className="flex flex-col gap-[2rem] px-[1.25rem] py-[6rem] \
				md:px-[2.25rem] md:py-[6rem] md:gap-[2.125rem] \
				lg:px-[4.25rem] lg:gap-[3.125rem] lg:py-[10rem]\
				xl:px-[6.25rem]`">
			<SectionTitle color={title?.color ?? "black"}>
				{title?.title}
			</SectionTitle>
			<div className="grid grid-cols-1 justify-items-center gap-[2rem] \
							lg:grid-cols-2 \
							xl:grid-cols-3">
				{cards.map((card) => (
					<ServiceCard key={card.id} service={card}/>
				))}
			</div>
		</section>
	);
}