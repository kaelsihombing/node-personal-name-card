const express = require('express')
const router = express.Router()

const user = require('./controllers/userController')
const card = require('./controllers/nameCard')

// middleware
const authenticate = require('./middlewares/authenticate')
const multer = require('./middlewares/multer')
const validateForm = require('./middlewares/validateForm')

// User Routes
router.post('/users', validateForm, user.create);
router.post('/users/login', validateForm, user.auth);
router.put('/users', multer, authenticate, user.update);
router.get('/users', authenticate, user.getMyData);

// Name Card Routes
router.post('/cards', multer, authenticate, card.createNameCard);
router.get('/cards', authenticate, card.getNameCard);
router.delete('/cards', authenticate, card.deleteNameCard);


module.exports = router;