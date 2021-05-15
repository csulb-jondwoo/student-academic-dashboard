/*global __dirname, process*/
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const pdf = require('html-pdf')

const pdfTemplate = require('../documents')

const authRoutes = require('../routes/auth.js')
const userRoutes = require('../routes/user.js')
const courseRoutes = require('../routes/course.js')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('../config/passport')(passport)

const app = express()
app.use(express.json())

// Database
const CONNECTION_URL = `mongodb+srv://jon:jon123@cluster0.bcfji.mongodb.net/student-academic-dash?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: 'https://student-academic-dashboard.web.app',
    credentials: true,
  })
)

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAg: 1000 * 60 * 60 * 24 * 7, //one week
    },
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello to Academic Dashboard API')
})
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/course', courseRoutes)

app.post('/create-pdf', (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${__dirname}/result.pdf`, (err) => {
      if (err) {
        console.log('Error creating file.')
        res.send(Promise.reject())
      }
      console.log('File created successfully.')
      res.send(Promise.resolve())
    })
})

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})
