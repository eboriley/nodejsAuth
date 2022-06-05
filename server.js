require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();
const port = 5001;

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  session.cookie.seure = true; //serve secure session
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    // logic to save session to db
  })
);

app.get('/', (req, res) => {
  res.send('Hello eboriley!');
});

app.listen(
  port,
  console.log(`Server listening on http://localhost:${port}`)
);
