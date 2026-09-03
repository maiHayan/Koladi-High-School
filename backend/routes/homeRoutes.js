/* =========================================================
   KOLADI HIGH SCHOOL
   HOME PAGE ROUTES
========================================================= */

const express = require("express");

const Home = require("../models/Home");

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();


/* =========================================================
   GET HOME PAGE DATA
   GET /api/home
   Public
========================================================= */

router.get(
  "/",
  async (req, res) => {

    try {

      const home =
        await Home.findOne();

      if (!home) {

        return res.status(404).json({
          message:
            "Home page information not found",
        });

      }

      res.status(200).json(home);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch home page information",

        error:
          error.message,
      });

    }

  }
);


/* =========================================================
   CREATE / UPDATE HOME PAGE DATA
   PUT /api/home
   Admin only
========================================================= */

router.put(
  "/",
  protect,
  async (req, res) => {

    try {

      let home =
        await Home.findOne();


      /* ---------------------------------------------------
         Create record if it doesn't exist
      --------------------------------------------------- */

      if (!home) {

        home =
          new Home();

      }


      /* ---------------------------------------------------
         SCHOOL INFORMATION
      --------------------------------------------------- */

      if (
        req.body.schoolName !==
        undefined
      ) {

        home.schoolName =
          req.body.schoolName.trim();

      }


      if (
        req.body.establishedYear !==
        undefined
      ) {

        home.establishedYear =
          Number(
            req.body.establishedYear
          ) || 0;

      }


      if (
        req.body.eiin !==
        undefined
      ) {

        home.eiin =
          req.body.eiin.trim();

      }


      if (
        req.body.location !==
        undefined
      ) {

        home.location =
          req.body.location.trim();

      }


      /* ---------------------------------------------------
         TAGLINE
      --------------------------------------------------- */

      if (
        req.body.tagline !==
        undefined
      ) {

        home.tagline =
          req.body.tagline.trim();

      }


      /* ---------------------------------------------------
         COUNTERS
      --------------------------------------------------- */

      if (
        req.body.studentsCount !==
        undefined
      ) {

        home.studentsCount =
          Number(
            req.body.studentsCount
          ) || 0;

      }


      if (
        req.body.teachersCount !==
        undefined
      ) {

        home.teachersCount =
          Number(
            req.body.teachersCount
          ) || 0;

      }


      if (
        req.body.gpa5Count !==
        undefined
      ) {

        home.gpa5Count =
          Number(
            req.body.gpa5Count
          ) || 0;

      }


      /* ---------------------------------------------------
         SAVE
      --------------------------------------------------- */

      const savedHome =
        await home.save();


      res.status(200).json(
        savedHome
      );

    } catch (error) {

      console.error(
        "Home update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update home page information",

        error:
          error.message,

      });

    }

  }
);


module.exports = router;