import ButtonLink from "@/app/components/sub_components/Button";
import StrapiImage, { StrapiImageProps } from "@/app/components/sub_components/StrapiImage";
import { ThemeColor } from "@/app/utils/type";
import { getStrapiNavBarMenuData, menuRenderer, menuItem} from "@/app/utils/utils";
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
		const { menu } = navBarMenuData.data;

		const {logo, cta, social} = blocks;
		const styles = {
			navBar: "fixed top-0 z-10 w-full flex flex-row justify-between items-center bg-[#14120e4d] px-[50px] py-[10px] backdrop-blur-[30px]",
			logoWrap: "flex items-center w-[100px] h-[42px]",
			logo: "relative w-full h-full",
			contentWrap: "flex flex-row h-full justify-end items-center gap-[20px]",
			navLinkWrap: "flex flex-row gap-[10px]",
			iconWrap: "flex flex-row gap-[10px] justify-end items-center",
			icon: "relative w-[25px] h-[25px]",
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
	} catch(error) {
		throw error;
	}
}