/* =========================================================
   KOLADI HIGH SCHOOL
   ABOUT SCHOOL MODEL
========================================================= */

const mongoose = require("mongoose");


const aboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default:
        "Building Knowledge, Character & Leadership",
      trim: true,
    },

    descriptionHeading: {
      type: String,
      default: "About Our School",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    secondaryDescriptionHeading: {
      type: String,
      default: "Our Educational Environment",
      trim: true,
    },

    secondaryDescription: {
      type: String,
      default: "",
      trim: true,
    },

    mission: {
      type: String,
      default: "",
      trim: true,
    },

    vision: {
      type: String,
      default: "",
      trim: true,
    },

    studentsCount: {
      type: Number,
      default: 0,
    },

    teachersCount: {
      type: Number,
      default: 0,
    },

    yearsOfExcellence: {
      type: Number,
      default: 0,
    },

    mainImage: {
      type: String,
      default: "",
      trim: true,
    },

    secondaryImage: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const About =
  mongoose.model(
    "About",
    aboutSchema
  );


module.exports = About;