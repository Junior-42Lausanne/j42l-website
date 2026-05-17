import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { HeroPrimaryForContact, HeroSecondaryAction } from "@/sections/portfolio/components/PortfolioHero/Action";

import type { PortfolioLocale } from "@/sections/portfolio/types/portfolio.types";
import {
    // portfolioButton,
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

                    <aside className="max-w-md lg:border-l lg:border-white/10 lg:pl-10 xl:pl-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                            Next step
                        </p>

                        <div className="mt-6 space-y-4">
                            <NextStep index="01" text="Clarify the project need." />
                            <NextStep index="02" text="Choose the right path." />
                            <NextStep index="03" text="Start with a focused scope." />
                        </div>


                        <div className="mt-10 flex w-full max-w-[320px] flex-col gap-4">
                            <HeroPrimaryForContact
                                href={`/${locale}/contact`}
                                className="w-full min-w-0 justify-between px-7 [&>svg]:ml-auto"
                            >
                                Contact J42L
                            </HeroPrimaryForContact>

                            <HeroSecondaryAction
                                href={`/${locale}/services`}
                                className="w-full min-w-0 justify-between px-7 [&>svg]:ml-auto"
                            >
                                Explore services
                            </HeroSecondaryAction>
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