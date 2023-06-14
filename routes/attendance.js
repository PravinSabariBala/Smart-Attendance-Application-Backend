const express = require('express');
const router = express.Router();
const connection = require('../config/db');


router.post("/", (req, res) => {
    if (req.body === undefined) {
      // res.send("Error: No query found");
      return;
    }
    
    // console.log(req.query);
    connection.query(req.body.query, function(err, result, fields) {
      if (err) {
        res.send(err);
        return;
      }
  
      if (result.length==0){
        console.log("Not found");
        res.send(JSON.stringify([
          {
            course_code: '',
            student_id: '',
            class_date: '',
            faculty_id: '',
            attendance: 'No Attendance Data Found'
          }
        ])
      )}
      else{
        console.log(result);
        res.send(result);
      }
    });
  });
  
  module.exports = router;
  