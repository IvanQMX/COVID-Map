const express = require('express');
const router = express.Router();

const national = require('../controllers/national.controller');

router.get('/', national.getData);

module.exports = router;