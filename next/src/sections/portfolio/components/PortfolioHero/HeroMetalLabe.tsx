
export function HeroMetaLabel({ children, tone = "muted" }: HeroMetaLabelProps) {
    return (
        <p
            className={[
                "text-[11px] font-semibold uppercase tracking-[0.28em]",
                tone === "accent" ? "text-orange" : "text-white/36",
            ].join(" ")}
        >
            {children}
        </p>
    );
}

type HeroMetaLabelProps = {
    children: React.ReactNode;
    tone?: "accent" | "muted";
};
