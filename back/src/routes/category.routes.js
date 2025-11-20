const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/category.controller');

// Public read
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

// Protected create/update/delete
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
