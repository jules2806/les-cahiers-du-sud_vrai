FROM directus/directus:10.8.3

# Configuration de l'administrateur
ENV ADMIN_EMAIL="votre-email@example.com"
ENV ADMIN_PASSWORD="votre-mot-de-passe-securise"

# Configuration de la base de données
ENV DB_CLIENT="pg"
ENV DB_HOST="${PGHOST}"
ENV DB_PORT="${PGPORT}"
ENV DB_DATABASE="${PGDATABASE}"
ENV DB_USER="${PGUSER}"
ENV DB_PASSWORD="${PGPASSWORD}"

# Configuration CORS
ENV CORS_ENABLED="true"
ENV CORS_ORIGIN="*"
ENV CORS_METHODS="GET,POST,PATCH,DELETE"
ENV CORS_ALLOWED_HEADERS="Content-Type,Authorization"
ENV CORS_EXPOSED_HEADERS="Content-Range"
ENV CORS_CREDENTIALS="true"
ENV CORS_MAX_AGE="18000"

EXPOSE 8055 