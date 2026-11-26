export type ThemeColor = 'orange' | 'white' | 'black' | 'pale_orange';
export type Mode = 'desktop' | 'mobile';
export type Locale = "fr" | "en" | "de";
export const ALLOWED_LOCALES = ["en", "fr", "de"] as const;

export type LangParams = Promise<{
	lang: Locale;
}>;

export type SlugPageParams = Promise<{
	lang: Locale;
	slug: string[];
}>;
