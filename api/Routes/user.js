const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

console.log('Loading user routes');

router.post('/register', (req, res, next) => {
  userCtrl.registerUser(req, res, next);
});

router.post('/login', (req, res, next) => {
    userCtrl.loginUser(req, res, next);
    });

module.exports = router;
