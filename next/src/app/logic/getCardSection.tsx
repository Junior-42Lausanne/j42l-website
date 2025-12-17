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
	heading: string;
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

export interface CardSection {
	__component: 'layout.card-section';
	id: number;
	title: string;
	cards: Service[];
}

export interface HomePageData {
	data: {
		blocks: CardSection[];
	};
}

export function getCardSection(strapiData: unknown) {
	const data = strapiData as HomePageData;

	return data.data.blocks.find(block => block.__component === 'layout.card-section');
}

