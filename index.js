//here youre creating a web server
require('dotenv').config()
const express = require('express');
const app = express();
//const port = 500;

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())

const singers = require('./models/singers');

const singersRouter = require('./routes/singer')
app.use('/singer', singersRouter)

app.listen(3000, () => console.log('Server Started'))