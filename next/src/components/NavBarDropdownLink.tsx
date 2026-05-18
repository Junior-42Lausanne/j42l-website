"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { type NavBarLinkProps } from "./NavBarLink";

export default function NavBarDropdownLink({
  linkText,
  url,
  external,
  mode,
}: Readonly<NavBarLinkProps>) {
  const pathName = usePathname();
  const onCurrentPage = pathName === url;

  if (mode === "desktop") {
    const className = [
      "group/link flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3",
      "font-poppins text-sm font-semibold transition duration-300 ease-out",
      "focus:outline-none focus:ring-2 focus:ring-orange/60 focus:ring-offset-2 focus:ring-offset-[#181612]",
      onCurrentPage
        ? "text-orange"
        : "text-white/68 hover:text-white",
    ].join(" ");

    const content = (
      <>
        <span className="min-w-0 truncate">{linkText}</span>

        <span
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition duration-300",
            onCurrentPage
              ? "border-orange/35 bg-orange/10 text-orange"
              : "border-white/10 bg-white/[0.035] text-white/34 group-hover/link:border-orange/30 group-hover/link:bg-orange/10 group-hover/link:text-orange",
          ].join(" ")}
        >
          <ArrowUpRight
            className="h-3.5 w-3.5 transition duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </>
    );

    if (external) {
      return (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Link href={url} className={className}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (mode === "mobile") {
    const className = [
      "group/link flex w-full items-center justify-end gap-3 rounded-2xl px-4 py-2.5",
      "font-poppins text-base font-medium transition duration-300",
      onCurrentPage ? "text-orange" : "text-white/64 active:text-orange",
    ].join(" ");

    const content = (
      <>
        <span>{linkText}</span>

        <span
          className={[
            "h-1.5 w-1.5 rounded-full transition",
            onCurrentPage ? "bg-orange" : "bg-white/24",
          ].join(" ")}
        />
      </>
    );

    if (external) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={url} className={className}>
        {content}
      </Link>
    );
  }

  return null;
}