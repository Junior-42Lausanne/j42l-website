# Junior 42 Lausanne Official Website

## Strapi module

<br>

### First setup
In the first run:
* If you are running locally, navigate to [strapi admin panel](http://localhost:1337/admin) to create a new local admin. If the site has already deployed on Dokploy, then the admin is likely already created (you can check at [admin.staging.j42l.ch](admin.staging.j42l.ch) for staging and [admin.j42l.ch](admin.j42l.ch) for production)
* Navigate to Setting -> Role -> Public and enable "find" option for all relevant endpoints. This will active the end points so Next.js service can fetch the data.



<br>

### Utilisation
Please refer to Strapi documentation for general navigation and common usage. We will only documenting setups that are specific to our project.

* Credentials can be found in the [vault](https://vault.j42l.ch/).

* Content type (Only cover special cases):
	* Nav bar
	* Navbar Menu
	* Footer
	* Contact page
	* Contact details
	* Anchor Tag

### FAQ
* <details>
	<summary>Can I export and import Strapi database?</summary>
	<br> It is possible but buggy, might require access to association VPS and a way to transfer the exported files. It is recommanded to just populate what you need your self, it will take less time and effort than trying to export/import database. If you still insist:<br>
	* Export content: <pre>docker exec -it {strapi-container-name} npm run strapi export -- --file strapi-backup.tar.gz.enc</pre>
	* Import content: <pre>docker exec -it {strapi-container-name} npm run strapi import -- --file strapi-backup.tar.gz.enc</pre>
	</details>