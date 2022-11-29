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
const sub_detSchema = new mongoose.Schema({
    subName: String,
    subHead: String,
    teacher: teacherSchema,
    grade: String,
})

// use to store the semester objects and data
const semSchema = new mongoose.Schema({
    subject: [sub_detSchema],
    semName: String,

})


// use to store the student data
const studentSchema = new mongoose.Schema({
    student_id: String,
    branch: String,
    student_name: String,
    password: String,
    semester: [semSchema]
})

// admin access
const adminSchema = new mongoose.Schema({
    student_details: [studentSchema],
    teacher_details: [teacherSchema],
    course_details: [sub_detSchema],
    function: false,
})


// all collections in the database

const Student = mongoose.model("student", studentSchema);
const Teacher = mongoose.model("teacher", teacherSchema);
const Semester = mongoose.model("semseter", semSchema);
const Subject = mongoose.model("subject", sub_detSchema);
const Admin = mongoose.model("admin", adminSchema);
// new data entries(teacher->subject->sem->admin)

// const narendra = new Teacher({
//     teacher_name: "narendra singh",
//     teacher_id: "1234",
//     subject: "english",
//     teacher_password: "abc123",
// })


app.get("/student", function (req, res) {
    Student.findOne({ student_name: "rudransh" }, function (err, foundName) {
        if (err) {
            console.log(err)
        } else {
            if (foundName) {
                res.send(foundName)
            } else {
                res.send("no user found")
            }
        }
    })

})

app.get("/teacher", function (req, res) {
    Teacher.find(function (err, foundTeacher) {
        res.send(foundTeacher)
    })
})



app.get("/admin", function (req, res) {
    Admin.find(function (err, foundAdmin) {
        res.send(foundAdmin)
    })
})






// const sem1 = new Semester({
//     subject: [english],
//     semName: 1,
// })



// const rudransh = new Student({
//     student_id: '22dec007',
//     student_name: 'rudransh',
//     password: '123ABC',
//     semester: [sem1]
// })


// const admin1 = new Admin({
//     student_details: [rudransh],
//     teacher_details: [narendra],
//     course_details: [english],
// })


// 

// // CCE SUBJECTS(secondSem:2)

// const matheMatics_2 = new Subject({
//     subName: "Mathematics 2",
//     teacher:Teacher.findOne({subject:this.subName}) ,
//     grade: "A"
// })

// matheMatics_2.save()

// const data_structures = new Subject({
//     subName: "Data Structures and Algorithms",
//     teacher: Teacher.findOne({subject:"Data Structures and Algorithms"}) ,
//     grade: "B"
// })
// data_structures.save()

// const enviormental_ecology = new Subject({
//     subName: "Enviormental Ecology and Biology",
//     teacher: Teacher.findOne({subject:this.subName}),
//     grade: "A"
// })
// enviormental_ecology.save()

// const valueEducation = new Subject({
//     subName: "Value Education and Ethics",
//     teacher: Teacher.findOne({subject:"Value Education and Ethics"}),
//     grade: "A"
// })

// valueEducation.save()

// const aE = new Subject({
//     subName: "Analog Electronics",
//     teacher: Teacher.findOne({subject:"Analog Electronics"}),
//     grade: "AB"
// })

// aE.save()

// const dms = new Subject({
//     subName: "Discrete Mathematical Structures",
//     teacher: Teacher.findOne({subject:"Discrete Mathematical Structures"}),
//     grade: "B"
// })

// dms.save()

// const imp = new Subject({
//     subName: "Introduction to Modern Physics",
//     teacher: Teacher.findOne({subject:"Introduction to Modern Physics"}),
//     grade: "AB"
// })

// imp.save()

// // sem_3

// const matheMatics_3 = new Subject({
//     subName: "Mathematics-2",
//     teacher: Teacher.findOne({subject:"Mathematics-2"}),
//     grade: "A"
// })

// matheMatics_3.save()

// const COA = new Subject({
//     subName: "Computer Organisation and Architechure",
//     teacher:Teacher.findOne({subject:"Computer Organisation and Architechure"}) ,
//     grade: "B"
// })

// COA.save()

// const AP = new Subject({
//     subName: "Advanced Programming",
//     teacher: Teacher.findOne({subject:"Advanced Programming"}),
//     grade: "A"
// })

// AP.save()

// const sAs = new Subject({
//     subName: "Signals and Systems",
//     teacher: Teacher.findOne({subject:"Signals and Systems"}),
//     grade: "A"
// })

