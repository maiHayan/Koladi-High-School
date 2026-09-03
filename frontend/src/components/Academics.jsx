import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "http://localhost:5000/api/academics";


const BACKEND_URL =
  "http://localhost:5000";


/* =========================================================
   ACADEMICS COMPONENT
========================================================= */

function Academics() {

  const [academics, setAcademics] =
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


    if (
      imageUrl.startsWith("/uploads/")
    ) {

      return `${BACKEND_URL}${imageUrl}`;

    }


    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {

      return imageUrl;

    }


    return imageUrl;

  };


  /* =======================================================
     FETCH ACADEMICS DATA
  ======================================================= */

  useEffect(() => {

    const fetchAcademics =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await fetch(
              API_URL
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to load academics information."
            );

          }


          setAcademics(data);

        } catch (err) {

          console.error(
            "Academics fetch error:",
            err
          );


          setError(
            err.message ||
            "Unable to load academics information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchAcademics();

  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <section
        className="academics-section"
        id="academics"
      >

        <div
          className="
            academics-container
          "
        >

          <div
            className="
              academics-status
            "
          >
            Loading academics information...
          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !academics
  ) {

    return (

      <section
        className="academics-section"
        id="academics"
      >

        <div
          className="
            academics-container
          "
        >

          <div
            className="
              academics-status
            "
          >
            {error ||
              "Academics information is unavailable."}
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
      className="academics-section"
      id="academics"
    >

      <div
        className="
          academics-container
        "
      >


        {/* =================================================
            HEADING
        ================================================= */}

        <div
          className="
            academics-heading
          "
        >

          <span>
            {academics.sectionLabel}
          </span>


          <h2>
            {academics.sectionHeading}
          </h2>


          <p>
            {academics.sectionDescription}
          </p>

        </div>


        {/* =================================================
            ACADEMIC CARDS
        ================================================= */}

        <div
          className="
            academic-cards
          "
        >


          {/* =================================================
              QUALITY EDUCATION
          ================================================= */}

          <article
            className="
              academic-card
            "
          >

            <div
              className="
                academic-icon
              "
            >
              📚
            </div>


            <h3>
              {academics.qualityEducation?.title}
            </h3>


            <p>
              {academics.qualityEducation?.description}
            </p>


            <Link
              to="/quality-education"
              className="
                academic-explore-button
              "
            >
              Explore More →
            </Link>

          </article>


          {/* =================================================
              PRACTICAL LEARNING
          ================================================= */}

          <article
            className="
              academic-card
            "
          >

            <div
              className="
                academic-icon
              "
            >
              🔬
            </div>


            <h3>
              {academics.practicalLearning?.title}
            </h3>


            <p>
              {academics.practicalLearning?.description}
            </p>


            <Link
              to="/practical-learning"
              className="
                academic-explore-button
              "
            >
              Explore More →
            </Link>

          </article>


          {/* =================================================
              STUDENT ACHIEVEMENT
          ================================================= */}

          <article
            className="
              academic-card
            "
          >

            <div
              className="
                academic-icon
              "
            >
              🏆
            </div>


            <h3>
              {academics.studentAchievement?.title}
            </h3>


            <p>
              {academics.studentAchievement?.description}
            </p>


            <Link
              to="/student-achievement"
              className="
                academic-explore-button
              "
            >
              Explore More →
            </Link>

          </article>


        </div>

      </div>

    </section>

  );

}


export default Academics;