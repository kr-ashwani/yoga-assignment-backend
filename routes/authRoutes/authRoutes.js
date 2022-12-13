const express = require('express');
const loginController = require('../../controllers/auth/loginController');
const logoutController = require('../../controllers/auth/logoutController');
const refreshController = require('../../controllers/auth/refreshController');
const signupController = require('../../controllers/auth/signupController');

const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.get('/logout', logoutController);

router.get('/auth/refresh', refreshController);

module.exports = router;
