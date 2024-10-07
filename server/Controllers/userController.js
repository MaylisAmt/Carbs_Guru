// Importing modules
import bcrypt from 'bcryptjs';
import db from "../Models/index.js";
import jwt from "jsonwebtoken";

// Assigning users to the variable User
const User = db.users;

// Signing a user up
// Hashing user's password before saving it to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { id, username, email, password, avatar } = req.body;
        const data = {
            id,
            username,
            email,
            password: await bcrypt.hash(password, 10),
            avatar,
        };

        // Saving the user
        const user = await User.create(data);

        // If user details are captured
        // Generate token with the user's id and the secretKey in the env file
        // Set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            // Send user details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

// Login authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        // If user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            // If password is the same
            // Generate token with the user's id and the secretKey in the env file
            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                // If password matches with the one in the database
                // Go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                // Send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

// Exporting module
export { signup, login };
