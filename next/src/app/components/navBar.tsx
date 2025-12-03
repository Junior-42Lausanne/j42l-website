import NavBarLink from "@/app/components/sub_components/navBarLink";
import ButtonLink from "@/app/components/sub_components/button";
import StrapiImage, { StrapiImageProps } from "@/app/components/sub_components/strapiImage";
import { ThemeColor } from "../utils/type";

export type logoProps = {
	logo: StrapiImageProps,
	url: string,
	external: boolean,
}

export type iconProps = {
	icon: StrapiImageProps,
	url: string,
	external: boolean,
}

export type NavBarProps = {
	blocks: {
		logo: logoProps,
		navBarMenu: {
			id: string,
			linkText: string,
			url: string,
			external: boolean,
		}[],
		cta: {
			url: string;
			color: ThemeColor;
			fullWidth?: boolean;
			external?: boolean;
			buttonText: string;
		},
		social: iconProps[],
	},
}

export default function NavBar( {blocks}: NavBarProps) {
	const {logo, navBarMenu, cta, social} = blocks;
	return (
		<div className="flex-no-wrap fixed top-0 z-10 w-full flex justify-between items-center content-between bg-[#14120e4d] pl-[50px] pr-[50px] pt-[10px] pb-[10px] backdrop-blur-[30px]">
			<div className="">
				<StrapiImage
					alternativeText={logo.logo.alternativeText}
					className=""
					height={logo.logo.height}
					url={logo.logo.url}
					width={logo.logo.width} />
			</div>
			<div>
				<div className="flex flex-row gap-[10px]">
					{navBarMenu.map((menu) => (
							<NavBarLink key={menu.id} {...menu}>
								{menu.linkText}
							</NavBarLink>))}
				</div>
				<ButtonLink {...cta}>
					{cta.buttonText}
				</ButtonLink>
				<div>
					{social.map((icon) => (
						<StrapiImage
							key={icon.icon.id}
							alternativeText={icon.icon.alternativeText}
							className=""
							height={icon.icon.height}
							url={icon.icon.url}
							width={icon.icon.width} />
					))}
				</div>
			</div>
		</div>
	)
}