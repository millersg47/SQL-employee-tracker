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
       ("Software Manager", 145000, 4)


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Smith", 4 , 11),
       ("Archer", "Adams", 2 , 3),
       ("Debbie", "Doser", 9, 10),
       ("Hillary", "Hammond", 6, 12),
       ("Christy", "Cameron", 1),
       ("Charlie", "Crenshaw", 7, 12),
       ("Andrew", "Anderson", 1),
       ("Conor", "Goodwin", 8, 1),
       ("Matt", "Sanchez", 5, 11), 
       ("Lena", "Villani", 8, 1),
       ("Ryan", "Baerwolf", 7, 12),
       ("Shannon", "Parmley", 3),
       ("Max", "Shelbourne", 6, 12),
       ("Emily", "Bartlett", 11),
       ("Rachel", "Griffing", 12)