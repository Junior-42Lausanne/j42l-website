"use client";

import NavBarLink, { type NavBarLinkProps } from "./NavBarLink";
import { type Mode } from "@/utils/type";

export type NavBarDropdownProps = {
  id: number;
  __component: "composants.dropdown-link";
  label: string;
  links: NavBarLinkProps[];
  mode: Mode;

  isHovered?: boolean;
  isAdjacentToHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const FALLBACK_URL_BY_LABEL: Record<string, string> = {
  Services: "/services",
  "About us": "/about/j42l",
  Portfolio: "/portfolio",
};

export default function NavBarDropdown({
  id,
  label,
  links,
  mode,
  isHovered,
  isAdjacentToHovered,
  onHoverStart,
  onHoverEnd,
}: Readonly<NavBarDropdownProps>) {
  const firstAvailableLink = links?.[0];

  const url = firstAvailableLink?.url ?? FALLBACK_URL_BY_LABEL[label] ?? "#";
  const external = firstAvailableLink?.external ?? false;

  return (
    <NavBarLink
      id={id}
      __component="composants.link"
      linkText={label}
      url={url}
      external={external}
      mode={mode}
      isHovered={isHovered}
      isAdjacentToHovered={isAdjacentToHovered}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    />
  );
}