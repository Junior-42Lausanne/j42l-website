import SectionTitle from "./sub_components/sectionTitle"
import Image from 'next/image'


export default function PortfolioSection() {
	const list = (
		<ul className="flex gap-[50px] place-content-center">
			<li className="place-content-center"><Image src="/partners/open urbanism foundation.png" alt="partner logo" width={240} height={100}/></li>
			<li className="place-content-center"><Image src="/partners/alpes vivantes grey.png" alt="partner logo" width={240} height={100}/></li>
			<li className="place-content-center"><Image src="/partners/red line grey.png" alt="partner logo" width={240} height={100}/></li>
			<li className="place-content-center"><Image src="/partners/wechip grey.png" alt="partner logo" width={240} height={100}/></li>
		</ul>
	)
	return (
		<div className="pt-[150px] pb-[150px]">
			<SectionTitle text="Portfolio" />
			<div className="pt-[50px]">
				{list}
			</div>
		</div>
	)
}