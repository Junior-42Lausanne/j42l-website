import ServiceTile from "./serviceTile";
import SectionTitle from "./sub_components/sectionTitle";
import {CardSection} from "../logic/getCardSection";

export default function ServiceSection({cards}: {cards: CardSection}) {
	console.log(cards);
	return (
		<div className="flex flex-col pt-[100px] pb-[100px] gap-[60px]">
			<SectionTitle text={cards.title} />
			<div className="flex items-center justify-center gap-[100px]">
				{cards.cards.map((card) => (
					<ServiceTile key={card.id} service={card}/>
				))}
			</div>
		</div>
	)
}