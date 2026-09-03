import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


/* =========================================================
   BACKEND APIs
========================================================= */

const ABOUT_API =
  "https://koladi-high-school-1.onrender.com/api/about";

const SCHOOL_INFO_API =
  "https://koladi-high-school-1.onrender.com/api/home";
  
const BACKEND_URL =
  "https://koladi-high-school-1.onrender.com";


/* =========================================================
   ABOUT DETAILS COMPONENT
========================================================= */

function AboutDetails() {

  const [about, setAbout] =
    useState(null);

  const [schoolInfo, setSchoolInfo] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     IMAGE URL HANDLER
  ======================================================= */

  const getImageUrl = (imageUrl) => {

    if (!imageUrl) {
      return "";
    }


    /* -------------------------------------------------------
       Uploaded backend image
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("/uploads/")
    ) {

      return `${BACKEND_URL}${imageUrl}`;

    }


    /* -------------------------------------------------------
       Public gallery image
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("/gallery/")
    ) {

      return imageUrl;

    }


    /* -------------------------------------------------------
       Full external URL
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {

      return imageUrl;

    }


    return imageUrl;

  };


  /* =======================================================
     FETCH ABOUT + SCHOOL INFORMATION
  ======================================================= */

  useEffect(() => {

    const fetchPageData = async () => {

      try {

        setLoading(true);

        setError("");


        /* ---------------------------------------------------
           Fetch both APIs together
        --------------------------------------------------- */

        const [
          aboutResponse,
          schoolInfoResponse,
        ] = await Promise.all([

          fetch(ABOUT_API),

          fetch(SCHOOL_INFO_API),

        ]);


        const aboutData =
          await aboutResponse.json();

        const schoolInfoData =
          await schoolInfoResponse.json();


        if (!aboutResponse.ok) {

          throw new Error(
            aboutData.message ||
            "Failed to load About information."
          );

        }


        if (!schoolInfoResponse.ok) {

          throw new Error(
            schoolInfoData.message ||
            "Failed to load school information."
          );

        }


        setAbout(
          aboutData
        );

        setSchoolInfo(
          schoolInfoData
        );

      } catch (err) {

        console.error(
          "About Details fetch error:",
          err
        );


        setError(
          err.message ||
          "Unable to load About information."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPageData();

  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="about-details-page">

        <div className="about-details-status">

          Loading school information...

        </div>

      </main>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !about ||
    !schoolInfo
  ) {

    return (

      <main className="about-details-page">

        <div
          className="
            about-details-status
            about-details-error
          "
        >

          {error ||
            "School information is unavailable."}

        </div>

      </main>

    );

  }


  /* =======================================================
     VALUES
  ======================================================= */

  const schoolName =
    schoolInfo.schoolName ||
    "Koladi High School";

  const establishedYear =
    schoolInfo.establishedYear ||
    1990;

  const eiin =
    schoolInfo.eiin ||
    "125602";

  const location =
    schoolInfo.location ||
    "Koladi, Pabna Sadar, Pabna, Bangladesh";

  const studentsCount =
    about.studentsCount > 0
      ? `${about.studentsCount}+`
      : "1000+";

  const teachersCount =
    about.teachersCount > 0
      ? `${about.teachersCount}+`
      : "20+";


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main className="about-details-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="about-details-hero">

        <div
          className="
            about-details-hero-overlay
          "
        ></div>


        <div
          className="
            about-details-hero-content
          "
        >

          <span>
            ABOUT KOLADI HIGH SCHOOL
          </span>


          <h1>
            {about.heading}
          </h1>


          <p>
            {about.description}
          </p>

        </div>

      </section>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="about-details-container">


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Link
          to="/"
          className="about-details-back"
        >
          ← Back to Home
        </Link>


        {/* =================================================
            SCHOOL INTRODUCTION
        ================================================= */}

        <section
          className="
            about-details-introduction
          "
        >


          {/* ---------------------------------------------
              IMAGE
          --------------------------------------------- */}

          <div
            className="
              about-details-image
            "
          >

            <img
              src={
                getImageUrl(
                  about.mainImage
                )
              }
              alt={`${schoolName} campus`}
              loading="lazy"
            />

          </div>


          {/* ---------------------------------------------
              TEXT
          --------------------------------------------- */}

          <div
            className="
              about-details-text
            "
          >

            <span
              className="
                about-details-label
              "
            >
              OUR SCHOOL
            </span>


            <h2>
              {schoolName}
            </h2>


            {about.description && (

              <p>
                {about.description}
              </p>

            )}


            {about.secondaryDescription && (

              <p>
                {about.secondaryDescription}
              </p>

            )}


            {about.vision && (

              <p>
                {about.vision}
              </p>

            )}

          </div>

        </section>


        {/* =================================================
            KEY INFORMATION
        ================================================= */}

        <section
          className="
            about-details-facts
          "
        >


          {/* ---------------------------------------------
              ESTABLISHED
          --------------------------------------------- */}

          <div
            className="
              about-details-fact
            "
          >

            <strong>
              {establishedYear}
            </strong>

            <span>
              Established
            </span>

          </div>


          {/* ---------------------------------------------
              EIIN
          --------------------------------------------- */}

          <div
            className="
              about-details-fact
            "
          >

            <strong>
              {eiin}
            </strong>

            <span>
              EIIN
            </span>

          </div>


          {/* ---------------------------------------------
              STUDENTS
          --------------------------------------------- */}

          <div
            className="
              about-details-fact
            "
          >

            <strong>
              {studentsCount}
            </strong>

            <span>
              Students
            </span>

          </div>


          {/* ---------------------------------------------
              TEACHERS
          --------------------------------------------- */}

          <div
            className="
              about-details-fact
            "
          >

            <strong>
              {teachersCount}
            </strong>

            <span>
              Teachers
            </span>

          </div>

        </section>


        {/* =================================================
            MISSION + VISION
        ================================================= */}

        <section
          className="
            about-details-mission-vision
          "
        >


          {/* ---------------------------------------------
              MISSION
          --------------------------------------------- */}

          <div
            className="
              about-details-card
              mission-card
            "
          >

            <div
              className="
                about-details-card-icon
              "
            >
              🎯
            </div>


            <span>
              OUR MISSION
            </span>


            <h2>
              Inspiring Students to Learn,
              Grow and Lead
            </h2>


            <p>
              {about.mission}
            </p>


            {about.secondaryDescription && (

              <p>
                {about.secondaryDescription}
              </p>

            )}

          </div>


          {/* ---------------------------------------------
              VISION
          --------------------------------------------- */}

          <div
            className="
              about-details-card
              vision-card
            "
          >

            <div
              className="
                about-details-card-icon
              "
            >
              🌱
            </div>


            <span>
              OUR VISION
            </span>


            <h2>
              Building Responsible,
              Confident and Capable Citizens
            </h2>


            <p>
              {about.vision}
            </p>


            {about.description && (

              <p>
                {about.description}
              </p>

            )}

          </div>

        </section>


        {/* =================================================
            SCHOOL ENVIRONMENT
        ================================================= */}

        <section
          className="
            about-details-environment
          "
        >


          {/* ---------------------------------------------
              TEXT
          --------------------------------------------- */}

          <div
            className="
              about-details-environment-text
            "
          >

            <span
              className="
                about-details-label
              "
            >
              OUR ENVIRONMENT
            </span>


            <h2>
              A Supportive Place to Learn and Grow
            </h2>


            {about.secondaryDescription && (

              <p>
                {about.secondaryDescription}
              </p>

            )}


            {about.description && (

              <p>
                {about.description}
              </p>

            )}

          </div>


          {/* ---------------------------------------------
              IMAGE
          --------------------------------------------- */}

          <div
            className="
              about-details-environment-image
            "
          >

            <img
              src={
                getImageUrl(
                  about.secondaryImage
                )
              }
              alt={`${schoolName} building`}
              loading="lazy"
            />

          </div>

        </section>


        {/* =================================================
            LOCATION
        ================================================= */}

        <section
          className="
            about-details-location
          "
        >

          <span
            className="
              about-details-label
            "
          >
            SCHOOL INFORMATION
          </span>


          <h2>
            Our Location
          </h2>


          <p>
            {location}
          </p>


          <div
            className="
              about-details-location-grid
            "
          >

            <div>

              <strong>
                EIIN
              </strong>

              <span>
                {eiin}
              </span>

            </div>


            <div>

              <strong>
                Established
              </strong>

              <span>
                {establishedYear}
              </span>

            </div>

          </div>


          <Link
            to="/"
            className="
              about-details-home-button
            "
          >
            Return to Home →
          </Link>

        </section>

      </div>

    </main>

  );

}


export default AboutDetails;
