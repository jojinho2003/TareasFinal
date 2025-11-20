const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/task.controller');

router.get('/', auth, controller.getAllByUser);
router.post('/', auth, controller.create);
router.get('/:id', auth, controller.getOne);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
