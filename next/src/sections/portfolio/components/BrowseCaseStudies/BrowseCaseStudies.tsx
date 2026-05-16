// "use client";

// import { useCallback, useMemo, useState } from "react";

// import { portfolioData } from "@/sections/portfolio/data/portfolio.mock";
// import { portfolioLayout } from "@/sections/portfolio/styles/portfolioStyles";

// import { BrowseFilterCarousel } from "./BrowseFilterCarousel";
// import { BrowseSidebar } from "./BrowseSidebar";
// import type {
//     BrowseCaseStudiesProps,
//     BrowseFilter,
// } from "./types";
// import {
//     isProjectLinkedToService,
//     sortProjectsByServiceOrder,
// } from "./utils/browseCaseStudies.utils";

// export function BrowseCaseStudies({
//     locale = "en",
// }: BrowseCaseStudiesProps) {
//     const [selectedFilter, setSelectedFilter] = useState<BrowseFilter>("all");
//     const [renderedFilter, setRenderedFilter] = useState<BrowseFilter>("all");
//     const [pendingFilter, setPendingFilter] = useState<BrowseFilter | null>(
//         null,
//     );
//     const [activeProjectIndex, setActiveProjectIndex] = useState(0);

//     const renderedProjects = useMemo(
//         () => getProjectsByFilter(renderedFilter),
//         [renderedFilter],
//     );

//     const pendingProjects = useMemo(() => {
//         if (!pendingFilter) {
//             return [];
//         }

//         return getProjectsByFilter(pendingFilter);
//     }, [pendingFilter]);

//     const activeProject =
//         renderedProjects[activeProjectIndex] ?? renderedProjects[0];

//     const isFilterTransitioning = pendingFilter !== null;

//     function changeFilter(nextFilter: BrowseFilter) {
//         if (nextFilter === selectedFilter || isFilterTransitioning) {
//             return;
//         }

//         setSelectedFilter(nextFilter);
//         setPendingFilter(nextFilter);
//     }

//     const handleFilterTransitionEnd = useCallback(() => {
//         if (!pendingFilter) {
//             return;
//         }

//         setRenderedFilter(pendingFilter);
//         setActiveProjectIndex(0);
//         setPendingFilter(null);
//     }, [pendingFilter]);

//     return (
//         <section id="browse-case-studies" className={portfolioLayout.section}>
//             <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
//                 <BrowseSidebar
//                     activeFilter={selectedFilter}
//                     activeProject={activeProject}
//                     activeProjectIndex={activeProjectIndex}
//                     projectsCount={renderedProjects.length}
//                     onChangeFilter={changeFilter}
//                 />

//                 <BrowseFilterCarousel
//                     currentFilter={renderedFilter}
//                     currentProjects={renderedProjects}
//                     currentProjectIndex={activeProjectIndex}
//                     pendingFilter={pendingFilter}
//                     pendingProjects={pendingProjects}
//                     locale={locale}
//                     onCurrentProjectIndexChange={setActiveProjectIndex}
//                     onTransitionEnd={handleFilterTransitionEnd}
//                 />
//             </div>
//         </section>
//     );
// }

// function getProjectsByFilter(filter: BrowseFilter) {
//     if (filter === "all") {
//         return sortProjectsByServiceOrder(portfolioData.projects);
//     }

//     return portfolioData.projects.filter((project) =>
//         isProjectLinkedToService(project, filter),
//     );
// }