const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user :process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

exports.view=(req,res)=>{
    const sortOption = req.query.sort;
    const filterOption = req.query.filter;
    const searchType = req.query.searchType;
    const searchQuery = req.query.searchQuery;

    let query = "select EID,E_Name,Sex,Salary,Address,Ph_no,Email,D_ID,DOJ,DOB,Age from employee, emp_age_exp where EID=E_id"

    if(filterOption){
        if(filterOption === 'a'){
            query += " AND exp > 4";
        }if(filterOption === 'b'){
            query += " AND exp > 2";
        }if(filterOption === 'c'){
            query += " AND exp < 2";
        }if(filterOption === 'd'){
            query += " AND sex = 'M'";
        }if(filterOption === 'e'){
            query += "  AND sex = 'F'";
        }
    }

    if(sortOption){
        if(sortOption === 'D_ID'){
            query += " order by D_ID";
        }if(sortOption === 'age'){
            query += " order by Age";
        }if(sortOption === 'Salary'){
            query += " order by Salary desc";
        }if(sortOption === 'DOJ'){
            query += " order by DOJ desc";
        }
    }

    con.getConnection((err,connection)=>{
        if(err) throw err
        if (searchQuery) {
            if (searchType === "name") {
                query += ` AND E_Name LIKE '%${searchQuery}%'`;
            } else if (searchType === "id") {
                query += ` AND EID = ${connection.escape(searchQuery)}`;
            }
        }
        connection.query(query,(err,rows)=>{
            connection.release();
            if(!err){
                res.render("empd",{rows});
            }else{
                console.log("Error in listing Data "+err);
            }
        });
        });
};

exports.pview=(req,res)=>{
    con.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("select p_id,p_name,budget,c_name,progress, deadline from project , client where client_id=c_id",(err,rows)=>{
                if(!err){
                    res.render("project",{rows});
                }else{
                    console.log("Error in listing Data "+err);
                }
            });
    });

};

exports.newemployee =(req,res) =>{
            res.render("newemployee");
};

exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        const {E_Name,Salary,Sex,DOB,Address,Ph_no,Email,DOJ,D_ID,T_ID}=req.body;

        connection.query("insert into employee (E_Name,Salary,Sex,DOB,Address,Ph_no,Email,DOJ,D_ID,T_ID) values(?,?,?,?,?,?,?,?,?,?)",[E_Name,Salary,Sex,DOB,Address,Ph_no,Email,DOJ,D_ID,T_ID],(err,rows)=>{
            connection.release();
            if (err) {
                    console.error("Error inserting data:", err);
                    if(err.message.includes("foreign key constraint fails")){
                        return res.render('newemployee',{msg:"ERROR : No such Department exist."});
                    }
                    else {
                    return res.render('newemployee', { msg: "Error inserting employee: " + err.message });
                    }
             } else {
                res.render('newemployee', { msg: "Employee added successfully!" });
            }
        });
        });
};

exports.editemp=(req,res)=>{

    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;
        connection.query("select * from employee where Eid=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("editemp",{rows});
            }else{
                console.log("Error in listing Data "+err);
            }
        });
        });    
    
}

exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        const {E_Name,Salary,Sex,Address,Ph_no,Email,D_ID,T_ID}=req.body;
        let id=req.params.id;
        console.log(req.body);
        connection.query("UPDATE employee SET E_Name = ?,Salary =?,Sex =?,Address =?,Ph_no =?,Email =?,D_ID =?,T_ID =? where EID=?"
,[E_Name,Salary,Sex,Address,Ph_no,Email,D_ID,T_ID,id],(err,rows)=>{
            connection.release();
            if(!err){
                con.getConnection((err,connection)=>{
                    if(err) throw err
            
                    let id=req.params.id;
                    connection.query("select * from employee where Eid=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render("editemp",{rows,msg:"Details succesfully Changed"});
                        }else{
                            console.log("Error in listing Data "+err);
                        }
                    });
                    });  
                
            }else{
                console.log("Error in listing Data "+err);
            }
        });
        });
}


