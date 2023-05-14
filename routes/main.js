const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log(path.join(__dirname, "../../index.html"))
//   res.sendFile(__dirname + "../index.html");
    // res.sendFile(path.join(__dirname, "../../index.html"));
    const filePath =("../../index.html");
  res.sendFile(filePath);
});

module.exports = router;
