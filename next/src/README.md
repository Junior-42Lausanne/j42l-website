Sup!
Here is some documentations for you, yay!

### Structure
## Folder and files
- components: components and sub components, read file name to know what section each component represent.
- logic: logic to retrieve Strapi data for each component.
- utils: utility functions and various custom variable types
- pagenameDefault.tsx (eg: homeDefault.tsx): default fallback for every page in case Strapi failed.

## Function
# Utilities functions
- `getStrapiData`: call Strapi API
- `getStrapiURL`: public strapi domain or local host
- `getStrapiMedia`: get the correct Strapi url for media
- `convertStrapiText`: convert text paragraph from Strapi to string

### Logic flow
- get the page data with `getStrapiData`
- get section object with corresponse logic function (eg: heroSection = getHero())
- pass the data from section object to corresponse component
- profit
