const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../models/student");
const { escapeXML } = require("ejs");

//Display all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.render("index", { students });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Add more routes for CRUD operations ( create, read, update, delete)
//Display the form to add a new student (creation)
router.get("/students/new", (req, res) => {
  res.render("new");
});

// Display details of a specific student
router.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("show", { student });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Display the form to edit a specific student
router.get("/students/:id/edit", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("edit", { student });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Handle the update of a specific student
router.put(
  "/students/:id",
  body("name").notEmpty().trim().escape(),
  body("rollNo").notEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
      }
      const { name, rollNo } = req.body;
      await Student.findByIdAndUpdate(req.params.id, { name, rollNo });
      res.redirect(`/students/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Delete a specific student
router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.redirect("/students");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//Handle the creation of a new student
router.post(
  "/students",
  body("name").notEmpty().trim().escape(),
  body("rollNo").notEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
      }
      //   const { name, rollNo } = req.body;
      const newStudent = new Student(req.body);
      await newStudent.save();
      res.redirect("/students");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Add a course to a specific student
router.post("/students/:id/add-course", async (req, res) => {
  try {
    const { courseName, grade } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    student.courses.push({ courseName, grade });
    await student.save();
    res.redirect(`/students/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Remove a course from a specific student
router.delete("/students/:id/remove-course/:courseId", async (req, res) => {
  try {
    const student = await Student.findById(
      req.params.id,
      {$pull: { courses: { _id: req.params.courseId } } },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).send("Student not found");
    }

    // student.courses.id(req.params.courseId).remove();
    // await student.save();
    res.redirect(`/students/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
