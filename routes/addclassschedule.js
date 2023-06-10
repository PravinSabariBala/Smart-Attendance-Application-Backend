const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',
    user: 'root',
    password: 'sc@7005312',
    database: 'smart_attendance'
});

// Route to handle the form submission
router.post('/', (req, res) => {
  const { subject, time } = req.body;
  console.log(req.body)

  // Get the current date
  const currentDate = moment().format('YYYY-MM-DD');

  // Extract start and end periods from the time slot
  const [startPeriod, endPeriod] = time.split(' - ');

  // Create the SQL query to insert the data into the table
  const query = `
    INSERT INTO class_schedule (course_code, class_date, num_hours, start_period, end_period)
    VALUES (?, ?, 1, ?, ?)
  `;

  // Execute the query
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    connection.query(query, [subject, currentDate, startPeriod, endPeriod], (err, results) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error executing the SQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Data inserted successfully
      return res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

module.exports = router;
