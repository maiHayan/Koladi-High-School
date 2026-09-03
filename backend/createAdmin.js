/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE INITIAL ADMIN
========================================================= */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");


/* =========================================================
   CREATE ADMIN
========================================================= */

const createAdmin = async () => {
  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB connected");


    /* -------------------------------------------------------
       Admin credentials
    ------------------------------------------------------- */

    const username = "admin";

    const password = "admin";


    /* -------------------------------------------------------
       Check existing admin
    ------------------------------------------------------- */

    const existingAdmin =
      await Admin.findOne({ username });


    if (existingAdmin) {

      console.log(
        "Admin already exists"
      );

      await mongoose.disconnect();

      return;
    }


    /* -------------------------------------------------------
       Hash password
    ------------------------------------------------------- */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    /* -------------------------------------------------------
       Create admin
    ------------------------------------------------------- */

    await Admin.create({
      username,
      password: hashedPassword,
    });


    console.log(
      "Admin created successfully"
    );

    console.log(
      "Username:",
      username
    );

    console.log(
      "Password:",
      password
    );


    await mongoose.disconnect();

  } catch (error) {

    console.error(
      "Failed to create admin:",
      error.message
    );

    process.exit(1);
  }
};


/* =========================================================
   RUN
========================================================= */

createAdmin();