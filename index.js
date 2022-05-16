const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./routes/router");
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
