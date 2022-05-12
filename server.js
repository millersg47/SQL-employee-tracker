const express = require('express');
const inquirer = require("inquirer");
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

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
    //need to add depts.post route here
  } else if (answer === 'add a role') {
    //collects user input
    addRole();
    //need to add roles.post route here
  } else if (answer === 'add an employee') {
  
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
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  