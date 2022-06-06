require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();
const port = 5001;

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  session.cookie.seure = true; //serve secure session
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    // logic to save session to db
  })
);

app.use('/', routes);

app.listen(
  port,
  console.log(`Server listening on http://localhost:${port}`)
);
