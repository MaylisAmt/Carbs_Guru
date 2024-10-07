// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Utilisateur extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Utilisateur.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Utilisateur',
//   });
//   return Utilisateur;
// };


import { DataTypes } from "sequelize";
import sequelize from '../../index.js';

const User = sequelize.define('User', {
  //Définir les colonnes du modèle
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  }
}, {
  timestamps: true //ajoute les colonnes createdAd et updatedAt
});

