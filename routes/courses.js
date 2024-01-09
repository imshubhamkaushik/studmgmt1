// Importing necessary modules and dependencies
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Importing the Course model
const Course = require("../models/course");

// Route to display all courses
router.get("/courses", async (req, res) => {
  try {
    // Fetching all courses from the database
    const courses = await Course.find();

    // Rendering a view to display all courses
    res.render("courses/index", { courses });
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to display the form for adding a new course
router.get("/courses/new", (req, res) => {
  // Rendering a form to add a new course
  res.render("courses/new");
});

// Route to display the form for editing a specific course
router.get("/courses/:id/edit", async (req, res) => {
  try {
    // Fetching the specific course by its ID from the database
    const course = await Course.findById(req.params.id);

    // Rendering a form to edit the specific course
    res.render("courses/edit", { course });
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle the update of a specific course
router.put("/courses/:id", async (req, res) => {
  try {
    // Extracting courseName and grade from the request body
    const { courseName, grade } = req.body;

    // Creating a new Course instance with the updated information
    const newCourse = new Course({ courseName, grade });

    // Saving the updated course to the database
    await newCourse.save();

    // Redirecting to the courses page after the update
    res.redirect("/courses");
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const Course = require("../models/course");

// //Display all course
// router.get("/courses", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.render("courses/index", { courses });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Display the form to add a new course
// router.get("/courses/new", (req, res) => {
//   // render an empty form
//   res.render("courses/new");
// });

// //Display the form to edit a specific course
// router.get("/courses/:id/edit", async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     res.render("courses/edit", { courses });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Handle the update of a specific course
// router.put("/courses/:id", async (req, res) => {
//   try {
//     const { courseName, grade } = req.body;
//     const newCourse = new Course({ courseName, grade });
//     await newCourse.save();
//     res.redirect("/courses");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;
