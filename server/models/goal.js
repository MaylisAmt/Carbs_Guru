import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Goal = sequelize.define('Goal', {
    goalId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, //Use the model object as the foreign key
        key: 'id'
      }
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carbsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    carbsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    proteinsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    proteinsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fatsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fatsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'goals'
  });

  export default Goal;