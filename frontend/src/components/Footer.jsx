/* =========================================================
   KOLADI HIGH SCHOOL
   FOOTER COMPONENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/Logo.png";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/footer";


/* =========================================================
   FOOTER COMPONENT
========================================================= */

function Footer() {

  const navigate =
    useNavigate();


  const [footer, setFooter] =
    useState(null);

  const [activeInfo, setActiveInfo] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     LOAD FOOTER DATA
  ======================================================= */

  useEffect(() => {

    const fetchFooter =
      async () => {

        try {

          setLoading(true);
          setError("");


          const response =
            await fetch(
              API_URL,
              {
                cache: "no-store",
              }
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to load footer information."
            );

          }


          setFooter(data);

        } catch (err) {

          console.error(
            "Footer fetch error:",
            err
          );


          setError(
            err.message ||
            "Unable to load footer information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchFooter();

  }, []);


  /* =======================================================
     NAVIGATE TO HOMEPAGE SECTION
  ======================================================= */

  const goToSection =
    (sectionId) => {

      if (
        window.location.pathname === "/"
      ) {

        const section =
          document.getElementById(
            sectionId
          );


        if (section) {

          section.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });

        }

        return;

      }


      navigate(
        `/#${sectionId}`
      );

    };


  /* =======================================================
     INFORMATION CONTENT
  ======================================================= */

  const renderInformationContent =
    (content) => {

      if (!content) {

        return (
          <p>
            Information is currently unavailable.
          </p>
        );

      }


      return content
        .split(/\n\s*\n/)
        .map(
          (paragraph, index) => {

            const text =
              paragraph.trim();


            if (!text) {
              return null;
            }


            return (
              <p key={index}>
                {text}
              </p>
            );

          }
        );

    };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-school">

            <div className="footer-school-brand">

              <img
                src={logo}
                alt="Koladi High School Logo"
                className="footer-logo"
              />

              <h2>
                Koladi High School
              </h2>

            </div>

          </div>

        </div>

      </footer>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !footer
  ) {

    return (

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-school">

            <div className="footer-school-brand">

              <img
                src={logo}
                alt="Koladi High School Logo"
                className="footer-logo"
              />

              <h2>
                Koladi High School
              </h2>

            </div>

            <p>
              Footer information could not be loaded.
            </p>

          </div>

        </div>

      </footer>

    );

  }


  /* =======================================================
     INFORMATION DATA
  ======================================================= */

  const information = {

    privacy: {

      title:
        footer.privacyPolicy?.title ||
        "Privacy Policy",

      content:
        footer.privacyPolicy?.content ||
        "",

    },


    terms: {

      title:
        footer.termsOfUse?.title ||
        "Terms of Use",

      content:
        footer.termsOfUse?.content ||
        "",

    },


    accessibility: {

      title:
        footer.accessibility?.title ||
        "Accessibility",

      content:
        footer.accessibility?.content ||
        "",

    },


    siteInfo: {

      title:
        footer.siteInformation?.title ||
        "Site Information",

      content:
        footer.siteInformation?.content ||
        "",

    },

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <footer className="footer">


      {/* =====================================================
          MAIN FOOTER CONTENT
      ===================================================== */}

      <div className="footer-container">


        {/* =================================================
            SCHOOL INFORMATION
        ================================================= */}

        <div className="footer-school">


          {/* School Logo + Name */}

          <div className="footer-school-brand">

            <img
              src={logo}
              alt="Koladi High School Logo"
              className="footer-logo"
            />

            <h2>
              {footer.schoolName}
            </h2>

          </div>


          {/* School Description */}

          <p>
            {footer.schoolDescription}
          </p>


          {/* School Details */}

          <div className="footer-school-details">

            <span>
              Established {footer.establishedYear}
            </span>

            <span>
              EIIN: {footer.eiin}
            </span>

          </div>


          {/* =================================================
              SOCIAL MEDIA
          ================================================= */}

          <div className="footer-social">

            <h3>
              {footer.socialHeading}
            </h3>


            <div className="footer-social-links">

              <a
                href={
                  footer.facebookUrl || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  footer.facebookText
                }
              >
                {footer.facebookText}
              </a>


              <a
                href={
                  footer.youtubeUrl || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  footer.youtubeText
                }
              >
                {footer.youtubeText}
              </a>


              <a
                href={
                  footer.instagramUrl || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  footer.instagramText
                }
              >
                {footer.instagramText}
              </a>

            </div>

          </div>

        </div>


        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <div className="footer-links">

          <h3>
            {footer.quickLinksHeading}
          </h3>


          <button
            type="button"
            onClick={() =>
              goToSection("home")
            }
          >
            {footer.homeLabel}
          </button>


          <button
            type="button"
            onClick={() =>
              goToSection("about")
            }
          >
            {footer.aboutLabel}
          </button>


          <button
            type="button"
            onClick={() =>
              goToSection("academics")
            }
          >
            {footer.academicsLabel}
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/notices")
            }
          >
            {footer.noticesLabel}
          </button>


          <button
            type="button"
            onClick={() =>
              goToSection("gallery")
            }
          >
            {footer.galleryLabel}
          </button>


          <button
            type="button"
            onClick={() =>
              goToSection("contact")
            }
          >
            {footer.contactLabel}
          </button>

        </div>


        {/* =================================================
            CONTACT INFORMATION
        ================================================= */}

        <div className="footer-contact">

          <h3>
            {footer.contactHeading}
          </h3>


          <p>
            📍{" "}
            {footer.footerAddress}
          </p>


          <p>

            📞{" "}

            <a
              href={
                `tel:${footer.footerPhoneLink}`
              }
              className="footer-contact-link"
            >
              {footer.footerPhoneDisplay}
            </a>

          </p>


          <p>
            ✉️{" "}
            {footer.footerEmail}
          </p>


          <p>
            🕘{" "}
            {footer.footerOfficeHours}
          </p>

        </div>


        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="footer-important">

          <h3>
            {footer.informationHeading}
          </h3>


          <button
            type="button"
            onClick={() =>
              setActiveInfo("privacy")
            }
          >
            {
              footer.privacyPolicy?.title ||
              "Privacy Policy"
            }
          </button>


          <button
            type="button"
            onClick={() =>
              setActiveInfo("terms")
            }
          >
            {
              footer.termsOfUse?.title ||
              "Terms of Use"
            }
          </button>


          <button
            type="button"
            onClick={() =>
              setActiveInfo("accessibility")
            }
          >
            {
              footer.accessibility?.title ||
              "Accessibility"
            }
          </button>


          <button
            type="button"
            onClick={() =>
              setActiveInfo("siteInfo")
            }
          >
            {
              footer.siteInformation?.title ||
              "Site Information"
            }
          </button>

        </div>

      </div>


      {/* =====================================================
          DEVELOPER INFORMATION
          ADMIN CANNOT EDIT THIS
      ===================================================== */}

      <div className="footer-developer">

        <span className="developer-name">

          Developed by{" "}

          <strong>
            Md Abdullah Ibne Hayan
          </strong>

        </span>


        <span className="developer-university">

          🎓 Lovely Professional University, India

        </span>


        <a
          className="developer-link"
          href="mailto:mdabdullahibnehayan@gmail.com"
        >
          ✉️ mdabdullahibnehayan@gmail.com
        </a>


        <a
          className="developer-link"
          href="https://www.linkedin.com/in/mdabdullahibnehayan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 LinkedIn
        </a>

      </div>


      {/* =====================================================
          FOOTER BOTTOM
      ===================================================== */}

      <div className="footer-bottom">

        <p>
          {footer.copyrightText}
        </p>


        <span>
          {footer.officialWebsiteText}
        </span>

      </div>


      {/* =====================================================
          INFORMATION MODAL
      ===================================================== */}

      {activeInfo && (

        <div
          className="footer-info-overlay"
          onClick={() =>
            setActiveInfo(null)
          }
        >

          <div
            className="footer-info-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* Close */}

            <button
              className="footer-info-close"
              type="button"
              onClick={() =>
                setActiveInfo(null)
              }
              aria-label="Close information"
            >
              ✕
            </button>


            {/* Header */}

            <div className="footer-info-modal-header">

              <span>
                {
                  footer.schoolName ||
                  "KOLADI HIGH SCHOOL"
                }
              </span>

              <h2>
                {
                  information[activeInfo].title
                }
              </h2>

            </div>


            {/* Content */}

            <div className="footer-info-modal-content">

              {
                renderInformationContent(
                  information[activeInfo].content
                )
              }

            </div>

          </div>

        </div>

      )}

    </footer>

  );

}


export default Footer;