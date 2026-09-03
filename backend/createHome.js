/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL HOME PAGE DATA
========================================================= */

const mongoose = require("mongoose");
require("dotenv").config();

const Home = require("./models/Home");


/* =========================================================
   INITIAL HOME DATA
========================================================= */

const homeData = {

  schoolName:
    "Koladi High School",

  establishedYear:
    1990,

  eiin:
    "125602",

  location:
    "Pabna, Bangladesh",

  tagline:
    "Empowering Students Through Quality Education, Character Building and Leadership.",

  studentsCount:
    1000,

  teachersCount:
    20,

  gpa5Count:
    30,

};


/* =========================================================
   CREATE HOME DATA
========================================================= */

const createHome = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected"
    );


    /* -------------------------------------------------------
       Prevent duplicate record
    ------------------------------------------------------- */

    const existingHome =
      await Home.findOne();


    if (existingHome) {

      console.log(
        "Home page information already exists."
      );

      await mongoose.disconnect();

      return;
    }


    /* -------------------------------------------------------
       Create record
    ------------------------------------------------------- */

    const home =
      await Home.create(
        homeData
      );


    console.log(
      "Home page information created successfully."
    );

    console.log(
      "School:",
      home.schoolName
    );

    console.log(
      "Students:",
      home.studentsCount
    );

    console.log(
      "Teachers:",
      home.teachersCount
    );

    console.log(
      "GPA-5:",
      home.gpa5Count
    );


    await mongoose.disconnect();

  } catch (error) {

    console.error(
      "Failed to create Home information:",
      error.message
    );

    process.exit(1);

  }

};


/* =========================================================
   RUN
========================================================= */

createHome();