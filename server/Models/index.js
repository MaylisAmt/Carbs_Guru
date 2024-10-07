//importing modules
import { Sequelize } from '@sequelize/core';
//import { DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env'})
import { PostgresDialect } from '@sequelize/postgres';
import userModel from './userModel.js';



const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'db',
    port: 5432
  });

//checking if connection is done
try {
    await sequelize.authenticate();
    console.log("db is connected");
} catch(error) {
    console.log("Not connected");
}

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize
    db.User = userModel(sequelize);  // Passe l'instance sequelize à userModel

// Connecting to model
// db.users = userModel(sequelize, DataTypes);

// Exporting the module
export default db;