/* =========================================================
   KOLADI HIGH SCHOOL
   ABOUT SCHOOL ROUTES
========================================================= */

const express = require("express");
const fs = require("fs");
const path = require("path");

const About = require("../models/About");
const protect = require("../middleware/authMiddleware");
const createUpload =
  require("../middleware/uploadMiddleware");

const upload =
  createUpload("about");
const router = express.Router();


/* =========================================================
   GET ABOUT INFORMATION
   GET /api/about
   Public
========================================================= */

router.get("/", async (req, res) => {

  try {

    const about =
      await About.findOne();

    if (!about) {

      return res.status(404).json({
        message:
          "About information not found",
      });

    }

    res.status(200).json(about);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch About information",
      error:
        error.message,
    });

  }

});


/* =========================================================
   DELETE OLD UPLOADED FILE
========================================================= */

const deleteUploadedFile = (
  imagePath
) => {

  if (!imagePath) {
    return;
  }

  if (
    !imagePath.startsWith(
      "/uploads/"
    )
  ) {
    return;
  }

  const filePath =
    path.join(
      __dirname,
      "..",
      imagePath
    );


  if (
    fs.existsSync(filePath)
  ) {

    try {

      fs.unlinkSync(
        filePath
      );

    } catch (error) {

      console.error(
        "Failed to delete old image:",
        error.message
      );

    }

  }

};


/* =========================================================
   CREATE / UPDATE ABOUT
   PUT /api/about
   Admin only
========================================================= */

router.put(
  "/",
  protect,

  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "secondaryImage",
      maxCount: 1,
    },
  ]),

  async (req, res) => {

    try {

      let about =
        await About.findOne();


      /* ---------------------------------------------------
         CREATE FIRST RECORD
      --------------------------------------------------- */

      if (!about) {

        about =
          new About();

      }


      /* ---------------------------------------------------
         TEXT FIELDS
      --------------------------------------------------- */

      if (
        req.body.heading !==
        undefined
      ) {

        about.heading =
          req.body.heading.trim();

      }


      if (
        req.body.descriptionHeading !==
        undefined
      ) {

        about.descriptionHeading =
          req.body.descriptionHeading.trim();

      }


      if (
        req.body.description !==
        undefined
      ) {

        about.description =
          req.body.description.trim();

      }


      if (
        req.body.secondaryDescriptionHeading !==
        undefined
      ) {

        about.secondaryDescriptionHeading =
          req.body.secondaryDescriptionHeading.trim();

      }


      if (
        req.body.secondaryDescription !==
        undefined
      ) {

        about.secondaryDescription =
          req.body.secondaryDescription.trim();

      }


      if (
        req.body.mission !==
        undefined
      ) {

        about.mission =
          req.body.mission.trim();

      }


      if (
        req.body.vision !==
        undefined
      ) {

        about.vision =
          req.body.vision.trim();

      }


      if (
        req.body.studentsCount !==
        undefined
      ) {

        about.studentsCount =
          Number(
            req.body.studentsCount
          ) || 0;

      }


      if (
        req.body.teachersCount !==
        undefined
      ) {

        about.teachersCount =
          Number(
            req.body.teachersCount
          ) || 0;

      }


      if (
        req.body.yearsOfExcellence !==
        undefined
      ) {

        about.yearsOfExcellence =
          Number(
            req.body.yearsOfExcellence
          ) || 0;

      }


      /* ---------------------------------------------------
         REMOVE MAIN IMAGE
      --------------------------------------------------- */

      if (
        req.body.removeMainImage ===
        "true"
      ) {

        deleteUploadedFile(
          about.mainImage
        );

        about.mainImage = "";

      }


      /* ---------------------------------------------------
         REMOVE SECONDARY IMAGE
      --------------------------------------------------- */

      if (
        req.body.removeSecondaryImage ===
        "true"
      ) {

        deleteUploadedFile(
          about.secondaryImage
        );

        about.secondaryImage = "";

      }


      /* ---------------------------------------------------
         NEW MAIN IMAGE
      --------------------------------------------------- */

      if (
        req.files?.mainImage?.[0]
      ) {

        deleteUploadedFile(
          about.mainImage
        );


        about.mainImage =
          `/uploads/about/${req.files.mainImage[0].filename}`;

      }


      /* ---------------------------------------------------
         NEW SECONDARY IMAGE
      --------------------------------------------------- */

      if (
        req.files?.secondaryImage?.[0]
      ) {

        deleteUploadedFile(
          about.secondaryImage
        );


        about.secondaryImage =
          `/uploads/about/${req.files.secondaryImage[0].filename}`;

      }


      /* ---------------------------------------------------
         SAVE
      --------------------------------------------------- */

      const savedAbout =
        await about.save();


      res.status(200).json(
        savedAbout
      );

    } catch (error) {

      console.error(
        "About update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update About information",

        error:
          error.message,

      });

    }

  }
);


module.exports = router;