import ServiceTile from "./serviceTile"
import SectionTitle from "./sectionTitle"

export default function ServiceSection() {
	return (
		<div className="flex flex-col pt-[100px] pb-[100px] gap-[60px]">
			<SectionTitle text="Nos Service" />
			<div className="flex items-center justify-center gap-[100px]">
				<ServiceTile type={"Web"} />
				<ServiceTile type={"Prototype"} />
				<ServiceTile type={"Automation"} />
			</div>
		</div>
	)
}