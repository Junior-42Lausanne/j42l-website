import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroPrimaryAction({ href, children }: HeroActionProps) {
    return (
        <Link
            href={href}
            className={[
                "group relative inline-flex h-12 w-fit items-center overflow-hidden rounded-full bg-orange px-6 text-sm font-semibold text-[#14120e]",
                "transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#ffad3d]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
            ].join(" ")}
        >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.46),transparent)] transition duration-700 ease-out group-hover:translate-x-full" />

            <span className="relative flex items-center transition duration-500 ease-out group-hover:translate-x-0.5">
                {children}
                <ArrowRight
                    className="ml-3 h-4 w-4 transition duration-500 ease-out group-hover:translate-x-1.5"
                    aria-hidden="true"
                />
            </span>
        </Link>
    );
}

export function HeroSecondaryAction({ href, children }: HeroActionProps) {
    return (
        <Link
            href={href}
            className={[
                "group relative inline-flex h-12 w-fit items-center gap-3 text-sm font-semibold text-white/76",
                "transition duration-500 ease-out hover:text-white",
                "after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-orange/80 after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181612]",
            ].join(" ")}
        >
            <span>{children}</span>
            <ArrowRight
                className="h-4 w-4 opacity-50 transition duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
            />
        </Link>
    );
}

type HeroActionProps = {
    href: string;
    children: React.ReactNode;
};
