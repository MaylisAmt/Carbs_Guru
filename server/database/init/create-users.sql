-- -- Création de l'utilisateur
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_user WHERE usename = '${POSTGRES_USER}') THEN
        -- Créer l'utilisateur avec le mot de passe défini dans l'environnement
        EXECUTE 'CREATE USER ' || quote_ident('${POSTGRES_USER}') || ' WITH PASSWORD ' || quote_literal('${POSTGRES_PASSWORD}');
    END IF;
END $$;
