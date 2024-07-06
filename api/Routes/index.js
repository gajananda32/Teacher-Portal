    // routes/index.js
const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/student', require('./student'));

module.exports = router;
