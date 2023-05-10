const mysql = require('mysql2');
const bodyparser=require('body-parser')
const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config();

// const cors = require("cors");
const login = require('./routes/login');
// const router = express.Router();


const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db_name,
    port: process.env.db_port,
});

connection.connect((err) => {
if (err) throw err;
console.log('Connected!');
});

app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(bodyparser.json())
app.use(express.static("public"));
console.log("helloo");
app.use("/login",login);
// app.get("/login",(req,res)=>{
//     console.log(req)
// })
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    console.log(req)
    res.sendFile(__dirname + "/index.html");
  });

app.post("/login",(req,res)=>{
    if(req.body === undefined){
        res.send("Error: No query found");
        return;
    }
    console.log("[Q] MySQL query:", req.body.query);
    connection.query(req.body.query, function(err, result, fields){
        if (err){
            res.success=false;
            res.send(err);
            return;
        }
        console.log(result)
        result.success=true;
        res.send(result);
    });
})



app.listen(5000,()=>{
    console.log("server started at port 5000")
    // query_mod
})
// module.exports = router;
// module.exports = query_mod;