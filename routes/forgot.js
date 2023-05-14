const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const { sendEmail, generateRandomNumber } = require('../utils');

router.post("/", (req, res) => {
  if (req.body === undefined) {
    res.send("Error: No query found");
    return;
  }
  
  console.log("[Q] MySQL query:", req.body.query);
//   console.log("Password is", req.body.password);

  connection.query(req.body.query, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }
    
    console.log(result[0]);
    if (result[0]){
        console.log("success")
        result[2] = {role:result[0].role}
        result[0] = { success: true };
        result[1] = { code: generateRandomNumber() };
        sendEmail(req.body.email, 'Action Required', 'Your access code is for resetting your password is' + result[1].code);
    }
    else{
        console.log("failure")
        result[0] = { success: false };
    }
    
    
    
    // console.log(result);
    res.send(result);
  });
});

module.exports = router;
