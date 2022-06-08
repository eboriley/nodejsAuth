require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const port = 5001;

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'auth',
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions_table',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};

const sessionStore = new MySQLStore(options);

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  session.cookie.secure = true; //serve secure session
}
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { sameSite: 'lax', secure: false },
    // logic to save session to db
  })
);

app.use('/', routes);

app.listen(
  port,
  console.log(`Server listening on http://localhost:${port}`)
);
