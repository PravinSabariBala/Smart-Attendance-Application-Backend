const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12624257',
  password: 'wHbs2IkYrS',
  database: 'sql12624257',
  port: 3306,
  multipleStatements: true
},);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
