//importing modules
import { DataTypes, Sequelize } from 'sequelize';
import {PostgresDialect} from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env'})



console.log('process.env.POSTGRES_USER', process.env.POSTGRES_USER);

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    dialect: 'postgres',
  });

//checking if connection is done
try {
    await sequelize.authenticate();
    console.log("db is connected");
} catch(error) {
    console.log("Not connected");
}

export const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// export const User = sequelize.define("user", {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         isEmail: true, // checks for email format
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     avatar: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: false,
//     },
// }, {tableName: "users", timestamps: true, modelName: 'user'});

// // Connecting to model
// // db.users = userModel(sequelize, DataTypes);

// // Exporting the module
// export default db;