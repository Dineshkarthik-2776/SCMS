const express = require("express");
const exphbs=require("express-handlebars");
const bodyParser = require("body-parser");
const mysql=require("mysql");

require('dotenv').config();

const app=express();
const port=process.env.port || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//static files
app.use(express.static("public"));

//Template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

/*
//MySQL
const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user :process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

//check DBconnection
con.getConnection((err,connection)=>{
if(err) throw err
console.log("connection succes");
});
*/

// router

app.get('/',(req,res)=>{
res.render("home");
}); 


const routes=require("./server/routes/employee");
app.use('/',routes);

//Listen port
app.listen(port,()=>{
console.log("listening port : "+ port);
});