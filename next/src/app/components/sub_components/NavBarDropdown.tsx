import { NavBarLinkProps } from "./NavBarLink";
import NavBarDropdownLink from "./NavBarDropdownLink";

export type NavBarDropdownProps = {
	id: number,
	__component: "composants.dropdown-link",
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
				text-center text-white pt-[0.315rem] pb-[0.315rem] pl-[0.625rem] pr-[0.625rem]
				cursor-pointer`,
		submenuWrap: `absolute left-0 top-full pt-[0.625rem] hidden
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
					? links.map((link : NavBarLinkProps) => <NavBarDropdownLink key={link.id} {...link} />)
					: null
				}
			</div>
		</div>
	);
}