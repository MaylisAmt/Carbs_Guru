-- Se connecter à la base de données PostgreSQL
\c PostgreSQL;

-- Exemple d'insertion de données dans la table Users
INSERT INTO Users (username, email, password) VALUES 
    ('admin', 'admin@example.com', 'adminpassword');

-- Exemple d'insertion de données dans la table Program
INSERT INTO Program (name, description, goals) VALUES 
    ('Program A', 'Description of Program A', 'Goals for Program A'),
    ('Program B', 'Description of Program B', 'Goals for Program B');
