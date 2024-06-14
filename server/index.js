const express = require('express');

const app = express();

//use json
app.use(express.json());

//test api with error handling
app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Bravo!'});
    } catch(err) {
        next(err);
    }
});

//start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));