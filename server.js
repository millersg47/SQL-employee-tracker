const express = require('express');
const mysql = require('mysql2');
const 

const PORT = process.env.PORT || 3001;
const app = express();

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
    database: 'business_db'
  },
);

app.use('/departments', depts);
app.use('/roles', roles);
app.use('/employees', emps);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  