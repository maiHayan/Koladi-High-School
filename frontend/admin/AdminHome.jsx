/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN HOME PAGE MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "http://localhost:5000/api/home";


/* =========================================================
   ADMIN HOME COMPONENT
========================================================= */

function AdminHome() {

  const navigate =
    useNavigate();

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [form, setForm] =
    useState({

      schoolName: "",

      establishedYear: "",

      eiin: "",

      location: "",

      tagline: "",

      studentsCount: "",

      teachersCount: "",

      gpa5Count: "",

    });


  /* =======================================================
     STATUS
  ======================================================= */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showPasskeyModal, setShowPasskeyModal] = useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  /* =======================================================
     FETCH HOME DATA
  ======================================================= */

  useEffect(() => {

    const fetchHome =
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
              "Failed to load Home page information."
            );

          }


          setForm({

            schoolName:
              data.schoolName || "",

            establishedYear:
              data.establishedYear ?? "",

            eiin:
              data.eiin || "",

            location:
              data.location || "",

            tagline:
              data.tagline || "",

            studentsCount:
              data.studentsCount ?? "",

            teachersCount:
              data.teachersCount ?? "",

            gpa5Count:
              data.gpa5Count ?? "",

          });

        } catch (err) {

          console.error(
            "Home fetch error:",
            err
          );


          setError(
            err.message ||
            "Unable to load Home page information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchHome();

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
        (previous) => ({

          ...previous,

          [name]:
            value,

        })
      );

    };


  /* =======================================================
     PASSKEY CONFIRMATION
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


  /* =======================================================
     SAVE HOME DATA
  ======================================================= */

  const performSave =
    async () => {

      setMessage("");

      setError("");


      try {

        setSaving(true);


        const response =
          await fetch(
            API_URL,
            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                ...(adminToken && {

                  Authorization:
                    `Bearer ${adminToken}`,

                }),

              },

              body:
                JSON.stringify({

                  schoolName:
                    form.schoolName,

                  establishedYear:
                    Number(
                      form.establishedYear ||
                      0
                    ),

                  eiin:
                    form.eiin,

                  location:
                    form.location,

                  tagline:
                    form.tagline,

                  studentsCount:
                    Number(
                      form.studentsCount ||
                      0
                    ),

                  teachersCount:
                    Number(
                      form.teachersCount ||
                      0
                    ),

                  gpa5Count:
                    Number(
                      form.gpa5Count ||
                      0
                    ),

                }),

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to update Home page information."
          );

        }


        setForm({

          schoolName:
            data.schoolName || "",

          establishedYear:
            data.establishedYear ?? "",

          eiin:
            data.eiin || "",

          location:
            data.location || "",

          tagline:
            data.tagline || "",

          studentsCount:
            data.studentsCount ?? "",

          teachersCount:
            data.teachersCount ?? "",

          gpa5Count:
            data.gpa5Count ?? "",

        });


        setMessage(
          "Home page information updated successfully."
        );

      } catch (err) {

        console.error(
          "Home update error:",
          err
        );


        setError(
          err.message ||
          "Unable to update Home page information."
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

      <main
        className="
          admin-home-page
        "
      >

        <div
          className="
            admin-home-loading
          "
        >
          Loading Home page information...
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

        .admin-home-page {
          min-height:
            100vh;

          background:
            #eef5fb;

          padding:
            55px 20px 80px;

          color:
            #0b2e59;
        }


        .admin-home-container {
          width:
            100%;

          max-width:
            1050px;

          margin:
            0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .admin-home-header {
          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          gap:
            25px;

          padding:
            35px 40px;

          margin-bottom:
            30px;

          background:
            #0b2e59;

          border-radius:
            20px;

          color:
            #ffffff;

          box-shadow:
            0 15px 40px
            rgba(11,46,89,.15);
        }


        .admin-home-header span {
          display:
            inline-block;

          margin-bottom:
            10px;

          color:
            #ffd700;

          font-size:
            .78rem;

          font-weight:
            800;

          letter-spacing:
            2px;
        }


        .admin-home-header h1 {
          margin:
            0 0 8px;

          font-size:
            2.3rem;
        }


        .admin-home-header p {
          margin:
            0;

          color:
            #dbe8f5;

          line-height:
            1.6;
        }


        .admin-home-header button {
          padding:
            11px 18px;

          border:
            2px solid #ffd700;

          border-radius:
            999px;

          background:
            #ffd700;

          color:
            #0b2e59;

          font-size:
            .88rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all .25s ease;
        }


        .admin-home-header button:hover {
          background:
            transparent;

          color:
            #ffd700;

          transform:
            translateY(-2px);
        }


        /* =================================================
           FORM
        ================================================= */

        .admin-home-form {
          padding:
            35px;

          background:
            #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius:
            20px;

          box-shadow:
            0 12px 30px
            rgba(11,46,89,.07);
        }


        .admin-home-grid {
          display:
            grid;

          grid-template-columns:
            repeat(2,1fr);

          gap:
            20px;
        }


        .admin-home-group {
          display:
            flex;

          flex-direction:
            column;
        }


        .admin-home-group.full {
          grid-column:
            1 / -1;
        }


        .admin-home-group label {
          margin-bottom:
            8px;

          color:
            #0b2e59;

          font-size:
            .9rem;

          font-weight:
            700;
        }


        .admin-home-group input,
        .admin-home-group textarea {
          width:
            100%;

          box-sizing:
            border-box;

          padding:
            13px 15px;

          border:
            1px solid #d7e1ec;

          border-radius:
            10px;

          background:
            #ffffff;

          color:
            #1f2937;

          font-family:
            inherit;

          font-size:
            .95rem;

          outline:
            none;

          transition:
            border-color .25s ease,
            box-shadow .25s ease;
        }


        .admin-home-group textarea {
          min-height:
            120px;

          resize:
            vertical;

          line-height:
            1.6;
        }


        .admin-home-group input:focus,
        .admin-home-group textarea:focus {
          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11,46,89,.08);
        }


        /* =================================================
           SECTION TITLE
        ================================================= */

        .admin-home-section-title {
          grid-column:
            1 / -1;

          margin-top:
            8px;

          padding-top:
            20px;

          border-top:
            1px solid #e4ebf2;

          color:
            #0b2e59;

          font-size:
            1.2rem;

          font-weight:
            800;
        }


        /* =================================================
           HELP TEXT
        ================================================= */

        .admin-home-help {
          margin-top:
            6px;

          color:
            #687384;

          font-size:
            .82rem;

          line-height:
            1.5;
        }


        /* =================================================
           MESSAGES
        ================================================= */

        .admin-home-success,
        .admin-home-error {
          margin-bottom:
            20px;

          padding:
            12px 15px;

          border-radius:
            10px;

          font-size:
            .9rem;

          font-weight:
            600;
        }


        .admin-home-success {
          background:
            #ecfdf3;

          color:
            #117a4d;
        }


        .admin-home-error {
          background:
            #fff1f0;

          color:
            #c62828;
        }


        /* =================================================
           SAVE
        ================================================= */

        .admin-home-save {
          margin-top:
            28px;

          padding:
            12px 24px;

          border:
            2px solid #0b2e59;

          border-radius:
            999px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-size:
            .9rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all .25s ease;
        }


        .admin-home-save:hover {
          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;

          transform:
            translateY(-2px);
        }


        .admin-home-save:disabled {
          opacity:
            .7;

          cursor:
            not-allowed;

          transform:
            none;
        }


        /* =================================================
           LOADING
        ================================================= */

        .admin-home-loading {
          max-width:
            700px;

          margin:
            100px auto;

          padding:
            50px;

          background:
            #ffffff;

          border-radius:
            18px;

          text-align:
            center;

          color:
            #687384;

          box-shadow:
            0 10px 30px
            rgba(11,46,89,.07);
        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 700px
        ) {

          .admin-home-page {
            padding:
              30px 15px 55px;
          }


          .admin-home-header {
            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;
          }


          .admin-home-header h1 {
            font-size:
              2rem;
          }


          .admin-home-header button {
            width:
              100%;
          }


          .admin-home-form {
            padding:
              25px 20px;
          }


          .admin-home-grid {
            grid-template-columns:
              1fr;
          }


          .admin-home-group.full,
          .admin-home-section-title {
            grid-column:
              auto;
          }


          .admin-home-save {
            width:
              100%;
          }

        }

      `}</style>


      {/* ===================================================
          PAGE
      =================================================== */}

      <main
        className="
          admin-home-page
        "
      >

        <div
          className="
            admin-home-container
          "
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="
              admin-home-header
            "
          >

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Home Page Management
              </h1>

              <p>
                Manage the information and statistics
                displayed on the homepage.
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


          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="
              admin-home-form
            "
            onSubmit={
              handleSubmit
            }
          >

            {message && (

              <div
                className="
                  admin-home-success
                "
              >
                {message}
              </div>

            )}


            {error && (

              <div
                className="
                  admin-home-error
                "
              >
                {error}
              </div>

            )}


            <div
              className="
                admin-home-grid
              "
            >


              {/* =================================================
                  SCHOOL INFORMATION
              ================================================= */}

              <div
                className="
                  admin-home-section-title
                "
              >
                School Information
              </div>


              {/* -------------------------------------------------
                  SCHOOL NAME
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                  full
                "
              >

                <label>
                  School Name
                </label>

                <input
                  name="schoolName"
                  value={
                    form.schoolName
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* -------------------------------------------------
                  ESTABLISHED YEAR
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                "
              >

                <label>
                  Established Year
                </label>

                <input
                  type="number"
                  min="0"
                  name="establishedYear"
                  value={
                    form.establishedYear
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* -------------------------------------------------
                  EIIN
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                "
              >

                <label>
                  EIIN
                </label>

                <input
                  name="eiin"
                  value={
                    form.eiin
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* -------------------------------------------------
                  LOCATION
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                  full
                "
              >

                <label>
                  Location
                </label>

                <input
                  name="location"
                  value={
                    form.location
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  HERO CONTENT
              ================================================= */}

              <div
                className="
                  admin-home-section-title
                "
              >
                Hero Section
              </div>


              {/* -------------------------------------------------
                  TAGLINE
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                  full
                "
              >

                <label>
                  Hero Tagline
                </label>

                <textarea
                  name="tagline"
                  value={
                    form.tagline
                  }
                  onChange={
                    handleChange
                  }
                />

                <div
                  className="
                    admin-home-help
                  "
                >
                  This text appears below the school
                  information on the homepage.
                </div>

              </div>


              {/* =================================================
                  HOMEPAGE COUNTERS
              ================================================= */}

              <div
                className="
                  admin-home-section-title
                "
              >
                Homepage Statistics
              </div>


              {/* -------------------------------------------------
                  STUDENTS
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                "
              >

                <label>
                  Students Count
                </label>

                <input
                  type="number"
                  min="0"
                  name="studentsCount"
                  value={
                    form.studentsCount
                  }
                  onChange={
                    handleChange
                  }
                />

                <div
                  className="
                    admin-home-help
                  "
                >
                  Homepage will display this number
                  followed by “+”.
                </div>

              </div>


              {/* -------------------------------------------------
                  TEACHERS
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                "
              >

                <label>
                  Teachers Count
                </label>

                <input
                  type="number"
                  min="0"
                  name="teachersCount"
                  value={
                    form.teachersCount
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* -------------------------------------------------
                  GPA-5
              ------------------------------------------------- */}

              <div
                className="
                  admin-home-group
                "
              >

                <label>
                  GPA-5 Count
                </label>

                <input
                  type="number"
                  min="0"
                  name="gpa5Count"
                  value={
                    form.gpa5Count
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


            </div>


            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="submit"
              className="
                admin-home-save
              "
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </form>

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


/* =========================================================
   EXPORT
========================================================= */

export default AdminHome;