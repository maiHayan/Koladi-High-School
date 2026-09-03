/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN AUTHENTICATION MIDDLEWARE
========================================================= */

const jwt = require("jsonwebtoken");


/* =========================================================
   VERIFY ADMIN TOKEN
========================================================= */

const protect = (req, res, next) => {
  try {

    /* -------------------------------------------------------
       Get Authorization Header
    ------------------------------------------------------- */

    const authHeader = req.headers.authorization;


    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message: "Authentication required",
      });

    }


    /* -------------------------------------------------------
       Extract Token
    ------------------------------------------------------- */

    const token =
      authHeader.split(" ")[1];


    /* -------------------------------------------------------
       Verify Token
    ------------------------------------------------------- */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    /* -------------------------------------------------------
       Attach Admin Information
    ------------------------------------------------------- */

    req.admin = decoded;


    /* -------------------------------------------------------
       Continue
    ------------------------------------------------------- */

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });

  }
};


/* =========================================================
   EXPORT MIDDLEWARE
========================================================= */

module.exports = protect;