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
  console.log("Password is", req.body.password);

  connection.query(req.body.query, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }
    
    console.log(result[0]);
    
    if (result[0] && result[0].password === req.body.password) {
      result[1] = { success: true };
      result[2] = { code: generateRandomNumber() };
      sendEmail(result[0].email, 'Action Required', 'Your access code is ' + result[2].code);
      console.log(result[2]);
    } else {
      result[1] = { success: false };
    }
    
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
