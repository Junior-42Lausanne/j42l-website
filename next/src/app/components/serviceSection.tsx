import ServiceTile, {serviceTileProps} from "./serviceTile"
import CustomTitle, {titleProps} from "./customTitle"

export default function serviceSection() {
	return (
		<div className="flex flex-col pt-[100px] pb-[100px] gap-[60px]">
			<CustomTitle text="Nos Service" />
			<div className="flex items-center justify-center gap-[100px]">
				<ServiceTile type={"Web"} />
				<ServiceTile type={"Prototype"} />
				<ServiceTile type={"Automation"} />
			</div>
		</div>
	)
}