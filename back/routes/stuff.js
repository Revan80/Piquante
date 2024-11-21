const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/userController');


routeur.get('/', auth, stuffCtrl.getThings)
routeur.get('/', auth, stuffCtrl.getOneThings)
routeur.post('/',auth, stuffCtrl.createThing);
routeur.put('/:id',auth, stuffCtrl.modifyThing)
routeur.DELETE('/:id',auth,stuffCtrl.deleteThing)
routeur.post('/:id/like',auth,stuffCtrl.like)

module.exports = router;