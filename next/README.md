# Junior 42 Lausanne Official Website

## Next.js module

<br>

### Environment variables
<details>
<summary>click to expand</summary>
<pre>
COMPOSE_BAKE=
STRAPI_API_TOKEN=
STRAPI_API_URL=
STRAPI_URL=</pre>
</details>

<br>

### Utilisation
In local, you can access the prototype at [localhost:3001](http://localhost:3001). When deployed, staging can be accesed at [staging.j42l.ch](staging.j42l.ch) and production at [j42l.ch](j42l.ch).

<br>

### How does this work?
The general flow is as below:
1. User requests home page (work the same for all page).
2. [Middleware](./src/middleware.ts) prompts for login if it is staging, otherwise next.
3. [Global elements](./src/app/layout.tsx) ([Navigation bar](./src/sections/NavBar.tsx), navigation menu (inside navigation bar using `getStrapiNavBarMenuData`), [footer](./src/sections/Footer.tsx) and contact information (inside footer using `getStrapiContactDetailsData()`)) are fetched with `getStrapiGlobalData()` to render navigation bar and footer. Navigation menu is rendered in a loop using `menuRenderer()`.
4. The [Home](./src/app/page.tsx) page content is fetched by passing a path and a custom query to `getStrapiData()`. Meta data is also fetched by passing a path to `getStrapiMetadata()`. The path can be retrieve by going to Strapi admin panel -> Setting -> Roles -> Public.
5. Meta data will be rendered automatically. Page content (which is correspond to Strapi dynamic content block) is an array of sections and will be rendered in a loop using `blockRenderer()`.

<br>

### SEO: sitemap.xml and robots.txt
- The sitemap.xml file is generated programatically from [sitemap.ts](./src/app/sitemap.ts).
- The robots.txt file is generated programatically from [robots.ts](./src/app/robots.ts).