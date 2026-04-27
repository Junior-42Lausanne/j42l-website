import type { PortfolioVisualKind } from "@/sections/portfolio/types/portfolio.types";
import { portfolioMockup } from "@/sections/portfolio/styles/portfolioStyles";

type PortfolioVisualMockupProps = {
  kind: PortfolioVisualKind;
  title?: string;
  className?: string;
};

export function PortfolioVisualMockup({
  kind,
  title,
  className = "",
}: PortfolioVisualMockupProps) {
  return (
    <div
      className={[
        portfolioMockup.frame,
        portfolioMockup.gridLine,
        "min-h-[260px]",
        className,
      ].join(" ")}
      aria-label={title ?? `Portfolio visual mockup: ${kind}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(244,152,25,0.20),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.10),transparent_22%)]" />

      <div className="relative flex h-full min-h-[228px] flex-col">
        <MockupTopBar />

        <div className="mt-4 flex flex-1 items-stretch">
          {kind === "website-preview" && <WebsitePreview />}
          {kind === "dashboard-preview" && <DashboardPreview />}
          {kind === "cms-preview" && <CmsPreview />}
          {kind === "prototype-preview" && <PrototypePreview />}
          {kind === "automation-flow" && <AutomationFlow />}
          {kind === "data-grid" && <DataGridPreview />}
        </div>
      </div>
    </div>
  );
}

function MockupTopBar() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#181612]/80 px-3 py-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
      </div>

      <div className="hidden h-2 w-28 rounded-full bg-white/12 sm:block" />

      <div className="h-6 w-6 rounded-full border border-white/10 bg-white/[0.06]" />
    </div>
  );
}

function WebsitePreview() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-2xl border border-white/10 bg-[#181612]/70 p-4">
        <div className="h-2 w-16 rounded-full bg-orange/80" />
        <div className="mt-5 space-y-2.5">
          <div className="h-3 w-11/12 rounded-full bg-white/22" />
          <div className="h-3 w-9/12 rounded-full bg-white/16" />
          <div className="h-3 w-7/12 rounded-full bg-white/12" />
        </div>
        <div className="mt-6 flex gap-2">
          <div className="h-8 w-20 rounded-full bg-orange/85" />
          <div className="h-8 w-16 rounded-full border border-white/12 bg-white/[0.04]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
          <div className="h-16 rounded-xl bg-white/[0.08]" />
          <div className="mt-3 h-2 w-3/4 rounded-full bg-white/16" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="rounded-2xl border border-orange/20 bg-orange/[0.08] p-3">
          <div className="h-16 rounded-xl bg-orange/15" />
          <div className="mt-3 h-2 w-3/4 rounded-full bg-orange/45" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/12" />
        </div>
        <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-xl bg-white/[0.08]" />
            <div className="h-12 rounded-xl bg-white/[0.06]" />
            <div className="h-12 rounded-xl bg-white/[0.08]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-[0.75fr_1.25fr]">
      <div className="space-y-3">
        {[72, 54, 88].map((width, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-[#181612]/70 p-3"
          >
            <div className="h-2 w-16 rounded-full bg-white/14" />
            <div className="mt-4 flex items-end gap-1.5">
              <div className="h-8 w-full rounded-t-lg bg-white/[0.08]" />
              <div className="h-12 w-full rounded-t-lg bg-orange/35" />
              <div className="h-6 w-full rounded-t-lg bg-white/[0.08]" />
              <div
                className="h-10 rounded-t-lg bg-white/[0.12]"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <div className="flex items-center justify-between">
          <div className="h-2 w-20 rounded-full bg-orange/70" />
          <div className="h-6 w-16 rounded-full border border-white/10 bg-white/[0.04]" />
        </div>

        <div className="mt-6 h-28 rounded-2xl border border-white/10 bg-[#181612]/60 p-4">
          <div className="flex h-full items-end gap-2">
            {[35, 62, 48, 78, 56, 90, 68].map((height, index) => (
              <div
                key={index}
                className="w-full rounded-t-md bg-white/[0.10]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-xl bg-white/[0.06]" />
          <div className="h-10 rounded-xl bg-orange/[0.12]" />
          <div className="h-10 rounded-xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function CmsPreview() {
  return (
    <div className="grid w-full grid-cols-[0.45fr_1fr] gap-3">
      <div className="rounded-2xl border border-white/10 bg-[#181612]/75 p-3">
        <div className="mb-4 h-2 w-14 rounded-full bg-orange/70" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className={[
                "h-8 rounded-xl border border-white/10",
                item === 2 ? "bg-orange/[0.13]" : "bg-white/[0.045]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
        <div className="h-3 w-32 rounded-full bg-white/20" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="h-16 rounded-2xl border border-white/10 bg-[#181612]/60" />
          <div className="h-16 rounded-2xl border border-white/10 bg-[#181612]/60" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-full rounded-full bg-white/16" />
          <div className="h-2.5 w-10/12 rounded-full bg-white/12" />
          <div className="h-2.5 w-8/12 rounded-full bg-white/10" />
        </div>
        <div className="mt-5 h-9 rounded-full bg-orange/80" />
      </div>
    </div>
  );
}

function PrototypePreview() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative h-[190px] w-full max-w-[520px]">
        <div className="absolute left-0 top-8 h-36 w-[34%] rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-3">
          <div className="h-14 rounded-2xl bg-white/[0.08]" />
          <div className="mt-3 h-2 w-20 rounded-full bg-white/16" />
          <div className="mt-2 h-2 w-14 rounded-full bg-white/10" />
        </div>

        <div className="absolute left-[33%] top-0 h-44 w-[34%] rounded-[1.5rem] border border-orange/25 bg-orange/[0.10] p-3 shadow-[0_24px_70px_rgba(244,152,25,0.10)]">
          <div className="h-16 rounded-2xl bg-orange/18" />
          <div className="mt-4 h-2 w-24 rounded-full bg-orange/55" />
          <div className="mt-2 h-2 w-16 rounded-full bg-white/14" />
          <div className="mt-5 h-8 rounded-full bg-orange/85" />
        </div>

        <div className="absolute right-0 top-8 h-36 w-[34%] rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-3">
          <div className="h-14 rounded-2xl bg-white/[0.08]" />
          <div className="mt-3 h-2 w-20 rounded-full bg-white/16" />
          <div className="mt-2 h-2 w-14 rounded-full bg-white/10" />
        </div>

        <div className="absolute left-[28%] top-[88px] h-px w-[15%] bg-orange/45" />
        <div className="absolute right-[28%] top-[88px] h-px w-[15%] bg-orange/45" />
      </div>
    </div>
  );
}

function AutomationFlow() {
  return (
    <div className="flex w-full flex-col justify-center gap-3">
      {[
        { label: "Input", active: false },
        { label: "Process", active: true },
        { label: "Review", active: false },
        { label: "Output", active: false },
      ].map((step, index) => (
        <div key={step.label} className="flex items-center gap-3">
          <div
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
              step.active
                ? "border-orange/40 bg-orange/15 text-orange"
                : "border-white/10 bg-white/[0.045] text-white/44",
            ].join(" ")}
          >
            {index + 1}
          </div>

          <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-center justify-between gap-4">
              <div className="h-2.5 w-24 rounded-full bg-white/16" />
              <div
                className={[
                  "h-6 w-16 rounded-full",
                  step.active ? "bg-orange/75" : "bg-white/[0.08]",
                ].join(" ")}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DataGridPreview() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#181612]/70 p-3">
      <div className="mb-3 grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-2">
        <div className="h-8 rounded-xl bg-orange/20" />
        <div className="h-8 rounded-xl bg-white/[0.07]" />
        <div className="h-8 rounded-xl bg-white/[0.07]" />
      </div>

      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-2"
          >
            <div className="h-9 rounded-xl border border-white/10 bg-white/[0.045]" />
            <div className="h-9 rounded-xl border border-white/10 bg-white/[0.035]" />
            <div
              className={[
                "h-9 rounded-xl border",
                row === 2 || row === 5
                  ? "border-orange/25 bg-orange/[0.10]"
                  : "border-white/10 bg-white/[0.035]",
              ].join(" ")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}