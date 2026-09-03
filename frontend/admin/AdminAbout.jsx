/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN ABOUT MANAGEMENT
========================================================= */

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/about";

const BACKEND_URL =
  "http://localhost:5000";


/* =========================================================
   COMPONENT
========================================================= */

function AdminAbout() {

  const navigate =
    useNavigate();

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );


  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState({

      heading: "",

      descriptionHeading: "",

      description: "",

      secondaryDescriptionHeading:
        "",

      secondaryDescription: "",

      mission: "",

      vision: "",

      studentsCount: "",

      teachersCount: "",

      yearsOfExcellence: "",

    });


  /* =======================================================
     IMAGES
  ======================================================= */

  const [
    mainImageFile,
    setMainImageFile,
  ] = useState(null);

  const [
    secondaryImageFile,
    setSecondaryImageFile,
  ] = useState(null);


  const [
    mainImagePreview,
    setMainImagePreview,
  ] = useState("");


  const [
    secondaryImagePreview,
    setSecondaryImagePreview,
  ] = useState("");


  const [
    removeMainImage,
    setRemoveMainImage,
  ] = useState(false);


  const [
    removeSecondaryImage,
    setRemoveSecondaryImage,
  ] = useState(false);


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
     IMAGE URL
  ======================================================= */

  const getImageUrl =
    (imageUrl) => {

      if (!imageUrl) {
        return "";
      }


      if (
        imageUrl.startsWith(
          "/uploads/"
        )
      ) {

        return `${BACKEND_URL}${imageUrl}`;

      }


      return imageUrl;

    };


  /* =======================================================
     FETCH ABOUT
  ======================================================= */

  useEffect(() => {

    const fetchAbout =
      async () => {

        try {

          setLoading(true);

          const response =
            await fetch(
              API_URL
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to load About information."
            );

          }


          setForm({

            heading:
              data.heading || "",

            descriptionHeading:
              data.descriptionHeading ||
              "About Our School",

            description:
              data.description || "",

            secondaryDescriptionHeading:
              data.secondaryDescriptionHeading ||
              "Our Educational Environment",

            secondaryDescription:
              data.secondaryDescription ||
              "",

            mission:
              data.mission || "",

            vision:
              data.vision || "",

            studentsCount:
              data.studentsCount ?? "",

            teachersCount:
              data.teachersCount ?? "",

            yearsOfExcellence:
              data.yearsOfExcellence ??
              "",

          });


          setMainImagePreview(
            getImageUrl(
              data.mainImage
            )
          );


          setSecondaryImagePreview(
            getImageUrl(
              data.secondaryImage
            )
          );

        } catch (err) {

          setError(
            err.message ||
            "Unable to load About information."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchAbout();

  }, []);


  /* =======================================================
     TEXT INPUT
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
     MAIN IMAGE
  ======================================================= */

  const handleMainImage =
    (event) => {

      const file =
        event.target.files?.[0];


      if (!file) {
        return;
      }


      setMainImageFile(
        file
      );

      setRemoveMainImage(
        false
      );


      setMainImagePreview(
        URL.createObjectURL(
          file
        )
      );

    };


  /* =======================================================
     SECONDARY IMAGE
  ======================================================= */

  const handleSecondaryImage =
    (event) => {

      const file =
        event.target.files?.[0];


      if (!file) {
        return;
      }


      setSecondaryImageFile(
        file
      );

      setRemoveSecondaryImage(
        false
      );


      setSecondaryImagePreview(
        URL.createObjectURL(
          file
        )
      );

    };


  /* =======================================================
     REMOVE MAIN IMAGE
  ======================================================= */

  const handleRemoveMain =
    () => {

      setMainImageFile(
        null
      );

      setMainImagePreview(
        ""
      );

      setRemoveMainImage(
        true
      );

    };


  /* =======================================================
     REMOVE SECONDARY IMAGE
  ======================================================= */

  const handleRemoveSecondary =
    () => {

      setSecondaryImageFile(
        null
      );

      setSecondaryImagePreview(
        ""
      );

      setRemoveSecondaryImage(
        true
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
     SAVE
  ======================================================= */

  const performSave =
    async () => {

      setMessage("");

      setError("");


      try {

        setSaving(true);


        const formData =
          new FormData();


        /* ---------------------------------------------------
           Text
        --------------------------------------------------- */

        Object.entries(
          form
        ).forEach(
          ([key, value]) => {

            formData.append(
              key,
              value
            );

          }
        );


        /* ---------------------------------------------------
           Images
        --------------------------------------------------- */

        if (
          mainImageFile
        ) {

          formData.append(
            "mainImage",
            mainImageFile
          );

        }


        if (
          secondaryImageFile
        ) {

          formData.append(
            "secondaryImage",
            secondaryImageFile
          );

        }


        /* ---------------------------------------------------
           Remove flags
        --------------------------------------------------- */

        formData.append(
          "removeMainImage",
          removeMainImage
        );


        formData.append(
          "removeSecondaryImage",
          removeSecondaryImage
        );


        /* ---------------------------------------------------
           Request
        --------------------------------------------------- */

        const response =
          await fetch(
            API_URL,
            {

              method: "PUT",

              headers: {

                ...(adminToken && {

                  Authorization:
                    `Bearer ${adminToken}`,

                }),

              },

              body:
                formData,

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to update About information."
          );

        }


        /* ---------------------------------------------------
           Success
        --------------------------------------------------- */

        setMessage(
          "About information updated successfully."
        );


        setMainImageFile(
          null
        );

        setSecondaryImageFile(
          null
        );

        setRemoveMainImage(
          false
        );

        setRemoveSecondaryImage(
          false
        );


        setMainImagePreview(
          getImageUrl(
            data.mainImage
          )
        );


        setSecondaryImagePreview(
          getImageUrl(
            data.secondaryImage
          )
        );

      } catch (err) {

        console.error(
          "About update error:",
          err
        );


        setError(
          err.message ||
          "Unable to update About information."
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
          admin-about-page
        "
      >

        <div
          className="
            admin-about-loading
          "
        >
          Loading About information...
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

        .admin-about-page {
          min-height: 100vh;

          background: #eef5fb;

          padding:
            55px 20px 80px;

          color: #0b2e59;
        }


        .admin-about-container {
          width: 100%;

          max-width:
            1100px;

          margin:
            0 auto;
        }


        .admin-about-header {
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
        }


        .admin-about-header span {
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


        .admin-about-header h1 {
          margin:
            0 0 8px;

          font-size:
            2.3rem;
        }


        .admin-about-header p {
          margin:
            0;

          color:
            #dbe8f5;
        }


        .admin-about-header button {
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

          font-weight:
            700;

          cursor:
            pointer;
        }


        .admin-about-form {
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


        .admin-about-grid {
          display:
            grid;

          grid-template-columns:
            repeat(2,1fr);

          gap:
            20px;
        }


        .admin-about-group {
          display:
            flex;

          flex-direction:
            column;
        }


        .admin-about-group.full,
        .admin-about-section-title {
          grid-column:
            1 / -1;
        }


        .admin-about-group label {
          margin-bottom:
            8px;

          font-weight:
            700;
        }


        .admin-about-group input,
        .admin-about-group textarea {
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

          font-family:
            inherit;

          font-size:
            .95rem;

          outline:
            none;
        }


        .admin-about-group textarea {
          min-height:
            125px;

          resize:
            vertical;
        }


        .admin-about-group input:focus,
        .admin-about-group textarea:focus {
          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11,46,89,.08);
        }


        .admin-about-section-title {
          margin-top:
            12px;

          padding-top:
            20px;

          border-top:
            1px solid #e4ebf2;

          font-size:
            1.25rem;

          font-weight:
            800;
        }


        .admin-about-success,
        .admin-about-error {
          margin-bottom:
            20px;

          padding:
            12px 15px;

          border-radius:
            10px;

          font-weight:
            600;
        }


        .admin-about-success {
          background:
            #ecfdf3;

          color:
            #117a4d;
        }


        .admin-about-error {
          background:
            #fff1f0;

          color:
            #c62828;
        }


        /* =================================================
           IMAGE MANAGEMENT
        ================================================= */

        .admin-about-image-box {
          display:
            flex;

          flex-direction:
            column;

          gap:
            12px;
        }


        .admin-about-file-input {
          padding:
            12px !important;

          background:
            #f8fbfe !important;

          cursor:
            pointer;
        }


        .admin-about-image-preview {
          width:
            280px;

          height:
            175px;

          overflow:
            hidden;

          border:
            1px solid #dfe7f0;

          border-radius:
            12px;

          background:
            #f3f6fa;
        }


        .admin-about-image-preview img {
          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

          display:
            block;
        }


        .admin-about-image-actions {
          display:
            flex;

          gap:
            10px;
        }


        .admin-about-remove-button {
          padding:
            9px 15px;

          border:
            1px solid #e53935;

          border-radius:
            8px;

          background:
            #ffffff;

          color:
            #e53935;

          font-weight:
            700;

          cursor:
            pointer;
        }


        .admin-about-remove-button:hover {
          background:
            #e53935;

          color:
            #ffffff;
        }


        .admin-about-save {
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

          font-weight:
            700;

          cursor:
            pointer;
        }


        .admin-about-save:hover {
          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;
        }


        .admin-about-save:disabled {
          opacity:
            .7;

          cursor:
            not-allowed;
        }


        .admin-about-loading {
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
        }


        @media (
          max-width: 700px
        ) {

          .admin-about-page {
            padding:
              30px 15px 55px;
          }


          .admin-about-header {
            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;
          }


          .admin-about-header button {
            width:
              100%;
          }


          .admin-about-grid {
            grid-template-columns:
              1fr;
          }


          .admin-about-group.full,
          .admin-about-section-title {
            grid-column:
              auto;
          }


          .admin-about-image-preview {
            width:
              100%;
          }


          .admin-about-save {
            width:
              100%;
          }

        }

      `}</style>


      <main
        className="
          admin-about-page
        "
      >

        <div
          className="
            admin-about-container
          "
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="
              admin-about-header
            "
          >

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                About School
              </h1>

              <p>
                Manage the complete About section
                of the school website.
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
              admin-about-form
            "
            onSubmit={
              handleSubmit
            }
          >


            {message && (

              <div
                className="
                  admin-about-success
                "
              >
                {message}
              </div>

            )}


            {error && (

              <div
                className="
                  admin-about-error
                "
              >
                {error}
              </div>

            )}


            <div
              className="
                admin-about-grid
              "
            >


              {/* =================================================
                  MAIN CONTENT
              ================================================= */}

              <div
                className="
                  admin-about-section-title
                "
              >
                Main About Content
              </div>


              {/* =================================================
                  ABOUT HEADING
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  About Heading
                </label>

                <input
                  name="heading"
                  value={
                    form.heading
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  DESCRIPTION HEADING
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Main Description Heading
                </label>

                <input
                  name="
                    descriptionHeading
                  "
                  value={
                    form.descriptionHeading
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  MAIN DESCRIPTION
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Main Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  SECONDARY DESCRIPTION HEADING
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Secondary Description Heading
                </label>

                <input
                  name="
                    secondaryDescriptionHeading
                  "
                  value={
                    form.secondaryDescriptionHeading
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  SECONDARY DESCRIPTION
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Secondary Description
                </label>

                <textarea
                  name="
                    secondaryDescription
                  "
                  value={
                    form.secondaryDescription
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  MISSION
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Mission
                </label>

                <textarea
                  name="mission"
                  value={
                    form.mission
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  VISION
              ================================================= */}

              <div
                className="
                  admin-about-group
                  full
                "
              >

                <label>
                  Vision
                </label>

                <textarea
                  name="vision"
                  value={
                    form.vision
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  HIGHLIGHTS
              ================================================= */}

              <div
                className="
                  admin-about-section-title
                "
              >
                School Highlights
              </div>


              <div
                className="
                  admin-about-group
                "
              >

                <label>
                  Number of Students
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

              </div>


              <div
                className="
                  admin-about-group
                "
              >

                <label>
                  Number of Teachers
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


              <div
                className="
                  admin-about-group
                "
              >

                <label>
                  Years of Excellence
                </label>

                <input
                  type="number"
                  min="0"
                  name="yearsOfExcellence"
                  value={
                    form.yearsOfExcellence
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              {/* =================================================
                  IMAGES
              ================================================= */}

              <div
                className="
                  admin-about-section-title
                "
              >
                About Images
              </div>


              {/* =================================================
                  MAIN IMAGE
              ================================================= */}

              <div
                className="
                  admin-about-group
                "
              >

                <label>
                  Main About Image
                </label>


                <div
                  className="
                    admin-about-image-box
                  "
                >

                  <input
                    className="
                      admin-about-file-input
                    "
                    type="file"
                    accept="
                      image/jpeg,
                      image/jpg,
                      image/png,
                      image/webp
                    "
                    onChange={
                      handleMainImage
                    }
                  />


                  <small>
                    JPG, JPEG, PNG or WebP ·
                    Maximum 5 MB
                  </small>


                  {mainImagePreview && (

                    <div
                      className="
                        admin-about-image-preview
                      "
                    >

                      <img
                        src={
                          mainImagePreview
                        }
                        alt="
                          Main About preview
                        "
                      />

                    </div>

                  )}


                  {mainImagePreview && (

                    <div
                      className="
                        admin-about-image-actions
                      "
                    >

                      <button
                        type="button"
                        className="
                          admin-about-remove-button
                        "
                        onClick={
                          handleRemoveMain
                        }
                      >
                        🗑 Remove Main Photo
                      </button>

                    </div>

                  )}

                </div>

              </div>


              {/* =================================================
                  SECONDARY IMAGE
              ================================================= */}

              <div
                className="
                  admin-about-group
                "
              >

                <label>
                  Secondary About Image
                </label>


                <div
                  className="
                    admin-about-image-box
                  "
                >

                  <input
                    className="
                      admin-about-file-input
                    "
                    type="file"
                    accept="
                      image/jpeg,
                      image/jpg,
                      image/png,
                      image/webp
                    "
                    onChange={
                      handleSecondaryImage
                    }
                  />


                  <small>
                    JPG, JPEG, PNG or WebP ·
                    Maximum 5 MB
                  </small>


                  {secondaryImagePreview && (

                    <div
                      className="
                        admin-about-image-preview
                      "
                    >

                      <img
                        src={
                          secondaryImagePreview
                        }
                        alt="
                          Secondary About preview
                        "
                      />

                    </div>

                  )}


                  {secondaryImagePreview && (

                    <div
                      className="
                        admin-about-image-actions
                      "
                    >

                      <button
                        type="button"
                        className="
                          admin-about-remove-button
                        "
                        onClick={
                          handleRemoveSecondary
                        }
                      >
                        🗑 Remove Secondary Photo
                      </button>

                    </div>

                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="submit"
              className="
                admin-about-save
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


export default AdminAbout;