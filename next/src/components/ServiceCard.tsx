import ButtonLink from "./ButtonLink";
import { type ServiceProps } from "../sections/ServiceSection";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import StrapiImage from "../components/StrapiImage"

export default function ServiceCard({service}: {service: ServiceProps}) {
	return (
		<div className="relative overflow-hidden h-[40rem] w-full \
						md:h-[30rem] \
						lg:h-[40rem] \
						xl:h-[50rem]">
			<div className="absolute inset-0 -z-10">
				<StrapiImage
						alternativeText={service.backgroundImage.alternativeText}
						className="absolute inset-0 object-cover w-full h-full"
						height={1080}
						url={service.backgroundImage.url}
						width={1920}
				/>
				 <div
					className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/75 to-transparent"
					style={{
						bottom: '0',
						height: '100%'
					}}
            	/>
			</div>
			<div className="flex flex-col justify-end gap-[2rem] h-full w-full px-[1.5rem] py-[2rem] \
							md:px-[3rem] \
							lg:px-[1.75rem] \
							xl:px-[2rem]">				
				<div className="flex flex-col gap-[0.5rem] font-poppins text-white \
								md:flex-row md:gap-[3rem] \
								lg:flex-col lg:gap-[0.5rem]">
					<h3 className="text-h3 font-bold \
								xl:text-h2">
						{service.title}
					</h3>
					<div className="prose font-poppins text-h5 whitespace-pre-wrap text-white \
								xl:text-h4">
						<BlocksRenderer content={service.text} />
					</div>
				</div>
				{service.button
					? (<ButtonLink {...service.button}>
						{service.button.buttonText}
						</ButtonLink>
					) : null
				}
			</div>
		</div>
	);
}