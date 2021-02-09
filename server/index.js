require("dotenv").config();
const express = require("express");
const fileRoute = require("./routes/teams");
const cors = require("cors");
const path = require("path");
require("./db/db");

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(fileRoute);

app.listen(3030, () => {
  console.log("server started on port 3030");
});
