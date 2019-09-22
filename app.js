const routes = require('./routes')
const config = require('./config')

const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const staticAsset = require('static-asset')
const path = require('path')

const app = express()

// database
mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connection
    .on('error', error => console.log('MongoDB Was Errored'))
    .on('close', () => { console.log('MongoDB Was Closed') })
    .on('open', () => { console.log('') })

// mongoose.connect(`mongodb+srv://${config.MONGO_LOGIN}:${config.MONGO_PASSWORD}@adyoudb-gtjh7.mongodb.net/adyouinc?retryWrites=true&w=majority`,  { useNewUrlParser: true })
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)

// session
// app.use(
//     session({
//         secret: config.SESSION_SECRET,
//         resave: true,
//         saveUninitialized: false,
//         store: new MongoStore({
//             mongooseConnection: mongoose.connection
//         })
//     })
// )

// sets & uses
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(staticAsset(path.join(__dirname, "dist")))
app.use(staticAsset(path.join(__dirname, "static")))
app.use('/dist', express.static('dist'))
app.use('/static', express.static('static'))
app.use('/dev', express.static('dev'))
app.use('/upload', express.static('upload'))
app.use('/favicon.ico', express.static('favicon.ico'))

app.use('/sitemap.xml', express.static('sitemap.xml'))
app.use('/robots.txt', express.static('robots.txt'))

// multer
app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
})

// routes
app.get('/', (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log(error)
    }
})


// 404
app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
        res.render('404', { url: req.url })
        return;
    }
})

// listen port
app.listen(80, () => {
    console.log('Listen 80')
})