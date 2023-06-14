const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const loginRoutes = require('./routes/login');
const forgotRoutes = require('./routes/forgot')
// const mainRoutes = require('./routes/main');
const resetRoutes = require('./routes/reset');
const fetchRoutes = require('./routes/fetch');

const addclassschedule = require('./routes/addclassschedule')
const queryadminroute = require('./routes/query_admin')
const queryattendance = require('./routes/attendance');
const fetchdata = require('./routes/fetch');


app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.static("public"));

app.use("/admin",queryadminroute);
app.use("/attendance",queryattendance);
app.use("/login", loginRoutes);
app.use("/forgot", forgotRoutes);
app.use("/fetch",fetchdata);
app.use("/reset", resetRoutes);
app.use("/addclassschedule", addclassschedule)
app.use("/attendance", fetchRoutes);

// app.use("/", mainRoutes);

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  console.log(req)
  res.sendFile(__dirname + "/index.html");
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
