// Importing necessary modules and dependencies
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../models/student");

// Route to display all students
router.get("/students", async (req, res) => {
  try {
    // Fetching all students from the database
    const students = await Student.find();

    // Rendering a view to display all students
    res.render("index", { students });
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to display the form for adding a new student (creation)
router.get("/students/new", (req, res) => {
  // Rendering a form to add a new student
  res.render("new");
});

// Route to display details of a specific student
router.get("/students/:id", async (req, res) => {
  try {
    // Fetching the specific student by its ID from the database
    const student = await Student.findById(req.params.id);

    // Rendering a view to show details of the specific student
    res.render("show", { student });
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to display the form for editing a specific student
router.get("/students/:id/edit", async (req, res) => {
  try {
    // Fetching the specific student by its ID from the database
    const student = await Student.findById(req.params.id);

    // Rendering a form to edit the specific student
    res.render("edit", { student });
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle the update of a specific student
router.put(
  "/students/:id",
  body("name").notEmpty().trim().escape(),
  body("rollNo").notEmpty().trim().escape(),
  async (req, res) => {
    try {
      // Validating request body using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
      }

      // Extracting name and rollNo from the request body
      const { name, rollNo } = req.body;

      // Updating the specific student in the database
      await Student.findByIdAndUpdate(req.params.id, { name, rollNo });

      // Redirecting to the details page of the updated student
      res.redirect(`/students/${req.params.id}`);
    } catch (err) {
      // Handling errors and sending a 500 Internal Server Error response
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route to delete a specific student
router.delete("/students/:id", async (req, res) => {
  try {
    // Deleting the specific student by its ID from the database
    const student = await Student.findByIdAndDelete(req.params.id);

    // Handling case where the student is not found
    if (!student) {
      return res.status(404).send("Student not found");
    }

    // Redirecting to the students page after deletion
    res.redirect("/students");
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle the creation of a new student
router.post(
  "/students",
  body("name").notEmpty().trim().escape(),
  body("rollNo").notEmpty().trim().escape(),
  async (req, res) => {
    try {
      // Validating request body using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
      }

      // Creating a new Student instance with the provided information
      const newStudent = new Student(req.body);

      // Saving the new student to the database
      await newStudent.save();

      // Redirecting to the students page after creation
      res.redirect("/students");
    } catch (err) {
      // Handling errors and sending a 500 Internal Server Error response
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route to add a course to a specific student
router.post("/students/:id/add-course", async (req, res) => {
  try {
    // Extracting courseName and grade from the request body
    const { courseName, grade } = req.body;

    // Fetching the specific student by its ID from the database
    const student = await Student.findById(req.params.id);

    // Handling case where the student is not found
    if (!student) {
      return res.status(404).send("Student not found");
    }

    // Adding a new course to the student's courses array
    student.courses.push({ courseName, grade });

    // Saving the updated student to the database
    await student.save();

    // Redirecting to the details page of the updated student
    res.redirect(`/students/${req.params.id}`);
  } catch (err) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to remove a course from a specific student
router.delete("/students/:id/remove-course/:courseId", async (req, res) => {
  try {
    // Fetching the specific student by its ID and removing the course by courseId
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $pull: { courses: { _id: req.params.courseId } } },
      { new: true, runValidators: true }
    );

    // Handling case where the student is not found
    if (!student) {
      return res.status(404).send("Student not found");
    }

    // Redirecting to the details page of the updated student
    res.redirect(`/students/${req.params.id}`);
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
// const Student = require("../models/student");
// const { escapeXML } = require("ejs");

// //Display all students
// router.get("/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.render("index", { students });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Add more routes for CRUD operations ( create, read, update, delete)
// //Display the form to add a new student (creation)
// router.get("/students/new", (req, res) => {
//   res.render("new");
// });

// // Display details of a specific student
// router.get("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     res.render("show", { student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Display the form to edit a specific student
// router.get("/students/:id/edit", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     res.render("edit", { student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Handle the update of a specific student
// router.put(
//   "/students/:id",
//   body("name").notEmpty().trim().escape(),
//   body("rollNo").notEmpty().trim().escape(),
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ error: errors.array() });
//       }
//       const { name, rollNo } = req.body;
//       await Student.findByIdAndUpdate(req.params.id, { name, rollNo });
//       res.redirect(`/students/${req.params.id}`);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// //Delete a specific student
// router.delete("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) {
//       return res.status(404).send("Student not found");
//     }
//     res.redirect("/students");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //Handle the creation of a new student
// router.post(
//   "/students",
//   body("name").notEmpty().trim().escape(),
//   body("rollNo").notEmpty().trim().escape(),
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ error: errors.array() });
//       }
//       //   const { name, rollNo } = req.body;
//       const newStudent = new Student(req.body);
//       await newStudent.save();
//       res.redirect("/students");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// //Add a course to a specific student
// router.post("/students/:id/add-course", async (req, res) => {
//   try {
//     const { courseName, grade } = req.body;
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).send("Student not found");
//     }
//     student.courses.push({ courseName, grade });
//     await student.save();
//     res.redirect(`/students/${req.params.id}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Remove a course from a specific student
// router.delete("/students/:id/remove-course/:courseId", async (req, res) => {
//   try {
//     const student = await Student.findById(
//       req.params.id,
//       {$pull: { courses: { _id: req.params.courseId } } },
//       { new: true, runValidators: true }
//     );

//     if (!student) {
//       return res.status(404).send("Student not found");
//     }

//     // student.courses.id(req.params.courseId).remove();
//     // await student.save();
//     res.redirect(`/students/${req.params.id}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;
