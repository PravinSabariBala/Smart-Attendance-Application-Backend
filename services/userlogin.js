const mysql = require('mysql2');
const express = require('express')
// const app = express()

// const connection = mysql.createConnection({
//             host: '127.0.0.1',
//             user: 'root',
//             password: 'Pravin15@',
//             database: 'Smart_Attendance'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected!');
// });

// var userlogin = {
//     query: (req, res, next) => {
// 	if(req.body === undefined){
// 		res.send("Error: No query found");
// 		return;
// 	}
// 	console.log("[Q] MySQL query:", req.body);
//         connection.query(req.body, function(err, result, fields){
//             if (err){
// 		 res.send(err);
// 		 return;
// 	    }
//             console.log(result)
//             res.send(result);
// 	});
//     }
// }
// app.post("/login",(req,res)=>{
//     console.log("post works")
// })
const userlogin=(req,res)=>{
    if(req.body === undefined){
        res.send("Error: No query found");
        return;
    }
    console.log("[Q] MySQL query:", req.body);
    connection.query(req.body, function(err, result, fields){
        if (err){
            
            res.send(err);
            return;
        }
        console.log(result)
        res.send(result);
    });
}
// Router.post('/login', userlogin);

// const query_mod = async(req,res)=>{

// }

module.exports = userlogin;