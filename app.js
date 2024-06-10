const express = require('express');
//importing mongoose db
const mongoose = require('mongoose');
const path=require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const session = require('express-session');
const flash = require('connect-flash');
const app=express();
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Define Databsase connection on cloud
mongoose.connect("mongodb+srv://resultmanagement1:test123@studentdata.5yr46lb.mongodb.net/studentdata", {
});


//register view engine
const publicPath=path.join(__dirname,'views');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// load css folder 
app.use(express.static('css'))
app.use(express.json());


//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'title/titleHeader');

// Set StudentRoutes & TeacherRoutes
const studentRoutes = require("./routes/studentRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
app.use("/student",studentRoutes);
app.use("/teacher",teacherRoutes);

//route index page  
app.get("/", (req, res) => {
    res.render("index");
  });

// Not found page
app.use((req, res) => {
  res.status(404).render('notFound', { title: '404' });
});

// Function defined for running PORT
app.listen(port, () => {
    console.log(`Running on this app listening at http://localhost:${port}`);
  });