const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/', (req, res) => {
  res.send('Hello eboriley!');
});

router.post('/login', userController.login);

router.post('/register', userController.addUser);
module.exports = router;
