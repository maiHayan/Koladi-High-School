/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN AUTHENTICATION ROUTES
========================================================= */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const protect =
  require("../middleware/authMiddleware");

const router =
  express.Router();


/* =========================================================
   ADMIN LOGIN
   POST /api/admin/login
========================================================= */

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        username,
        password,
      } = req.body;


      /* ---------------------------------------------------
         VALIDATE INPUT
      --------------------------------------------------- */

      if (
        !username ||
        !password
      ) {

        return res.status(400).json({

          message:
            "Username and password are required",

        });

      }


      /* ---------------------------------------------------
         FIND ADMIN
      --------------------------------------------------- */

      const admin =
        await Admin.findOne({

          username:
            username.trim(),

        });


      if (!admin) {

        return res.status(401).json({

          message:
            "Invalid username or password",

        });

      }


      /* ---------------------------------------------------
         COMPARE PASSWORD
      --------------------------------------------------- */

      const passwordMatch =
        await bcrypt.compare(
          password,
          admin.password
        );


      if (!passwordMatch) {

        return res.status(401).json({

          message:
            "Invalid username or password",

        });

      }


      /* ---------------------------------------------------
         CREATE JWT
      --------------------------------------------------- */

      const token =
        jwt.sign(

          {
            id:
              admin._id,

            username:
              admin.username,
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "1d",
          }

        );


      /* ---------------------------------------------------
         RESPONSE
      --------------------------------------------------- */

      res.status(200).json({

        message:
          "Login successful",

        token,

        admin: {

          id:
            admin._id,

          username:
            admin.username,

        },

      });

    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );


      res.status(500).json({

        message:
          "Server error during login",

      });

    }

  }
);


/* =========================================================
   VERIFY ADMIN PASSKEY
   POST /api/admin/verify-passkey
   Admin only
========================================================= */

router.post(
  "/verify-passkey",
  protect,

  async (req, res) => {

    try {

      const {
        passkey,
      } = req.body;


      /* ---------------------------------------------------
         VALIDATE INPUT
      --------------------------------------------------- */

      if (
        !passkey ||
        typeof passkey !==
          "string"
      ) {

        return res.status(400).json({

          message:
            "Passkey is required",

        });

      }


      /* ---------------------------------------------------
         SERVER-SIDE PASSKEY
      --------------------------------------------------- */

      const adminPasskey =
        process.env.ADMIN_PASSKEY;


      if (
        !adminPasskey
      ) {

        console.error(
          "ADMIN_PASSKEY is not configured in .env"
        );


        return res.status(500).json({

          message:
            "Admin passkey is not configured on the server",

        });

      }


      /* ---------------------------------------------------
         VERIFY
      --------------------------------------------------- */

      if (
        passkey !==
        adminPasskey
      ) {

        return res.status(401).json({

          message:
            "Incorrect passkey",

        });

      }


      /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

      return res.status(200).json({

        verified:
          true,

        message:
          "Passkey verified successfully",

      });

    } catch (error) {

      console.error(
        "Passkey verification error:",
        error
      );


      return res.status(500).json({

        message:
          "Failed to verify admin passkey",

      });

    }

  }
);


/* =========================================================
   EXPORT
========================================================= */

module.exports =
  router;