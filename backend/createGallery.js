/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL GALLERY ITEMS
========================================================= */

const mongoose = require("mongoose");
require("dotenv").config();

const Gallery = require("./models/Gallery");


/* =========================================================
   INITIAL GALLERY DATA
========================================================= */

const galleryItems = [

  {
    title: "Language Day",

    category: "Cultural",

    imageUrl:
      "/gallery/gallery-1.jpg",

    description:
      "Students and teachers participating in a Language Day cultural program.",
  },


  {
    title: "Independence Day",

    category: "Events",

    imageUrl:
      "/gallery/gallery-2.jpg",

    description:
      "Students taking part in the school's Independence Day celebration.",
  },


  {
    title: "Academic Result",

    category: "Academic",

    imageUrl:
      "/gallery/gallery-3.jpg",

    description:
      "Students celebrating their academic achievements and outstanding results.",
  },


  {
    title: "Victory Day",

    category: "Cultural",

    imageUrl:
      "/gallery/gallery-4.jpg",

    description:
      "Students and teachers celebrating Victory Day through a special school program.",
  },


  {
    title: "Sports",

    category: "Sports",

    imageUrl:
      "/gallery/gallery-5.jpg",

    description:
      "Students participating in sports and recreational activities.",
  },


  {
    title: "Red Crescent Group",

    category: "Activities",

    imageUrl:
      "/gallery/gallery-6.jpg",

    description:
      "Members of the Red Crescent group participating in school activities and community service.",
  },

];


/* =========================================================
   CREATE GALLERY
========================================================= */

const createGallery = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected"
    );


    /* -------------------------------------------------------
       Prevent duplicate migration
    ------------------------------------------------------- */

    const existingCount =
      await Gallery.countDocuments();


    if (existingCount > 0) {

      console.log(
        `Gallery already contains ${existingCount} item(s).`
      );

      await mongoose.disconnect();

      return;

    }


    /* -------------------------------------------------------
       Insert gallery records
    ------------------------------------------------------- */

    const createdItems =
      await Gallery.insertMany(
        galleryItems
      );


    console.log(
      `${createdItems.length} gallery items created successfully.`
    );


    createdItems.forEach(
      (item, index) => {

        console.log(
          `${index + 1}. ${item.title}`
        );

      }
    );


    await mongoose.disconnect();

  } catch (error) {

    console.error(
      "Failed to create gallery:",
      error.message
    );

    process.exit(1);

  }

};


/* =========================================================
   RUN
========================================================= */

createGallery();