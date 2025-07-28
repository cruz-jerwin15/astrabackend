const bcrypt = require('bcrypt'); // If you decide to hash passwords
const UserModel = require('../models/userModel');

const UserController = {
  async register(req, res) {
    try {
      const {
        stud_emp_id,
        role,
        email,
        password,
        lastname,
        firstname,
        middlename,
        phone,
        department_id,
        yearlevel,
        course_id,
        section_id,
      } = req.body;

      // Example: hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
     // const hashedPassword = password; // For now, no hashing

      const userId = await UserModel.create({
        stud_emp_id,
        role,
        email,
        password: hashedPassword,
        lastname,
        firstname,
        middlename,
        phone,
        department_id,
        yearlevel,
        course_id,
        section_id,
      });

      res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      // res.status(500).json({ error: 'Registration failed' });
      
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(200).json({ message: 'Wrong email or password' });
      }
      
      
      if(user.status=='PENDING'){
        return res.status(200).json({ message: 'Your registration is not yet approve by the administrator',status:0 });
      }else if(user.status=='REMOVED'){
        return res.status(200).json({ message: 'The administrator removed you from active user',status:0 });
      }
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      //const isMatch = password === user.password;

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // In real apps, return JWT here
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  },
  async getAllUsers(req, res){
    try {
      const users = await UserModel.getAllUsersWithDetails();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async updateStatus(req, res) {
    console.log("TEST")
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required.' });
      }

      const result = await UserModel.updateStatusById(id, status);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json({ message: 'Status updated successfully.' });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

module.exports = UserController;
