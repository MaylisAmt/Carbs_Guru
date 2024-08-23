import express from 'express';
import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
//use json
app.use(express.json());

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'localhost',
    port: 5432
  });

try {
    await sequelize.authenticate();
    console.log("db is connected");
} catch(error) {
    console.log("Not connected");
}


//test api with error handling
app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Bravo!'});
    } catch(err) {
        next(err);
    }
});


const PORT = process.env.PORT || 3000;  // Utilisation d'une variable d'environnement pour le port
app.listen(PORT, () => {
    console.log("Serveur a démarré sur le port", PORT);
});