# j42l-website

## Developpement
### Setting up for Dev
You should find the dev env files in the vaultwarden. If you can't find them with your account, ask for acces.

###
in /strapi, run yarn install
in /next, run npm install

### Running project in Dev
When developping use the following command to run the project locally:
```docker compose -f docker-compose.dev.yaml up```
When your containers are running normally, go to the following url : http://localhost:1337/admin
There you have to create an admin user (only locally), then follow this guide : https://docs.strapi.io/cms/features/api-tokens
The previous guide explains how to get an API token that shall be included in your next/.env file in the STRAPI_API_TOKEN= variable

### running in prod

```docker compose -f docker-compose.yaml up```