exports.deleteemp=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;

        connection.query("delete from employee where Eid=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.redirect("/empd");
                        }else{
                            console.log(err);
                        }
                    });
    });
};

exports.viewprofile=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;

        connection.query(`SELECT * from emp_profile WHERE Eid = ?`,[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render("view",{rows});
                        }else{
                            console.log(err);
                        }
                    });
    });
};

exports.deptdetails = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`SELECT Dept_ID, D_Name FROM department ORDER BY Date_of_Start`, (err, rows) => {
            if (!err) {
                const id = req.params.id; 
                connection.query(
                `SELECT d.Dept_ID, d.D_Name, e.E_Name,e.EID, d.No_of_emp, d.D_location 
                FROM department d 
                LEFT JOIN employee e ON e.EID = d.Manager_ID 
                WHERE d.Dept_ID = ?`, [id],(err, row) => {
                connection.release();
                if (!err) {
                    res.render("department", { row,rows });
                } else {
                    console.log("Error in listing Data: " + err);
                }
            }
        );
            } else {
                console.log("Error in listing Data: " + err);
            }
        });
        
    });
};

exports.add_dept=(req,res)=>{
    res.render("add-department");
};

exports.save_add_dept = (req, res) => {
    const { Dept_ID, D_Name, Manager_ID, No_of_Emp, Date_of_Start, D_location } = req.body;

    con.getConnection((err, connection) => {
        if (err) throw err;

        const query = `INSERT INTO Department (Dept_ID, D_Name, Manager_ID, No_of_Emp, Date_of_Start, D_location)
                       VALUES (?, ?, ?,0,now(), ?)`;

        connection.query(query, [Dept_ID, D_Name, Manager_ID, D_location], (err, rows) => {
            connection.release();
            if (err) {
                console.error("Error inserting data:", err);
                res.render('add-department', { msg: "Error adding department. Please try again." });
            } else {
                res.render('add-department', { msg: "Department added successfully!" });
            }
        });
    });
};



exports.viewachievements=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        
        const id = req.params.id;
        connection.query("select d.D_Name, da.A_id, da.Achievement_Title, da.Description from department d, Department_Achievements da where da.D_ID=d.Dept_ID and da.D_ID=?",[id],(err,rows)=>{
            if(!err){
                connection.query("select EID,E_Name,sex from employee where D_ID = ?",[id],(err,row)=>{
                    connection.release();
                    if(!err){
                        res.render("achievements",{row,rows});
                    }else{
                        console.log("Error in listing Data "+err);
                    }
                });
            }else{
                console.log("Error in listing Data "+err);
            }
        });
    });        
};

exports.assign_emp = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to database:", err);
            res.status(500).send("Database connection error");
            return;
        }
        const projectId = req.params.id; // Project ID from URL

        const query1 = `SELECT * FROM emp_list_to_assign_projects WHERE EID NOT IN (SELECT E_id FROM emp_project WHERE P_ID = ?)`;
        connection.query(query1, [projectId], (err, rows) => {
            if (!err) {
                // Pass `P_ID` to the view for use in each link
                res.render("assign_emp", { rows, P_ID: projectId });
            } else {
                console.log("Error in listing Data:", err);
                res.status(500).send("Error in listing data");
            }
        });
    });
};


exports.assigned = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to database:", err);
            res.status(500).send("Database connection error");
            return;
        }
        const eid = req.params.eid; // Employee ID from the URL
        const pid = req.params.pid; // Project ID from the URL

        const query = `INSERT INTO emp_project (E_ID, P_ID) VALUES (?, ?)`;
        connection.query(query, [eid, pid], (err, result) => {
            if (!err) {
                console.log(`Employee ID ${eid} assigned to Project ID ${pid}`);
                res.redirect(`/assign_emp/${pid}`); // Redirect back to the assign page
            } else {
                console.log("Error inserting data:", err);
                res.status(500).send("Error assigning employee to project");
            }
        });
    });
};