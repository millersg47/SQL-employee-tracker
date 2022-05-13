INSERT INTO departments (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Design"),
       ("Engineering"),
       ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 110000, 2),
       ("Staff Accountant", 90000, 1),
       ("Controller", 150000, 1),
       ("Associate Art Director", 100000, 3),
       ("Junior Designer", 85000, 3),
       ("Junior Software Engineer", 90000, 4),
       ("Senior Software Engineer", 130000, 4),
       ("Account Associate", 80000, 2),
       ("Marketing Coordinator", 75000, 5),
       ("Marketing Manager", 95000, 5),
       ("Art Director", 140000, 3),
       ("Software Manager", 145000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Smith", 4 , null),
       ("Archer", "Adams", 2 , null),
       ("Debbie", "Doser", 9, null),
       ("Hillary", "Hammond", 6, null),
       ("Christy", "Cameron", 1, null),
       ("Charlie", "Crenshaw", 7, null),
       ("Andrew", "Anderson", 1, null),
       ("Conor", "Goodwin", 8, null),
       ("Matt", "Sanchez", 5, null), 
       ("Lena", "Villani", 8, null),
       ("Ryan", "Baerwolf", 7, null),
       ("Shannon", "Parmley", 3, null),
       ("Max", "Shelbourne", 6, null),
       ("Emily", "Bartlett", 11, null),
       ("Rachel", "Griffing", 12, null);