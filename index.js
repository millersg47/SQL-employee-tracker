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
        'update an employee role',
        'exit application'],
      type: 'list'
    }
  ])
   .then (answers => {
     let answer = (answers["starterQuest"]); 
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
    addDept();
  } else if (answer === 'add a role') {
    addRole();
  } else if (answer === 'add an employee') {
    addEmployee()
  } else if (answer === 'update an employee role') {
    updateEmployee();
  } else if (answer === 'exit application') {
    console.log('goodbye!');
    process.exit();
  }

}

const getDepts = () => {
  const sql = 'SELECT departments.id as dept_id, departments.department_name as dept_name from departments'
  db.query(sql, (err, results) => {
    if(err) {
      console.log({error: err.message});
      return;
    }
    console.table(results);
  
    firstQ();
  });
};

function addDept() {
  return inquirer.prompt([
    {
      name: 'deptartment_name',
      message: 'What is the name of the department?',
      type: 'input',
    }
  ])
  .then(answer => {
    const userAns = (answer['deptartment_name']);
    addDeptQuery(userAns);
  })
}; 

const addDeptQuery = (answer) => {
  console.log(answer);
  const sql = 'INSERT INTO departments (department_name) VALUES (?)';
  const params = [answer];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.log({error:err.message});
      return;
    }
    console.log('Success, department added to the departments table!');
    firstQ();
  });
};

const getRoles = () => {
  const sql = 'SELECT roles.id as role_id, roles.title as job_title, roles.salary as role_salary, departments.department_name as dept_name FROM roles JOIN departments ON roles.department_id = departments.id';

  db.query(sql, function (err, results) {
    if(err) {
      console.log({error: err.message});
      return;
    }
    console.table(results);
    firstQ();
    });
};

const getEmployees = () => {
  const sql = 'SELECT employees.id as employee_id, CONCAT(employees.first_name, " ", employees.last_name) as employee_name, roles.title as job_title, roles.salary as role_salary, departments.department_name as dept_name, CONCAT(manager.first_name, " ", manager.last_name) as manager FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id';

  db.query(sql, function (err, results) {
    if(err) {
      console.log({error: err.message});
      return;
    }
    console.table(results);
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
    .then(answer => {
      console.log(answer);
      const title = (answer['title']);
      const salary = (answer['salary']);
      const department = (answer['department_id']);
      addRoleQuery (title, salary, department);
    })
  });
};

const addRoleQuery = (title, salary, department) => {


  const roleSql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
  const params = [title, salary, department];

  db.query(roleSql, params, (err, results) => {
    if (err) {
      console.log({error:err.message});
      return;
    }
    console.log('Success, role added to the roles table!');
    firstQ();
  });

};

const addEmpQuery = (firstName, lastName, role, manager) => {
  const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  const params = [firstName, lastName, role, manager];

  db.query(sql, params, (err, results) => {
    if (err) {
    console.log({error:err.message});
    return;
    }
    console.log('Success, employee added to the employees table!');
    firstQ();
});
};

async function addEmployee() {
  const [ managers ] = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');

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
      type: 'list',
      choices: roles
    },
    {
      name: 'manager',
      message: 'Who is their manager?',
      type: 'list',
      choices: managers
    },
  ]);
  const firstName = (answers['firstName']);
  const lastName = (answers['lastName']);
  const role = (answers['role']);
  const manager = (answers['manager']);
  console.log(firstName, lastName, role, manager);
  
  addEmpQuery(firstName, lastName, role, manager);
};

const updateEmployeeQuery = (employeeName, newRole, newManager) => {
  const sql = 'UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ?';
  const params = [newRole, newManager, employeeName];

  db.query(sql, params, (err, results) => {
    if (err) {
    console.log({error:err.message});
    return;
    }
    console.log('Success, employee updated in database');
    firstQ();
});
}

async function updateEmployee() {
  const [ employees ] = await db.promise().query('SELECT CONCAT (first_name, " ", last_name) as name, id as value FROM employees');
  const [ roles ] = await db.promise().query('SELECT title as name, id as value FROM roles');
  const [ managers ] = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');

  const answers = await inquirer.prompt([
    {
      name: 'employeeName',
      message: 'Which employee would you like to update?',
      type: 'list',
      choices: employees
    }, 
    {
      name: 'newRole',
      message: 'What is their new role?',
      type: 'list',
      choices: roles
    }, 
    {
      name: 'newManager', 
      message: 'Who is their new manager?',
      type: 'list',
      choices: managers
    }
  ]); 

  const employeeName = (answers['employeeName']);
  const newRole = (answers['newRole']);
  const newManager = (answers['newManager'])

  updateEmployeeQuery(employeeName, newRole, newManager);
};


