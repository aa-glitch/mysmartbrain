const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

// app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res, db) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res, db) => { image.handleImage(req, res, db) })
app.put('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on PORT ${process.env.PORT}`);
})

/*
/ --> res =  this is working
/sigin --> POST  res=success/fail
/register --> POST   res/ret: user
/profile/:userId --> GET  res/ret: user
/image --> PUT
*/
