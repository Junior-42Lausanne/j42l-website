const readingSteps = [
    {
        index: "01",
        label: "Services",
        description: "Start from the business need.",
    },
    {
        index: "02",
        label: "Proofs",
        description: "See which projects validate it.",
    },
    {
        index: "03",
        label: "Case studies",
        description: "Inspect the work behind the claim.",
    },
];

export function HeroReadingRail() {
    return (
        <div className="mt-16 border-t border-white/[0.08] pt-6">
            <div className="grid gap-6 sm:grid-cols-3 sm:items-start">
                {readingSteps.map((step, index) => (
                    <div key={step.index} className="relative min-w-0">
                        {index < readingSteps.length - 1 ? (
                            <span
                                className="pointer-events-none absolute right-6 top-3 hidden h-px w-14 from-orange/50 to-transparent sm:block"
                                aria-hidden="true"
                            />
                        ) : null}

                        <div className="flex items-baseline gap-3">
                            <span className="text-xs font-semibold text-orange">
                                {step.index}
                            </span>

                            <p className="text-sm font-semibold text-white">
                                {step.label}
                            </p>
                        </div>

                        <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/46">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}