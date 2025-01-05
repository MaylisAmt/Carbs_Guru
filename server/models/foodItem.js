import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FoodItem = sequelize.define('FoodItem', {
  foodId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  foodName:{
    type : DataTypes.STRING,
    allowNull: false
  },
  nutrient:{
    type : DataTypes.ENUM('carbs', 'proteins', 'fats'),
    allowNull:false
  },
  nutrient_value : {
    type : DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'food_items'
});

export default FoodItem;