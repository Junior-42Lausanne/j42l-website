import Link from "next/link"
import { iconProps } from "../NavBar";
import StrapiImage, { StrapiImageProps } from "./StrapiImage";

export type MemberCardProps = {
	id: number,
	photo: StrapiImageProps,
	name: string,
	role: string,
	social?: iconProps[],
}

export default function MemberCard( {
	photo,
	name,
	role,
	social
} : MemberCardProps) {
	const styles = {
		section: "flex flex-col items-center w-[300px] px-[20px] py-[20px] gap-[30px] border-2 border-pale_orange",
		photoWrap: "flex w-[200px] h-[200px] rounded-full overflow-hidden",
		photo: {
			className: "relative w-full h-full",
			style: { aspectRatio: `${photo.width}/${photo.height}` },
		},
		contentWrap: "flex flex-col gap-[10px] font-poppins text-black text-center px-[30px]",
		name: "text-h4",
		role: "text-h5",
		socialWrap: "flex flex-row gap-[10px] justify-center items-center",
		icon: "relative w-[25px] h-[25px]",
	}

	return (
		<div className={styles.section}>
			<div className={styles.photoWrap}>
				<div className={styles.photo.className} style={styles.photo.style}>
					<StrapiImage
						alternativeText={photo.alternativeText}
						className=""
						height={photo.height}
						url={photo.url}
						width={photo.width} />
				</div>
			</div>
			<div className={styles.contentWrap}>
				<h4 className={styles.name}>{name}</h4>
				<h5 className={styles.role}>{role}</h5>
				<div className={styles.socialWrap}>
					{
						social
						? (social.map((item) => (
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
							</div>))
						) : null
					}
				</div>
			</div>
		</div>
	)
}