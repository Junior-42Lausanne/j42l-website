import CustomTitle, {titleProps} from "./customTitle"

export default function portfolioSection() {
	let list = (
		<ul className="flex gap-[50px] place-content-center">
			<li className="w-[240px] place-content-center"><img src="/partners/open urbanism foundation.png" /></li>
			<li className="w-[240px] place-content-center"><img src="/partners/alpes vivantes grey.png" /></li>
			<li className="w-[240px] place-content-center"><img src="/partners/red line grey.png" /></li>
			<li className="w-[240px] place-content-center"><img src="/partners/wechip grey.png" /></li>
		</ul>
	)
	return (
		<div className="pt-[150px] pb-[150px]">
			<CustomTitle text="Portfolio" />
			<div className="pt-[50px]">
				{list}
			</div>
		</div>
	)
}