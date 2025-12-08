import { NavBarLinkProps } from "./NavBarLink";
import NavBarDropdownLink from "./NavBarDropdownLink";

export type NavBarDropdownProps = {
	label: string,
	links: NavBarLinkProps[];
}

/*
* Component for nav bar menu dropdown
* label: menulabel
* links: list of dropdown links
*/
export default function NavBarDropdown( {
	label,
	links,
} : Readonly<NavBarDropdownProps> ) {
	
	const styles = {
		linkWrap: "relative group",
		label: `inline-flex font-poppins text-navButton text-navButton--font-weight 
				text-center text-white pt-[5px] pb-[5px] pl-[10px] pr-[10px]
				cursor-pointer`,
		submenuWrap: `absolute left-0 top-full hidden
						group-hover:block`,
	};

	return (
		<div className={styles.linkWrap}>
			<div className={styles.label}>
				{label}
			</div>
			<div className={styles.submenuWrap}>
				{
					links
					? links.map((link : NavBarLinkProps) => <NavBarDropdownLink key={link.id} linkText={link.linkText}
																								url={link.url}
																								external={link.external} />)
					: null
				}
			</div>
		</div>
	);
}