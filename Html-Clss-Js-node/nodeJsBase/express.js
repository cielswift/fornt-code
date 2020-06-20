var express = require("express");
var app = express();

app.get("/",(req,res) => {
    res.send("hello");
});

app.use("/public",express.static("./"));

app.listen(80);