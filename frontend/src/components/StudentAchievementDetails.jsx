import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


/* =========================================================
   API
========================================================= */

const API_URL =
  "https://koladi-high-school-1.onrender.com/api/academics";

const BACKEND_URL =
  "https://koladi-high-school-1.onrender.com";


/* =========================================================
   COMPONENT
========================================================= */

function StudentAchievementDetails() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    if (
      image.startsWith("/uploads/")
    ) {
      return `${BACKEND_URL}${image}`;
    }

    return encodeURI(image);

  };


  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        const result =
          await response.json();

        if (!response.ok) {

          throw new Error(
            result.message ||
            "Failed to load Student Achievement."
          );

        }

        setData(
          result.studentAchievement
        );

      } catch (err) {

        console.error(
          "Student Achievement error:",
          err
        );

        setError(
          err.message ||
          "Unable to load Student Achievement."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="achievement-details-page">

        <div className="achievement-details-container">

          <p>
            Loading...
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !data) {

    return (

      <main className="achievement-details-page">

        <div className="achievement-details-container">

          <p>
            {error ||
              "Student Achievement information unavailable."}
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     ACHIEVEMENT SECTION RENDERER
  ======================================================= */

  const renderAchievementSection = (
    section,
    reverse = false
  ) => (

    <section
      className={
        reverse
          ? "achievement-section reverse"
          : "achievement-section"
      }
    >

      <div className="achievement-image">

        <img
          src={getImageUrl(section?.image)}
          alt={section?.heading || ""}
          loading="lazy"
        />

      </div>


      <div className="achievement-content">

        <span className="achievement-label">
          {section?.label}
        </span>

        <h2>
          {section?.heading}
        </h2>

        <p>
          {section?.description1}
        </p>

        <p>
          {section?.description2}
        </p>


        <div className="achievement-highlights">

          {section?.highlights?.map(
            (item) => (

              <div
                key={item._id}
              >

                <strong>
                  {item.number}
                </strong>

                <span>
                  {item.title}
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main className="achievement-details-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="achievement-details-hero">

        <div className="achievement-details-hero-content">

          <span>
            {data.heroLabel}
          </span>

          <h1>
            {data.heroHeading}
          </h1>

          <p>
            {data.heroDescription}
          </p>

        </div>

      </section>


      <div className="achievement-details-container">


        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/"
          className="achievement-details-back"
        >
          ← Back to Home
        </Link>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <section className="achievement-introduction">

          <div className="achievement-introduction-text">

            <span className="achievement-label">
              {data.introductionLabel}
            </span>

            <h2>
              {data.introductionHeading}
            </h2>

            <p>
              {data.introductionDescription1}
            </p>

            <p>
              {data.introductionDescription2}
            </p>


            <div className="achievement-intro-points">

              {data.introductionPoints?.map(
                (point, index) => (

                  <span key={index}>
                    {point}
                  </span>

                )
              )}

            </div>

          </div>


          <div className="achievement-introduction-image">

            <img
              src={getImageUrl(
                data.introductionImage
              )}
              alt={
                data.introductionHeading
              }
              loading="lazy"
            />

          </div>

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        {renderAchievementSection(
          data.results,
          false
        )}


        {/* =================================================
            SPORTS
        ================================================= */}

        {renderAchievementSection(
          data.sports,
          true
        )}


        {/* =================================================
            CULTURAL
        ================================================= */}

        {renderAchievementSection(
          data.cultural,
          false
        )}


        {/* =================================================
            LEADERSHIP
        ================================================= */}

        {renderAchievementSection(
          data.leadership,
          true
        )}


        {/* =================================================
            COURSES
        ================================================= */}

        <section className="achievement-courses">

          <div className="achievement-section-heading">

            <span>
              {data.coursesLabel}
            </span>

            <h2>
              {data.coursesHeading}
            </h2>

            <p>
              {data.coursesDescription}
            </p>

          </div>


          <div className="achievement-course-grid">

            {data.courses?.map(
              (course) => (

                <article
                  className="achievement-course-card"
                  key={course._id}
                >

                  <div className="achievement-course-icon">
                    {course.icon}
                  </div>

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.description}
                  </p>


                  <div className="achievement-subjects">

                    {course.subjects?.map(
                      (subject, index) => (

                        <span key={index}>
                          {subject}
                        </span>

                      )
                    )}

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            STUDENT DEVELOPMENT
        ================================================= */}

        <section className="achievement-development">

          <div className="achievement-development-heading">

            <span>
              {data.developmentLabel}
            </span>

            <h2>
              {data.developmentHeading}
            </h2>

          </div>


          <div className="achievement-development-grid">

            {data.developmentItems?.map(
              (item) => (

                <div
                  key={item._id}
                >

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.description}
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            RETURN
        ================================================= */}

        <div className="achievement-details-action">

          <Link
            to="/"
            className="academics-button"
          >
            Return to Home →
          </Link>

        </div>

      </div>

    </main>

  );
}


export default StudentAchievementDetails;
