import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import {
    portfolioLayout,
    portfolioText,
} from "@/sections/portfolio/styles/portfolioStyles";

type CapabilityId = (typeof portfolioData.capabilities)[number]["id"];

export function CapabilitiesSection() {
    const capabilities = portfolioData.capabilities;

    return (
        <section className={portfolioLayout.section}>
            <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
                <div>
                    <span className={portfolioText.eyebrow}>
                        Capabilities
                    </span>

                    <h2 className={`${portfolioText.h2} mt-4`}>
                        The operational layer behind the proof.
                    </h2>

                    <p className={`${portfolioText.body} mt-5 max-w-md`}>
                        Capabilities explain what J42L actually mobilizes to deliver a
                        service: strategy, interface design, engineering, automation and
                        data clarity.
                    </p>
                </div>

                <div className="border-y border-white/10">
                    <div className="grid grid-cols-[0.18fr_1fr_0.42fr] border-b border-white/10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/34">
                        <span>Index</span>
                        <span>Capability</span>
                        <span className="hidden md:block">Used in</span>
                    </div>

                    <div className="divide-y divide-white/10">
                        {capabilities.map((capability, index) => {
                            const relatedServices = getServicesUsingCapability(capability.id);

                            return (
                                <article
                                    key={capability.id}
                                    className="grid gap-5 py-6 md:grid-cols-[0.18fr_1fr_0.42fr] md:items-start"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                                        {String(index + 1).padStart(2, "0")}
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">
                                            {capability.label}
                                        </h3>

                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56">
                                            {capability.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-x-4 gap-y-2 md:block md:space-y-2">
                                        {relatedServices.map((service) => (
                                            <p
                                                key={service.id}
                                                className="text-sm font-medium text-white/50"
                                            >
                                                <span className="text-orange/80">—</span>{" "}
                                                {service.shortLabel}
                                            </p>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function getServicesUsingCapability(capabilityId: CapabilityId) {
    return portfolioData.services.filter((service) =>
        service.capabilities.includes(capabilityId),
    );
}