// sAs.save()

// const dcs = new Subject({
//     subName: "Digital Circuits and Systems",
//     teacher: Teacher.findOne({subject:"Digital Circuits and Systems"}),
//     grade: "AB"
// })


// const idbms = new Subject({
//     subName: "Introduction To Database Management System",
//     teacher: Teacher.findOne({subject:"Introduction To Database Management System"}),
//     grade: "AB"
// })


// // sem:4

// const economics  = new Subject({
//     subName: "Economics For Engineers",
//     teacher: Teacher.findOne({subject:"Economics For Engineers"}) ,
//     grade: "A"
// })



// const pts = new Subject({
//     subName: "Psycology,Technology and Society",
//     teacher: Teacher.findOne({subject:"Psycology,Technology and Society"}),
//     grade: "B"
// })
// const ps = new Subject({
//     subName: "Design and Analysis of Algorithms",
//     teacher: Teacher.findOne({subject:"Design and Analysis of Algorithms"}),
//     grade: "A"
// })

// const toc = new Subject({
//     subName: "Theory of Computation",
//     teacher: Teacher.findOne({subject:"Theory of Computation"}),
//     grade: "A"
// })
// const os = new Subject({
//     subName: "Operating System",
//     teacher:Teacher.findOne({subject:"Operating System"}),
//     grade: "AB"
// })
// const cn = new Subject({
//     subName: "Computer Network",
//     teacher:Teacher.findOne({subject:"Computer Network"}),
//     grade: "B"
// })
// const pe1 = new Subject({
//     subName: "Program elective-1",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })


// // sem 5

// const ai  = new Subject({
//     subName: "Artificial Intelligence",
//     teacher:Teacher.findOne({subject:"Artificial Intelligence"}),
//     grade: "A"
// })



// const cs = new Subject({
//     subName: "Computer Security",
//     teacher:Teacher.findOne({subject:"Computer Security"}) ,
//     grade: "B"
// })
// const ids = new Subject({
//     subName: "Introduction to Data Science",
//     teacher:Teacher.findOne({subject:"Introduction to Data Science"}),
//     grade: "A"
// })

// const se = new Subject({
//     subName: "Software Engineering",
//     teacher:Teacher.findOne({subject:"Software Engineering"}),
//     grade: "A"
// })
// const pe2 = new Subject({
//     subName: "Program Elective-2",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })
// const pe3 = new Subject({
//     subName: "program Elective-3",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "B"
// })

// // sem6

// const iot = new Subject({
//     subName: "Internet of things",
//     teacher:Teacher.findOne({subject:"Internet of things"}),
//     grade: "AB"
// })

// const btp = new Subject({
//     subName: "BTP",
//     teacher:Teacher.findOne({subject:"BTP"}),
//     grade: "AB"
// })

// const oe1 = new Subject({
//     subName: "Other Elective-1",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "C"
// })

// const ml = new Subject({
//     subName: "Machine Learning",
//     teacher:Teacher.findOne({subject:"Machine Learning"}),
//     grade: "AB"
// })

// const se1 = new Subject({
//     subName: "Specilisation elective 1",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })

// // sem 7

// const ibd = new Subject({
//     subName: "Intro To big data",
//     teacher:Teacher.findOne({subject:"Intro To big data"}),
//     grade: "AB"
// })

// const se2 = new Subject({
//     subName: "Specilisation elective 2",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })

// sem 8

// const pe4 = new Subject({
//     subName: "program elective 4",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })

// const oe4 = new Subject({
//     subName: "other elective 4",
//     // teacher:Teacher.findOne({subject:subName}),
//     grade: "AB"
// })

// const eiad = new Subject({
//     subName: "Ethics in AI and DS",
//     teacher:Teacher.findOne({subject:"Ethics in AI and DS"}),
//     grade: "AB"
// })

const sem1 = new Semester({
    subject:[],
    semName:1
})

const sem2 = new Semester({
    semName:2 
})

// student data

const rudransh = new Student({
    student_id:"22dec007",
    branch:"ECE",
    student_name:"Rudransh Shinghal",
    student_password:"1234",
    semester:[sem1]
})

rudransh.save()

const sajal = new Student({
    student_id:"20UCS168",
    branch:"CSE",
    student_name:"Sajal Sharma",
    student_password:"1234",
    semester:[sem1]
})

sajal.save()








app.listen(2000, function () {
    console.log("Server started on port 2000");
});






