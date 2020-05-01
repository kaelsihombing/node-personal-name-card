const express = require('express')
const router = express.Router()

const user = require('./controllers/userController')

// middleware
const authenticate = require('./middlewares/authenticate')
const multer = require('./middlewares/multer')
const validateForm = require('./middlewares/validateForm')

// User Routes
router.post('/users', validateForm, user.create)
router.post('/users/login', validateForm, user.auth)
router.put('/users', multer, authenticate, user.update)

// Name Card Routes


module.exports = router;