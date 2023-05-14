const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const { sendEmail, generateRandomNumber } = require('../utils');

router.post("/", (req, res) => {
    if (req.body === undefined) {
      res.send("Error: No query found");
      return;
    }
  
    console.log("[Q] MySQL query1:", [req.body.query1, req.body.query2]);
    let result, result1; // Declare result1 and result variables
  
    connection.query(req.body.query1, function(err, rows1, fields) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
  
      result = rows1; // Assign the query result to result variable
  
      connection.query(req.body.query2, function(err1, rows2, fields) {
        if (err1) {
          console.log(err1);
          res.send(err1);
          return;
        }
  
        result1 = rows2; // Assign the query result to result1 variable
  
        console.log(result1, "krof");
        console.log(result);
  
        // Send the results together
        sendEmail(req.body.email,"Reset Successful","Your recent request to reset password is successful!!. Now you can login to your account with new password.")
        res.send({ result, result1 });
      });
    });
  });
  

module.exports = router;
