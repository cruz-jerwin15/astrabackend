const mysql = require('mysql2/promise');  // add '/promise' here
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_astracare',
});

module.exports = db;