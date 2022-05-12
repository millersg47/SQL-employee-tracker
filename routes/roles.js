const express = require('express');
const mysql = require('mysql2');
const roles = express.Router();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'mysqlpassword',
    database: 'business_db'
  },
);


roles.get('/api/roles', (req, res) =>{
  const sql = 'SELECT roles.id as role_id, roles.title as title, roles.salary as role_salary, roles.department_id as as dept_id, departments.department_name as dept_name FROM roles JOIN departments ON roles.department_id = departments.id';

  db.query(sql, function (err, results) {
    });


});

roles.post('/api/roles', (req, res) =>{
  const sql = 'INSERT INTO roles(title, salary, department_id), VALUES (?)';

  db.query(sql, function (err, results) {
    });


});

module.exports = roles;