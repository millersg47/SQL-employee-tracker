const express = require('express');
const inquirer = require("inquirer");
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

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

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);

firstQ();

function firstQ(){
  inquirer.prompt([
    {
      name: 'starterQuest',
      message: 'What do you want to do?',
      choices: [
        'view all departments', 
        'view all roles', 
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee', 
        'update an employee',
        'exit application'],
      type: 'list'
    }
  ])
   .then (function(answer) {
     checkAns(answer);
   });
}

function checkAns(answer) {
  if(answer === 'view all departments') {
  //need to add the depts.get route here
  } else if (answer === 'view all roles') {
  //need to add the roles.get route here
  } else if (answer === 'view all employees') {
  //need to add the emps.get route here
  } else if (answer === 'add a department') {
    //collects user input
    addDept();
  } else if (answer === 'add a role') {
    //collects user input
    addRole();
  } else if (answer === 'add an employee') {
    //collects user input
    addEmployee()
  } else if (answer === 'update an employee') {

  }

}

function addDept() {
  inquirer.prompt([
    {
      name: 'deptartment_name',
      message: 'What is the name of the department?',
      type: 'input',
    }
  ])
  .then(function(answers){
    console.log(answers);
    //need to add the depts.post route here
  })
  .the(firstQ())
}; 

function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      message: 'What is the title for this new role?',
      type: 'input',
    },
    {
      name: 'salary',
      message: 'What is the salary for this role?',
      type: 'input',
    }, 
    {
      name: 'department_id',
      message: 'What department is this new role in?',
      type: 'list',
      choices: ['Accounting', 'Sales', 'Design', 'Engineering', 'Marketing']
    }
  ])
  .then(function(answers){
    console.log(answers);
    //need to add the depts.post route here
  })
  .then(firstQ())
};

function addEmployee() {
  let roles = [];
  let managers = [];

  //how can I query for the last names and concatenate the results for each row? 
  db.query('SELECT employees.first_name FROM employees', function(err, results) {
    managers.push(results);
  })

  db.query('SELECT roles.title FROM roles', function(err, results) {
    roles.push(results);
  })

  inquirer.prompt([
    {
      name: 'firstName',
      message: 'What is their first name?',
      type: 'input',
    },
    {
      name: 'lastName',
      message: 'What is their last name?',
      type: 'input',
    },
    {
      name: 'role',
      message: 'What is their role?',
      type: 'choices',
      choices: roles
    },
    {
      name: 'manager',
      message: 'Who is their manager?',
      type: 'choices',
      choices: managers
    },
  ])
  .then(function(answers){
    console.log(answers);
    //need to add the emps.post route here
  })
  .then(firstQ())
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  