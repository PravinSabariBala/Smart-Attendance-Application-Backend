const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.post("/", (req, res) => {
  if (req.body === undefined) {
    res.send("Error: No query found");
    return;
  }

  console.log("mark");
  console.log("[Q] MySQL query:", req.body.query);
  console.log(req.body);

  let result; // Declare result1 and result variables

  connection.query(req.body.query, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }

    console.log(result);
    console.log('Above is the result object');
    console.log('Result[0]');
    console.log(result[0] === true);

    if (result[0]) {
      console.log("Condition result[0] was true");
      result[1] = { success: true };
      var course_code = result[0].course_code;
      var email = req.body.email;
      var query = `SELECT teacher_id FROM Faculty_Class WHERE course_code = '${course_code}' AND section = (SELECT section FROM Student WHERE email = '${email}')`;

      function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        month = 5;
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      connection.query(query, function(err, result1, fields) {
        if (err) {
          console.log("Error!!!")
          console.log("The query :: ")
          console.log(query);
          res.send(err);
          return;
        }

        console.log("Query to SQL is");
        console.log(query);
        console.log(result1);
        console.log("above is result1");

        if (result1[0]) {
          var query1 = `INSERT INTO Student_Attendance (course_code, student_id, class_date, faculty_id, attendance) VALUES ('${course_code}',(SELECT student_id FROM Student WHERE email = '${email}'),'${getCurrentDate()}','${result1[0].teacher_id}','P')`;
          console.log(query1);

          connection.query(query1, function(err, result2, fields) {
            if (err) {
              console.log('Error occurred during query execution:', err);
              res.status(500).json({ error: 'An error occurred during query execution.' });
              return;
            }

            console.log('updation', result2);
            result[2] = { message: "Successfully marked" };
            res.send(result);
          });

        } else {
          result[1] = { success: false };
          result[2] = { message: "Couldn't find your faculty" };
          res.send(result);
        }

      });

    } else {
      result[1] = { success: false };
      result[2] = { message: "Couldn't find your course" };
      res.send(result);
    }
  });
});

module.exports = router;
