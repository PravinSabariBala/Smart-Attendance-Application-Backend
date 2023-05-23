const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12619877',
  password: 'd4hsC9EHue',
  database: 'sql12619877',
  port: 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
