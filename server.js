const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const loginRoutes = require('./routes/login');
const forgotRoutes = require('./routes/forgot')
// const mainRoutes = require('./routes/main');
const resetRoutes = require('./routes/reset');

const getcoords = require('./routes/getCoords')
const markattendance = require('./routes/markattendance')

const addclassschedule = require('./routes/addclassschedule')
const queryadminroute = require('./routes/query_admin')
const attendance = require('./routes/attendance')

const fetchRoutes = require('./routes/fetch');

app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.static("public"));

app.use("/admin",queryadminroute);
app.use("/login", loginRoutes);
app.use("/forgot", forgotRoutes);
app.use("/reset", resetRoutes);
app.use("/addclassschedule", addclassschedule)
app.use("/getcoords", getcoords)
app.use("/markattendance",markattendance);
app.use("/attendance", attendance);

// app.use("/", mainRoutes);

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  console.log(req)
  res.sendFile(__dirname + "/index.html");
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
