const express = require('express');
const routeur = express.Router();
const userController = require('../controllers/userController');


routeur.post('/signup',auth);
routeur.post('/login',auth);

module.exports = router;

