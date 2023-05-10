const mysql = require('mysql2');
const bodyparser=require('body-parser')
const express = require('express')
const app = express()
const cors=require('cors')
const nodemailer = require('nodemailer');
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
    console.log("Password is",req.body.password)
    connection.query(req.body.query, function(err, result, fields){
        if (err){
            // res.success=false;
            result.send(err);
            return;
        }
        console.log(result[0])
        // print(res)
        
        if ((result[0]) && (result[0].password === req.body.password)){
            // res[1].success=true;
            result[1] = { success: true };
            result[2] = {code:generateRandomNumber()}
            sendEmail(result[0].email, 'Action Required', 'Your access code is ' + result[2].code);
            console.log(result[2])            
        }
        else{
            // res[1].success=false;
            result[1] = { success: false };
        }
        
        
        console.log(result)
        res.send(result);
    });
})


function generateRandomNumber() {
  // Generate a random number between 100000 and 999999 (both inclusive)
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return randomNumber;
}

//nodemailer
async function sendEmail(to, subject, message) {
    try {
      // Configure the email transport options
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'smartattendance@hotmail.com', // generated ethereal user
          pass: '#3attendancesmart', // generated ethereal password
        },
      });
  
      let info = await transporter.sendMail({
        from: 'smartattendance@hotmail.com', // sender address
        // to: 'pravinpsb16@gmail.com', // list of receivers
        to:to,
        subject: subject, // Subject line
        text: message, // plain text body
        html: "<b>" + message + "</b>", // html body
      });
  
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  


app.listen(5000,()=>{
    console.log("server started at port 5000")
    // query_mod
})
// module.exports = router;
// module.exports = query_mod;