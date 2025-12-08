import qs from 'qs';
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils";

const path = "/api/prototype-service";
const queryStudent = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

export const metadata = async () => {
	return getStrapiMetadata(path,
							"Prototype - J42L",
							"Junior 42 Lausanne");
}

export default async function Prototype() {
	try {
		const strapiData = await getStrapiData(path, queryStudent);
		const { blocks } = strapiData.data;
		return (
			<div>
				{
					blocks
						? blocks.map((block: Block) => blockRenderer(block))	
						: null
				}
			</div>
		)
	} catch(error) {
		console.log(`Error: ${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
