import ServiceTile, {serviceTileProps} from "./serviceTile"

export default function serviceSection() {
	return (
		<div className="flex flex-col pt-[100px] pb-[100px] gap-[60px]">
			<div className="flex flex-row justify-center">
				<img className="w-[55px]" src="/graphic/elements/svg/triangle black.svg" />
				<h2 className="font-poppins text-black text-h2 text-center pr-[50px] pl-[50px]">Nos Services</h2>
				<img className="w-[55px] rotate-180" src="/graphic/elements/svg/triangle black.svg" />
			</div>
			<div className="flex items-center justify-center gap-[100px]">
				<ServiceTile type={"Web"} />
				<ServiceTile type={"Prototype"} />
				<ServiceTile type={"Automation"} />
			</div>
		</div>
	)
}