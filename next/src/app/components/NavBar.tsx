import ButtonLink from "@/app/components/sub_components/ButtonLink";
import StrapiImage, { StrapiImageProps } from "@/app/components/sub_components/StrapiImage";
import { ThemeColor } from "@/app/utils/type";
import { getStrapiNavBarMenuData, menuRenderer, menuItem } from "@/app/utils/utils";
import Link from 'next/link';

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

export default async function NavBar( {blocks}: NavBarProps) {

	try {
		const navBarMenuData = await getStrapiNavBarMenuData();
		if (!navBarMenuData?.data?.menu) {
			return (
				<div> { null } </div>
			);
		}

		const { menu } = navBarMenuData.data;
		if (!menu ) {
			return (
				<div> { null } </div>
			);
		}
		const {logo, cta, social} = blocks;
		if (!logo || !cta || !social) {
			return (
				<div> { null } </div>
			);
		}
		const styles = {
			navBar: "fixed top-0 z-10 w-full flex flex-row justify-between items-center bg-[#14120e4d] px-[3.125rem] py-[0.625rem] backdrop-blur-[1.875rem]",
			logoWrap: "flex items-center w-[6.25rem] h-[42px]",
			logo: "relative w-full h-full",
			contentWrap: "flex flex-row h-full justify-end items-center gap-[1.25rem]",
			navLinkWrap: "flex flex-row gap-[0.625rem]",
			iconWrap: "flex flex-row gap-[0.625rem] justify-end items-center",
			icon: "relative w-[30px] h-[30px]",
		}

		return (
			<div className={styles.navBar}>
				<div className={styles.logoWrap}>
					<div className={styles.logo}>
						{logo.external ? (
							<a href={logo.url} target="_blank">
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
									width={logo.logo.width} />
							</Link>
						)}
					</div>
				</div>
				<div className={styles.contentWrap}>
					<div className={styles.navLinkWrap}>
						{
							menu
							? menu.map((item : menuItem) => menuRenderer(item))
							: null
						}
					</div>
					<ButtonLink {...cta}>
						{cta.buttonText}
					</ButtonLink>
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
			</div>
		)
	} catch(err) {
		console.error("Strapi fetch error: nav bar");
		return (
			<div> { null } </div>
		);
	}
}