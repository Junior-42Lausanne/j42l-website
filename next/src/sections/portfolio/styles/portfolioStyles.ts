export const portfolioLayout = {
    page:
        "min-h-screen bg-[#181612] text-white selection:bg-orange/30 selection:text-white",

    section:
        "relative mx-auto w-full px-5 py-20 sm:px-6 lg:px-8 lg:py-28",

    sectionCompact:
        "relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20",

    narrow:
        "mx-auto w-full max-w-3xl",

    grid:
        "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",

    twoColumns:
        "grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start",

    split:
        "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center",
} as const;

export const portfolioText = {
    eyebrow:
        "text-xs font-semibold uppercase tracking-[0.24em] text-orange",

    h1:
        "max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl",

    h2:
        "max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl",

    h3:
        "text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl",

    h4:
        "text-lg font-semibold tracking-[-0.02em] text-white",

    lead:
        "max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8",

    body:
        "text-sm leading-6 text-white/68 sm:text-base sm:leading-7",

    muted:
        "text-sm leading-6 text-white/52",

    small:
        "text-xs leading-5 text-white/48",
} as const;

export const portfolioSurface = {
    base:
        "rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.22)]",

    elevated:
        "rounded-[2rem] border border-white/12 bg-[#221f19]/90 shadow-[0_28px_100px_rgba(0,0,0,0.32)]",

    inset:
        "rounded-[1.5rem] border border-white/10 bg-black/10",

    card:
        "rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition duration-300 ease-out",

    cardHover:
        "hover:-translate-y-1 hover:border-orange/35 hover:bg-white/[0.065] hover:shadow-[0_24px_80px_rgba(244,152,25,0.08)]",

    line:
        "border-white/10",

    softGlow:
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_20%_0%,rgba(244,152,25,0.16),transparent_34%)] before:opacity-80",
} as const;

export const portfolioBadge = {
    base:
        "inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-medium leading-none text-white/72",

    accent:
        "inline-flex w-fit items-center rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold leading-none text-orange",

    muted:
        "inline-flex w-fit items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium leading-none text-white/52",
} as const;

export const portfolioButton = {
    primary:
        "inline-flex h-11 items-center justify-center rounded-full bg-orange px-5 text-sm font-semibold text-[#14120e] transition duration-200 hover:bg-[#ffad3d] focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-[#181612]",

    secondary:
        "inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-5 text-sm font-semibold text-white transition duration-200 hover:border-white/24 hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#181612]",

    ghost:
        "inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-white/72 transition duration-200 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#181612]",
} as const;

export const portfolioChip = {
    base:
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/62",

    active:
        "inline-flex items-center rounded-full border border-orange/40 bg-orange/12 px-2.5 py-1 text-xs font-semibold text-orange",

    dark:
        "inline-flex items-center rounded-full border border-white/10 bg-[#14120e]/70 px-2.5 py-1 text-xs font-medium text-white/58",
} as const;

export const portfolioMockup = {
    frame:
        "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#26231d] p-4",

    panel:
        "rounded-2xl border border-white/10 bg-white/[0.055]",

    bar:
        "h-2 rounded-full bg-white/14",

    barAccent:
        "h-2 rounded-full bg-orange/80",

    gridLine:
        "bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]",
} as const;