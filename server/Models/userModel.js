import { DataTypes } from "sequelize";
//import sequelize from './index.js'

// User model
const userModel = (sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, // checks for email format
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
    }, {timestamps: true});
    
    return User;
};
 
 // Exporting the module
 export default userModel;
 

//  id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4
// },