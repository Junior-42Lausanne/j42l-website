import Button from "../button"
import Image from 'next/image'

export default function TextSection() {
  return(
	<div className="flex pt-[100px] pb-[100px] gap-[150px] items-center justify-center">
		<div className="w-1/5">
			<Image src="/graphic/logo/svg/j42_j_orange_svg.svg" alt="j42 logo" width={500} height={1000}/>
		</div>
		<div className="flex flex-col items-center w-2/5">
			<div className="font-poppins text-black text-h2 text-center">
				<h2>Bienvenue</h2>
			</div>
			<div className="pt-[20px] font-poppins text-black text-h5">
				<p>La Junior 42 Lausanne (J42L) est une association étudiante affiliée au réseau Junior Enterprises Switzerland.</p>
				<br/>
				<p>Composée d’étudiants passionnés de 42 Lausanne, et étant la plus grande Junior Entreprise du réseau mondial 42, notre mission est d’offrir des solutions informatiques de qualité, allant de la conceptualisation à des développements sur mesure.</p>
				<p>En étroite collaboration avec 42 Lausanne, nous donnons vie à des projets innovants, reliant éducation et industrie au sein de l’écosystème 42.</p>
			</div>
			<div className="pt-[60px]">
				<Button text="Notre Histoire" path="https://www.google.com" color='orange'/>
			</div>
		</div>	
	</div>
  )
}
