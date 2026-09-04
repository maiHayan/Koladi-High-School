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

function QualityEducationDetails() {

  const [data, setData] = useState(null);

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

    if (image.startsWith("http://") || image.startsWith("https://")) { return encodeURI(image); } return `${import.meta.env.BASE_URL}${image.replace(/^\/+/, "")}`;
  };


  /* =======================================================
     FETCH
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
            "Failed to load Quality Education."
          );
        }

        setData(
          result.qualityEducation
        );

      } catch (err) {

        console.error(
          "Quality Education error:",
          err
        );

        setError(
          err.message ||
          "Unable to load Quality Education."
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
      <main className="quality-details-page">

        <div className="quality-details-container">

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
      <main className="quality-details-page">

        <div className="quality-details-container">

          <p>
            {error ||
              "Quality Education information unavailable."}
          </p>

        </div>

      </main>
    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main className="quality-details-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="quality-details-hero">

        <div className="quality-details-hero-content">

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


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="quality-details-container">

        <Link
          to="/"
          className="quality-details-back"
        >
          ← Back to Home
        </Link>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <section className="quality-introduction">

          <div className="quality-introduction-text">

            <span className="quality-label">
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

          </div>


          <div className="quality-main-image">

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
            DIGITAL LEARNING
        ================================================= */}

        <section className="quality-learning-section">

          <div className="quality-learning-image">

            <img
              src={getImageUrl(
                data.digitalImage
              )}
              alt={
                data.digitalHeading
              }
              loading="lazy"
            />

          </div>


          <div className="quality-learning-content">

            <span className="quality-label">
              {data.digitalLabel}
            </span>

            <h2>
              {data.digitalHeading}
            </h2>

            <p>
              {data.digitalDescription1}
            </p>

            <p>
              {data.digitalDescription2}
            </p>

          </div>

        </section>


        {/* =================================================
            FEATURES
        ================================================= */}

        <section className="quality-features-section">

          <div className="quality-section-heading">

            <span>
              {data.featuresLabel}
            </span>

            <h2>
              {data.featuresHeading}
            </h2>

            <p>
              {data.featuresDescription}
            </p>

          </div>


          <div className="quality-feature-grid">

            {data.features?.map(
              (feature) => (

                <div
                  className="quality-feature-card"
                  key={feature._id}
                >

                  <div className="quality-feature-icon">
                    {feature.icon}
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.description}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            RETURN
        ================================================= */}

        <div className="quality-details-action">

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


export default QualityEducationDetails;

