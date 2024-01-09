// Importing the Mongoose library
const mongoose = require("mongoose");

// Defining the schema for the student
const studentSchema = new mongoose.Schema({
  // Name of the student, should be a String and is required
  name: { type: String, required: true },

  // Roll number of the student, should be a String and is required
  rollNo: { type: String, required: true },

  // Courses that the student is enrolled in
  courses: {
    // Name of the course, should be a String and is required
    courseName: { type: String, required: true },

    // Grade of the student in the course, should be a String and is required
    grade: { type: String, required: true },
  },

  // You mentioned that you need to add more fields here.
  // You can add additional fields as needed for your application.
  // For example:
  // additionalField: { type: SomeType, required: true }
});

// Creating a Mongoose model named 'Student' using the defined schema
const Student = mongoose.model("Student", studentSchema);

// Exporting the Student model to be used in other parts of the application
module.exports = Student;

// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rollNo: { type: String, required: true },
//   courses: {
//     courseName: { type: String, required: true },
//     grade: { type: String, required: true },
//   },
//   //need to add more fields
// });

// const Student = mongoose.model("Student", studentSchema);

// module.exports = Student;
