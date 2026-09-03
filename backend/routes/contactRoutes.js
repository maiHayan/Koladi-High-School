/* =========================================================
   KOLADI HIGH SCHOOL
   CONTACT ROUTES
========================================================= */

const express = require("express");

const Contact =
  require("../models/Contact");

const protect =
  require("../middleware/authMiddleware");

const router =
  express.Router();


/* =========================================================
   GET CONTACT
   GET /api/contact
   Public
========================================================= */

router.get(
  "/",
  async (req, res) => {

    try {

      const contact =
        await Contact.findOne();


      if (!contact) {

        return res.status(404).json({
          message:
            "Contact information not found",
        });

      }


      res.status(200).json(
        contact
      );

    } catch (error) {

      console.error(
        "Contact fetch error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch contact information",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   UPDATE CONTACT
   PUT /api/contact
   Admin only
========================================================= */

router.put(
  "/",
  protect,

  async (req, res) => {

    try {

      let contact =
        await Contact.findOne();


      if (!contact) {

        contact =
          new Contact();

      }


      const fields = [

        "sectionLabel",
        "sectionHeading",
        "sectionDescription",

        "addressLabel",
        "address",

        "phoneLabel",
        "phoneDisplay",
        "phoneLink",

        "emailLabel",
        "email",

        "officeHoursLabel",
        "officeDays",
        "officeTime",

        "formHeading",
        "namePlaceholder",
        "emailPlaceholder",
        "subjectPlaceholder",
        "messagePlaceholder",
        "buttonText",

      ];


      fields.forEach(
        (field) => {

          if (
            req.body[field] !==
            undefined
          ) {

            contact[field] =
              String(
                req.body[field]
              ).trim();

          }

        }
      );


      const savedContact =
        await contact.save();


      res.status(200).json(
        savedContact
      );

    } catch (error) {

      console.error(
        "Contact update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update contact information",

        error:
          error.message,

      });

    }

  }
);


module.exports =
  router;