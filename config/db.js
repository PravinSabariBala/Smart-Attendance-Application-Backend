const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12617971',
  password: '67FC8yGtph',
  database: 'sql12617971',
  port: 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
