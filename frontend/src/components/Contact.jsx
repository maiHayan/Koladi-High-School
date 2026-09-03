import { useEffect, useState } from "react";


/* =========================================================
   API
========================================================= */

const API_URL =
  "https://koladi-high-school-1.onrender.com/api/contact";


/* =========================================================
   CONTACT COMPONENT
========================================================= */

function Contact() {

  const [contact, setContact] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     FETCH CONTACT DATA
  ======================================================= */

  useEffect(() => {

    const fetchContact =
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
              "Failed to load contact information."
            );

          }


          setContact(data);

        } catch (err) {

          console.error(
            "Contact fetch error:",
            err
          );


          setError(
            err.message ||
            "Unable to load contact information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchContact();

  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <section
        className="contact-section"
        id="contact"
      >

        <div
          className="contact-container"
        >

          <div className="contact-heading">

            <span>
              GET IN TOUCH
            </span>

            <h2>
              Contact Koladi High School
            </h2>

            <p>
              Loading contact information...
            </p>

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
    !contact
  ) {

    return (

      <section
        className="contact-section"
        id="contact"
      >

        <div
          className="contact-container"
        >

          <div className="contact-heading">

            <span>
              GET IN TOUCH
            </span>

            <h2>
              Contact Koladi High School
            </h2>

            <p>
              {error ||
                "Contact information is unavailable."}
            </p>

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
      className="contact-section"
      id="contact"
    >

      <div className="contact-container">


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="contact-heading">

          <span>
            {contact.sectionLabel}
          </span>


          <h2>
            {contact.sectionHeading}
          </h2>


          <p>
            {contact.sectionDescription}
          </p>

        </div>


        {/* =================================================
            CONTACT CONTENT
        ================================================= */}

        <div className="contact-content">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="contact-info">


            {/* -------------------------------------------------
                ADDRESS
            ------------------------------------------------- */}

            <div className="contact-item">

              <div className="contact-icon">
                📍
              </div>


              <div>

                <h3>
                  {contact.addressLabel}
                </h3>

                <p>
                  {contact.address}
                </p>

              </div>

            </div>


            {/* -------------------------------------------------
                PHONE
            ------------------------------------------------- */}

            <div className="contact-item">

              <div className="contact-icon">
                📞
              </div>


              <div>

                <h3>
                  {contact.phoneLabel}
                </h3>


                <p>

                  <a
                    href={
                      `tel:${contact.phoneLink}`
                    }
                    className="contact-link"
                  >
                    {contact.phoneDisplay}
                  </a>

                </p>

              </div>

            </div>


            {/* -------------------------------------------------
                EMAIL
            ------------------------------------------------- */}

            <div className="contact-item">

              <div className="contact-icon">
                ✉️
              </div>


              <div>

                <h3>
                  {contact.emailLabel}
                </h3>

                <p>
                  {contact.email}
                </p>

              </div>

            </div>


            {/* -------------------------------------------------
                OFFICE HOURS
            ------------------------------------------------- */}

            <div className="contact-item">

              <div className="contact-icon">
                🕘
              </div>


              <div>

                <h3>
                  {contact.officeHoursLabel}
                </h3>


                <p>

                  {contact.officeDays}

                  <br />

                  {contact.officeTime}

                </p>

              </div>

            </div>


          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="contact-form">

            <h3>
              {contact.formHeading}
            </h3>


            <input
              type="text"
              placeholder={
                contact.namePlaceholder
              }
            />


            <input
              type="email"
              placeholder={
                contact.emailPlaceholder
              }
            />


            <input
              type="text"
              placeholder={
                contact.subjectPlaceholder
              }
            />


            <textarea
              rows="6"
              placeholder={
                contact.messagePlaceholder
              }
            ></textarea>


            <button
              type="button"
            >
              {contact.buttonText}
            </button>

          </div>

        </div>

      </div>

    </section>

  );

}


export default Contact;
