const express = require('express');
const mysql = require('mysql2');
const emps = express.Router();

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

emps.get('/api/employees', (req, res) =>{
  //not sure how to capture manager's first name and last name here
  const sql = 'SELECT employees.id as employee_id, employees.first_name as first_name, employees.last_name as last_name, employees.role_id as role_id, roles.title as title, roles.salary as role_salary, employees.manager_id as manager_id FROM employees';

  db.query(sql, function (err, results) {
  
  });
});


emps.post('/api/employees', (req, res) =>{
  const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id), VALUES (?)';
  const params = [
    answers.first_name,
    answers.last_name,
    answers.role_id,
    answers.manager_id,
]
  db.query(sql, params, (err, results) => {
    });


});

emps.put('/api/employees', (req, res) => {
  db.query('UPDATE', function (err, results) {
  });
})



module.exports = emps;