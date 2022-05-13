const inquirer = require("inquirer");
const mysql = require('mysql2');
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
  firstQ()
);

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
    getDepts();
  } else if (answer === 'view all roles') {
    getRoles();
  } else if (answer === 'view all employees') {
    getEmployees();
  } else if (answer === 'add a department') {
    //collects user input
    addDept();
  } else if (answer === 'add a role') {
    addRole();
  } else if (answer === 'add an employee') {
    addEmployee()
  } else if (answer === 'update an employee') {
    //need to write this function
    updateEmployee();
  }

}

const getDepts = () => {
  const sql = 'SELECT * from departments'
  db.query(sql, (err, results) => {
    if(err) {
      console.log({error: err.message});
      return;
    }
    const deptsTable = cTable.getTable([results]);
    console.log(deptsTable);
    firstQ();
  });
};

function addDept() {
  inquirer.prompt([
    {
      name: 'deptartment_name',
      message: 'What is the name of the department?',
      type: 'input',
    }
  ])
  .then(function(answers){
    addDeptQuery(answers);
  })
}; 

const addDeptQuery = (answers) => {
  const sql = 'INSERT INTO departments (department_name) VALUES (?)';
  const params = [answers.department_name];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.log({error:err.message});
      return;
    }
    console.log({
      message: 'success',
      data: answers,
    });
    firstQ();
  });
};

const getRoles = () =>{
  const sql = 'SELECT roles.id as role_id, roles.title as title, roles.salary as role_salary, roles.department_id as dept_id, departments.department_name as dept_name FROM roles JOIN departments ON roles.department_id = departments.id';

  db.query(sql, function (err, results) {
    if(err) {
      console.log({error: err.message});
      return;
    }
    const rolesTable = cTable.getTable([results]);
    console.log(rolesTable);
    firstQ();
    });
};

const getEmployees = () => {
  //not sure how to capture manager's first name and last name here 
  const sql = 'SELECT employees.id as employee_id, employees.first_name as first_name, employees.last_name as last_name, employees.role_id as role_id, roles.title as title, roles.salary as role_salary, employees.manager_id as manager_id FROM employees';

  db.query(sql, function (err, results) {
    if(err) {
      console.log({error: err.message});
      return;
    }
    const employeesTable = cTable.getTable([results]);
    console.log(employeesTable);
    firstQ();
    });
};

function addRole() {
  const sql = 'SELECT department_name as name, id as value FROM departments';
  db.query(sql, (err, departmentList) => {
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
        choices: departmentList
      }
    ])
    .then(function(answers){
      addRoleQuery (answers);
    })
  });
};


const addRoleQuery = () =>{

    const sql = 'INSERT INTO roles(title, salary, department_id), VALUES (?)';
    const params = [answers.title, answers.salary, answers.department_id]

    db.query(sql, params, (err, results) => {
      if (err) {
        console.log({error:err.message});
        return;
      }
      console.log({
        message: 'success',
        data: answers,
      });
      firstQ();
    });
 

};

async function addEmployee() {
  //how can I query for the last names and concatenate the results for each row? 
  const [ managers ] = await db.promise().query('SELECT CONCAT(first_name, last_name) as name, id as value FROM employees');

  const [ roles ] = await db.promise().query('SELECT title as name, id as value FROM roles');

  const answers = await inquirer.prompt([
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
    addEmpQuery(answers);
};

const addEmpQuery = (answers) => {
  const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id), VALUES (?)';
  const params = [
    answers.first_name,
    answers.last_name,
    answers.role_id,
    answers.manager_id,
]
  db.query(sql, params, (err, results) => {
    if (err) {
    console.log({error:err.message});
    return;
    }
    console.log({
      message: 'success',
      data: answers,
    });
    firstQ();
});
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  