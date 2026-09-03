/* =========================================================
   KOLADI HIGH SCHOOL
   FOOTER ROUTES
========================================================= */

const express = require("express");

const Footer =
  require("../models/Footer");

const protect =
  require("../middleware/authMiddleware");

const router =
  express.Router();


/* =========================================================
   GET FOOTER
   GET /api/footer
   Public
========================================================= */

router.get(
  "/",
  async (req, res) => {

    try {

      const footer =
        await Footer.findOne();


      if (!footer) {

        return res.status(404).json({

          message:
            "Footer information not found",

        });

      }


      res.status(200).json(
        footer
      );

    } catch (error) {

      console.error(
        "Footer fetch error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch footer information",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   UPDATE FOOTER
   PUT /api/footer
   Admin only
========================================================= */

router.put(
  "/",
  protect,

  async (req, res) => {

    try {

      let footer =
        await Footer.findOne();


      if (!footer) {

        footer =
          new Footer();

      }


      /* =====================================================
         NORMAL EDITABLE FIELDS
      ===================================================== */

      const fields = [

        "schoolName",
        "schoolDescription",
        "establishedYear",
        "eiin",

        "socialHeading",

        "facebookText",
        "facebookUrl",

        "youtubeText",
        "youtubeUrl",

        "instagramText",
        "instagramUrl",

        "quickLinksHeading",

        "homeLabel",
        "aboutLabel",
        "academicsLabel",
        "noticesLabel",
        "galleryLabel",
        "contactLabel",

        "contactHeading",
        "footerAddress",
        "footerPhoneDisplay",
        "footerPhoneLink",
        "footerEmail",
        "footerOfficeHours",

        "informationHeading",

        "copyrightText",
        "officialWebsiteText",

      ];


      fields.forEach(
        (field) => {

          if (
            Object.prototype.hasOwnProperty.call(
              req.body,
              field
            )
          ) {

            footer[field] =
              String(
                req.body[field]
              );

          }

        }
      );


      /* =====================================================
         PRIVACY POLICY
      ===================================================== */

      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "privacyPolicyTitle"
        )
      ) {

        footer.privacyPolicy.title =
          String(
            req.body.privacyPolicyTitle
          );

      }


      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "privacyPolicyContent"
        )
      ) {

        footer.privacyPolicy.content =
          String(
            req.body.privacyPolicyContent
          );

      }


      /* =====================================================
         TERMS OF USE
      ===================================================== */

      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "termsOfUseTitle"
        )
      ) {

        footer.termsOfUse.title =
          String(
            req.body.termsOfUseTitle
          );

      }


      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "termsOfUseContent"
        )
      ) {

        footer.termsOfUse.content =
          String(
            req.body.termsOfUseContent
          );

      }


      /* =====================================================
         ACCESSIBILITY
      ===================================================== */

      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "accessibilityTitle"
        )
      ) {

        footer.accessibility.title =
          String(
            req.body.accessibilityTitle
          );

      }


      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "accessibilityContent"
        )
      ) {

        footer.accessibility.content =
          String(
            req.body.accessibilityContent
          );

      }


      /* =====================================================
         SITE INFORMATION
      ===================================================== */

      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "siteInformationTitle"
        )
      ) {

        footer.siteInformation.title =
          String(
            req.body.siteInformationTitle
          );

      }


      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          "siteInformationContent"
        )
      ) {

        footer.siteInformation.content =
          String(
            req.body.siteInformationContent
          );

      }


      /* =====================================================
         SAVE
      ===================================================== */

      const savedFooter =
        await footer.save();


      console.log(
        "Footer updated successfully"
      );


      res.status(200).json(
        savedFooter
      );

    } catch (error) {

      console.error(
        "Footer update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update footer information",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   EXPORT
========================================================= */

module.exports =
  router;