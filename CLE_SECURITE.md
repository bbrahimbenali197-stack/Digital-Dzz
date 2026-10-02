# Clé de sécurité DIGITAL DZ

Clé actuelle : `DIGITAL-DZ-2026`

Le système fonctionne sans base de données avec une barrière JavaScript sur les pages du site.
La validation est conservée uniquement pendant la session du navigateur.

Pour changer la clé, ouvre `security.js` et remplace la valeur de `ACCESS_KEY`.

Important : GitHub Pages est un hébergement statique. Cette clé n'est pas une authentification serveur forte et un utilisateur technique peut inspecter le code du site. Pour une vraie protection des fichiers, il faut une authentification côté serveur ou un service comme Cloudflare Access.
