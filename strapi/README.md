Export content:
docker exec -it strapi-dev npm run strapi export -- --file strapi-backup.tar.gz.enc

Import content:
docker exec -it strapi-dev npm run strapi import -- --file strapi-backup.tar.gz.enc

Create new admin:
http://localhost:1337/admin
