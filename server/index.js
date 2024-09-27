import dotenv from 'dotenv';
dotenv.config({ path: '../.env'})
import express from 'express';
import cors from 'cors';
import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { QueryTypes } from 'sequelize';
import { initAuth } from '@propelauth/express'

const app = express();
//use json
app.use(express.json());
app.use(cors());

const {
    requireUser,
    fetchUserMetadataByUserId,
} = initAuth({
    authUrl: "https://1184511552.propelauthtest.com",
    apiKey: "d2c0daa1d6699c898a5cd8e5b050c04e9efea617c679f3c5e4fbb38500fb1d973ca55ee249156a6cd77eb1f98cc5a588"
});


app.get("/api/whoami", requireUser, (req, res) => {
    res.status(200).json({message: `Hello user with ID + ${req.user.userId}`});
});

app.get("/testrecupid", requireUser, (req, res) => {
    res.status(200).json(`${req.user.userId}`)
})

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

// const programs = await sequelize.query('SELECT * FROM Program', {
//   type: QueryTypes.SELECT,
// });

// console.log("Programs: ", programs);

//test api with error handling
app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Page de test backend'});
    } catch(err) {
        next(err);
    }
});

app.get("/programs", requireUser, async (req, res, next)=> {
    const prog = await sequelize.query("SELECT * FROM Program", {
        type: QueryTypes.SELECT,
      });
    try {
        res.status(200).json(prog);
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