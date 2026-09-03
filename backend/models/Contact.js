/* =========================================================
   KOLADI HIGH SCHOOL
   CONTACT MODEL
========================================================= */

const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema(
  {
    sectionLabel: {
      type: String,
      default: "GET IN TOUCH",
      trim: true,
    },

    sectionHeading: {
      type: String,
      default: "Contact Koladi High School",
      trim: true,
    },

    sectionDescription: {
      type: String,
      default:
        "Have a question or need more information? Get in touch with Koladi High School.",
      trim: true,
    },


    /* =====================================================
       ADDRESS
    ===================================================== */

    addressLabel: {
      type: String,
      default: "Address",
      trim: true,
    },

    address: {
      type: String,
      default: "Koladi, Pabna, Bangladesh",
      trim: true,
    },


    /* =====================================================
       PHONE
    ===================================================== */

    phoneLabel: {
      type: String,
      default: "Phone",
      trim: true,
    },

    phoneDisplay: {
      type: String,
      default: "+880 1716-200170",
      trim: true,
    },

    phoneLink: {
      type: String,
      default: "+8801716200170",
      trim: true,
    },


    /* =====================================================
       EMAIL
    ===================================================== */

    emailLabel: {
      type: String,
      default: "Email",
      trim: true,
    },

    email: {
      type: String,
      default: "Official school email",
      trim: true,
    },


    /* =====================================================
       OFFICE HOURS
    ===================================================== */

    officeHoursLabel: {
      type: String,
      default: "Office Hours",
      trim: true,
    },

    officeDays: {
      type: String,
      default: "Sunday – Thursday",
      trim: true,
    },

    officeTime: {
      type: String,
      default: "10:00 AM – 4:00 PM",
      trim: true,
    },


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    formHeading: {
      type: String,
      default: "Send Us a Message",
      trim: true,
    },

    namePlaceholder: {
      type: String,
      default: "Your Name",
      trim: true,
    },

    emailPlaceholder: {
      type: String,
      default: "Your Email",
      trim: true,
    },

    subjectPlaceholder: {
      type: String,
      default: "Subject",
      trim: true,
    },

    messagePlaceholder: {
      type: String,
      default: "Write your message...",
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Send Message →",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const Contact =
  mongoose.model(
    "Contact",
    contactSchema
  );


module.exports =
  Contact;