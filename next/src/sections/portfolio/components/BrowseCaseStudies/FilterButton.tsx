type FilterButtonProps = {
    label: string;
    count: number;
    isActive: boolean;
    isContextActive?: boolean;
    onClick: () => void;
};

export function FilterButton({
    label,
    count,
    isActive,
    isContextActive = false,
    onClick,
}: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-current={isActive ? "true" : undefined}
            className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
            <span
                className={[
                    "text-sm font-medium transition",
                    isActive
                        ? "text-orange"
                        : isContextActive
                            ? "text-white/78"
                            : "text-white/58 group-hover:text-white",
                ].join(" ")}
            >
                {label}
            </span>

            <span
                className={[
                    "group relative pb-1 text-sm font-semibold transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange",
                    isActive
                        ? "text-orange"
                        : "text-white/42 hover:text-white/76",
                ].join(" ")}
            >
                {String(count).padStart(2, "0")}
            </span>
        </button>
    );
}