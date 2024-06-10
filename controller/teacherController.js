
//Define express
const express = require('express');
const mongoose = require('mongoose');
const Data = require('../models/students');


const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLoginPage",{message: req.flash('error') });
 };

 // GET request for teacherOption page
 const teacher_back_option = (req, res) => {
    res.render("teacher/teacherOption");
 };

// GET request for addStudentData page
 const teacher_fetch_get = (req, res) => {
    res.render("teacher/addStudentData",{addstd: req.flash('error')});
};


// POST Student Data
 const teacher_studentAdd_post=async(req,res)=>{
    const data=new Data(req.body);
    const allDataFind = await Data.find() 
    let isDuplicate = false;

    // Apply forEach loop to find the duolicate roll number
    allDataFind.forEach(element => {
        if (element.roll === data.roll) {
            isDuplicate = true; // Set flag to true if duplicate is found
        }
    });
       if(isDuplicate){
        res.render("teacher/addStudentData",{addstd : "Roll no must be unique!"})
       }
    else if(data.roll<=0){
        res.render("teacher/addStudentData",{addstd : "Incorrect Roll no.."})
    }
    else{
    await data.save()
    res.redirect("/teacher/add");
    }
};

// GET All data
const teacher_viewAllData_get = async (req, res) => {
    const getAllStudentsData = await Data.find() 
    res.render("teacher/viewAllStudentData", {studentsData : getAllStudentsData})
};

//GET edit data operation 
const teacher_studentDataEdit_get = async(req,res)=>{
   const findData = await Data.findById(req.params.id);
   res.render("teacher/editStudentData",{findData : findData})
};

// Post Edit data 
const teacher_studentDataEdit_post = async(req,res)=>{
    await Data.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/teacher/viewAllStudentData")
};

// Delete data operation perform
const teacher_deleteStudentData_get = async(req,res)=>{
    await Data.findByIdAndDelete(req.params.id);
    res.redirect("/teacher/viewAllStudentData")
};

// POST login credential
const teacher_login_post = (req, res) => {
    if(req.body.password == "test@123"){
        res.redirect("/teacher/teacherOption");
    }
    else{
        res.render("teacher/teacherLoginPage", {message : "Please enter correct Password"});
    }
};



//  exporting teacher controller functions
module.exports={
    teacher_login_post,
    teacher_login_get,
    teacher_fetch_get,
    teacher_studentAdd_post,
    teacher_back_option,
    teacher_viewAllData_get,
    teacher_studentDataEdit_get,
    teacher_studentDataEdit_post,
    teacher_deleteStudentData_get
}