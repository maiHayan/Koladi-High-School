/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL ABOUT INFORMATION
========================================================= */

const mongoose = require("mongoose");
require("dotenv").config();

const About = require("./models/About");


/* =========================================================
   INITIAL ABOUT DATA
========================================================= */

const aboutData = {

  heading:
    "Building Knowledge, Character & Leadership",

  description:
    "Koladi High School is committed to providing quality education in a supportive environment where students can develop knowledge, character, confidence and leadership skills.",

  secondaryDescription:
    "Our school focuses on academic excellence, practical learning, cultural activities, sports and the overall development of every student.",

  mission:
    "To provide quality education and create an environment where students can develop strong character, practical skills, confidence and a sense of responsibility.",

  vision:
    "To become a leading educational institution that inspires students to achieve excellence and contribute positively to society.",

  studentsCount:
    0,

  teachersCount:
    0,

  yearsOfExcellence:
    new Date().getFullYear() - 1990,

  mainImage:
    "/gallery/gallery-1.jpg",

  secondaryImage:
    "/gallery/gallery-2.jpg",

};


/* =========================================================
   CREATE ABOUT INFORMATION
========================================================= */

const createAbout = async () => {

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

    const existingAbout =
      await About.findOne();


    if (existingAbout) {

      console.log(
        "About information already exists."
      );

      await mongoose.disconnect();

      return;

    }


    /* -------------------------------------------------------
       Create record
    ------------------------------------------------------- */

    const about =
      await About.create(
        aboutData
      );


    console.log(
      "About information created successfully."
    );

    console.log(
      "Heading:",
      about.heading
    );


    await mongoose.disconnect();

  } catch (error) {

    console.error(
      "Failed to create About information:",
      error.message
    );

    process.exit(1);

  }

};


/* =========================================================
   RUN
========================================================= */

createAbout();