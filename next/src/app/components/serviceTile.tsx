import CustomButton, {buttonProps} from "./customButton"

export interface serviceTileProps {
	type: string;
}

export default function serviceTile(props : serviceTileProps) {
	let text;
	let image;
	let target;

	if (props.type === "Web") {
		text = (
		<ul className="list-disc pl-[20px]">
			<li>Design graphique, UX/UI</li>
			<li>Réalisation des sites sur Wordpress, web builders ou code sur mesure</li>
			<li>Développement d’application web</li>
			<li>Mise à jour et maintenance mensuel</li>
		</ul>);
		image = "/stock photo/home web service dark.jpg";
		target = "https://www.google.com";
	}
	else if (props.type === "Prototype") {
		text = (
			<ul className="list-disc pl-[20px]">
				<li>Accompagnement start-up</li>
				<li>Implémentation de proof of concept</li>
				<li>Étude de faisabilité</li>
				<li>Création de maquette</li>
			</ul>
		)
		image = "/stock photo/home prototype service dark.jpg";
		target = "https://www.bing.com";
	} else if (props.type === "Automation") {
		text = (
			<ul className="list-disc pl-[20px]">
				<li>Cold email</li>
				<li>Script d’automatisation</li>
			</ul>
		)
		image = "/stock photo/home automation service dark.jpg";
		target = "https://www.duckduckgo.com";
	} else {
		return null;
	}
	return (
		<div className="flex flex-col justify-end h-[650px] w-[400px] font-poppins 
						text-white bg-cover bg-center 
						pl-[20px] pr-[20px] pt-[30px] pb-[30px] gap-[20px]"
    	style={{backgroundImage:`url("${image}")`}}>
			<h2 className="text-h2">{props.type}</h2>
			<div className="text-h5 h-[150px]">{text}</div>
			<div className="flex flex-col items-center">
				<CustomButton text="Découvrir" path={target} color="white" fullWitdh />
			</div>
		</div>
	);
}