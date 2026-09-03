/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL FOOTER DATA
========================================================= */

const mongoose = require("mongoose");

require("dotenv").config();

const Footer =
  require("./models/Footer");


/* =========================================================
   INITIAL FOOTER DATA
========================================================= */

const footerData = {

  /* =======================================================
     SCHOOL
  ======================================================= */

  schoolName:
    "Koladi High School",

  schoolDescription:
    "Empowering Students Through Quality Education, Character Building and Leadership.",

  establishedYear:
    "1990",

  eiin:
    "125602",


  /* =======================================================
     SOCIAL MEDIA
  ======================================================= */

  socialHeading:
    "Follow Us",

  facebookText:
    "Facebook",

  facebookUrl:
    "https://www.facebook.com/Koladi.Pabna",

  youtubeText:
    "YouTube",

  youtubeUrl:
    "#",

  instagramText:
    "Instagram",

  instagramUrl:
    "#",


  /* =======================================================
     QUICK LINKS
  ======================================================= */

  quickLinksHeading:
    "Quick Links",

  homeLabel:
    "Home",

  aboutLabel:
    "About",

  academicsLabel:
    "Academics",

  noticesLabel:
    "Notices",

  galleryLabel:
    "Gallery",

  contactLabel:
    "Contact",


  /* =======================================================
     CONTACT
  ======================================================= */

  contactHeading:
    "Get In Touch",

  footerAddress:
    "Koladi, Pabna Sadar, Pabna, Bangladesh",

  footerPhoneDisplay:
    "+880 1716-200170",

  footerPhoneLink:
    "+8801716200170",

  footerEmail:
    "Official School Email",

  footerOfficeHours:
    "Sunday – Thursday",


  /* =======================================================
     INFORMATION
  ======================================================= */

  informationHeading:
    "Information",


  privacyPolicy: {

    title:
      "Privacy Policy",

    content:
      `Koladi High School respects the privacy of visitors to its official website.

Information submitted through the website will only be used for official communication and school-related purposes.

We do not intentionally sell, rent or share personal information with unrelated third parties.`,

  },


  termsOfUse: {

    title:
      "Terms of Use",

    content:
      `This website is the official online platform of Koladi High School.

The information published on this website is intended for educational, administrative and informational purposes.

Koladi High School reserves the right to update, remove or modify website content when required.`,

  },


  accessibility: {

    title:
      "Accessibility",

    content:
      `Koladi High School aims to make its website accessible and easy to use for students, parents, teachers and visitors.

We continuously work to improve readability, navigation, keyboard usability and responsive design.`,

  },


  siteInformation: {

    title:
      "Site Information",

    content:
      `Website: Official Koladi High School Website

Established: 1990

EIIN: 125602

Location: Koladi, Pabna Sadar, Pabna, Bangladesh`,

  },


  /* =======================================================
     DEVELOPER
  ======================================================= */

  developerLabel:
    "Developed by",

  developerName:
    "Md Abdullah Ibne Hayan",

  developerUniversity:
    "Lovely Professional University, India",

  developerEmail:
    "mdabdullahibnehayan@gmail.com",

  developerLinkedInText:
    "LinkedIn",

  developerLinkedInUrl:
    "https://www.linkedin.com/in/mdabdullahibnehayan/",


  /* =======================================================
     BOTTOM BAR
  ======================================================= */

  copyrightText:
    "© 2026 Koladi High School. All Rights Reserved.",

  officialWebsiteText:
    "Official School Website",

};


/* =========================================================
   CREATE FOOTER
========================================================= */

const createFooter =
  async () => {

    try {

      await mongoose.connect(
        process.env.MONGO_URI
      );


      console.log(
        "MongoDB connected"
      );


      const existing =
        await Footer.findOne();


      if (existing) {

        console.log(
          "Footer information already exists."
        );

        await mongoose.disconnect();

        return;

      }


      await Footer.create(
        footerData
      );


      console.log(
        "Footer information created successfully."
      );


      await mongoose.disconnect();

    } catch (error) {

      console.error(
        "Failed to create Footer information:",
        error.message
      );

      process.exit(1);

    }

  };


/* =========================================================
   RUN
========================================================= */

createFooter();