//importing students model class
const Student = require('../models/students');


// GET login page
    const student_login_get = (req, res) => {
      res.render("student/login",{message: req.flash('error')});
   };


const student_login_post = async (req, res) => {
    const studentRoll = req.body.roll; 
    const studentDOB = req.body.dob; 
    const studentId = await Student.findOne({roll : studentRoll});   

      // fetched all the data which is stored in our database 
      const studentId2 = await Student.find();
        studentId2.forEach(std => {
        if(std.roll===studentRoll){
          
          // functions of converted date & timezone with this format YY-MM-DD
          const dob = new Date(studentId.dob);
          const year = dob.getFullYear();
          const month = String(dob.getMonth() + 1).padStart(2, '0');
          const day = String(dob.getDate()).padStart(2, '0');

          // shows DOB desired format
          const formattedDate = `${year}-${month}-${day}`;

          if(formattedDate===studentDOB){
            res.render("student/view", { rollNumber : studentId});
        }else{
          res.render("student/login",{message:"Please enter correct DOB"});
        }
      }
      });
      res.render("student/login",{message:"Please enter correct Roll no"});
    };


//exporting student Controller functions
module.exports={
    student_login_get,
    student_login_post,
}