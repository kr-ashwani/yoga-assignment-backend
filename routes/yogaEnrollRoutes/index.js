const express = require('express');
const yogaEnrollController = require('../../controllers/yogaEnroll');

const router = express.Router();

router.post('/yogaenroll', yogaEnrollController);

module.exports = router;
