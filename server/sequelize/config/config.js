import dotenv from 'dotenv';
dotenv.config()
// NEXT STEP : réussir à utiliser les variables d'environnement dasn ce fichier"

export default {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "localhost",
    dialect : "postgres"
  }
}