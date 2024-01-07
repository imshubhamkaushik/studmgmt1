const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Course = require("../models/course");

//Display all course
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("courses/index", { courses });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Display the form to add a new course
router.get("/courses/new", (req, res) => {
  // render an empty form
  res.render("courses/new");
});

//Display the form to edit a specific course
router.get("/courses/:id/edit", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("courses/edit", { courses });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Handle the update of a specific course
router.put("/courses/:id", async (req, res) => {
  try {
    const { courseName, grade } = req.body;
    const newCourse = new Course({ courseName, grade });
    await newCourse.save();
    res.redirect("/courses");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
