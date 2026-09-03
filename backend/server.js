/* =========================================================
   KOLADI HIGH SCHOOL
   BACKEND SERVER
========================================================= */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();


/* =========================================================
   ROUTES
========================================================= */

const noticeRoutes =
  require("./routes/noticeRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const galleryRoutes =
  require("./routes/galleryRoutes");

const aboutRoutes =
  require("./routes/aboutRoutes");
const homeRoutes =
  require("./routes/homeRoutes");
const academicsRoutes =
  require("./routes/academicsRoutes");
const contactRoutes =
  require("./routes/contactRoutes");
const footerRoutes =
  require("./routes/footerRoutes");

/* =========================================================
   CREATE EXPRESS APP
========================================================= */

const app = express();


/* =========================================================
   ENABLE CORS
========================================================= */

app.use(cors());


/* =========================================================
   JSON MIDDLEWARE
========================================================= */

app.use(
  express.json()
);


/* =========================================================
   SERVE UPLOADED FILES
========================================================= */

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);


/* =========================================================
   SERVER PORT
========================================================= */

const PORT = 5000;


/* =========================================================
   MONGODB CONNECTION
========================================================= */

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

  });


/* =========================================================
   API ROUTES
========================================================= */

app.use(
  "/api/notices",
  noticeRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/gallery",
  galleryRoutes
);

app.use(
  "/api/about",
  aboutRoutes
);

app.use(
  "/api/home",
  homeRoutes
);

app.use(
  "/api/academics",
  academicsRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/footer",
  footerRoutes
);

/* =========================================================
   HOME / TEST ROUTE
========================================================= */

app.get(
  "/",
  (req, res) => {

    res.send(
      "Koladi High School Backend is running!"
    );

  }
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);