const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; // FIXED: Use uppercase PORT

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Template engine
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

// MySQL Database Connection
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Check Database Connection
con.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL database.");
  connection.release(); // Release connection back to the pool
});

// Router
const routes = require("./server/routes/employee");
app.use("/", routes);

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// Start Server
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
