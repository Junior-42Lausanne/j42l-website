# Junior 42 Lausanne Official Website

## A bit about us
[Junior 42 Lausanne](j42l.ch/) is a student association founded in 2023 to bridge the gap between academic learning and professional IT experience. We enable students from 42 Lausanne to work on real-world projects through professional mandates and hands-on development.

Closely connected to [42 Lausanne](42lausanne.ch/) — a member campus of the international [42 Network](42network.org/) — our association benefits from a strong and innovative educational ecosystem while operating independently with a structured, company-like organization. We are also supported by [Junior Entreprise Switzerland](junior-enterprises.ch/).

Our activities include both client-paid mandates and internal development initiatives. Students involved in these projects are responsible for client communication, requirements analysis, proposal drafting, contractual documentation,	* Next.js
	* Strapi
	* Postgresql
	* Dokploy
 and full-cycle software development. This comprehensive approach ensures not only technical growth but also the acquisition of essential professional and business skills.

<br>

## J42L website
This website showcases Junior 42 Lausanne's commitment to professionalism and our hands-on approach to real-world IT projects. Designed and developed by [Nguyen NGUYEN](nguyennguyen.ch), [Zelalem ALEMU](zola.dev) and [Dianka MATAYI](linkedin.com/in/dianka-matayi-b4b413209), it reflects our dedication to delivering high-quality solutions, while providing an insight into our structure, services, and the value we bring to clients.

- Tech stack:
	* Next.js
	* Strapi
	* Postgresql
	* Dokploy
- Technologies:
	* Tailwind CSS
	* React
	* Docker
	* Git

<br>

## Installation
* Environement example
	*	<details>
		<summary>In ./next (click to expand)</summary>
		<pre>
		COMPOSE_BAKE=
		STRAPI_API_TOKEN=
		STRAPI_API_URL=
		STRAPI_URL=</pre>
		</details>
	*	<details>
		<summary> In ./strapi/ (click to expand)</summary>
		<pre>
		STRAPI_URL=
		HOST=
		PORT=
		APP_KEYS=
		API_TOKEN_SALT=
		ADMIN_JWT_SECRET=
		TRANSFER_TOKEN_SALT=
		ENCRYPTION_KEY=
		DATABASE_CLIENT=
		DATABASE_HOST=
		DATABASE_PORT=
		DATABASE_NAME=
		DATABASE_USERNAME=
		DATABASE_PASSWORD=
		POSTGRES_USER=
		POSTGRES_PASSWORD=
		POSTGRES_DB=s
		JWT_SECRET=</pre>
		</details>
* Run locally in dev mode
<pre>docker compose -f docker-compose.dev.yaml up --build</pre>
* Run locally in production mode
<pre>docker compose -f docker-compose.staging.yaml up --build</pre>

