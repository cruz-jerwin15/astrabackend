// controllers/userController.js
const User = require('../models/userModel');

exports.createUser = (req, res) => {
  const user = req.body;
  user.date_added = new Date();
  user.date_updated = new Date();
  User.create(user, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const user = req.body;
  user.date_updated = new Date();
  User.update(req.params.id, user, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated' });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
};
