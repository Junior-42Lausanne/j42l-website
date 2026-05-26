export const siteLayout = {
	page:
		"min-h-screen bg-[#181612] text-white selection:bg-orange/30 selection:text-white",

	main:
		"relative isolate min-h-screen overflow-x-clip bg-[#181612]",

	section:
		"relative mx-auto w-full px-5 py-20 sm:px-6 lg:px-8 lg:py-28",

	sectionCompact:
		"relative mx-auto w-full px-5 py-14 sm:px-6 lg:px-8 lg:py-20",

	container:
		"mx-auto w-full max-w-7xl",

	containerWide:
		"mx-auto w-full max-w-[92rem]",

	narrow:
		"mx-auto w-full max-w-3xl",

	textBlock:
		"flex max-w-4xl flex-col gap-5",

	grid:
		"grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",

	split:
		"grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center",

	twoColumns:
		"grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start",
} as const;

export const siteText = {
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

	bodyStrong:
		"text-sm font-medium leading-6 text-white/82 sm:text-base sm:leading-7",

	muted:
		"text-sm leading-6 text-white/52",

	small:
		"text-xs leading-5 text-white/48",

	link:
		"text-white/72 transition duration-200 hover:text-orange focus:outline-none focus-visible:text-orange",
} as const;

export const siteSurface = {
	base:
		"rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.22)]",

	elevated:
		"rounded-[2rem] border border-white/12 bg-[#221f19]/90 shadow-[0_28px_100px_rgba(0,0,0,0.32)]",

	card:
		"rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition duration-300 ease-out",

	cardHover:
		"hover:-translate-y-1 hover:border-orange/35 hover:bg-white/[0.065] hover:shadow-[0_24px_80px_rgba(244,152,25,0.08)]",

	inset:
		"rounded-[1.5rem] border border-white/10 bg-black/10",

	soft:
		"rounded-[1.5rem] border border-white/10 bg-white/[0.03]",

	line:
		"border-white/10",

	divider:
		"h-px w-full bg-white/10",

	orangeGlow:
		"before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_20%_0%,rgba(244,152,25,0.16),transparent_34%)] before:opacity-80",

	centerGlow:
		"before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:mx-auto before:h-64 before:w-64 before:rounded-full before:bg-orange/10 before:blur-3xl",

	pageGlow:
		"before:pointer-events-none before:fixed before:left-1/2 before:top-0 before:-z-10 before:h-[28rem] before:w-[44rem] before:-translate-x-1/2 before:rounded-full before:bg-orange/8 before:blur-3xl",
} as const;

export const siteButton = {
	primary:
		"inline-flex h-11 items-center justify-center gap-2 rounded-full bg-orange px-5 text-sm font-semibold text-[#14120e] transition duration-200 hover:bg-[#ffad3d] focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-[#181612]",

	secondary:
		"inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-5 text-sm font-semibold text-white transition duration-200 hover:border-white/24 hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#181612]",

	ghost:
		"inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-white/72 transition duration-200 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#181612]",

	nav:
		"inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-white/74 transition duration-200 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#181612]",

	fullWidth:
		"w-full",
} as const;

export const siteBadge = {
	base:
		"inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-medium leading-none text-white/72",

	accent:
		"inline-flex w-fit items-center rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-xs font-semibold leading-none text-orange",

	muted:
		"inline-flex w-fit items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium leading-none text-white/52",
} as const;

export const siteChip = {
	base:
		"inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/62",

	active:
		"inline-flex items-center rounded-full border border-orange/40 bg-orange/12 px-2.5 py-1 text-xs font-semibold text-orange",

	dark:
		"inline-flex items-center rounded-full border border-white/10 bg-[#14120e]/70 px-2.5 py-1 text-xs font-medium text-white/58",
} as const;

export const siteIcon = {
	circle:
		"inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/72 transition duration-200 hover:border-orange/35 hover:bg-orange/10 hover:text-orange",

	circleMuted:
		"inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/10 text-white/52",
} as const;

export const siteForm = {
	label:
		"text-sm font-medium text-white/72",

	input:
		"min-h-11 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white placeholder:text-white/36 outline-none transition duration-200 focus:border-orange/45 focus:bg-white/[0.065] focus:ring-2 focus:ring-orange/20",

	textarea:
		"min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/36 outline-none transition duration-200 focus:border-orange/45 focus:bg-white/[0.065] focus:ring-2 focus:ring-orange/20",

	help:
		"text-xs leading-5 text-white/48",

	error:
		"text-xs leading-5 text-orange",
} as const;

export const siteFocus = {
	ring:
		"focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-[#181612]",

	ringSoft:
		"focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#181612]",
} as const;

export const siteMotion = {
	default:
		"transition duration-300 ease-out",

	fast:
		"transition duration-200 ease-out",

	slow:
		"transition duration-500 ease-out",
} as const;