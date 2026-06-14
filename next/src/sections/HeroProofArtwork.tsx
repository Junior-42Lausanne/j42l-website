export default function HeroProofArtwork() {
    return (
        <aside className="hidden lg:flex lg:min-h-[34rem] lg:items-center lg:justify-end">
            <div className="relative h-[39rem] w-full max-w-[37rem] overflow-visible">
                <AmbientDust />
                {/* <GuideRings /> */}
                {/* <CornerFrame /> */}
                <OrbitLabel />

                <div className="absolute left-[2.2rem] top-[9.1rem] z-[3]">
                    <p className="font-poppins text-[0.9rem] font-semibold uppercase tracking-[0.34em] text-orange/92">
                        Powered by
                    </p>
                </div>

                <div className="absolute left-[1.05rem] top-[11.15rem] z-[4]">
                    <div className="relative w-fit">
                        <div 
                        className="pointer-events-none absolute -left-[1.35rem] -top-[1.2rem] h-[13.5rem] w-[17rem] rounded-full bg-[radial-gradient(circle_at_46%_48%,rgba(244,152,25,0.18),rgba(244,152,25,0.10)_28%,transparent_72%)] blur-xl" />

                        <div
                            className="pointer-events-none absolute -left-[1rem] top-[0.5rem] h-[11rem] w-[14rem] opacity-[0.62] mix-blend-screen"
                            style={{
                                backgroundImage: 'url("/textures/j42l-amber-dust-overlay.png")',
                                backgroundRepeat: "repeat",
                                backgroundSize: "520px 520px",
                                WebkitMaskImage:
                                    "radial-gradient(circle at 42% 42%, black 0%, black 32%, transparent 72%)",
                                maskImage:
                                    "radial-gradient(circle at 42% 42%, black 0%, black 32%, transparent 72%)",
                            }}
                        />

                        <div
                            className="pointer-events-none absolute -left-[0.65rem] top-[0.8rem] h-[10.5rem] w-[13rem] opacity-[0.14] mix-blend-screen"
                            style={{
                                backgroundImage: 'url("/textures/j42l-grain-overlay.png")',
                                backgroundRepeat: "repeat",
                                backgroundSize: "110px 110px",
                                WebkitMaskImage:
                                    "radial-gradient(circle at 44% 44%, black 0%, black 34%, transparent 74%)",
                                maskImage:
                                    "radial-gradient(circle at 44% 44%, black 0%, black 34%, transparent 74%)",
                            }}
                        />

                        <span
                            className="relative block font-poppins text-[11rem] font-semibold leading-[0.72] tracking-[-0.14em] text-transparent drop-shadow-[0_24px_60px_rgba(0,0,0,0.54)]"
                            style={{
                                WebkitTextFillColor: "transparent",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                backgroundImage: `
                                radial-gradient(circle at 18% 18%, rgba(255,255,255,1), transparent 16%),
                                radial-gradient(circle at 74% 38%, rgba(244,152,25,0.12), transparent 20%),
                                linear-gradient(135deg, #fff8ef 0%, #efe0cd 35%, #cfb08d 62%, #fff4e8 82%, #8c7159 100%),
                                url("/textures/j42l-grain-overlay.png")
                                `,
                                backgroundBlendMode: "screen, soft-light, normal, multiply",
                                backgroundSize: "100% 100%, 100% 100%, 100% 100%, 115px 115px",
                            }}
                        >
                            42
                        </span>

                    </div>

                    <p className="mt-[0.4rem] ml-[0.6rem] font-poppins text-[1.18rem] font-medium uppercase tracking-[0.52em] text-orange/88">
                        Lausanne
                    </p>
                </div>

                <div className="absolute left-[16.05rem] top-[14.1rem] z-[3]">
                    <p className="origin-top-left rotate-90 font-poppins text-[0.63rem] font-semibold uppercase leading-[1.45rem] tracking-[0.28em] text-orange/72">
                        Created by students
                        <br />
                        delivered with standards
                    </p>
                </div>

                {/* <div className="pointer-events-none absolute left-[17.5rem] top-[24.9rem] z-[2] h-[4.3rem] w-[5.8rem] bg-[linear-gradient(135deg,transparent_47%,rgba(244,152,25,0.16)_49%,rgba(244,152,25,0.16)_51%,transparent_53%)] opacity-60" /> */}

                <div className="absolute left-[12.4rem] top-[28rem] z-[4] flex items-start gap-3">
                    <div
                        className="mt-[0.25rem] h-[2.95rem] w-[0.9rem] shadow-[0_0_22px_rgba(244,152,25,0.14)]"
                        style={{
                            backgroundImage: `
                linear-gradient(180deg, rgba(244,152,25,0.82), rgba(118,60,18,0.7)),
                url("/textures/j42l-grain-overlay.png")
              `,
                            backgroundBlendMode: "multiply",
                            backgroundSize: "cover, 90px 90px",
                        }}
                    />

                    <p className="font-poppins text-[0.8rem] font-medium uppercase leading-[2rem] tracking-[0.23em] text-orange/76">
                        Junior
                        <br />
                        Entreprise
                        <br />
                        Lausanne
                    </p>
                </div>
            </div>
        </aside>
    );
}

