if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC_juIy1755BF2Gx6eW7fUUqKA9oIj73ug",
//     authDomain: "cane-corsos-9ja.firebaseapp.com",
//     projectId: "cane-corsos-9ja",
//     storageBucket: "cane-corsos-9ja.appspot.com",
//     messagingSenderId: "539133405848",
//     appId: "1:539133405848:web:564183ce8650ee51e33eed"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const Dog = require('./models/dog');

// const methodOverride = require('method-override');


const dbUrl = 'mongodb://localhost:27017/dog';

// const dogRoutes = require('./routes/dogs');

const MongoStore = require('connect-mongo');

// 'mongodb://localhost:27017/yelp-camp'

// const Joi = require('joi');

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


const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    // crypto: {
    //     secret
    // }
});

store.on("error", function (e) {
    console.log("store error", e)
})

// app.use((req, res, next) => {
//     console.log(req.query)
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success')
//     res.locals.error = req.flash('error')
//     next();
// })




// app.use('/dogs', dogRoutes);

// app.get('/all', (req, res) => {
//     res.render('all', {dogs})
// })

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/all', async (req, res) => {
    const dogs = await Dog.find({});
    // console.log(dogs[0].images[0].url)

    res.render('dogs/index', { dogs })
})

app.get('/buy', async (req, res) => {
    // const id = '61f142432ef280bd7904622e'
    const dog = await Dog.findOne({ name: 'Puppies' })
    res.render('dogs/show', { dog })
})

app.get('/all/:id', async (req, res) => {
    // console.log(req.params);
    const dog = await Dog.findById(req.params.id)
    // await dog.save();
    if (!dog) {
        // req.flash('error', 'Cannot find that campground');
        res.redirect('dogs/index');
    }
    // console.log(dog.name);
    // console.log(dog.images);

    res.render('dogs/show', { dog });
})

app.get('/contact', (req, res) => {
    res.render('dogs/contact')
})


// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page not found, 404'))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Something went wrong'
//     res.status(statusCode).render('error', { err });
// })

const port = 3000

app.listen(port, (err) => {
    if (err) console.log("Error in server setup")
    console.log('Serving on port 80')
});
