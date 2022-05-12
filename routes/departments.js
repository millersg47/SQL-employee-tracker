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
      });
});

// depts.post('/api/departments', (req, res) =>{
//     db.query('', function (err, results) {
//       });


// });

module.exports = depts;