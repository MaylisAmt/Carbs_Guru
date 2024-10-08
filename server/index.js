import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
import express from 'express';
import cors from 'cors';
import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { QueryTypes } from 'sequelize';

const app = express();
//use json
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'db',
    port: 5432
  });

try {
    await sequelize.authenticate();
    console.log("db is connected");
} catch(error) {
    console.log("Not connected");
}

const programs = await sequelize.query('SELECT * FROM Program', {
  type: QueryTypes.SELECT,
});

console.log("Programs: ", programs);

//test api with error handling
app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Bravo!'});
    } catch(err) {
        next(err);
    }
});

app.get("/programs", async (req, res, next)=> {
    const prog = await sequelize.query("SELECT * FROM Program", {
        type: QueryTypes.SELECT,
      });
    try {
        res.status(200).json({message: prog});
    } catch(err) {
        next(err);
    }
})


app.post("/users", async (req, res) => {
    const user = await utilisateur.create(
        {
            firstName: "name from back",
            lastName : "lastname from back",
            email : "email from back"
        }
    )
    try {
        res.status(200).json({message: "user successfully created"}, {created: user});
    } catch(err) {
        next(err);
    }
})


const PORT = process.env.PORT || 3000;  // Utilisation d'une variable d'environnement pour le port
app.listen(PORT, () => {
    console.log("Serveur a démarré sur le port", PORT);
});