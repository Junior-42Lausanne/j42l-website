"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/utils/type";

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
];

export default function LanguageSwitcher({
  currentLocale,
  isDetached = false,
}: {
  currentLocale: Locale;
  isDetached?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) {
      setOpen(false);
      return;
    }

    const newPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${locale}$1`);
    router.push(newPath);
    setOpen(false);
  }

  const current =
    LOCALES.find((locale) => locale.code === currentLocale) ?? LOCALES[0];

  const dropdownOffset = isDetached ? "0.75rem" : "1rem";

  return (
    <div ref={ref} className="relative h-10">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "group/language relative z-30 inline-flex h-10 items-center justify-center gap-2 px-2.5",
          "font-poppins text-sm font-semibold",
          "transition-colors duration-200 ease-out",
          "outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
          "active:outline-none active:ring-0",
          open ? "text-orange" : "text-white/82 hover:text-white",
        ].join(" ")}
      >
        <span className="min-w-6 text-center">
          {current.label}
        </span>

        <svg
          className={[
            "h-3 w-3 transition-transform duration-300 ease-out",
            open
              ? "rotate-180 text-orange"
              : "text-white/58 group-hover/language:text-white",
          ].join(" ")}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 4.5L6 8L10 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            initial={{
              opacity: 0,
              y: -12,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              y: -10,
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.26,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              top: `calc(100% + ${dropdownOffset})`,
            }}
            className={[
              "absolute right-2 z-20 w-[11rem] overflow-hidden",
              "rounded-t-none rounded-b-[1rem]",
              "border border-t-0 border-white/10 bg-[#181612]/96",
              "backdrop-blur-xl",
              "will-change-[opacity,clip-path,transform]",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px " />
            <div className="pointer-events-none absolute inset-0 " />

            <div className="relative py-2">
              {LOCALES.map((locale) => {
                const isActive = locale.code === currentLocale;

                return (
                  <button
                    key={locale.code}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => switchLocale(locale.code)}
                    className={[
                      "grid w-full grid-cols-[2.25rem_1fr] items-center gap-3 px-4 py-2.5 text-left",
                      "font-poppins transition-colors duration-200 ease-out",
                      "outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                      "active:outline-none active:ring-0",
                      isActive
                        ? "text-orange"
                        : "text-white/58 hover:text-white",
                    ].join(" ")}
                  >
                    <span className="text-sm font-semibold">
                      {locale.label}
                    </span>

                    <span className="text-xs font-medium">
                      {locale.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}