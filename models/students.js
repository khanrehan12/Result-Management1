//importing mongoose db
const mongoose = require("mongoose")
const { Schema } = mongoose;

//Students schema
const studentSchema = new Schema({
  roll: {
    type : String,
    unique : true
  },
  name: String,     
  dob:{
    type:Date
  } ,
  score:Number 
});

//exporting the model
module.exports = mongoose.model("students", studentSchema)