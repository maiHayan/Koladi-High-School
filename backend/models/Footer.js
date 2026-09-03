/* =========================================================
   KOLADI HIGH SCHOOL
   FOOTER MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   INFORMATION MODAL SCHEMA
========================================================= */

const informationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      content: {
        type: String,
        default: "",
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   FOOTER SCHEMA
========================================================= */

const footerSchema =
  new mongoose.Schema(
    {
      /* =====================================================
         SCHOOL
      ===================================================== */

      schoolName: {
        type: String,
        default: "Koladi High School",
        trim: true,
      },

      schoolDescription: {
        type: String,
        default:
          "Empowering Students Through Quality Education, Character Building and Leadership.",
        trim: true,
      },

      establishedYear: {
        type: String,
        default: "1990",
        trim: true,
      },

      eiin: {
        type: String,
        default: "125602",
        trim: true,
      },


      /* =====================================================
         SOCIAL MEDIA
      ===================================================== */

      socialHeading: {
        type: String,
        default: "Follow Us",
        trim: true,
      },

      facebookText: {
        type: String,
        default: "Facebook",
        trim: true,
      },

      facebookUrl: {
        type: String,
        default:
          "https://www.facebook.com/Koladi.Pabna",
        trim: true,
      },

      youtubeText: {
        type: String,
        default: "YouTube",
        trim: true,
      },

      youtubeUrl: {
        type: String,
        default: "#",
        trim: true,
      },

      instagramText: {
        type: String,
        default: "Instagram",
        trim: true,
      },

      instagramUrl: {
        type: String,
        default: "#",
        trim: true,
      },


      /* =====================================================
         QUICK LINKS
      ===================================================== */

      quickLinksHeading: {
        type: String,
        default: "Quick Links",
        trim: true,
      },

      homeLabel: {
        type: String,
        default: "Home",
        trim: true,
      },

      aboutLabel: {
        type: String,
        default: "About",
        trim: true,
      },

      academicsLabel: {
        type: String,
        default: "Academics",
        trim: true,
      },

      noticesLabel: {
        type: String,
        default: "Notices",
        trim: true,
      },

      galleryLabel: {
        type: String,
        default: "Gallery",
        trim: true,
      },

      contactLabel: {
        type: String,
        default: "Contact",
        trim: true,
      },


      /* =====================================================
         CONTACT
      ===================================================== */

      contactHeading: {
        type: String,
        default: "Get In Touch",
        trim: true,
      },

      footerAddress: {
        type: String,
        default:
          "Koladi, Pabna Sadar, Pabna, Bangladesh",
        trim: true,
      },

      footerPhoneDisplay: {
        type: String,
        default: "+880 1716-200170",
        trim: true,
      },

      footerPhoneLink: {
        type: String,
        default: "+8801716200170",
        trim: true,
      },

      footerEmail: {
        type: String,
        default: "Official School Email",
        trim: true,
      },

      footerOfficeHours: {
        type: String,
        default: "Sunday – Thursday",
        trim: true,
      },


      /* =====================================================
         INFORMATION
      ===================================================== */

      informationHeading: {
        type: String,
        default: "Information",
        trim: true,
      },

      privacyPolicy: {
        type: informationSchema,
        default: {
          title: "Privacy Policy",
          content: "",
        },
      },

      termsOfUse: {
        type: informationSchema,
        default: {
          title: "Terms of Use",
          content: "",
        },
      },

      accessibility: {
        type: informationSchema,
        default: {
          title: "Accessibility",
          content: "",
        },
      },

      siteInformation: {
        type: informationSchema,
        default: {
          title: "Site Information",
          content: "",
        },
      },


      /* =====================================================
         DEVELOPER
      ===================================================== */

      developerName: {
        type: String,
        default: "Md Abdullah Ibne Hayan",
        trim: true,
      },

      developerLabel: {
        type: String,
        default: "Developed by",
        trim: true,
      },

      developerUniversity: {
        type: String,
        default:
          "Lovely Professional University, India",
        trim: true,
      },

      developerEmail: {
        type: String,
        default:
          "mdabdullahibnehayan@gmail.com",
        trim: true,
      },

      developerLinkedInText: {
        type: String,
        default: "LinkedIn",
        trim: true,
      },

      developerLinkedInUrl: {
        type: String,
        default:
          "https://www.linkedin.com/in/mdabdullahibnehayan/",
        trim: true,
      },


      /* =====================================================
         BOTTOM BAR
      ===================================================== */

      copyrightText: {
        type: String,
        default:
          "© 2026 Koladi High School. All Rights Reserved.",
        trim: true,
      },

      officialWebsiteText: {
        type: String,
        default:
          "Official School Website",
        trim: true,
      },

    },

    {
      timestamps: true,
    }
  );


/* =========================================================
   CREATE MONGOOSE MODEL
========================================================= */

const Footer =
  mongoose.model(
    "Footer",
    footerSchema
  );


/* =========================================================
   EXPORT THE MODEL
========================================================= */

module.exports = Footer;