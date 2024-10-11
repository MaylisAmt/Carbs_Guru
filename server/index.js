// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env'})
// import express from 'express';
// //import sequelize from 'sequelize';
// import cors from 'cors';
// import {db} from './Models/index.js';
// // import router from './Routes/userRoutes.js';
// import cookieParser from 'cookie-parser';
// import { Sequelize } from '@sequelize/core';
// import { PostgresDialect } from '@sequelize/postgres';
// import { QueryTypes } from 'sequelize';
// import { initAuth } from '@propelauth/express'
// import User from './sequelize/models/User'

// const app = express();
// //use json
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());


// const PORT = process.env.PORT || 3000;  // Utilisation d'une variable d'environnement pour le port
// app.listen(PORT, () => {
//     console.log("Serveur a démarré sur le port", PORT);
// });

// db.sequelize.sync({ force: true }).then(() => {
//     try {
//         console.log("db has been re sync")
//     } catch(error) {
//         console.error("db NOT sync :" + error)
//     }
// });

//routes for the user API
// app.use('/api/users', router)

// app.get('/test', (req, res, next) => {
//     try {
//         res.status(200).json({message: 'Page de test backend'});
//     } catch(err) {
//         next(err);
//     }
// });

// const {
//     requireUser,
//     fetchUserMetadataByUserId,
// } = initAuth({
//     authUrl: "https://1184511552.propelauthtest.com",
//     apiKey: "d2c0daa1d6699c898a5cd8e5b050c04e9efea617c679f3c5e4fbb38500fb1d973ca55ee249156a6cd77eb1f98cc5a588"
// });

// const sequelize = new Sequelize({
//     dialect: PostgresDialect,
//     database: process.env.POSTGRES_DB,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: 'db',
//     port: 5432
//   });

// try {
//     await sequelize.authenticate();
//     console.log("db is connected");
// } catch(error) {
//     console.log("Not connected");
// }

// try {
//     await User.sync({ alter: true });
//     console.log("Table Users synchronisée");
// } catch(error) {
//     console.error("Table Users PAS sync: ", error);
// }

// app.get("/api/whoami", requireUser, (req, res) => {
//     res.status(200).json({message: `Hello user with ID + ${req.user.userId}`, username: `The username is ${req.user.username}`});
// });

// app.get("/testrecupid", requireUser, (req, res) => {
//     res.status(200).json(`${req.user.firstName}`)
// })



// const programs = await sequelize.query('SELECT * FROM Program', {
//   type: QueryTypes.SELECT,
// });

// console.log("Programs: ", programs);

//test api with error handling


// app.get("/programs", requireUser, async (req, res, next)=> {
//     const prog = await sequelize.query("SELECT * FROM Program", {
//         type: QueryTypes.SELECT,
//       });
//     try {
//         res.status(200).json(prog);
//     } catch(err) {
//         next(err);
//     }
// })

// app.get("/newuser/webhook", async (req, res, next) => {
//     try {
//         res.status(200);
//         console.log(req.parser)
//         //console.log(res)
//         //console.log(res.status(200).json(req))
//         //console.log(res);
//         //console.log("display response : " + JSON.stringify(res));
//     } catch(err) {
//         next(err);
//     }
// }
// );

// app.get("/userconnected", requireUser, async (req, res, next) => {
//     try {
//         console.log("User logged in")
//     } catch(err) {
//         next(err)
//     }
// } );

// app.post("/newuser", requireUser, async (req, res, next) => {
//     const user = await sequelize.sync alter true
// })

// app.post("/users", async (req, res) => {
//     const user = await utilisateur.create(
//         {
//             firstName: "name from back",
//             lastName : "lastname from back",
//             email : "email from back"
//         }
//     )
//     try {
//         res.status(200).json({message: "user successfully created"}, {created: user});
//     } catch(err) {
//         next(err);
//     }
// })


import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// ES modules configuration

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

console.log("process env", process.env)
// Database configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'your_password',
  database: process.env.POSTGRES_DB || 'your_database',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false // Set to console.log to see SQL queries
});
// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
// Initialize database and start server
async function initializeApp() {
  await testConnection();
  // Sync all models
  // Note: In production, you might want to use {force: false}
  await sequelize.sync({ force: true });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
initializeApp();
// Export sequelize instance for use in model files
export default sequelize;

//Authenticate token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };

//Create User
const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Page de test backend'});
    } catch(err) {
        next(err);
    }
});

//Route signup
app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = await User.create({
        email,
        password,
        name
        });
        // Generate JWT token
        console.log("JWT_SECRET", process.env.JWT_SECRET)
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        );
        res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
    });

    app.post('/signin', async (req, res) => {
        try {
          const { email, password } = req.body;
          // Find user
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(400).json({ message: 'User not found' });
          }
          // Validate password
          const isValidPassword = await user.validatePassword(password);
          if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
          }
          // Generate JWT token
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
          res.json({
            message: 'Login successful',
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          });
        } catch (error) {
          res.status(500).json({ message: 'Error logging in', error: error.message });
        }
      });
      // Protected Profile Route
      app.get('/profile', authenticateToken, async (req, res) => {
        try {
          const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
          });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
      });

      app.get('/profile', authenticateToken, async (req, res) => {
        try {
          const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
          });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
      });