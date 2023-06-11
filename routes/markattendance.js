const express = require('express');
const router = express.Router();
const connection = require('../config/db');


router.post("/", (req, res) => {
    if (req.body === undefined) {
      res.send("Error: No query found");
      return;
    }
    console.log("mark")
    console.log("[Q] MySQL query:", req.body.query);
    console.log(req.body)
    let result; // Declare result1 and result variables
    connection.query(req.body.query, function(err, result, fields) {
        if (err) {
          res.send(err);
          return;
        }
        
        console.log(result);
        
        if (result[0]){
            result[1] = { success: true };
            var course_code = result[0].course_code
            var email = req.body.email
            var query = `SELECT teacher_id FROM faculty_class WHERE course_code = '${course_code}' AND section = (SELECT section FROM student WHERE email = '${email}')`;
            function getCurrentDate() {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                var month = String(currentDate.getMonth() + 1).padStart(2, '0');
                month=5;
                const day = String(currentDate.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              }
            connection.query(query, function(err, result1, fields) {
                if (err) {
                  res.send(err);
                  return;
                }
                // console.log("hello",course_code,email)
                console.log(query)
                console.log(result1)
                if (result1[0]){
                    
                    // var query='INSERT INTO Student_Attendance (course_code, student_id, class_date, faculty_id, attendance) VALUES ({course_id}, (SELECT student_id FROM student WHERE email = '{email}'), '${currentDate}', {faculty_id}, 'P')';
                    var query1 = `INSERT INTO Student_Attendance (course_code, student_id, class_date, faculty_id, attendance) VALUES ('${course_code}',(SELECT student_id FROM student WHERE email = '${email}'),'${getCurrentDate()}','${result1[0].teacher_id}','P')`;
                    console.log(query1);

                    connection.query(query1, function(err, result2, fields) {
                    if (err) {
                        console.log('Error occurred during query execution:', err);
                        // Handle the error and send an appropriate response to the client
                        // res.status(500).json({ error: 'An error occurred during query execution.' });
                        return;
                    }

                    console.log('updation', result2);
                    // Send a success response to the client
                    // res.json({ message: 'Attendance marked successfully.' });
                    });
                    result[2] = { message : "Successfully marked"};

                }else{
                    result[1] = { success: false };
                    result[2] = { message : "Couldn't find your faculty"};
                }

            });
        } else {
          result[1] = { success: false };
          result[2] = { message : "Couldn't find your course"};
        }
        
        console.log(result);
        res.send(result);
      });
  });
  

module.exports = router;