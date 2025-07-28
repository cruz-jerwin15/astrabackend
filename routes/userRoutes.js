const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/all-users', UserController.getAllUsers);
router.put('/:id/status', UserController.updateStatus);

module.exports = router;
