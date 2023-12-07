const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()
const methodOverride = require('method-override')
const ejs = require('express-ejs-layouts')
// const session = require('express-session')
// const { flash } = require('express-flash')


const connectDB = require('./server/config/db')

const port = 5000 || process.env.PORT

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(methodOverride('_method'))

//Connect to DB
connectDB()

//Static Files
app.use(express.static('public'))

// //Express Session
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         maxAge: 1000*60*60*24*7 ,// 1 week
//     }
//   })
// )

// //Flash messages
// app.use(flash())


//Template engines
app.use(expressEjsLayouts)
app.set('layout','./layouts/main')
app.set('view engine','ejs')


//Routes
app.use('/',require('./server/routes/customer'))

//Handle 404
app.get('*',(req,res)=>{
  res.status(404).render('404')
})

app.listen(port , ()=>{
   console.log( `Server is running on ${port} port`)
})