/* =========================================================
   KOLADI HIGH SCHOOL
   NOTICE ROUTES
========================================================= */

const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();
const protect = require("../middleware/authMiddleware");


/* =========================================================
   GET ALL NOTICES
   GET /api/notices
========================================================= */

router.get("/", async (req, res) => {
  try {

    const notices = await Notice
      .find()
      .sort({ date: -1 });

    res.status(200).json(notices);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notices",
      error: error.message,
    });

  }
});


/* =========================================================
   CREATE NOTICE
   POST /api/notices
========================================================= */

router.post("/", protect, async (req, res) => {  try {

    const {
      title,
      category,
      date,
      description,
      isNewNotice,
    } = req.body;


    const notice = await Notice.create({
      title,
      category,
      date,
      description,
      isNewNotice,
    });


    res.status(201).json(notice);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create notice",
      error: error.message,
    });

  }
});


/* =========================================================
   GET SINGLE NOTICE
   GET /api/notices/:id
========================================================= */

router.get("/:id", async (req, res) => {
  try {

    const notice = await Notice.findById(
      req.params.id
    );


    if (!notice) {

      return res.status(404).json({
        message: "Notice not found",
      });

    }


    res.status(200).json(notice);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notice",
      error: error.message,
    });

  }
});


/* =========================================================
   UPDATE NOTICE
   PUT /api/notices/:id
========================================================= */

router.put("/:id", protect, async (req, res) => {
  try {

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!notice) {

      return res.status(404).json({
        message: "Notice not found",
      });

    }


    res.status(200).json(notice);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update notice",
      error: error.message,
    });

  }
});


/* =========================================================
   DELETE NOTICE
   DELETE /api/notices/:id
========================================================= */

router.delete("/:id", protect, async (req, res) => {
    try {

    const notice = await Notice.findByIdAndDelete(
      req.params.id
    );


    if (!notice) {

      return res.status(404).json({
        message: "Notice not found",
      });

    }


    res.status(200).json({
      message: "Notice deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete notice",
      error: error.message,
    });

  }
});


/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;