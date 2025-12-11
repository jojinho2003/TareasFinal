const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

// Registro y Login
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
