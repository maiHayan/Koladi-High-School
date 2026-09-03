/* =========================================================
   NOTICE MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   NOTICE SCHEMA
========================================================= */

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    isNewNotice: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);


/* =========================================================
   EXPORT MODEL
========================================================= */

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;