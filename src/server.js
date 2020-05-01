const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const app = express();


// database
require('./database.js')

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())
app.use(morgan('tiny'))

const router = require('./router')
app.use('/api/v1', router)

app.get('/', (req, res) => {
   res.status(200).json({
      success: true,
      data: 'Welcome to api'
   })
})

const {
   notFound,
   serverError
} = require('./exceptionHandler.js')

app.use(serverError)
app.use(notFound)

module.exports = app