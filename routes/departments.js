const express = require('express');
const mysql = require('mysql2');
const depts = express.Router();

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
    db.query('SELECT * from departments', function (err, results) {
      });


});

depts.post('/api/departments', (req, res) =>{
    db.query('', function (err, results) {
      });


});

module.exports = depts;