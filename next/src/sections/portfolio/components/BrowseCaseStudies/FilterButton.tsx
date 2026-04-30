type FilterButtonProps = {
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
};

export function FilterButton({
    label,
    count,
    isActive,
    onClick,
}: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
            <span
                className={[
                    "text-sm font-medium transition",
                    isActive ? "text-orange" : "text-white/58 group-hover:text-white",
                ].join(" ")}
            >
                {label}
            </span>

            <span
                className={[
                    "text-xs font-semibold tabular-nums transition",
                    isActive ? "text-orange" : "text-white/32 group-hover:text-white/52",
                ].join(" ")}
            >
                {String(count).padStart(2, "0")}
            </span>
        </button>
    );
}