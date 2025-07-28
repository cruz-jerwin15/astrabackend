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
  async  getAllUsersWithDetails() {
    const [rows] = await db.execute(`
      SELECT 
        tbl_users.*,
        tbl_courses.course_name,
        tbl_sections.section_name,
        tbl_departments.department_name
      FROM tbl_users
      LEFT JOIN tbl_courses ON tbl_users.course_id = tbl_courses.id
      LEFT JOIN tbl_sections ON tbl_users.section_id = tbl_sections.id
      LEFT JOIN tbl_departments ON tbl_users.department_id = tbl_departments.id
      ORDER BY tbl_users.date_updated DESC
    `);
    return rows;
  },
  async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM tbl_users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0];
  },
  async updateStatusById(id, status) {
    const [result] = await db.execute(
      `UPDATE tbl_users SET status = ?, date_updated = NOW() WHERE id = ?`,
      [status, id]
    );
    return result;
  }
  
};

module.exports = UserModel;
