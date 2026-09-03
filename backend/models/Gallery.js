/* =========================================================
   KOLADI HIGH SCHOOL
   GALLERY MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   GALLERY SCHEMA
========================================================= */

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Campus",
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);


/* =========================================================
   EXPORT MODEL
========================================================= */

const Gallery =
  mongoose.model(
    "Gallery",
    gallerySchema
  );

module.exports = Gallery;