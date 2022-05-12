const express = require('express');
const mysql = require('mysql2');
const depts = express.Router();
const cTable = require('console.table');

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

depts.get('/api/departments', (req, res) =>{
  const sql = 'SELECT * from departments'
  db.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: results,
    })

    const deptsTable = cTable.getTable([results]);
    console.log(deptsTable);
    });
});

depts.post('/api/departments', ({ body }, res) =>{
  const sql = 'INSERT INTO departments (department_name) VALUES (?)';
  const params = {
    department_name: answers.department_name
  };

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(404).json({error:err.message});
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

module.exports = depts;