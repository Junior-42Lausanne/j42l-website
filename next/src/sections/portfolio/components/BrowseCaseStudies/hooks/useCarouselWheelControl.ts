import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type MutableRefObject,
    type RefObject,
} from "react";

import {
    clampIndex,
    normalizeWheelDelta,
} from "../utils/browseCaseStudies.utils";

type UseCarouselWheelControlParams = {
    carouselRegionRef: RefObject<HTMLDivElement | null>;
    activeProjectIndexRef: MutableRefObject<number>;
    projectCountRef: MutableRefObject<number>;
    onIndexChange: (nextIndex: number) => void;
    wheelThreshold?: number;
    transitionLockDuration?: number;
};

export function useCarouselWheelControl({
    carouselRegionRef,
    activeProjectIndexRef,
    projectCountRef,
    onIndexChange,
    wheelThreshold = 46,
    transitionLockDuration = 760,
}: UseCarouselWheelControlParams) {
    const isPointerInsideRef = useRef(false);
    const wheelDeltaRef = useRef(0);
    const wheelLockRef = useRef(false);

    const wheelUnlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const wheelIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [isCarouselHovered, setIsCarouselHovered] = useState(false);

    const resetWheelControl = useCallback(() => {
        wheelDeltaRef.current = 0;
        wheelLockRef.current = false;

        if (wheelUnlockTimeoutRef.current) {
            clearTimeout(wheelUnlockTimeoutRef.current);
            wheelUnlockTimeoutRef.current = null;
        }

        if (wheelIdleTimeoutRef.current) {
            clearTimeout(wheelIdleTimeoutRef.current);
            wheelIdleTimeoutRef.current = null;
        }
    }, []);

    const handlePointerEnter = useCallback(() => {
        isPointerInsideRef.current = true;
        setIsCarouselHovered(true);
    }, []);

    const handlePointerLeave = useCallback(() => {
        isPointerInsideRef.current = false;
        setIsCarouselHovered(false);
        wheelDeltaRef.current = 0;
    }, []);

    useEffect(() => {
        function handleWindowWheel(event: globalThis.WheelEvent) {
            const carouselNode = carouselRegionRef.current;

            if (!carouselNode || projectCountRef.current <= 1) {
                return;
            }

            const isHoveringCarousel =
                isPointerInsideRef.current || carouselNode.matches(":hover");

            if (!isHoveringCarousel) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            if (wheelLockRef.current) {
                return;
            }

            const normalizedDelta = normalizeWheelDelta(event);

            if (Math.abs(normalizedDelta) < 0.5) {
                return;
            }

            wheelDeltaRef.current += normalizedDelta;

            if (wheelIdleTimeoutRef.current) {
                clearTimeout(wheelIdleTimeoutRef.current);
            }

            wheelIdleTimeoutRef.current = setTimeout(() => {
                wheelDeltaRef.current = 0;
            }, 120);

            if (Math.abs(wheelDeltaRef.current) < wheelThreshold) {
                return;
            }

            const direction = wheelDeltaRef.current > 0 ? 1 : -1;
            const nextIndex = clampIndex(
                activeProjectIndexRef.current + direction,
                projectCountRef.current,
            );

            wheelDeltaRef.current = 0;
            wheelLockRef.current = true;

            if (wheelIdleTimeoutRef.current) {
                clearTimeout(wheelIdleTimeoutRef.current);
                wheelIdleTimeoutRef.current = null;
            }

            if (wheelUnlockTimeoutRef.current) {
                clearTimeout(wheelUnlockTimeoutRef.current);
            }

            if (nextIndex !== activeProjectIndexRef.current) {
                onIndexChange(nextIndex);
            }

            wheelUnlockTimeoutRef.current = setTimeout(() => {
                wheelLockRef.current = false;
            }, transitionLockDuration);
        }

        window.addEventListener("wheel", handleWindowWheel, {
            passive: false,
            capture: true,
        });

        return () => {
            window.removeEventListener("wheel", handleWindowWheel, {
                capture: true,
            });

            resetWheelControl();
        };
    }, [
        activeProjectIndexRef,
        carouselRegionRef,
        onIndexChange,
        projectCountRef,
        resetWheelControl,
        transitionLockDuration,
        wheelThreshold,
    ]);

    return {
        isCarouselHovered,
        handlePointerEnter,
        handlePointerLeave,
        resetWheelControl,
    };
}