const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();
const api = express.Router();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'mysqlpassword',
    database: 'movies_db'
  },
);

api.get('/api/', (req, res) =>{
    db.query('', function (err, results) {
      });


});

api.post('/api/', (req, res) =>{
    db.query('', function (err, results) {
      });


});

api.delete('/api/', (req, res) =>{
    db.query('', function (err, results) {
      });


});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  