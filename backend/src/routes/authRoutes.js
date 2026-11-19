const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authController')

router.post('/signup',authcontroller.signup);
router.get('/login',authcontroller.login)

module.exports = router;