//Set up Express
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect to MongoDB database using Mongoose
mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Routes
app.use("/students", require("./routes/students"));

const coursesRouter = require("./routes/courses");
app.use("/courses", coursesRouter);

//Server Listening on Port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
