"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/utils/type";

const LOCALES: { code: Locale; label: string; }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  const styles = {
    wrapper: "relative",
    trigger: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-h5 font-poppins font-regular text-white hover:bg-white/10 transition-colors cursor-pointer select-none",
    dropdown: "absolute right-0 mt-1 w-28 rounded overflow-hidden bg-black shadow-lg z-50",
    option: "flex items-center gap-2 px-3 py-2 text-h5 text-white hover:bg-white/10 transition-colors cursor-pointer",
    optionActive: "text-white bg-white/10",
    chevron: `transition-transform duration-200 ${open ? "rotate-180" : ""}`,
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={styles.trigger}
      >
        <span>{current.label}</span>
        <svg
          className={styles.chevron}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
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

      {open && (
        <div role="listbox" className={styles.dropdown}>
          {LOCALES.map((locale) => (
            <div
              key={locale.code}
              role="option"
              aria-selected={locale.code === currentLocale}
              onClick={() => switchLocale(locale.code)}
              className={`${styles.option} ${locale.code === currentLocale ? styles.optionActive : ""}`}
            >
              <span>{locale.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
