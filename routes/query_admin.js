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
    res.send(result);
  });
});

module.exports = router;
