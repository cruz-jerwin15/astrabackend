const db = require('../config/db');

const UserModel = {
  async create(user) {
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
    } = user;

    const [result] = await db.execute(
      `INSERT INTO tbl_users 
        (stud_emp_id, role, email, password, lastname, firstname, middlename, phone, department_id, yearlevel, course_id, section_id, status, date_added, date_updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, 'PENDING', NOW(), NOW())`,
      [
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
      ]
    );

    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM tbl_users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0];
  },
};

module.exports = UserModel;
