const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.post("/", (req, res) => {
  if (req.body === undefined) {
    res.send("Error: No query found");
    return;
  }
  connection.query(req.body.query, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }
    if (req.body.query1){
      connection.query(req.body.query1, function(err, result1, fields) {
        if (err) {
          res.send(err);
          return;
        }
        console.log(result)
        console.log(result1)
        
        res.send(result1);
      });
    }else{
      res.send(result)
    }
    
  });
  
  
});

module.exports = router;
