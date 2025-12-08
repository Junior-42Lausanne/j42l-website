import qs from 'qs';
import { getStrapiData, blockRenderer, Block, getStrapiMetadata } from "@/app/utils/utils";

const path = "/api/contact";
const queryStudent = qs.stringify({
	populate: {
		blocks: {
			populate: "*",
		},
	}
})

export const metadata = async () => {
	return getStrapiMetadata(path,
							"Contact - J42L",
							"Junior 42 Lausanne");
}

export default async function Prototype() {
	try {
		const strapiData = await getStrapiData(path, queryStudent);
		if (!strapiData?.data?.blocks)
			throw new Error("No Contact page Content");
		const { blocks } = strapiData.data;
		return (
			<div>
				{
					blocks.map((block: Block) => blockRenderer(block))
				}
			</div>
		)
	} catch(error) {
		console.log(`${error}`);
		return (
			<div>
				<h1>Problem loading the page content</h1>
			</div>
		)
	}
}
