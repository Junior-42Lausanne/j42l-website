// shadow-[0_30px_100px_rgba(0,0,0,0.34)]
export function HeroInterfaceSketch() {
    return (
        <div className="relative min-h-[410px] w-full overflow-hidden rounded-[2.4rem] bg-[#211e18]/76 p-5 ring-1 ring-white/[0.07]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.055),transparent_30%)]" />

            <div className="relative flex min-h-[370px] flex-col">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                    </div>

                    <div className="h-px w-32 bg-white/16 transition-[width,background-color] duration-700 ease-out group-hover:w-36 group-hover:bg-white/22" />

                    <div className="h-7 w-7 rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-colors duration-700 ease-out group-hover:bg-white/[0.08]" />
                </div>

                <div className="relative mt-8 flex flex-1 items-stretch">
                    <div className="grid w-full grid-cols-[0.92fr_1.08fr] gap-5">
                        <div className="relative overflow-hidden rounded-[1.65rem] bg-[#17140f]/72 p-5 ring-1 ring-white/[0.07]">
                            <div className="hero-screen-pill h-2 w-20 origin-left rounded-full bg-orange/90" />

                            <div className="mt-7 space-y-3">
                                <div className="hero-screen-line-a h-3 w-11/12 origin-left rounded-full bg-white/24" />
                                <div className="hero-screen-line-b h-3 w-9/12 origin-left rounded-full bg-white/17" />
                                <div className="hero-screen-line-c h-3 w-7/12 origin-left rounded-full bg-white/12" />
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                                <div className="hero-screen-pill h-10 w-24 origin-left rounded-full bg-orange/85" />
                                <div className="h-px flex-1 bg-white/12 transition-colors duration-700 ease-out group-hover:bg-white/18" />
                            </div>
                        </div>

                        <div className="grid grid-rows-[1fr_0.65fr] gap-5">
                            <div className="grid grid-cols-[1fr_0.76fr] gap-5">
                                <div className="hero-screen-card-a rounded-[1.65rem] bg-white/[0.055] p-4 ring-1 ring-white/[0.07]">
                                    <div className="h-16 rounded-[1.2rem] bg-white/[0.07] transition-colors duration-700 ease-out group-hover:bg-white/[0.085]" />
                                    <div className="mt-4 h-2.5 w-3/4 rounded-full bg-white/18" />
                                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/10" />
                                </div>

                                <div className="hero-screen-card-b rounded-[1.65rem] bg-orange/[0.10] p-4 ring-1 ring-orange/25">
                                    <div className="h-16 rounded-[1.2rem] bg-orange/16 transition-colors duration-700 ease-out group-hover:bg-orange/20" />
                                    <div className="mt-4 h-2.5 w-4/5 rounded-full bg-orange/55" />
                                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/12" />
                                </div>
                            </div>

                            <div className="grid min-h-[112px] grid-cols-3 gap-4">
                                <div className="hero-screen-card-a h-full rounded-[1.35rem] bg-white/[0.055]" />
                                <div className="hero-screen-card-c h-full rounded-[1.35rem] bg-white/[0.04]" />
                                <div className="hero-screen-card-b h-full rounded-[1.35rem] bg-white/[0.06]" />
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -right-6 top-10 hidden h-[72%] w-px bg-gradient-to-b from-transparent via-orange/45 to-transparent sm:block" />

                    <div className="pointer-events-none absolute -right-10 top-12 hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-orange/70 [writing-mode:vertical-rl] sm:block">
                        service / proof / case
                    </div>
                </div>
            </div>
        </div>
    );
}