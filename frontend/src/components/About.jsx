import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "https://koladi-high-school-1.onrender.com/api/about";

const BACKEND_URL =
  "https://koladi-high-school-1.onrender.com";


/* =========================================================
   ABOUT COMPONENT
========================================================= */

function About() {

  const [about, setAbout] =
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


    /* Uploaded backend image */

    if (
      imageUrl.startsWith("/uploads/")
    ) {

      return `${BACKEND_URL}${imageUrl}`;

    }


    /* Existing public image */

    if (
      imageUrl.startsWith("/gallery/")
    ) {

      return imageUrl;

    }


    /* External URL */

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {

      return imageUrl;

    }


    return imageUrl;

  };


  /* =======================================================
     FETCH ABOUT INFORMATION
  ======================================================= */

  useEffect(() => {

    const fetchAbout = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await fetch(API_URL);


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to load About information"
          );

        }


        setAbout(data);

      } catch (err) {

        console.error(
          "About fetch error:",
          err
        );


        setError(
          "Unable to load school information."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchAbout();

  }, []);


  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {

    return (

      <section
        className="about-section"
        id="about"
      >

        <div
          className="about-container"
        >

          <div
            className="about-status"
          >
            Loading school information...
          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error || !about) {

    return (

      <section
        className="about-section"
        id="about"
      >

        <div
          className="about-container"
        >

          <div
            className="about-status about-error"
          >
            {error ||
              "School information is unavailable."}
          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section
      className="about-section"
      id="about"
    >

      <div className="about-container">


        {/* =================================================
            IMAGES
        ================================================= */}

        <div className="about-images">

          <div className="about-main-image">

            <img
              src={
                getImageUrl(
                  about.mainImage
                )
              }
              alt="Koladi High School campus"
              loading="lazy"
            />

          </div>


          <div className="about-secondary-image">

            <img
              src={
                getImageUrl(
                  about.secondaryImage
                )
              }
              alt="Koladi High School building"
              loading="lazy"
            />

          </div>


          <div
            className="about-image-accent"
          ></div>

        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="about-content">

          <span className="about-label">
            ABOUT OUR SCHOOL
          </span>


          <h2>
            {about.heading}
          </h2>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

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


          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="about-highlights">


            {/* -----------------------------------------------
                ESTABLISHED
            ----------------------------------------------- */}

            <div className="about-highlight">

              <strong>
                {about.establishedYear ||
                  1990}
              </strong>

              <span>
                Established
              </span>

            </div>


            {/* -----------------------------------------------
                STUDENTS
            ----------------------------------------------- */}

            <div className="about-highlight">

              <strong>

                {about.studentsCount > 0
                  ? `${about.studentsCount}+`
                  : "1000+"}

              </strong>

              <span>
                Students
              </span>

            </div>


            {/* -----------------------------------------------
                TEACHERS
            ----------------------------------------------- */}

            <div className="about-highlight">

              <strong>

                {about.teachersCount > 0
                  ? `${about.teachersCount}+`
                  : "20+"}

              </strong>

              <span>
                Teachers
              </span>

            </div>

          </div>


          {/* =================================================
              LEARN MORE
          ================================================= */}

          <Link
            to="/about"
            className="about-button"
          >
            Learn More About Us →
          </Link>

        </div>

      </div>

    </section>

  );
}


export default About;
