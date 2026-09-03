/* =========================================================
   KOLADI HIGH SCHOOL
   HOME PAGE MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   HOME PAGE SCHEMA
========================================================= */

const homeSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: "Koladi High School",
      trim: true,
    },

    establishedYear: {
      type: Number,
      default: 1990,
    },

    eiin: {
      type: String,
      default: "125602",
      trim: true,
    },

    location: {
      type: String,
      default: "Pabna, Bangladesh",
      trim: true,
    },

    tagline: {
      type: String,
      default:
        "Empowering Students Through Quality Education, Character Building and Leadership.",
      trim: true,
    },

    studentsCount: {
      type: Number,
      default: 1000,
    },

    teachersCount: {
      type: Number,
      default: 20,
    },

    gpa5Count: {
      type: Number,
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================================
   EXPORT MODEL
========================================================= */

const Home =
  mongoose.model(
    "Home",
    homeSchema
  );

module.exports = Home;