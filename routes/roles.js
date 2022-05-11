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
    db.query('SELECT * from roles', function (err, results) {
      });


});

roles.post('/api/roles', (req, res) =>{
    db.query('INSERT INTO roles', function (err, results) {
      });


});

module.exports = roles;