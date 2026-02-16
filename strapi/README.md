# Junior 42 Lausanne Official Website

## Strapi module

<br>

### First setup
In the first run:
* If you are running locally, navigate to Strapi admin at [localhost:1337/admin](http://localhost:1337/admin) to create a new local admin. If the site has already deployed on Dokploy, then the admin is likely already created (you can check at [admin.staging.j42l.ch](admin.staging.j42l.ch) for staging and [admin.j42l.ch](admin.j42l.ch) for production)
* Navigate to Setting -> Roles -> Public and enable "find" option for all relevant endpoints. This will active the end points so Next.js service can fetch the data.

<br>

### Utilisation
Please refer to Strapi documentation for general navigation and common usage. We will only documenting setups that are specific to our project.

* Credentials can be found in the [vault](https://vault.j42l.ch/).

* Content type (Only cover special cases):
	* **Nav bar:** This single type contains logo, CTA and array of social medias. Data can be filled in `Global` single type and fetch at `/api/global`. This doesn't include the actual navigation, to edit it, refer to `NavBar Menu`.
	* **Navbar Menu:** This single type is used to configurate the navigation menu using `Link` or `Dropdown Link`. Data can be filled in `Navbar Menu` single type and fetch at `api/navbar-menu`. 
	* **Footer:** This single type contains side illustration, `generalNavigation` (pages that are not services), `serviceNagivation` (service pages), `externalNavigation` (external links like Game Jam), array of social medias, CTA and legals pages. This doesn't include the contact information, to edit it, refer to `Contact details`.
	* **Contact page:** To edit contact information, refer to `Contact details`.
	* **Contact details:** This single type contains contact information of J42L. Data filled will be used in footer and Contact page.
	* **Anchor Tag:** This single type is used in pair with `button` for in page jumping to section. The anchor tag section should be right above the section you want to jump to.Button `url` should be filled with Field `anchorId`, preceded by a `#`. Example: if anchorId is `test` then button url should be `#test`.   

<br>

### FAQ
* <details>
	<summary>Can I export and import Strapi database?</summary>
	<br> It is possible but buggy, might require access to association VPS and a way to transfer the exported files. It is recommanded to just populate what you need your self, it will take less time and effort than trying to export/import database. If you still insist:<br>
	* Export content: <pre>docker exec -it {strapi-container-name} npm run strapi export -- --file strapi-backup.tar.gz.enc</pre>
	* Import content: <pre>docker exec -it {strapi-container-name} npm run strapi import -- --file strapi-backup.tar.gz.enc</pre>
	</details>