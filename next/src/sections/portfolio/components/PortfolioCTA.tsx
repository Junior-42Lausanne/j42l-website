import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
            <div className="relative mx-auto w-full max-w-[1660px] overflow-hidden py-14 sm:py-18 lg:py-20 xl:py-24">
                {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/45 to-transparent" /> */}

                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(340px,0.32fr)] lg:items-end xl:gap-16">
                    <div>
                        <span className={portfolioText.eyebrow}>
                            Ready to build
                        </span>

                        <h2 className="mt-6 max-w-[14ch] text-[clamp(4rem,7vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-white">
                            Ready to shape the next proof ?
                        </h2>

                        <p className="mt-8 max-w-[58ch] text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                            If the work resonates, let’s define the right scope, the right
                            interface, and the right way to deliver it.
                        </p>
                    </div>

                    <aside className="max-w-md lg:pl-10 xl:pl-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                            Next step
                        </p>

                        <div className="mt-6 space-y-4">
                            <NextStep index="01" text="Clarify the project need." />
                            <NextStep index="02" text="Choose the right path." />
                            <NextStep index="03" text="Start with a focused scope." />
                        </div>

                        <div className="mt-10 flex flex-col gap-3">
                            <Link
                                href={`/${locale}/contact`}
                                className="group inline-flex h-12 items-center justify-between rounded-full bg-orange px-6 text-sm font-semibold text-[#14120e] transition duration-300 hover:bg-[#ffad3d] sm:h-14 sm:px-7"
                            >
                                Contact J42L
                                <ArrowRight
                                    className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>

                            <Link
                                href={`/${locale}/services`}
                                className="group inline-flex h-12 items-center justify-between rounded-full border border-white/10 px-6 text-sm font-semibold text-white/58 transition duration-300 hover:border-white/20 hover:bg-white/[0.025] hover:text-white sm:h-14 sm:px-7"
                            >
                                Explore services
                                <ArrowUpRight
                                    className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

type NextStepProps = {
    index: string;
    text: string;
};

function NextStep({ index, text }: NextStepProps) {
    return (
        <div className="grid grid-cols-[2.25rem_1fr] gap-4">
            <p className="text-xs font-semibold text-orange/75">
                {index}
            </p>

            <p className="text-sm leading-6 text-white/52">
                {text}
            </p>
        </div>
    );
}