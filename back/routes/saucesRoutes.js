const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const saucesController = require('../controllers/saucesController.js');
const multer = require('../middleware/multer.js');

router.get('/', auth, saucesController.getAllSauces)
router.get('/:id', auth, saucesController.getOneSauce)
router.post('/', auth, multer, saucesController.createSauce)
router.put('/:id', auth, saucesController.modifySauce)
router.delete('/:id', auth, saucesController.deleteSauce)
router.post('/:id/like', auth, saucesController.like);
module.exports = router;