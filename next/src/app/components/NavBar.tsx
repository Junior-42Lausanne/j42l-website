import ButtonLink from "@/app/components/sub_components/ButtonLink";
import StrapiImage, { StrapiImageProps } from "@/app/components/sub_components/StrapiImage";
import { ThemeColor } from "@/app/utils/type";
import { getStrapiNavBarMenuData, menuRenderer, menuItem } from "@/app/utils/utils";
import HamburgerMenu from "@/app/components/sub_components/HamburgerMenu";
import Link from 'next/link';

export type LogoProps = {
	logo: StrapiImageProps,
	url: string,
	external: boolean,
}

export type IconProps = {
	icon: StrapiImageProps,
	url: string,
	external: boolean,
}

export type Cta = {
	url: string;
	color: ThemeColor;
	fullWidth?: boolean;
	external?: boolean;
	buttonText: string;
}

export type NavBarProps = {
	blocks: {
		logo: LogoProps,
		cta: Cta,
		social: IconProps[],
	},
}

export default async function NavBar( {blocks}: NavBarProps) {

	try {
		const navBarMenuData = await getStrapiNavBarMenuData();
		if (!navBarMenuData?.data?.menu) {
			return null;
		}

		const { menu } = navBarMenuData.data;
		if (!menu ) {
			return null;
		}
		const {logo, cta, social} = blocks;
		if (!logo || !cta || !social) {
			return null;
		}
		const styles = {
			navBar: "fixed top-0 z-10 w-full flex flex-row justify-between items-center bg-[#14120edf] px-[1.125rem] py-[0.625rem] backdrop-blur-sm \
					md:px-[3.125rem]",
			logoWrap: "flex items-center w-[6.25rem] h-[42px]",
			logo: "relative w-full h-full",
			contentWrap: "hidden \
					lg:flex lg:flex-row lg:h-full lg:justify-end lg:items-center lg:gap-[1.25rem]",
			navLinkWrap: "flex flex-row gap-[0.625rem]",
			button: "animate-pulse",
			iconWrap: "hidden gap-[0.625rem] justify-end items-center \
					lg:flex lg:flex-row",
			icon: "relative w-[30px] h-[30px]",
		}

		return (
			<div className={styles.navBar}>
				<div className={styles.logoWrap}>
					<div className={styles.logo}>
						{logo.external ? (
							<a href={logo.url}>
								<StrapiImage
									alternativeText={logo.logo.alternativeText}
									className=""
									height={logo.logo.height}
									url={logo.logo.url}
									width={logo.logo.width} />
							</a>
						) : (
							<Link href={logo.url}>
								<StrapiImage
									alternativeText={logo.logo.alternativeText}
									className=""
									height={logo.logo.height}
									url={logo.logo.url}
									width={logo.logo.width}/>
							</Link>
						)}
					</div>
				</div>
				<div className={styles.contentWrap}>
					<div className={styles.navLinkWrap}>
						{
							menu
							? menu.map((item : menuItem) => menuRenderer(item, 'desktop'))
							: null
						}
					</div>
					<div className={styles.button}>
						<ButtonLink {...cta}>
							{cta.buttonText}
						</ButtonLink>
					</div>
					<div className={styles.iconWrap}>
						{social.map((item) => (
							<div key={item.icon.id} className={styles.icon}>
								{item.external ? (
									<a href={item.url} target="_blank">
										<StrapiImage
											alternativeText={item.icon.alternativeText}
											className=""
											height={item.icon.height}
											url={item.icon.url}
											width={item.icon.width} />
									</a>
								) : (
									<Link href={item.url}>
										<StrapiImage
											alternativeText={item.icon.alternativeText}
											className=""
											height={item.icon.height}
											url={item.icon.url}
											width={item.icon.width} />
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
				<HamburgerMenu menu={menu} cta={cta} social={social}></HamburgerMenu>
			</div>
		)
	} catch(err) {
		console.error("Strapi fetch error: nav bar");
		return null;
	}
}