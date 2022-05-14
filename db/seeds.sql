INSERT INTO departments (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Design"),
       ("Engineering"),
       ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 110000, 2),
       ("Controller", 150000, 1),
       ("Art Director", 140000, 3),
       ("Software Manager", 145000, 4),
       ("Staff Accountant", 90000, 1),
       ("Associate Art Director", 100000, 3),
       ("Junior Designer", 85000, 3),
       ("Junior Software Engineer", 90000, 4),
       ("Senior Software Engineer", 130000, 4),
       ("Account Associate", 80000, 2),
       ("Marketing Manager", 95000, 5),
       ("Marketing Coordinator", 75000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Smith", 1 , null),
       ("Archer", "Adams", 2 , null),
       ("Debbie", "Doser", 3, null),
       ("Hillary", "Hammond", 4, null),
       ("Christy", "Cameron", 5, 2),
       ("Charlie", "Crenshaw", 6, 3),
       ("Andrew", "Anderson", 7, 6),
       ("Conor", "Goodwin", 8, 4),
       ("Matt", "Sanchez", 9, 4), 
       ("Lena", "Villani", 8, 4),
       ("Ryan", "Baerwolf", 10, 1),
       ("Shannon", "Parmley", 11, null),
       ("Max", "Shelbourne", 6, 3),
       ("Emily", "Bartlett", 10, 1),
       ("Rachel", "Griffing", 12, 12);