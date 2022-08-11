const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'process.env.DATABASE_URL',
      ssl: true
    // //   port : 3306,
    //   user : 'postgres',
    //   password : 'joemama',
    //   database : `'smart-brain'`
    }
  });

// I think i remove this
// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()       
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()       
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

//create basic route
app.get('/', (req,res) =>{
    res.send('success')
})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//Mockup Signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//Mockup Register
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})


app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000, ()=>{
    console.log('app is running');
})



// ROUTES

// /signin -- POST (posting user information) -> results in suc or fail
// /register -- POST (add data to our database) -> results in new user
// /profile/:userId --> GET (get user information)
// /image --> PUT (update)