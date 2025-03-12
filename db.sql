use scms;
show tables;
CREATE TABLE Client (
    C_ID INT PRIMARY KEY,
    C_Name VARCHAR(30),
    Email VARCHAR(50),
    Ph_no VARCHAR(15),
    Region VARCHAR(30)
);

CREATE TABLE Skill (
    Skill_ID INT PRIMARY KEY,
    S_Name VARCHAR(20),
    Level VARCHAR(20)
);

CREATE TABLE Training (
    T_ID INT PRIMARY KEY,
    T_Name VARCHAR(50),
    Duration INT
);

CREATE TABLE Employee (
    EID INT PRIMARY KEY auto_increment,
    E_Name VARCHAR(30),
    Salary DECIMAL(10, 2),
    Sex CHAR(1),
    DOB DATE,
    Address VARCHAR(60),
    Ph_no VARCHAR(15),
    Email VARCHAR(40),
    DOJ DATE,
    D_ID INT,
    T_ID INT);
alter table employee add constraint fky foreign key(D_id) references department(Dept_id) on delete cascade on update cascade;
alter table employee add constraint fkyy foreign key(T_id) references training(T_id) on delete cascade on update cascade;


    CREATE TABLE Department (
    Dept_ID INT PRIMARY KEY,
    D_Name VARCHAR(20),
    Manager_ID INT,
    No_of_Emp INT,
    Date_of_Start DATE,
    D_location VARCHAR(30)
    );
alter table department add constraint un unique (D_name);



CREATE TABLE Department_Achievements(
A_id int primary key,
D_ID INT,
Achievement_Title VARCHAR(40) NOT NULL,
Description text,
foreign key(D_ID) references department(dept_id)
);
alter table department_achievements add constraint fkda foreign key(D_id) references department(Dept_id) on delete cascade on update cascade;


CREATE TABLE Dependent (
    Name VARCHAR(100),
    DOB DATE,
    Relationship VARCHAR(50),
    Sex CHAR(1),
    E_ID INT,
    FOREIGN KEY (E_ID) REFERENCES Employee(EID)
);
alter table dependent add constraint fkd foreign key(E_id) references employee(eid) on delete cascade on update cascade;


CREATE TABLE Emp_Skill (
    E_ID INT,
    S_ID INT,
    FOREIGN KEY (E_ID) REFERENCES Employee(EID),
    FOREIGN KEY (S_ID) REFERENCES Skill(Skill_ID),
    PRIMARY KEY (E_ID, S_ID)
);
alter table emp_skill add constraint fkes foreign key(E_id) references employee(eid) on delete cascade on update cascade;
alter table emp_skill add constraint fkes2 foreign key(s_id) references skill(skill_id) on delete cascade on update cascade;



CREATE TABLE Project (
    P_ID INT PRIMARY KEY,
    P_Name VARCHAR(40),
    Budget DECIMAL(15, 2),
    Client_ID INT,
    Deadline DATE,
    Progress VARCHAR(15),
    FOREIGN KEY (Client_ID) REFERENCES Client(C_ID)
);
alter table project add constraint fkp1 foreign key(client_id) references client(c_id) on delete cascade on update cascade;


CREATE TABLE Emp_Project (
    E_ID INT,
    P_ID INT,
    FOREIGN KEY (E_ID) REFERENCES Employee(EID),
    FOREIGN KEY (P_ID) REFERENCES Project(P_ID),
    PRIMARY KEY (E_ID, P_ID)
);
alter table Emp_Project add constraint fkep1 foreign key(e_id) references employee(eid) on delete cascade on update cascade;
alter table Emp_Project add constraint fkep2 foreign key(p_id) references project(p_id) on delete cascade on update cascade;

CREATE TABLE emp_age_exp (
    E_id INT,
    Age INT,
    exp INT,
    FOREIGN KEY (E_id) REFERENCES Employee(EID)
);



INSERT INTO Department (Dept_ID, D_Name, Manager_ID, No_of_Emp, Date_of_Start, D_location) VALUES
(1, 'Human Resources', 11, 15, '2015-01-20', 'New York'),
(2, 'IT Services', 12, 30, '2018-03-15', 'San Francisco'),
(3, 'Sales', 13, 25, '2017-06-10', 'Chicago');


INSERT INTO Skill (Skill_ID, S_Name, Level) VALUES
(1, 'JavaScript', 'Expert'),
(2, 'Python', 'Intermediate'),
(3, 'Project Management', 'Advanced'),
(4, 'SQL', 'Beginner');

select *from skill;

INSERT INTO Training (T_ID, T_Name, Duration) VALUES
(1, 'Agile Methodologies', 5),
(2, 'Data Science Bootcamp', 10),
(3, 'Leadership Skills', 3),
(4, 'Cloud Computing Basics', 7);

INSERT INTO Client (C_ID, C_Name, Email, Ph_no, Region) VALUES
(1, 'Global Tech', 'contact@globaltech.com', '555-0123', 'North America'),
(2, 'Alpha Innovations', 'info@alphainnovations.com', '555-0456', 'Europe'),
(3, 'Beta Solutions', 'support@betasolutions.com', '555-0789', 'Asia'),
(4, 'Gamma Enterprises', 'sales@gammaenterprises.com', '555-1234', 'South America');

