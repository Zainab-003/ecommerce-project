const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./config/db'); // This connects to your database

dotenv.config();

const app = express();

// 1. MIDDLEWARE SETUP

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true, // Prevents XSS from accessing cookies
        maxAge: 1000 * 60 * 60 * 24 // 1 day expiry
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// 2. ROUTES

app.get('/', (req, res) => {
    res.render('home', { title: 'StepNStyle - Home' });
});


// 3. START SERVER

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});