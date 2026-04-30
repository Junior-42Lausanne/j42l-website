import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
import type {
    PortfolioProject,
    PortfolioServiceId,
} from "@/sections/portfolio/types/portfolio.types";

import type { BrowseFilter, FilterTransitionState } from "../types";

export function normalizeWheelDelta(event: globalThis.WheelEvent) {
    if (event.deltaMode === 1) {
        return event.deltaY * 16;
    }

    if (event.deltaMode === 2) {
        return event.deltaY * window.innerHeight;
    }

    return event.deltaY;
}

export function countProjectsForService(serviceId: PortfolioServiceId) {
    return portfolioData.projects.filter((project) =>
        isProjectLinkedToService(project, serviceId),
    ).length;
}

export function isProjectLinkedToService(
    project: PortfolioProject,
    serviceId: PortfolioServiceId,
) {
    const isPrimaryService = project.serviceId === serviceId;
    const isSecondaryService = project.secondaryServiceIds?.includes(serviceId);

    return isPrimaryService || Boolean(isSecondaryService);
}

export function getServiceLabel(serviceId: PortfolioServiceId) {
    const service = portfolioData.services.find(
        (currentService) => currentService.id === serviceId,
    );

    if (!service) {
        return "Service";
    }

    return service.shortLabel || service.label;
}

export function getFilterTitle(activeFilter: BrowseFilter) {
    if (activeFilter === "all") {
        return "All case studies";
    }

    return (
        portfolioData.services.find((service) => service.id === activeFilter)
            ?.label ?? "Selected service"
    );
}

export function getFilterTransitionClass(state: FilterTransitionState) {
    if (state === "leaving") {
        return "translate-x-16 opacity-0 scale-[0.985]";
    }

    if (state === "entering") {
        return "-translate-x-16 opacity-0 scale-[0.985]";
    }

    return "translate-x-0 opacity-100 scale-100";
}

export function formatIndex(index: number) {
    return String(index + 1).padStart(2, "0");
}

export function clampIndex(index: number, itemCount: number) {
    return Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0));
}