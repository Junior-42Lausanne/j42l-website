import {
    portfolioLayout,
    portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

const proofPrinciples = [
    {
        label: "Service first",
        title: "Projects are grouped by the business need they prove.",
        description:
            "The portfolio starts from J42L’s services, then uses projects to show how each service becomes concrete work.",
    },
    {
        label: "Proof over decoration",
        title: "A case study must explain what was delivered.",
        description:
            "Visual quality matters, but each project also needs to demonstrate method, execution, constraints and value.",
    },
    {
        label: "Readable evidence",
        title: "Prospects should understand the capability quickly.",
        description:
            "The goal is not to overwhelm visitors with detail, but to make the proof clear enough to encourage contact.",
    },
];

export function ProofPhilosophy() {
    return (
        <section className={portfolioLayout.section}>
            <div className="border-y border-white/10 py-14 sm:py-16 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                    <div>
                        <span className={portfolioText.eyebrow}>
                            Proof philosophy
                        </span>

                        <h2 className={`${portfolioText.h2} mt-4 max-w-xl`}>
                            A portfolio is not a gallery. It is a proof system.
                        </h2>
                    </div>

                    <div>
                        <p className="max-w-3xl text-xl leading-9 tracking-[-0.025em] text-white/78 sm:text-2xl sm:leading-10">
                            Every project should help a prospect understand what J42L can
                            actually deliver: the service behind it, the capability involved,
                            and the kind of outcome it can create.
                        </p>

                        <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
                            {proofPrinciples.map((principle, index) => (
                                <article
                                    key={principle.label}
                                    className="grid gap-5 py-7 md:grid-cols-[0.16fr_0.34fr_1fr]"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                                        {String(index + 1).padStart(2, "0")}
                                    </p>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/36">
                                            {principle.label}
                                        </p>

                                        <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.04em] text-white">
                                            {principle.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm leading-7 text-white/56">
                                        {principle.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}