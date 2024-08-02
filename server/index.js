import express from 'express';
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
//use json
app.use(express.json());



const db = new Sequelize (
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    }
)
try {
    db.authenticate();
    console.log("db is connected");
} catch(err) {
    console.log("Not connected");
}
console.log('Password:', process.env.POSTGRES_PASSWORD);

    

//test api with error handling
app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Bravo!'});
    } catch(err) {
        next(err);
    }
});

