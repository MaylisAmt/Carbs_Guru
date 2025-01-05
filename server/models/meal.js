import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Goal from './goal.js';

const Meal = sequelize.define('Meal', {
  mealId : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }, 
  goalId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Goal, //Use the model object as the foreign key
      key: 'goalId'
    }
  }
}, {
  tableName: 'meals'
}); 

export default Meal;