// Importing modules
import express from "express";
//import db from "../Models/index.js";

// Assigning db.users to User variable
const User = db.users;

// Function to check if username or email already exist in the database
// This is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
    // Search the database to see if user exists
    try {
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        // If username exists in the database respond with a status of 409
        if (username) {
            return res.status(409).send("Username already taken");
        }

        // Checking if email already exists
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        // If email exists in the database respond with a status of 409
        if (emailcheck) {
            return res.status(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

// Exporting module
export { saveUser };
