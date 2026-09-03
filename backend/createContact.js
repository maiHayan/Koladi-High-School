/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL CONTACT DATA
========================================================= */

const mongoose = require("mongoose");

require("dotenv").config();

const Contact =
  require("./models/Contact");


/* =========================================================
   INITIAL CONTACT DATA
========================================================= */

const contactData = {

  sectionLabel:
    "GET IN TOUCH",

  sectionHeading:
    "Contact Koladi High School",

  sectionDescription:
    "Have a question or need more information? Get in touch with Koladi High School.",


  /* =======================================================
     ADDRESS
  ======================================================= */

  addressLabel:
    "Address",

  address:
    "Koladi, Pabna, Bangladesh",


  /* =======================================================
     PHONE
  ======================================================= */

  phoneLabel:
    "Phone",

  phoneDisplay:
    "+880 1716-200170",

  phoneLink:
    "+8801716200170",


  /* =======================================================
     EMAIL
  ======================================================= */

  emailLabel:
    "Email",

  email:
    "Official school email",


  /* =======================================================
     OFFICE HOURS
  ======================================================= */

  officeHoursLabel:
    "Office Hours",

  officeDays:
    "Sunday – Thursday",

  officeTime:
    "10:00 AM – 4:00 PM",


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  formHeading:
    "Send Us a Message",

  namePlaceholder:
    "Your Name",

  emailPlaceholder:
    "Your Email",

  subjectPlaceholder:
    "Subject",

  messagePlaceholder:
    "Write your message...",

  buttonText:
    "Send Message →",

};


/* =========================================================
   CREATE CONTACT
========================================================= */

const createContact =
  async () => {

    try {

      await mongoose.connect(
        process.env.MONGO_URI
      );


      console.log(
        "MongoDB connected"
      );


      const existing =
        await Contact.findOne();


      if (existing) {

        console.log(
          "Contact information already exists."
        );

        await mongoose.disconnect();

        return;

      }


      await Contact.create(
        contactData
      );


      console.log(
        "Contact information created successfully."
      );


      await mongoose.disconnect();

    } catch (error) {

      console.error(
        "Failed to create Contact information:",
        error.message
      );

      process.exit(1);

    }

  };


/* =========================================================
   RUN
========================================================= */

createContact();