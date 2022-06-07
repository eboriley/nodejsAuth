const router = require('express').Router();
const userController = require('../controllers/users');
const session = require('express-session');

router.get('/', (req, res) => {
  return res.json('Hello eboriley!');
});

router.post('/login', userController.login);

router.get(
  '/people',
  userController.isAuth,
  userController.adminEvents
);

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/register', userController.addUser);
module.exports = router;
