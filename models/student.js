const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    courses:{
        courseName:{ type: String, required: true},
        grade: { type: String, required: true}
    }
    //need to add more fields
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;