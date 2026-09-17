const express = require('express')
const app = express() //missing parentesses 
const dotenv = require('dotenv').config() // port was not defined 
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;

const artifactRoutes = require('./routes/artifacts.routes')
const reviewRoutes = require('./routes/reviews.routes') // spelling mistake it should be reviews not review "s"

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🍃 Connected to the Royal Archives')
  } catch (error) {
    console.log('❌ The Royal Archives could not be opened:', error)
  }
}

connectToDB() //not conntect it is connect 

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use('/artifacts', artifactRoutes)
app.use('/artifacts/:artifactId/reviews', reviewRoutes)

// app.listen(PORT, () => {
//   console.log(`⚔️ Royal Server listening on port ${PORT}`)
// })



// defining the port 
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
  console.log(`⚔️ Royal Server listening on port ${PORT}`)
})
}

startServer()