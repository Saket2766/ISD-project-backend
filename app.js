//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentdb", { useNewUrlParser: true });


// data schemas

// use to store the teacher info
const teacherSchema = new mongoose.Schema({
    teacher_name: String,
    teacher_id: String,
    subject: String,
    teacher_password: String,
})


// use to store the subject info
const subSchema = new mongoose.Schema({
    subName:String,
    teacher: teacherSchema,
    grade: Number,
})

// use to store the semester objects and data
const semSchema = new mongoose.Schema({
    subject: [subSchema],
    semName: Number,

})


// use to store the student data
const studentSchema = new mongoose.Schema({
    student_id: String,
    student_name: String,
    password: String,
    semester: [semSchema] 
})

// admin access
const adminSchema = new mongoose.Schema({
    student_details:[studentSchema],
    teacher_details:[teacherSchema],
    course_details:[subSchema],
    function:false,
})


// all collections in the database

const Student = mongoose.model("student", studentSchema);
const Teacher = mongoose.model("teacher",teacherSchema);
const Semester = mongoose.model("semseter",semSchema);
const Subject = mongoose.model("subject",subSchema);
const Admin = mongoose.model("admin",adminSchema);

// new data entries(teacher->subject->sem)

const narendra = new Teacher({
    teacher_name:"narendra singh",
    teacher_id:"1234",
    subject:"english",
    teacher_password:"abc123",
})

// narendra.save()

const english = new Subject({
    subName:"technical communication",
    teacher: narendra,
    grade:100
})

// english.save()

const sem1 = new Semester({
    subject:[english],
    semName:1,
})

// sem1.save()

const rudransh = new Student({
    student_id:'22dec007',
    student_name:'rudransh',
    password:'123ABC',
    semester:[sem1]
})
rudransh.save();

app.get("/student",function(req,res){
    Student.find(function(err,foundNames){
        res.send(foundNames)
    })
})

app.get("/teacher",function(req,res){
    Teacher.find(function(err,foundTeacher){
        res.send(foundTeacher)
    })
})

app.get("/admin",function(req,res){
    Admin.find(function(err,foundAdmin){
        res.send(foundadmin)
    })
})

app.listen(2000, function () {
    console.log("Server started on port 2000");
});






