// Importing necessary modules and dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Creating an instance of the Express application
const app = express();

// Setting the view engine to EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Using bodyParser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));

// Connecting to the MongoDB database using Mongoose
mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Importing and using the "students" route module
app.use("/students", require("./routes/students"));

// Importing the "courses" route module and using it under the "/courses" path
const coursesRouter = require("./routes/courses");
app.use("/courses", coursesRouter);

// Setting up the server to listen on a specific port (default: 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



// Express Setup:

// It requires and sets up the Express.js framework.
// It requires and sets up Mongoose for MongoDB interaction.
// It requires the body-parser middleware for parsing incoming request bodies.
// Express Configuration:

// The view engine is set to EJS (Embedded JavaScript), allowing the use of EJS templates for rendering views.
// BodyParser is configured to handle URL-encoded data.
// The "public" directory is set to serve static files (like stylesheets or images).
// MongoDB Connection:

// It connects to a MongoDB database named "studentDB" running on localhost:27017.
// Routes:

// It uses the "students" route module for paths starting with "/students".
// It uses the "courses" route module for paths starting with "/courses".
// Server Listening:

// The server is configured to listen on port 3000, or the port specified in the environment variable process.env.PORT.


//Set up Express
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// //Connect to MongoDB database using Mongoose
// mongoose.connect("mongodb://localhost:27017/studentDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// //Routes
// app.use("/students", require("./routes/students"));

// const coursesRouter = require("./routes/courses");
// app.use("/courses", coursesRouter);

// //Server Listening on Port 3000
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
