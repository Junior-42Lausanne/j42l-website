import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PortfolioLocale } from "@/sections/portfolio/types/portfolio.types";
import {
    portfolioLayout,
    portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type PortfolioCTAProps = {
    locale?: PortfolioLocale;
};

export function PortfolioCTA({ locale = "en" }: PortfolioCTAProps) {
    return (
        <section className={portfolioLayout.section}>
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#211e18]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(244,152,25,0.14),transparent_34%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

                <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-[0.66fr_0.34fr] lg:p-12 xl:p-14">
                    <div>
                        <span className={portfolioText.eyebrow}>
                            Ready to build
                        </span>

                        <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                            Turn a proven capability into your next digital product.
                        </h2>

                        <p className="mt-7 max-w-2xl text-base leading-7 text-white/66 sm:text-lg sm:leading-8">
                            The portfolio shows how J42L connects services, execution and
                            project evidence. The next step is to frame what should be built,
                            why it matters and how to deliver it properly.
                        </p>
                    </div>

                    <div className="flex flex-col justify-between gap-10 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">
                                What happens next
                            </p>

                            <div className="mt-6 space-y-5">
                                <StepLine index="01" text="Clarify the business need." />
                                <StepLine index="02" text="Match it with the right service." />
                                <StepLine index="03" text="Define a realistic project path." />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-orange px-6 text-sm font-semibold text-[#14120e] transition hover:bg-[#ffad3d]"
                            >
                                Contact J42L
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>

                            <Link
                                href="#featured-case-studies"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.045] px-6 text-sm font-semibold text-white/76 transition hover:bg-white/[0.075] hover:text-white"
                            >
                                Review selected proofs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

type StepLineProps = {
    index: string;
    text: string;
};

function StepLine({ index, text }: StepLineProps) {
    return (
        <div className="grid grid-cols-[2.5rem_1fr] gap-4">
            <p className="text-xs font-semibold text-orange/80">
                {index}
            </p>

            <p className="text-sm leading-6 text-white/62">
                {text}
            </p>
        </div>
    );
}