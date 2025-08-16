import ServiceTile, {serviceTileProps} from "./serviceTile"

export default function serviceSection() {
	return (
		<div className="flex flex-col pt-[100px] pb-[100px] gap-[60px]">
			<h2 className="font-poppins text-black text-h2 text-center">Nos Services</h2>
			<div className="flex items-center justify-center gap-[100px]">
				<ServiceTile type={"Web"} />
				<ServiceTile type={"Prototype"} />
				<ServiceTile type={"Automation"} />
			</div>
		</div>
	)
}