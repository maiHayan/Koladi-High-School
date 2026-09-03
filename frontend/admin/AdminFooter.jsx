/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN FOOTER MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/footer";


/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {

  schoolName: "",
  schoolDescription: "",
  establishedYear: "",
  eiin: "",

  socialHeading: "",
  facebookText: "",
  facebookUrl: "",
  youtubeText: "",
  youtubeUrl: "",
  instagramText: "",
  instagramUrl: "",

  quickLinksHeading: "",
  homeLabel: "",
  aboutLabel: "",
  academicsLabel: "",
  noticesLabel: "",
  galleryLabel: "",
  contactLabel: "",

  contactHeading: "",
  footerAddress: "",
  footerPhoneDisplay: "",
  footerPhoneLink: "",
  footerEmail: "",
  footerOfficeHours: "",

  informationHeading: "",

  privacyPolicyTitle: "",
  privacyPolicyContent: "",

  termsOfUseTitle: "",
  termsOfUseContent: "",

  accessibilityTitle: "",
  accessibilityContent: "",

  siteInformationTitle: "",
  siteInformationContent: "",

  copyrightText: "",
  officialWebsiteText: "",

};


/* =========================================================
   COMPONENT
========================================================= */

function AdminFooter() {

  const navigate =
    useNavigate();


  const adminToken =
    localStorage.getItem(
      "adminToken"
    );


  const [form, setForm] =
    useState(
      EMPTY_FORM
    );


  const [loading, setLoading] =
    useState(true);


  const [saving, setSaving] =
    useState(false);

  const [showPasskeyModal, setShowPasskeyModal] =
    useState(false);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  /* =======================================================
     LOAD FOOTER DATA
  ======================================================= */

  useEffect(() => {

    const loadFooter =
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


          setForm({

            schoolName:
              data.schoolName || "",

            schoolDescription:
              data.schoolDescription || "",

            establishedYear:
              data.establishedYear || "",

            eiin:
              data.eiin || "",


            socialHeading:
              data.socialHeading || "",

            facebookText:
              data.facebookText || "",

            facebookUrl:
              data.facebookUrl || "",

            youtubeText:
              data.youtubeText || "",

            youtubeUrl:
              data.youtubeUrl || "",

            instagramText:
              data.instagramText || "",

            instagramUrl:
              data.instagramUrl || "",


            quickLinksHeading:
              data.quickLinksHeading || "",

            homeLabel:
              data.homeLabel || "",

            aboutLabel:
              data.aboutLabel || "",

            academicsLabel:
              data.academicsLabel || "",

            noticesLabel:
              data.noticesLabel || "",

            galleryLabel:
              data.galleryLabel || "",

            contactLabel:
              data.contactLabel || "",


            contactHeading:
              data.contactHeading || "",

            footerAddress:
              data.footerAddress || "",

            footerPhoneDisplay:
              data.footerPhoneDisplay || "",

            footerPhoneLink:
              data.footerPhoneLink || "",

            footerEmail:
              data.footerEmail || "",

            footerOfficeHours:
              data.footerOfficeHours || "",


            informationHeading:
              data.informationHeading || "",


            privacyPolicyTitle:
              data.privacyPolicy?.title || "",

            privacyPolicyContent:
              data.privacyPolicy?.content || "",


            termsOfUseTitle:
              data.termsOfUse?.title || "",

            termsOfUseContent:
              data.termsOfUse?.content || "",


            accessibilityTitle:
              data.accessibility?.title || "",

            accessibilityContent:
              data.accessibility?.content || "",


            siteInformationTitle:
              data.siteInformation?.title || "",

            siteInformationContent:
              data.siteInformation?.content || "",


            copyrightText:
              data.copyrightText || "",

            officialWebsiteText:
              data.officialWebsiteText || "",

          });

        } catch (err) {

          console.error(
            "Footer load error:",
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


    loadFooter();

  }, []);


  /* =======================================================
     HANDLE INPUT
  ======================================================= */

  const handleChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;


      setForm(
        previous => ({
          ...previous,
          [name]: value,
        })
      );


      setMessage("");

      setError("");

    };


  /* =======================================================
     CLEAR FIELD
  ======================================================= */

  const clearField =
    (fieldName) => {

      setForm(
        previous => ({
          ...previous,
          [fieldName]: "",
        })
      );


      setMessage("");

      setError("");

    };


  /* =======================================================
     SELECT ALL TEXT IN TEXTAREA
  ======================================================= */

  const selectAllText =
    (fieldName) => {

      const textarea =
        document.querySelector(
          `textarea[name="${fieldName}"]`
        );


      if (textarea) {

        textarea.focus();

        textarea.select();

      }

    };


  /* =======================================================
     SAVE
  ======================================================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setMessage("");
      setError("");
      setShowPasskeyModal(true);

    };


  const handlePasskeyConfirmed =
    async () => {

      setShowPasskeyModal(false);

      await performSave();

    };


  const performSave =
    async () => {

      setSaving(true);

      setMessage("");

      setError("");


      try {

        const response =
          await fetch(
            API_URL,
            {

              method:
                "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                ...(adminToken
                  ? {
                      Authorization:
                        `Bearer ${adminToken}`,
                    }
                  : {}),

              },

              body:
                JSON.stringify(
                  form
                ),

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to update footer information."
          );

        }


        setForm({

          schoolName:
            data.schoolName || "",

          schoolDescription:
            data.schoolDescription || "",

          establishedYear:
            data.establishedYear || "",

          eiin:
            data.eiin || "",


          socialHeading:
            data.socialHeading || "",

          facebookText:
            data.facebookText || "",

          facebookUrl:
            data.facebookUrl || "",

          youtubeText:
            data.youtubeText || "",

          youtubeUrl:
            data.youtubeUrl || "",

          instagramText:
            data.instagramText || "",

          instagramUrl:
            data.instagramUrl || "",


          quickLinksHeading:
            data.quickLinksHeading || "",

          homeLabel:
            data.homeLabel || "",

          aboutLabel:
            data.aboutLabel || "",

          academicsLabel:
            data.academicsLabel || "",

          noticesLabel:
            data.noticesLabel || "",

          galleryLabel:
            data.galleryLabel || "",

          contactLabel:
            data.contactLabel || "",


          contactHeading:
            data.contactHeading || "",

          footerAddress:
            data.footerAddress || "",

          footerPhoneDisplay:
            data.footerPhoneDisplay || "",

          footerPhoneLink:
            data.footerPhoneLink || "",

          footerEmail:
            data.footerEmail || "",

          footerOfficeHours:
            data.footerOfficeHours || "",


          informationHeading:
            data.informationHeading || "",


          privacyPolicyTitle:
            data.privacyPolicy?.title || "",

          privacyPolicyContent:
            data.privacyPolicy?.content || "",


          termsOfUseTitle:
            data.termsOfUse?.title || "",

          termsOfUseContent:
            data.termsOfUse?.content || "",


          accessibilityTitle:
            data.accessibility?.title || "",

          accessibilityContent:
            data.accessibility?.content || "",


          siteInformationTitle:
            data.siteInformation?.title || "",

          siteInformationContent:
            data.siteInformation?.content || "",


          copyrightText:
            data.copyrightText || "",

          officialWebsiteText:
            data.officialWebsiteText || "",

        });


        setMessage(
          "Footer information updated successfully."
        );


        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } catch (err) {

        console.error(
          "Footer save error:",
          err
        );


        setError(
          err.message ||
          "Unable to save footer information."
        );

      } finally {

        setSaving(false);

      }

    };


  /* =======================================================
     REUSABLE INPUT
  ======================================================= */

  const InputField = ({
    label,
    name,
    placeholder = "",
  }) => (

    <div className="footer-admin-field">

      <label>
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={form[name]}
        placeholder={placeholder}
        onChange={handleChange}
      />

    </div>

  );


  /* =======================================================
     REUSABLE TEXTAREA
  ======================================================= */

  const TextAreaField = ({
    label,
    name,
    placeholder = "",
    showActions = true,
  }) => (

    <div className="footer-admin-field full">

      <div className="footer-admin-label-row">

        <label>
          {label}
        </label>


        {showActions && (

          <div className="footer-admin-text-actions">

            <button
              type="button"
              className="
                footer-admin-select-button
              "
              onClick={() =>
                selectAllText(name)
              }
            >
              Select All
            </button>


            <button
              type="button"
              className="
                footer-admin-clear
              "
              onClick={() =>
                clearField(name)
              }
            >
              Clear
            </button>

          </div>

        )}

      </div>


      <textarea
        name={name}
        value={form[name]}
        placeholder={placeholder}
        onChange={handleChange}
        spellCheck="true"
      />

    </div>

  );


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="footer-admin-page">

        <div className="footer-admin-loading">

          Loading Footer Management...

        </div>

      </main>

    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>

      <style>{`

        /* =================================================
           PAGE
        ================================================= */

        .footer-admin-page {

          min-height: 100vh;

          background:
            #eef5fb;

          padding:
            35px 20px 110px;

          color:
            #0b2e59;

        }


        .footer-admin-container {

          max-width:
            1150px;

          margin:
            0 auto;

        }


        /* =================================================
           HEADER
        ================================================= */

        .footer-admin-header {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          gap:
            25px;

          padding:
            32px 38px;

          margin-bottom:
            25px;

          background:
            #0b2e59;

          border-radius:
            18px;

          color:
            #ffffff;

          box-shadow:
            0 12px 30px
            rgba(11, 46, 89, 0.12);

        }


        .footer-admin-eyebrow {

          display:
            inline-block;

          margin-bottom:
            8px;

          color:
            #ffd700;

          font-size:
            0.78rem;

          font-weight:
            800;

          letter-spacing:
            2px;

        }


        .footer-admin-header h1 {

          margin:
            0 0 7px;

          font-size:
            2.15rem;

          line-height:
            1.15;

        }


        .footer-admin-header p {

          margin:
            0;

          color:
            #dbe8f5;

          line-height:
            1.6;

        }


        .footer-admin-dashboard-button {

          flex-shrink:
            0;

          padding:
            11px 20px;

          border:
            2px solid #ffd700;

          border-radius:
            999px;

          background:
            #ffd700;

          color:
            #0b2e59;

          font-size:
            0.9rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            background-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;

        }


        .footer-admin-dashboard-button:hover {

          background:
            transparent;

          color:
            #ffd700;

          transform:
            translateY(-2px);

        }


        /* =================================================
           STATUS
        ================================================= */

        .footer-admin-success,
        .footer-admin-error {

          margin-bottom:
            20px;

          padding:
            13px 16px;

          border-radius:
            10px;

          font-weight:
            600;

        }


        .footer-admin-success {

          background:
            #ecfdf3;

          color:
            #117a4d;

        }


        .footer-admin-error {

          background:
            #fff1f0;

          color:
            #c62828;

        }


        /* =================================================
           CARD
        ================================================= */

        .footer-admin-card {

          margin-bottom:
            22px;

          padding:
            28px;

          background:
            #ffffff;

          border:
            1px solid #e1e8f0;

          border-radius:
            16px;

          box-shadow:
            0 10px 30px
            rgba(11, 46, 89, 0.07);

        }


        .footer-admin-card-header {

          margin-bottom:
            22px;

          padding-bottom:
            15px;

          border-bottom:
            1px solid #edf1f5;

        }


        .footer-admin-card-header h2 {

          margin:
            0 0 6px;

          color:
            #0b2e59;

          font-size:
            1.35rem;

        }


        .footer-admin-card-header p {

          margin:
            0;

          color:
            #687384;

          font-size:
            0.92rem;

          line-height:
            1.6;

        }


        /* =================================================
           GRID
        ================================================= */

        .footer-admin-grid {

          display:
            grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap:
            20px;

        }


        /* =================================================
           FIELD
        ================================================= */

        .footer-admin-field {

          display:
            flex;

          flex-direction:
            column;

          min-width:
            0;

        }


        .footer-admin-field.full {

          grid-column:
            1 / -1;

        }


        .footer-admin-field label {

          margin-bottom:
            8px;

          color:
            #0b2e59;

          font-size:
            0.9rem;

          font-weight:
            700;

        }


        .footer-admin-label-row {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          gap:
            10px;

          margin-bottom:
            8px;

        }


        .footer-admin-label-row label {

          margin:
            0;

        }


        /* =================================================
           INPUTS
        ================================================= */

        .footer-admin-field input,
        .footer-admin-field textarea {

          width:
            100%;

          box-sizing:
            border-box;

          padding:
            13px 15px;

          border:
            1px solid #d9e1eb;

          border-radius:
            9px;

          background:
            #ffffff;

          color:
            #1f2937;

          font-size:
            0.95rem;

          font-family:
            inherit;

          outline:
            none;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease;

        }


        .footer-admin-field input {

          min-height:
            48px;

        }


        .footer-admin-field textarea {

          min-height:
            190px;

          resize:
            vertical;

          line-height:
            1.7;

        }


        .footer-admin-field input:focus,
        .footer-admin-field textarea:focus {

          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11, 46, 89, 0.08);

        }


        /* =================================================
           TEXT ACTIONS
        ================================================= */

        .footer-admin-text-actions {

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

        }


        .footer-admin-select-button,
        .footer-admin-clear {

          padding:
            5px 11px;

          border-radius:
            999px;

          font-size:
            0.78rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            background-color 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;

        }


        /* =================================================
           SELECT ALL BUTTON
        ================================================= */

        .footer-admin-select-button {

          border:
            1px solid #cfd9e5;

          background:
            #f7faff;

          color:
            #0b2e59;

        }


        .footer-admin-select-button:hover {

          background:
            #0b2e59;

          border-color:
            #0b2e59;

          color:
            #ffffff;

          transform:
            translateY(-1px);

        }


        /* =================================================
           CLEAR BUTTON
        ================================================= */

        .footer-admin-clear {

          border:
            1px solid #d9e1eb;

          background:
            #f6f9fc;

          color:
            #687384;

        }


        .footer-admin-clear:hover {

          background:
            #fff1f0;

          border-color:
            #ffc9c5;

          color:
            #c62828;

          transform:
            translateY(-1px);

        }


        /* =================================================
           SUBSECTION
        ================================================= */

        .footer-admin-subsection {

          grid-column:
            1 / -1;

          margin-top:
            8px;

          padding:
            18px 0 5px;

          border-top:
            1px solid #edf1f5;

        }


        .footer-admin-subsection h3 {

          margin:
            0;

          color:
            #0b2e59;

          font-size:
            1.05rem;

        }


        .footer-admin-subsection p {

          margin:
            5px 0 0;

          color:
            #687384;

          font-size:
            0.85rem;

          line-height:
            1.5;

        }


        /* =================================================
           SAVE BAR
        ================================================= */

        .footer-admin-save-bar {

          position:
            fixed;

          left:
            0;

          right:
            0;

          bottom:
            0;

          z-index:
            1000;

          padding:
            12px 20px;

          background:
            rgba(
              255,
              255,
              255,
              0.96
            );

          border-top:
            1px solid #dfe7f0;

          box-shadow:
            0 -8px 25px
            rgba(11, 46, 89, 0.08);

          backdrop-filter:
            blur(8px);

        }


        .footer-admin-save-inner {

          max-width:
            1150px;

          margin:
            0 auto;

          display:
            flex;

          justify-content:
            flex-end;

          align-items:
            center;

          gap:
            15px;

        }


        .footer-admin-save-status {

          margin-right:
            auto;

          color:
            #687384;

          font-size:
            0.88rem;

        }


        .footer-admin-save-button {

          min-width:
            220px;

          padding:
            13px 24px;

          border:
            2px solid #0b2e59;

          border-radius:
            999px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-size:
            0.95rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            background-color 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;

        }


        .footer-admin-save-button:hover {

          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;

          transform:
            translateY(-2px);

          box-shadow:
            0 8px 18px
            rgba(11, 46, 89, 0.14);

        }


        .footer-admin-save-button:active {

          transform:
            translateY(0);

          box-shadow:
            none;

        }


        .footer-admin-save-button:disabled {

          background:
            #91a6bb;

          border-color:
            #91a6bb;

          color:
            #ffffff;

          cursor:
            not-allowed;

          transform:
            none;

          box-shadow:
            none;

        }


        /* =================================================
           LOADING
        ================================================= */

        .footer-admin-loading {

          max-width:
            650px;

          margin:
            100px auto;

          padding:
            50px;

          background:
            #ffffff;

          border-radius:
            16px;

          text-align:
            center;

          color:
            #687384;

          box-shadow:
            0 10px 30px
            rgba(11, 46, 89, 0.07);

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 700px
        ) {

          .footer-admin-page {

            padding:
              25px 15px 105px;

          }


          .footer-admin-header {

            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;

          }


          .footer-admin-header h1 {

            font-size:
              1.8rem;

          }


          .footer-admin-dashboard-button {

            width:
              100%;

          }


          .footer-admin-card {

            padding:
              22px 18px;

          }


          .footer-admin-grid {

            grid-template-columns:
              1fr;

          }


          .footer-admin-field.full,
          .footer-admin-subsection {

            grid-column:
              auto;

          }


          .footer-admin-save-inner {

            justify-content:
              stretch;

          }


          .footer-admin-save-status {

            display:
              none;

          }


          .footer-admin-save-button {

            width:
              100%;

          }

        }

      `}</style>


      <main className="footer-admin-page">

        <div className="footer-admin-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="footer-admin-header">

            <div>

              <span className="footer-admin-eyebrow">
                KOLADI HIGH SCHOOL
              </span>


              <h1>
                Footer Management
              </h1>


              <p>
                Edit the website footer section by section.
              </p>

            </div>


            <button
              type="button"
              className="
                footer-admin-dashboard-button
              "
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Dashboard
            </button>

          </header>


          {/* =================================================
              STATUS
          ================================================= */}

          {message && (

            <div className="footer-admin-success">
              {message}
            </div>

          )}


          {error && (

            <div className="footer-admin-error">
              {error}
            </div>

          )}


          <form
            id="footer-admin-form"
            onSubmit={
              handleSubmit
            }
          >


            {/* =================================================
                SCHOOL INFORMATION
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  School Information
                </h2>

                <p>
                  Manage the school information shown
                  on the left side of the footer.
                </p>

              </div>


              <div className="footer-admin-grid">

                <InputField
                  label="School Name"
                  name="schoolName"
                />


                <InputField
                  label="Established Year"
                  name="establishedYear"
                />


                <InputField
                  label="EIIN"
                  name="eiin"
                />


                <TextAreaField
                  label="School Description"
                  name="schoolDescription"
                  showActions={false}
                />

              </div>

            </section>


            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  Social Media
                </h2>

                <p>
                  Edit social media names and links.
                </p>

              </div>


              <div className="footer-admin-grid">

                <InputField
                  label="Section Heading"
                  name="socialHeading"
                />


                <div className="footer-admin-subsection">

                  <h3>
                    Facebook
                  </h3>

                </div>


                <InputField
                  label="Facebook Text"
                  name="facebookText"
                />


                <InputField
                  label="Facebook URL"
                  name="facebookUrl"
                />


                <div className="footer-admin-subsection">

                  <h3>
                    YouTube
                  </h3>

                </div>


                <InputField
                  label="YouTube Text"
                  name="youtubeText"
                />


                <InputField
                  label="YouTube URL"
                  name="youtubeUrl"
                />


                <div className="footer-admin-subsection">

                  <h3>
                    Instagram
                  </h3>

                </div>


                <InputField
                  label="Instagram Text"
                  name="instagramText"
                />


                <InputField
                  label="Instagram URL"
                  name="instagramUrl"
                />

              </div>

            </section>


            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  Quick Links
                </h2>

                <p>
                  Edit the text of the footer navigation links.
                </p>

              </div>


              <div className="footer-admin-grid">

                <InputField
                  label="Section Heading"
                  name="quickLinksHeading"
                />


                <InputField
                  label="Home"
                  name="homeLabel"
                />


                <InputField
                  label="About"
                  name="aboutLabel"
                />


                <InputField
                  label="Academics"
                  name="academicsLabel"
                />


                <InputField
                  label="Notices"
                  name="noticesLabel"
                />


                <InputField
                  label="Gallery"
                  name="galleryLabel"
                />


                <InputField
                  label="Contact"
                  name="contactLabel"
                />

              </div>

            </section>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  Contact Information
                </h2>

                <p>
                  Manage the address, phone, email and office
                  hours shown in the footer.
                </p>

              </div>


              <div className="footer-admin-grid">

                <InputField
                  label="Section Heading"
                  name="contactHeading"
                />


                <InputField
                  label="Address"
                  name="footerAddress"
                />


                <InputField
                  label="Phone Display"
                  name="footerPhoneDisplay"
                />


                <InputField
                  label="Phone Link"
                  name="footerPhoneLink"
                />


                <InputField
                  label="Email"
                  name="footerEmail"
                />


                <InputField
                  label="Office Hours"
                  name="footerOfficeHours"
                />

              </div>

            </section>


            {/* =================================================
                INFORMATION
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  Information
                </h2>

                <p>
                  Edit the four information windows displayed
                  in the footer.
                </p>

              </div>


              <div className="footer-admin-grid">

                <InputField
                  label="Information Heading"
                  name="informationHeading"
                />


                {/* ---------------------------------------------
                    PRIVACY POLICY
                --------------------------------------------- */}

                <div className="footer-admin-subsection">

                  <h3>
                    Privacy Policy
                  </h3>

                  <p>
                    Click Select All to replace the complete
                    existing body, or Clear to remove it instantly.
                  </p>

                </div>


                <InputField
                  label="Title"
                  name="privacyPolicyTitle"
                />


                <TextAreaField
                  label="Content"
                  name="privacyPolicyContent"
                />


                {/* ---------------------------------------------
                    TERMS OF USE
                --------------------------------------------- */}

                <div className="footer-admin-subsection">

                  <h3>
                    Terms of Use
                  </h3>

                  <p>
                    Click Select All to replace the complete
                    existing body, or Clear to remove it instantly.
                  </p>

                </div>


                <InputField
                  label="Title"
                  name="termsOfUseTitle"
                />


                <TextAreaField
                  label="Content"
                  name="termsOfUseContent"
                />


                {/* ---------------------------------------------
                    ACCESSIBILITY
                --------------------------------------------- */}

                <div className="footer-admin-subsection">

                  <h3>
                    Accessibility
                  </h3>

                  <p>
                    Click Select All to replace the complete
                    existing body, or Clear to remove it instantly.
                  </p>

                </div>


                <InputField
                  label="Title"
                  name="accessibilityTitle"
                />


                <TextAreaField
                  label="Content"
                  name="accessibilityContent"
                />


                {/* ---------------------------------------------
                    SITE INFORMATION
                --------------------------------------------- */}

                <div className="footer-admin-subsection">

                  <h3>
                    Site Information
                  </h3>

                  <p>
                    Click Select All to replace the complete
                    existing body, or Clear to remove it instantly.
                  </p>

                </div>


                <InputField
                  label="Title"
                  name="siteInformationTitle"
                />


                <TextAreaField
                  label="Content"
                  name="siteInformationContent"
                />

              </div>

            </section>


            {/* =================================================
                BOTTOM FOOTER
            ================================================= */}

            <section className="footer-admin-card">

              <div className="footer-admin-card-header">

                <h2>
                  Bottom Footer
                </h2>

                <p>
                  Edit the copyright and official website text.
                </p>

              </div>


              <div className="footer-admin-grid">

                <TextAreaField
                  label="Copyright Text"
                  name="copyrightText"
                  showActions={false}
                />


                <InputField
                  label="Official Website Text"
                  name="officialWebsiteText"
                />

              </div>

            </section>

          </form>

        </div>


        {/* =================================================
            STICKY SAVE BAR
        ================================================= */}

        <div className="footer-admin-save-bar">

          <div className="footer-admin-save-inner">

            <span className="footer-admin-save-status">

              {saving
                ? "Saving your changes..."
                : "Make your changes and save when finished."}

            </span>


            <button
              type="submit"
              form="footer-admin-form"
              className="
                footer-admin-save-button
              "
              disabled={
                saving
              }
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </main>


      {showPasskeyModal && (

        <AdminPasskeyModal
          onConfirm={handlePasskeyConfirmed}
          onCancel={() =>
            setShowPasskeyModal(false)
          }
        />

      )}

    </>
  );
}


export default AdminFooter;