const express = require('express');
const router = express.Router();

const state = require('../controllers/state.controller');

router.get('/', state.getStatesLastData);
router.get('/:name', state.getStateData);

module.exports = router;