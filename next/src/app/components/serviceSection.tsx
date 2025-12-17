import ServiceTile from "./serviceTile";
import SectionTitle from "./sub_components/sectionTitle";
import {CardSection} from "../logic/getCardSection";

export default function ServiceSection({cards}: {cards: CardSection}) {
	console.log(cards.cards[0].backgroundImage);
	return (
		<div className="mx-[30px]">
			<SectionTitle text={cards.title} />
			<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] justify-items-center gap-[30px] pt-[50px]">
				{cards.cards.map((card) => (
					<ServiceTile key={card.id} service={card}/>
				))}
			</div>
		</div>
	)
}