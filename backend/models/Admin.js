/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   ADMIN SCHEMA
========================================================= */

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);


/* =========================================================
   EXPORT MODEL
========================================================= */

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;