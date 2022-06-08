const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth',
  // port: dbConfiguration.db_port,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) return console.error('Connection successful');
  if (err) return console.error(err, 'Connection failed');
});

exports.addUser = async (req, res) => {
  let user = req.body;
  console.log(user);
  const duplicateSql = `SELECT * FROM users WHERE email = ?`;

  mysqlConnection.query(
    duplicateSql,
    [user.email],
    async (err, result) => {
      if (!err) {
        try {
          if (result.length > 0) {
            res.json('user already exists');
          } else {
            const hashedPassword = await bcrypt.hash(user.pwd, 10);
            const sql = `INSERT INTO users (email, pwd, name)
              VALUES 
              (?, ?, ?)`;
            mysqlConnection.query(
              sql,
              [user.email, hashedPassword, user.name],
              (err, result) => {
                if (!err)
                  res.json('User information added successfully');
                if (err)
                  res.json(
                    'Could not add user information' + err.message
                  );
              }
            );
          }
        } catch (error) {
          return error;
        }
      }
      if (err) return res.json(err);
    }
  );
};

exports.isAuth = async (req, res, next) => {
  try {
    if (req.session.isAuth && req.session.uid === 101) {
      next();
    }
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  let user = req.body;
  const sql = `SELECT * from users WHERE id = ?`;
  mysqlConnection.query(sql, [user.id], async (err, rows) => {
    if (!err) {
      try {
        if (await bcrypt.compare(user.pwd, rows[0].pwd)) {
          const { id, email, name } = rows[0];
          req.session.isAuth = true;
          req.session.uid = id;
          req.session.name = name;
          req.session.email = email;
          res.json({ id, email, name });
        } else {
          res.send('Incorrect Username or password');
        }
      } catch (error) {
        return error;
      }
    }
    if (err) return res.json(err);
  });
};

exports.userEvents = (req, res) => {
  let events = [
    {
      _id: '1',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
    {
      _id: '2',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
    {
      _id: '3',
      name: 'Auto Expo',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
  ];
  res.json(events);
};

exports.adminEvents = (req, res) => {
  let specialEvents = [
    {
      _id: '1',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
    {
      _id: '2',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
    {
      _id: '3',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
    {
      _id: '4',
      name: 'Auto Expo Special',
      description: 'lorem ipsum',
      date: '2012-04-25',
    },
  ];
  res.json(specialEvents);
};
