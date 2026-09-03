/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN CONTACT MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/contact";


/* =========================================================
   DEFAULT FORM
========================================================= */

const DEFAULT_FORM = {

  sectionLabel: "",
  sectionHeading: "",
  sectionDescription: "",

  addressLabel: "",
  address: "",

  phoneLabel: "",
  phoneDisplay: "",
  phoneLink: "",

  emailLabel: "",
  email: "",

  officeHoursLabel: "",
  officeDays: "",
  officeTime: "",

  formHeading: "",
  namePlaceholder: "",
  emailPlaceholder: "",
  subjectPlaceholder: "",
  messagePlaceholder: "",
  buttonText: "",

};


/* =========================================================
   COMPONENT
========================================================= */

function AdminContact() {

  const navigate =
    useNavigate();


  const adminToken =
    localStorage.getItem(
      "adminToken"
    );


  const [form, setForm] =
    useState(
      DEFAULT_FORM
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
     FETCH CONTACT
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
              "Failed to load Contact information."
            );

          }


          setForm({

            sectionLabel:
              data.sectionLabel || "",

            sectionHeading:
              data.sectionHeading || "",

            sectionDescription:
              data.sectionDescription || "",


            addressLabel:
              data.addressLabel || "",

            address:
              data.address || "",


            phoneLabel:
              data.phoneLabel || "",

            phoneDisplay:
              data.phoneDisplay || "",

            phoneLink:
              data.phoneLink || "",


            emailLabel:
              data.emailLabel || "",

            email:
              data.email || "",


            officeHoursLabel:
              data.officeHoursLabel || "",

            officeDays:
              data.officeDays || "",

            officeTime:
              data.officeTime || "",


            formHeading:
              data.formHeading || "",

            namePlaceholder:
              data.namePlaceholder || "",

            emailPlaceholder:
              data.emailPlaceholder || "",

            subjectPlaceholder:
              data.subjectPlaceholder || "",

            messagePlaceholder:
              data.messagePlaceholder || "",

            buttonText:
              data.buttonText || "",

          });

        } catch (err) {

          console.error(
            "Contact fetch error:",
            err
          );


          setError(
            err.message ||
            "Unable to load Contact information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchContact();

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

          [name]:
            value,

        })
      );

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

                ...(adminToken && {

                  Authorization:
                    `Bearer ${adminToken}`,

                }),

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
            "Failed to update Contact information."
          );

        }


        setForm({

          sectionLabel:
            data.sectionLabel || "",

          sectionHeading:
            data.sectionHeading || "",

          sectionDescription:
            data.sectionDescription || "",


          addressLabel:
            data.addressLabel || "",

          address:
            data.address || "",


          phoneLabel:
            data.phoneLabel || "",

          phoneDisplay:
            data.phoneDisplay || "",

          phoneLink:
            data.phoneLink || "",


          emailLabel:
            data.emailLabel || "",

          email:
            data.email || "",


          officeHoursLabel:
            data.officeHoursLabel || "",

          officeDays:
            data.officeDays || "",

          officeTime:
            data.officeTime || "",


          formHeading:
            data.formHeading || "",

          namePlaceholder:
            data.namePlaceholder || "",

          emailPlaceholder:
            data.emailPlaceholder || "",

          subjectPlaceholder:
            data.subjectPlaceholder || "",

          messagePlaceholder:
            data.messagePlaceholder || "",

          buttonText:
            data.buttonText || "",

        });


        setMessage(
          "Contact information updated successfully."
        );

      } catch (err) {

        console.error(
          "Contact update error:",
          err
        );


        setError(
          err.message ||
          "Unable to update Contact information."
        );

      } finally {

        setSaving(false);

      }

    };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="admin-contact-page">

        <div className="admin-contact-loading">

          Loading Contact information...

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

        .admin-contact-page {
          min-height: 100vh;
          background: #eef5fb;
          padding: 50px 20px 80px;
          color: #0b2e59;
        }


        .admin-contact-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .admin-contact-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;

          padding: 35px 40px;
          margin-bottom: 30px;

          background: #0b2e59;
          border-radius: 20px;

          color: #ffffff;
        }


        .admin-contact-header span {
          display: inline-block;
          margin-bottom: 10px;

          color: #ffd700;

          font-size: .78rem;
          font-weight: 800;

          letter-spacing: 2px;
        }


        .admin-contact-header h1 {
          margin: 0 0 8px;
          font-size: 2.3rem;
        }


        .admin-contact-header p {
          margin: 0;
          color: #dbe8f5;
          line-height: 1.6;
        }


        .admin-contact-header button {
          padding: 11px 18px;

          border: 2px solid #ffd700;
          border-radius: 999px;

          background: #ffd700;
          color: #0b2e59;

          font-weight: 700;
          cursor: pointer;
        }


        /* =================================================
           FORM
        ================================================= */

        .admin-contact-form {
          padding: 35px;

          background: #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius: 20px;

          box-shadow:
            0 12px 30px
            rgba(11,46,89,.07);
        }


        .admin-contact-section {
          margin-bottom: 30px;
          padding: 28px;

          border:
            1px solid #e1e8f0;

          border-radius: 16px;

          background:
            #fbfdff;
        }


        .admin-contact-section:last-child {
          margin-bottom: 0;
        }


        .admin-contact-section-header {
          margin-bottom: 22px;
          padding-bottom: 14px;

          border-bottom:
            1px solid #e1e8f0;
        }


        .admin-contact-section-header h2 {
          margin: 0 0 6px;
          font-size: 1.35rem;
        }


        .admin-contact-section-header p {
          margin: 0;
          color: #687384;
          font-size: .9rem;
        }


        .admin-contact-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 20px;
        }


        .admin-contact-field {
          display: flex;
          flex-direction: column;
        }


        .admin-contact-field.full {
          grid-column: 1 / -1;
        }


        .admin-contact-field label {
          margin-bottom: 8px;

          font-size: .9rem;
          font-weight: 700;
        }


        .admin-contact-field input,
        .admin-contact-field textarea {
          width: 100%;
          box-sizing: border-box;

          padding: 13px 15px;

          border:
            1px solid #d7e1ec;

          border-radius: 10px;

          background: #ffffff;

          font-family: inherit;
          font-size: .95rem;

          outline: none;
        }


        .admin-contact-field textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }


        .admin-contact-field input:focus,
        .admin-contact-field textarea:focus {
          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11,46,89,.08);
        }


        /* =================================================
           STATUS
        ================================================= */

        .admin-contact-success,
        .admin-contact-error {
          margin-bottom: 20px;

          padding: 12px 15px;

          border-radius: 10px;

          font-weight: 600;
        }


        .admin-contact-success {
          background: #ecfdf3;
          color: #117a4d;
        }


        .admin-contact-error {
          background: #fff1f0;
          color: #c62828;
        }


        /* =================================================
           SAVE
        ================================================= */

        .admin-contact-save {
          width: 100%;

          margin-top: 25px;

          padding: 14px 24px;

          border:
            2px solid #0b2e59;

          border-radius: 999px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-size: .95rem;
          font-weight: 700;

          cursor: pointer;
        }


        .admin-contact-save:hover {
          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;
        }


        .admin-contact-save:disabled {
          opacity: .7;
          cursor: not-allowed;
        }


        /* =================================================
           LOADING
        ================================================= */

        .admin-contact-loading {
          max-width: 700px;

          margin: 100px auto;

          padding: 50px;

          background:
            #ffffff;

          border-radius:
            18px;

          text-align:
            center;

          color:
            #687384;
        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 700px
        ) {

          .admin-contact-page {
            padding:
              30px 15px 55px;
          }


          .admin-contact-header {
            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;
          }


          .admin-contact-header button {
            width:
              100%;
          }


          .admin-contact-form {
            padding:
              20px;
          }


          .admin-contact-section {
            padding:
              20px;
          }


          .admin-contact-grid {
            grid-template-columns:
              1fr;
          }


          .admin-contact-field.full {
            grid-column:
              auto;
          }

        }

      `}</style>


      <main className="admin-contact-page">

        <div className="admin-contact-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="admin-contact-header">

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Contact Management
              </h1>

              <p>
                Manage every text field displayed
                in the Contact section.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Dashboard
            </button>

          </header>


          <form
            className="admin-contact-form"
            onSubmit={
              handleSubmit
            }
          >

            {message && (

              <div
                className="
                  admin-contact-success
                "
              >
                {message}
              </div>

            )}


            {error && (

              <div
                className="
                  admin-contact-error
                "
              >
                {error}
              </div>

            )}


            {/* =================================================
                MAIN SECTION
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Contact Section
                </h2>

                <p>
                  Edit the main heading and description.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Section Label
                  </label>

                  <input
                    name="sectionLabel"
                    value={
                      form.sectionLabel
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Section Heading
                  </label>

                  <input
                    name="sectionHeading"
                    value={
                      form.sectionHeading
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Section Description
                  </label>

                  <textarea
                    name="sectionDescription"
                    value={
                      form.sectionDescription
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                ADDRESS
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Address
                </h2>

                <p>
                  Manage the address shown on the website.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Label
                  </label>

                  <input
                    name="addressLabel"
                    value={
                      form.addressLabel
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Address
                  </label>

                  <input
                    name="address"
                    value={
                      form.address
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                PHONE
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Phone
                </h2>

                <p>
                  Change the displayed phone number
                  and clickable telephone link.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Label
                  </label>

                  <input
                    name="phoneLabel"
                    value={
                      form.phoneLabel
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Display Phone Number
                  </label>

                  <input
                    name="phoneDisplay"
                    value={
                      form.phoneDisplay
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Phone Link
                  </label>

                  <input
                    name="phoneLink"
                    value={
                      form.phoneLink
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <small>
                    Used when the visitor clicks the phone number.
                    Example: +8801716200170
                  </small>

                </div>

              </div>

            </section>


            {/* =================================================
                EMAIL
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Email
                </h2>

                <p>
                  Manage the email text displayed
                  in the Contact section.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Label
                  </label>

                  <input
                    name="emailLabel"
                    value={
                      form.emailLabel
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Email
                  </label>

                  <input
                    name="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                OFFICE HOURS
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Office Hours
                </h2>

                <p>
                  Change the office days and working hours.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Label
                  </label>

                  <input
                    name="officeHoursLabel"
                    value={
                      form.officeHoursLabel
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Office Days
                  </label>

                  <input
                    name="officeDays"
                    value={
                      form.officeDays
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Office Time
                  </label>

                  <input
                    name="officeTime"
                    value={
                      form.officeTime
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <section
              className="
                admin-contact-section
              "
            >

              <div
                className="
                  admin-contact-section-header
                "
              >

                <h2>
                  Contact Form
                </h2>

                <p>
                  Edit the form heading, placeholders
                  and button text.
                </p>

              </div>


              <div
                className="
                  admin-contact-grid
                "
              >

                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Form Heading
                  </label>

                  <input
                    name="formHeading"
                    value={
                      form.formHeading
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Name Placeholder
                  </label>

                  <input
                    name="namePlaceholder"
                    value={
                      form.namePlaceholder
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Email Placeholder
                  </label>

                  <input
                    name="emailPlaceholder"
                    value={
                      form.emailPlaceholder
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                  "
                >

                  <label>
                    Subject Placeholder
                  </label>

                  <input
                    name="subjectPlaceholder"
                    value={
                      form.subjectPlaceholder
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Message Placeholder
                  </label>

                  <textarea
                    name="messagePlaceholder"
                    value={
                      form.messagePlaceholder
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                <div
                  className="
                    admin-contact-field
                    full
                  "
                >

                  <label>
                    Submit Button Text
                  </label>

                  <input
                    name="buttonText"
                    value={
                      form.buttonText
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="submit"
              className="
                admin-contact-save
              "
              disabled={
                saving
              }
            >

              {saving
                ? "Saving..."
                : "Save Contact Changes"}

            </button>

          </form>

        </div>

      </main>


      {showPasskeyModal && (

        <AdminPasskeyModal
          onConfirm={handlePasskeyConfirmed}
          onCancel={() => {
            setShowPasskeyModal(false);
            setPendingDeleteId(null);
          }}
        />

      )}

    </>
  );
}


export default AdminContact;