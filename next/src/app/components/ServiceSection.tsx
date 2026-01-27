import SectionTitle from "./sub_components/SectionTitle";
import ServiceCard from "./sub_components/ServiceCard";
import { ThemeColor } from "../utils/type";

export interface RichTextBlock {
	type: string;
	format: string;
	children: Array<{
		type: string;
		children: Array<{
			text: string;
			type: string;
		}>;
	}>;
}

export interface Service {
	id: number;
	text: RichTextBlock[];
	title: string;
	link: {
		id: number;
		url: string;
		text: string;
	};
	backgroundImage: {
		id: number;
		documentId: string;
		url: string;
		alternativeText: string;
	};
}

export type ServiceSectionProps = {
	id: number;
	__component: "layout.card-section";
	title: {
		title: string;
		color: ThemeColor;
	};
	cards: Service[];
}

export default function ServiceSection({
	title,
	cards,
}: ServiceSectionProps) {
	return (
		<div className="mx-[30px]">
			<SectionTitle color={title?.color ?? "black"}>
				{title?.title}
			</SectionTitle>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-[30px] pt-[50px]">
				{cards.map((card) => (
					<ServiceCard key={card.id} service={card}/>
				))}
			</div>
		</div>
	);
}