require('dotenv').config();

const express = require('express');
const { v4 } = require('uuid');
const path = require('path');

const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const Dog = require('./models/dog');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/dog';

const MongoStore = require('connect-mongo');


mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "correction error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
    console.log("store error", e)
})


app.get('/', (req, res) => {
    res.send('k9ja')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/all', async (req, res) => {
    const dogs = await Dog.find({});
    res.render('dogs/index', { dogs })
})

app.get('/buy', async (req, res) => {
    const dog = await Dog.findOne({ name: 'Puppies' })
    res.render('dogs/show', { dog })
})

app.get('/all/:id', async (req, res) => {
    const dog = await Dog.findById(req.params.id)
    if (!dog) {
        res.redirect('dogs/index');
    }


    res.render('dogs/show', { dog });
})

app.get('/contact', (req, res) => {
    res.render('dogs/contact')
})


const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log('Serving on port 3000')
});
