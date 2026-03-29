export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from 'next/link';
import { type ThemeColor } from '@/utils/type';

export function generateMetadata(): Metadata {
  return {
    title: "List of legal pages - J42L",
    description: "Legal pages, Junior 42 Lausanne",
  };
}

const legalList = [
	{ id: 1, link: "/legals/impressum", text: "Impressum" },
	{ id: 2, link: "/legals/privacy-policy", text: "Politique de Confidentialité" },
	{ id: 3, link: "/legals/terms-of-service", text: "Conditions Générales" },
]

export default async function Legals() {
	return (
		<div className="py-[6rem] font-poppins
                        md:px-[2rem] md:py-[8rem]
                        lg:px-[8rem]
                        xl:px-[16rem]">
			<ul className="flex flex-col flex-shrink px-[1.25rem] gap-[4rem] md:gap-[2rem]">
				{legalList.map((item) => (
					<li key={item.id}>
						<Link
							href={item.link}
							className="text-h4 font-semibold hover:underline"
							>{item.text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