INSERT INTO Employee (E_Name, Salary, Sex, DOB, Address, Ph_no, Email, DOJ, D_ID, T_ID) VALUES
('Dinesh', 60000.00, 'M', '1985-06-15', '123 Elm Street, Springfield', '123-456-7890', 'dinesh.doe@example.com', '2020-01-10', 1, 1),
('Jane Smith', 75000.00, 'F', '1990-08-22', '456 Oak Avenue, Springfield', '234-567-8901', 'jane.smith@example.com', '2019-03-15', 2, 2),
('Michael Johnson', 55000.00, 'M', '1982-02-11', '789 Maple Road, Springfield', '345-678-9012', 'michael.johnson@example.com', '2021-06-20', 1, 1),
('Emily Davis', 62000.50, 'F', '1995-12-30', '101 Pine Circle, Springfield', '456-789-0123', 'emily.davis@example.com', '2022-05-01', 2, 3),
('Chris Brown', 70000.75, 'M', '1988-11-05', '202 Birch Boulevard, Springfield', '567-890-1234', 'chris.brown@example.com', '2018-09-25', 3, 2),
('Sarah Wilson', 52000.00, 'F', '1993-01-20', '303 Cedar Street, Springfield', '678-901-2345', 'sarah.wilson@example.com', '2021-08-15', 2, 4);

INSERT INTO Dependent (Name, DOB, Relationship, Sex, E_ID) VALUES
('Anna Brown', '2010-05-01', 'Daughter', 'F', 11),  
('James Brown', '2012-03-15', 'Son', 'M', 12),      
('Lucy Smith', '2015-08-30', 'Daughter', 'F', 13),  
('Mark Johnson', '2013-02-20', 'Son', 'M', 14);      


INSERT INTO Emp_Skill (E_ID, S_ID) VALUES
(11, 1),
(12, 2),
(13, 3),
(14, 1);


INSERT INTO Project (P_ID, P_Name, Budget, Client_ID, Deadline, Progress) VALUES
(1, 'Project A', 50000.00, 1, '2024-12-31', 'In Progress'),
(2, 'Project B', 75000.00, 2, '2024-11-15', 'Completed'),
(3, 'Project C', 30000.00, 3, '2025-01-20', 'Not Started'),
(4, 'Project D', 40000.00, 4, '2025-03-10', 'In Progress');

INSERT INTO Emp_Project (E_ID, P_ID) VALUES
(11, 1),
(12, 2),
(13, 3),
(14, 4);

INSERT INTO Department_Achievements (A_id, D_ID, Achievement_Title, Description) VALUES
(1, 1, 'Employee Retention Program', 'Successfully implemented a company-wide employee retention program reducing turnover by 20% in 2015.'),
(2, 1, 'Diversity Initiative', 'Launched a diversity and inclusion initiative leading to a 30% increase in diverse hires in 2016.'),
(3, 1, 'HR Software Implementation', 'Led the integration of a new HR management software improving workflow efficiency by 40% in 2017.'),
(4, 2, 'Cloud Migration Project', 'Successfully migrated 90% of company services to cloud infrastructure in 2018.'),
(5, 2, 'Cybersecurity Initiative', 'Implemented a robust cybersecurity framework reducing threats by 50% in 2019.'),
(6, 2, 'AI Integration', 'Led the development of AI-driven support tools, reducing customer support workload by 35% in 2020.'),
(7, 3, 'Top Sales Growth', 'Achieved the highest sales growth of 25% in the region during 2017.'),
(8, 3, 'Customer Loyalty Program', 'Developed a customer loyalty program increasing repeat customers by 40% in 2018.'),
(9, 3, 'Sales Automation', 'Implemented an automation system that increased sales team productivity by 30% in 2019.');


select * from Department_Achievements;

create view profile as 
select Eid,E_Name, Salary, e.Sex, eae.age, Address, Ph_no, Email,DOJ, D_Name, s.S_Name,s.level,dp.Name, dp.Relationship,p.P_Name, t.T_Name,eae.exp
from employee e
left join department d on d.dept_id=e.D_id 
left join emp_skill es on e.Eid=es.E_id
left join skill s on es.s_id = s.Skill_id
left join dependent dp on dp.E_id=e.eid
left join emp_project ep on ep.E_id=e.eid
left join project p on p.p_id = ep.P_id
left join training t on t.t_id=e.t_id
left join emp_age_exp eae on e.Eid = eae.E_ID
where eid=11;


select * from profile;
drop view profile;

delimiter //
create procedure profile_view(in id int)
begin
select * from profile where Eid = id;
end //
delimiter ;

call profile_view(12);


create table emp_age_exp(
E_id int primary key,
Age int,
exp int,
foreign key(E_id) references employee(Eid)
);
alter table Emp_age_exp add constraint fkeae foreign key(e_id) references employee(eid) on delete cascade on update cascade;


delimiter //
create function get_age(id int) returns int
deterministic
begin 
declare age int;
declare eage date;
select DOB  into eage from employee where Eid = id ;
set age = year(current_date()) - year(eage);
return age;
end//
delimiter ;

delimiter //
create function get_exp(id int) returns int
deterministic
begin 
declare exp int;
declare e_exp date;
select DOJ  into e_exp from employee where Eid =id;
set exp = year(current_date()) - year(e_exp);
return exp;
end//
delimiter ;

drop function get_exp;
insert into emp_age_exp values (18,get_age(18),get_exp(18));

select * from emp_age_exp;

delimiter //
create trigger insert_age_exp 
after insert on employee
for each row
begin
insert into emp_age_exp values (new.Eid,get_age(new.Eid),get_exp(new.Eid));
end //
delimiter ;

delimiter //
create trigger update_age_exp 
after update on employee
for each row
begin
declare a int;
declare b int;
set a=get_age(new.Eid);
set b=get_exp(new.Eid);
update emp_age_exp set age= a, exp= b where E_id=new.EID;
end //
delimiter ;



