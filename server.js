const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");

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

function firstQ(){
  inquirer.prompt([
    {
      type: 'firstQuest',
      message: 'What do you want to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee'],
      type: 'list'
    }
  ])
  .then(answers => {
    console.log('Answer:', answers.firstQuest)
  })
}; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  