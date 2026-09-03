/* =========================================================
   KOLADI HIGH SCHOOL
   GALLERY ROUTES
========================================================= */

const express = require("express");
const path = require("path");

const Gallery = require("../models/Gallery");
const protect = require("../middleware/authMiddleware");
const createUpload =
  require("../middleware/uploadMiddleware");

const upload =
  createUpload("gallery");
  
const router = express.Router();


/* =========================================================
   GET ALL GALLERY ITEMS
   GET /api/gallery
   Public
========================================================= */

router.get("/", async (req, res) => {

  try {

    const galleryItems =
      await Gallery
        .find()
        .sort({
          createdAt: -1,
        });


    res.status(200).json(
      galleryItems
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Failed to fetch gallery items",

      error:
        error.message,

    });

  }

});


/* =========================================================
   CREATE GALLERY ITEM
   POST /api/gallery
   Admin only
========================================================= */

router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {

    try {

      const {
        title,
        category,
        description,
      } = req.body;


      /* ---------------------------------------------------
         Validate required fields
      --------------------------------------------------- */

      if (!title || !title.trim()) {

        return res.status(400).json({

          message:
            "Gallery title is required",

        });

      }


      if (!req.file) {

        return res.status(400).json({

          message:
            "Please upload an image",

        });

      }


      /* ---------------------------------------------------
         Create public image path
      --------------------------------------------------- */

      const imageUrl =
        `/uploads/gallery/${req.file.filename}`;


      /* ---------------------------------------------------
         Save gallery item
      --------------------------------------------------- */

      const galleryItem =
        await Gallery.create({

          title:
            title.trim(),

          category:
            category || "Campus",

          imageUrl,

          description:
            description
              ? description.trim()
              : "",

        });


      res.status(201).json(
        galleryItem
      );

    } catch (error) {

      console.error(
        "Gallery create error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create gallery item",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   UPDATE GALLERY ITEM
   PUT /api/gallery/:id
   Admin only
========================================================= */

router.put(
  "/:id",
  protect,
  upload.single("image"),
  async (req, res) => {

    try {

      const galleryItem =
        await Gallery.findById(
          req.params.id
        );


      if (!galleryItem) {

        return res.status(404).json({

          message:
            "Gallery item not found",

        });

      }


      /* ---------------------------------------------------
         Update text fields
      --------------------------------------------------- */

      if (req.body.title !== undefined) {

        galleryItem.title =
          req.body.title.trim();

      }


      if (req.body.category !== undefined) {

        galleryItem.category =
          req.body.category;

      }


      if (
        req.body.description !==
        undefined
      ) {

        galleryItem.description =
          req.body.description.trim();

      }


      /* ---------------------------------------------------
         Replace image if a new one
         was uploaded
      --------------------------------------------------- */

      if (req.file) {

        galleryItem.imageUrl =
          `/uploads/gallery/${req.file.filename}`;

      }


      const updatedGalleryItem =
        await galleryItem.save();


      res.status(200).json(
        updatedGalleryItem
      );

    } catch (error) {

      console.error(
        "Gallery update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update gallery item",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   DELETE GALLERY ITEM
   DELETE /api/gallery/:id
   Admin only
========================================================= */

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const galleryItem =
        await Gallery.findByIdAndDelete(
          req.params.id
        );


      if (!galleryItem) {

        return res.status(404).json({

          message:
            "Gallery item not found",

        });

      }


      res.status(200).json({

        message:
          "Gallery item deleted successfully",

      });

    } catch (error) {

      console.error(
        "Gallery delete error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete gallery item",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;