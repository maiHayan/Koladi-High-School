import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL =
  "https://koladi-high-school-1.onrender.com/api/academics";

const BACKEND_URL =
  "https://koladi-high-school-1.onrender.com";


function PracticalLearningDetails() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    if (
      image.startsWith("/uploads/")
    ) {
      return `${BACKEND_URL}${image}`;
    }

    return image;

  };


  useEffect(() => {

    const fetchData = async () => {

      try {

        const response =
          await fetch(API_URL);

        const result =
          await response.json();

        if (!response.ok) {

          throw new Error(
            result.message ||
            "Failed to load Practical Learning."
          );

        }

        setData(
          result.practicalLearning
        );

      } catch (err) {

        console.error(
          "Practical Learning error:",
          err
        );

        setError(
          err.message ||
          "Unable to load Practical Learning."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchData();

  }, []);


  if (loading) {

    return (

      <main className="practical-details-page">

        <div className="practical-details-container">

          <p>
            Loading...
          </p>

        </div>

      </main>

    );

  }


  if (error || !data) {

    return (

      <main className="practical-details-page">

        <div className="practical-details-container">

          <p>
            {error ||
              "Practical Learning information unavailable."}
          </p>

        </div>

      </main>

    );

  }


  return (

    <main className="practical-details-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="practical-details-hero">

        <div className="practical-details-hero-content">

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


      <div className="practical-details-container">


        <Link
          to="/"
          className="practical-details-back"
        >
          ← Back to Home
        </Link>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <section className="practical-introduction">

          <div className="practical-introduction-text">

            <span className="practical-label">
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


            <div className="practical-intro-points">

              {data.introductionPoints?.map(
                (point, index) => (

                  <span key={index}>
                    {point}
                  </span>

                )
              )}

            </div>

          </div>


          <div className="practical-introduction-image">

            <img
              src={getImageUrl(
                data.introductionImage
              )}
              alt={
                data.introductionHeading
              }
            />

          </div>

        </section>


        {/* =================================================
            BIOLOGY
        ================================================= */}

        <section className="practical-lab-section">

          <div className="practical-lab-image">

            <img
              src={getImageUrl(
                data.biology?.image
              )}
              alt={
                data.biology?.heading
              }
            />

          </div>


          <div className="practical-lab-content">

            <span className="practical-label">
              {data.biology?.label}
            </span>

            <h2>
              {data.biology?.heading}
            </h2>

            <p>
              {data.biology?.description1}
            </p>

            <p>
              {data.biology?.description2}
            </p>


            <div className="practical-lab-highlights">

              {data.biology?.highlights?.map(
                (item) => (

                  <div key={item._id}>

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


        {/* =================================================
            CHEMISTRY
        ================================================= */}

        <section
          className="
            practical-lab-section
            reverse
          "
        >

          <div className="practical-lab-image">

            <img
              src={getImageUrl(
                data.chemistry?.image
              )}
              alt={
                data.chemistry?.heading
              }
            />

          </div>


          <div className="practical-lab-content">

            <span className="practical-label">
              {data.chemistry?.label}
            </span>

            <h2>
              {data.chemistry?.heading}
            </h2>

            <p>
              {data.chemistry?.description1}
            </p>

            <p>
              {data.chemistry?.description2}
            </p>


            <div className="practical-lab-highlights">

              {data.chemistry?.highlights?.map(
                (item) => (

                  <div key={item._id}>

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


        {/* =================================================
            PHYSICS
        ================================================= */}

        <section className="practical-lab-section">

          <div className="practical-lab-image">

            <img
              src={getImageUrl(
                data.physics?.image
              )}
              alt={
                data.physics?.heading
              }
            />

          </div>


          <div className="practical-lab-content">

            <span className="practical-label">
              {data.physics?.label}
            </span>

            <h2>
              {data.physics?.heading}
            </h2>

            <p>
              {data.physics?.description1}
            </p>

            <p>
              {data.physics?.description2}
            </p>


            <div className="practical-lab-highlights">

              {data.physics?.highlights?.map(
                (item) => (

                  <div key={item._id}>

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


        {/* =================================================
            COMPUTER
        ================================================= */}

        <section
          className="
            practical-lab-section
            reverse
          "
        >

          <div className="practical-lab-image">

            <img
              src={getImageUrl(
                data.computer?.image
              )}
              alt={
                data.computer?.heading
              }
            />

          </div>


          <div className="practical-lab-content">

            <span className="practical-label">
              {data.computer?.label}
            </span>

            <h2>
              {data.computer?.heading}
            </h2>

            <p>
              {data.computer?.description1}
            </p>

            <p>
              {data.computer?.description2}
            </p>


            <div className="practical-lab-highlights">

              {data.computer?.highlights?.map(
                (item) => (

                  <div key={item._id}>

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


        {/* =================================================
            BENEFITS
        ================================================= */}

        <section className="practical-benefits-section">

          <div className="practical-section-heading">

            <span>
              {data.benefitsLabel}
            </span>

            <h2>
              {data.benefitsHeading}
            </h2>

            <p>
              {data.benefitsDescription}
            </p>

          </div>


          <div className="practical-benefits-grid">

            {data.benefits?.map(
              (benefit) => (

                <div
                  className="practical-benefit-card"
                  key={benefit._id}
                >

                  <div className="practical-benefit-icon">
                    {benefit.icon}
                  </div>

                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            RETURN
        ================================================= */}

        <div className="practical-details-action">

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


export default PracticalLearningDetails;
