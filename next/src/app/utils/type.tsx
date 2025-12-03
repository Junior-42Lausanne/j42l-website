export type ThemeColor = 'orange' | 'white' | 'black';

/*
* this is for Tailwind reference
* because eg:`border-{$color}` won't be expanded correctly without
*/
const tailwindColor = [
  "border-orange",
  "border-white",
  "border-black",
  "text-orange",
  "text-white",
  "text-black",
  "bg-orange",
  "bg-white",
  "bg-black",
] as const;

