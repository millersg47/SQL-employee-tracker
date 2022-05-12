const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const api = require('./routes/index.js');

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

app.use('/api', api);

firstQ();

function firstQ(){
  inquirer.prompt([
    {
      type: 'starterQuest',
      message: 'What do you want to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee'],
      type: 'list'
    }
  ])
   .then(answers => {
    let answer = answers.starterQuest;
    console.log(answer);
    checkAns(answer);
    return
  })
}; 

function checkAns(answer) {
  if(answer === 'view all departments') {

  } else if (answer === 'view all roles') {

  } else if (answer === 'view all employees') {

  } else if (answer === 'add a department') {
    
  } else if (answer === 'add a role') {

  } else if (answer === 'add an employee') {
  
  } else if (answer === 'update an employee') {

  }

}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  