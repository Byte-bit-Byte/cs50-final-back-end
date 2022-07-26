const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'postgres'
  }
});





// Copied this for deployment later, currently developing back end api
// const db = knex({
//   // connect to your own database here:
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   }
// });

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!
// db.users
app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const PORT = 3001;
// const PORT = process.env.PORT;

app.listen(PORT || 3000, ()=> {
  console.log(`app is running on port ${PORT}`);
})