function AmbientDust() {
    return (
        <>
            <div
                className="pointer-events-none absolute left-[0.3rem] top-[4.5rem] z-[1] h-[20rem] w-[18rem] opacity-[0.48] mix-blend-screen"
                style={{
                    backgroundImage: 'url("/textures/j42l-amber-dust-overlay.png")',
                    backgroundRepeat: "repeat",
                    backgroundSize: "560px 560px",
                    WebkitMaskImage:
                        "radial-gradient(circle at 44% 44%, black 0%, black 28%, transparent 72%)",
                    maskImage:
                        "radial-gradient(circle at 44% 44%, black 0%, black 28%, transparent 72%)",
                }}
            />

            <div
                className="pointer-events-none absolute left-[10rem] top-[15rem] z-[1] h-[14rem] w-[12rem] opacity-[0.26] mix-blend-screen"
                style={{
                    backgroundImage: 'url("/textures/j42l-amber-dust-overlay.png")',
                    backgroundRepeat: "repeat",
                    backgroundSize: "540px 540px",
                    WebkitMaskImage:
                        "radial-gradient(circle at 42% 42%, black 0%, black 26%, transparent 70%)",
                    maskImage:
                        "radial-gradient(circle at 42% 42%, black 0%, black 26%, transparent 70%)",
                }}
            />
        </>
    );
}

function GuideRings() {
    return (
        <>
            <div className="pointer-events-none absolute left-[0.35rem] top-[4rem] z-[1] h-[29rem] w-[29rem] rounded-full border border-white/[0.035]" />
            <div className="pointer-events-none absolute left-[4.25rem] top-[7.9rem] z-[1] h-[21rem] w-[21rem] rounded-full border border-orange/[0.06]" />
        </>
    );
}

// function CornerFrame() {
// 	return (
// 		<div className="pointer-events-none absolute right-[1.8rem] top-[11.2rem] z-[1] h-[7.4rem] w-[6.7rem] border-r border-t border-orange/[0.12]" />
// 	);
// }

function OrbitLabel() {
    return (
        <svg
            className="absolute left-[13.4rem] top-[2.25rem] z-[3] h-[11.6rem] w-[11.6rem] overflow-visible text-orange"
            viewBox="0 0 260 260"
            aria-hidden="true"
        >
            <defs>
                <path
                    id="hero-powered-circle"
                    d="M 130,130 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                />
            </defs>

            <text className="fill-current font-poppins text-[0.55rem] font-semibold uppercase tracking-[0.34em]">
                <textPath href="#hero-powered-circle" startOffset="2%">
                    Code · Collaborate · Create impact ·
                </textPath>
            </text>

            <path
                d="M 57 133 a 73 73 0 0 0 18 47"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.55"
            />
        </svg>
    );
}