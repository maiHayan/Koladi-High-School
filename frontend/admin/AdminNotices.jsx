/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN NOTICE MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL = "http://localhost:5000/api/notices";


/* =========================================================
   ADMIN NOTICES COMPONENT
========================================================= */

function AdminNotices() {

  const navigate = useNavigate();

  const adminToken =
    localStorage.getItem("adminToken");


  /* =======================================================
     NOTICE LIST
  ======================================================= */

  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("Academic");

  const [date, setDate] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [isNewNotice, setIsNewNotice] =
    useState(true);


  /* =======================================================
     FORM / ACTION STATE
  ======================================================= */

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [showPasskeyModal, setShowPasskeyModal] =
    useState(false);

  const [pendingDeleteId, setPendingDeleteId] =
    useState(null);

  const [formError, setFormError] =
    useState("");


  /* =======================================================
     FETCH NOTICES
  ======================================================= */

  const fetchNotices = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(API_URL);


      if (!response.ok) {

        throw new Error(
          "Failed to fetch notices"
        );

      }


      const data =
        await response.json();


      setNotices(data);

    } catch (error) {

      console.error(
        "Admin notice fetch error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /* =======================================================
     LOAD NOTICES
  ======================================================= */

  useEffect(() => {

    fetchNotices();

  }, []);


  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {

    setTitle("");

    setCategory("Academic");

    setDate("");

    setDescription("");

    setIsNewNotice(true);

    setEditingId(null);

    setFormError("");

    setShowForm(false);

  };


  /* =======================================================
     OPEN ADD FORM
  ======================================================= */

  const openAddForm = () => {

    setTitle("");

    setCategory("Academic");

    setDate("");

    setDescription("");

    setIsNewNotice(true);

    setEditingId(null);

    setFormError("");

    setShowForm(true);

  };


  /* =======================================================
     OPEN EDIT FORM
  ======================================================= */

  const openEditForm = (notice) => {

    setEditingId(notice._id);

    setTitle(notice.title);

    setCategory(notice.category);

    setDate(
      notice.date
        ? new Date(notice.date)
            .toISOString()
            .split("T")[0]
        : ""
    );

    setDescription(
      notice.description
    );

    setIsNewNotice(
      notice.isNewNotice ?? false
    );

    setFormError("");

    setShowForm(true);


    /* -------------------------------------------------------
       Scroll to form
    ------------------------------------------------------- */

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =======================================================
     CREATE / UPDATE NOTICE
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setFormError("");


    /* -------------------------------------------------------
       Validate before requesting passkey
    ------------------------------------------------------- */

    if (
      !title.trim() ||
      !date ||
      !description.trim()
    ) {

      setFormError(
        "Please fill in all required fields."
      );

      return;

    }


    setPendingDeleteId(null);
    setShowPasskeyModal(true);

  };


  const handlePasskeyConfirmed = async () => {

    setShowPasskeyModal(false);

    const deleteId = pendingDeleteId;

    setPendingDeleteId(null);


    if (deleteId) {

      await performDelete(deleteId);

      return;

    }


    await performSave();

  };


  const performSave = async () => {

    try {

      setSaving(true);


      /* ---------------------------------------------------
         Determine request method
      --------------------------------------------------- */

      const isEditing =
        Boolean(editingId);


      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;


      const method = isEditing
        ? "PUT"
        : "POST";


      /* ---------------------------------------------------
         Send request
      --------------------------------------------------- */

      const response =
        await fetch(url, {

          method,

          headers: {

            "Content-Type":
              "application/json",

            ...(adminToken && {
              Authorization:
                `Bearer ${adminToken}`,
            }),

          },

          body: JSON.stringify({

            title: title.trim(),

            category,

            date,

            description:
              description.trim(),

            isNewNotice,

          }),

        });


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          (
            isEditing
              ? "Failed to update notice"
              : "Failed to create notice"
          )
        );

      }


      /* ---------------------------------------------------
         Refresh notice list
      --------------------------------------------------- */

      await fetchNotices();


      /* ---------------------------------------------------
         Reset form
      --------------------------------------------------- */

      resetForm();

    } catch (error) {

      console.error(
        "Notice save error:",
        error
      );


      setFormError(
        error.message ||
        "Unable to save notice."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     DELETE NOTICE
  ======================================================= */

  const handleDelete = async (
    noticeId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this notice?"
      );


    if (!confirmed) {
      return;
    }


    setPendingDeleteId(noticeId);
    setShowPasskeyModal(true);

  };


  const performDelete = async (
    noticeId
  ) => {

    try {

      setDeletingId(noticeId);


      const response =
        await fetch(
          `${API_URL}/${noticeId}`,
          {
            method: "DELETE",

            headers: {

              ...(adminToken && {
                Authorization:
                  `Bearer ${adminToken}`,
              }),

            },
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to delete notice"
        );

      }


      /* ---------------------------------------------------
         Refresh notice list
      --------------------------------------------------- */

      await fetchNotices();


    } catch (error) {

      console.error(
        "Delete notice error:",
        error
      );


      alert(
        error.message ||
        "Unable to delete notice."
      );

    } finally {

      setDeletingId(null);

    }

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>

      {/* ===================================================
          PAGE STYLES
      =================================================== */}

      <style>{`

        /* =================================================
           PAGE
        ================================================= */

        .admin-notices-page {
          min-height: 100vh;

          background: #eef5fb;

          padding:
            55px 20px 80px;

          color: #0b2e59;
        }


        /* =================================================
           CONTAINER
        ================================================= */

        .admin-notices-container {
          width: 100%;

          max-width: 1180px;

          margin: 0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .admin-notices-header {
          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 30px;

          padding: 35px 40px;

          margin-bottom: 30px;

          background: #0b2e59;

          border-radius: 20px;

          color: #ffffff;

          box-shadow:
            0 15px 40px
            rgba(11, 46, 89, 0.15);
        }


        .admin-notices-header span {
          display: inline-block;

          margin-bottom: 10px;

          color: #ffd700;

          font-size: 0.78rem;

          font-weight: 800;

          letter-spacing: 2px;
        }


        .admin-notices-header h1 {
          margin: 0 0 8px;

          font-size: 2.4rem;

          line-height: 1.15;
        }


        .admin-notices-header p {
          margin: 0;

          color: #dbe8f5;

          font-size: 0.97rem;

          line-height: 1.6;
        }


        /* =================================================
           HEADER BUTTONS
        ================================================= */

        .admin-notices-header > div:last-child {
          display: flex;

          align-items: center;

          gap: 12px;

          flex-shrink: 0;
        }


        .admin-notices-header button {
          padding: 11px 18px;

          border-radius: 999px;

          border: 2px solid #ffd700;

          background: #ffd700;

          color: #0b2e59;

          font-size: 0.88rem;

          font-weight: 700;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            background-color 0.25s ease,
            color 0.25s ease;
        }


        .admin-notices-header button:hover {
          transform: translateY(-2px);

          background: transparent;

          color: #ffd700;
        }


        /* =================================================
           FORM
        ================================================= */

        .admin-notice-form {
          margin-bottom: 30px;

          padding: 32px;

          background: #ffffff;

          border: 1px solid #dfe7f0;

          border-radius: 20px;

          box-shadow:
            0 12px 30px
            rgba(11, 46, 89, 0.07);
        }


        .admin-notice-form h2 {
          margin: 0 0 25px;

          color: #0b2e59;

          font-size: 1.6rem;
        }


        .admin-notice-form > div {
          margin-bottom: 18px;
        }


        .admin-notice-form label {
          display: block;

          margin-bottom: 8px;

          color: #0b2e59;

          font-size: 0.9rem;

          font-weight: 700;
        }


        .admin-notice-form
        input[type="text"],

        .admin-notice-form
        input[type="date"],

        .admin-notice-form select,

        .admin-notice-form textarea {
          width: 100%;

          padding: 13px 15px;

          border: 1px solid #d7e1ec;

          border-radius: 10px;

          background: #ffffff;

          color: #1f2937;

          font-family: inherit;

          font-size: 0.95rem;

          outline: none;

          box-sizing: border-box;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .admin-notice-form
        input[type="text"]:focus,

        .admin-notice-form
        input[type="date"]:focus,

        .admin-notice-form
        select:focus,

        .admin-notice-form
        textarea:focus {
          border-color: #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11, 46, 89, 0.08);
        }


        .admin-notice-form textarea {
          resize: vertical;

          min-height: 140px;

          line-height: 1.6;
        }


        /* =================================================
           CHECKBOX
        ================================================= */

        .admin-notice-form
        > label {
          display: inline-flex;

          align-items: center;

          gap: 9px;

          margin-bottom: 18px;

          cursor: pointer;
        }


        .admin-notice-form
        input[type="checkbox"] {
          width: 17px;

          height: 17px;

          accent-color: #0b2e59;

          cursor: pointer;
        }


        /* =================================================
           FORM ERROR
        ================================================= */

        .admin-notice-form-error {
          margin: 10px 0 18px;

          padding: 11px 14px;

          border-radius: 9px;

          background: #fff1f0;

          color: #c62828;

          font-size: 0.9rem;
        }


        /* =================================================
           FORM SUBMIT
        ================================================= */

        .admin-notice-form > button {
          padding: 12px 22px;

          border: 2px solid #0b2e59;

          border-radius: 999px;

          background: #0b2e59;

          color: #ffffff;

          font-size: 0.9rem;

          font-weight: 700;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            background-color 0.25s ease,
            color 0.25s ease;
        }


        .admin-notice-form > button:hover {
          background: #ffd700;

          color: #0b2e59;

          border-color: #ffd700;

          transform: translateY(-2px);
        }


        .admin-notice-form > button:disabled {
          opacity: 0.7;

          cursor: not-allowed;

          transform: none;
        }


        /* =================================================
           EMPTY / LOADING
        ================================================= */

        .admin-notices-empty {
          padding: 55px 25px;

          background: #ffffff;

          border: 1px solid #dfe7f0;

          border-radius: 18px;

          text-align: center;

          color: #687384;

          box-shadow:
            0 10px 28px
            rgba(11, 46, 89, 0.06);
        }


        /* =================================================
           NOTICE LIST
        ================================================= */

        .admin-notices-list {
          display: flex;

          flex-direction: column;

          gap: 18px;
        }


        /* =================================================
           NOTICE ITEM
        ================================================= */

        .admin-notice-item {
          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          gap: 25px;

          padding: 26px 28px;

          background: #ffffff;

          border: 1px solid #dfe7f0;

          border-left: 5px solid #0b2e59;

          border-radius: 16px;

          box-shadow:
            0 8px 24px
            rgba(11, 46, 89, 0.06);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }


        .admin-notice-item:hover {
          transform: translateY(-3px);

          border-color: #b8c9dc;

          box-shadow:
            0 15px 30px
            rgba(11, 46, 89, 0.10);
        }


        /* =================================================
           CATEGORY
        ================================================= */

        .admin-notice-category {
          display: inline-block;

          margin-bottom: 10px;

          padding: 6px 12px;

          border-radius: 999px;

          background: #eaf1f9;

          color: #0b2e59;

          font-size: 0.76rem;

          font-weight: 800;

          text-transform: uppercase;
        }


        /* =================================================
           TITLE
        ================================================= */

        .admin-notice-item h2 {
          margin: 0 0 9px;

          color: #0b2e59;

          font-size: 1.3rem;

          line-height: 1.35;
        }


        /* =================================================
           DESCRIPTION
        ================================================= */

        .admin-notice-item p {
          max-width: 780px;

          margin: 0;

          color: #687384;

          font-size: 0.94rem;

          line-height: 1.7;
        }


        /* =================================================
           NOTICE DATE
        ================================================= */

        .admin-notice-date {
          flex-shrink: 0;

          padding-top: 5px;

          color: #687384;

          font-size: 0.86rem;

          font-weight: 600;

          white-space: nowrap;
        }


        /* =================================================
           NOTICE ACTIONS
        ================================================= */

        .admin-notice-actions {
          display: flex;

          align-items: center;

          gap: 9px;

          margin-top: 16px;
        }


        .admin-edit-button,
        .admin-delete-button {
          padding: 8px 14px;

          border-radius: 8px;

          font-size: 0.82rem;

          font-weight: 700;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            background-color 0.2s ease,
            color 0.2s ease;
        }


        /* -------------------------------------------------
           EDIT
        ------------------------------------------------- */

        .admin-edit-button {
          border: 1px solid #0b2e59;

          background: #0b2e59;

          color: #ffffff;
        }


        .admin-edit-button:hover {
          background: #ffd700;

          border-color: #ffd700;

          color: #0b2e59;

          transform: translateY(-2px);
        }


        /* -------------------------------------------------
           DELETE
        ------------------------------------------------- */

        .admin-delete-button {
          border: 1px solid #e53935;

          background: #ffffff;

          color: #e53935;
        }


        .admin-delete-button:hover {
          background: #e53935;

          color: #ffffff;

          transform: translateY(-2px);
        }


        .admin-delete-button:disabled,
        .admin-edit-button:disabled {
          opacity: 0.6;

          cursor: not-allowed;

          transform: none;
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 900px) {

          .admin-notices-header {
            padding: 30px;
          }


          .admin-notice-item {
            flex-direction: column;

            gap: 10px;
          }


          .admin-notice-date {
            padding-top: 0;
          }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 600px) {

          .admin-notices-page {
            padding:
              30px 15px 55px;
          }


          .admin-notices-header {
            flex-direction: column;

            align-items: flex-start;

            padding: 25px;

            gap: 22px;
          }


          .admin-notices-header h1 {
            font-size: 2rem;
          }


          .admin-notices-header
          > div:last-child {
            width: 100%;

            flex-direction: column;

            align-items: stretch;
          }


          .admin-notices-header
          > div:last-child
          button {
            width: 100%;
          }


          .admin-notice-form {
            padding:
              24px 20px;
          }


          .admin-notice-item {
            padding:
              22px 20px;
          }


          .admin-notice-item h2 {
            font-size: 1.15rem;
          }


          .admin-notice-actions {
            width: 100%;
          }


          .admin-edit-button,
          .admin-delete-button {
            flex: 1;
          }

        }

      `}</style>


      {/* ===================================================
          PAGE
      =================================================== */}

      <main className="admin-notices-page">

        <div className="admin-notices-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="admin-notices-header">

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Manage Notices
              </h1>

              <p>
                Add, edit and delete school notices.
              </p>

            </div>


            {/* ---------------------------------------------
                HEADER BUTTONS
            --------------------------------------------- */}

            <div>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin")
                }
              >
                ← Dashboard
              </button>


              <button
                type="button"
                onClick={() => {

                  if (showForm) {

                    resetForm();

                  } else {

                    openAddForm();

                  }

                }}
              >

                {showForm
                  ? "Close"
                  : "+ Add Notice"}

              </button>

            </div>

          </div>


          {/* =================================================
              ADD / EDIT FORM
          ================================================= */}

          {showForm && (

            <form
              className="admin-notice-form"
              onSubmit={handleSubmit}
            >

              <h2>
                {editingId
                  ? "Edit Notice"
                  : "Add New Notice"}
              </h2>


              {/* -------------------------------------------
                  TITLE
              ------------------------------------------- */}

              <div>

                <label
                  htmlFor="notice-title"
                >
                  Notice Title
                </label>

                <input
                  id="notice-title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="Enter notice title"
                />

              </div>


              {/* -------------------------------------------
                  CATEGORY
              ------------------------------------------- */}

              <div>

                <label
                  htmlFor="notice-category"
                >
                  Category
                </label>

                <select
                  id="notice-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                >

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Admission">
                    Admission
                  </option>

                  <option value="Examination">
                    Examination
                  </option>

                  <option value="Holiday">
                    Holiday
                  </option>

                </select>

              </div>


              {/* -------------------------------------------
                  DATE
              ------------------------------------------- */}

              <div>

                <label
                  htmlFor="notice-date"
                >
                  Notice Date
                </label>

                <input
                  id="notice-date"
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* -------------------------------------------
                  DESCRIPTION
              ------------------------------------------- */}

              <div>

                <label
                  htmlFor="notice-description"
                >
                  Description
                </label>

                <textarea
                  id="notice-description"
                  rows="6"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Write the notice details..."
                />

              </div>


              {/* -------------------------------------------
                  NEW NOTICE
              ------------------------------------------- */}

              <label>

                <input
                  type="checkbox"
                  checked={isNewNotice}
                  onChange={(event) =>
                    setIsNewNotice(
                      event.target.checked
                    )
                  }
                />

                Mark as NEW

              </label>


              {/* -------------------------------------------
                  FORM ERROR
              ------------------------------------------- */}

              {formError && (

                <p className="admin-notice-form-error">

                  {formError}

                </p>

              )}


              {/* -------------------------------------------
                  SUBMIT
              ------------------------------------------- */}

              <button
                type="submit"
                disabled={saving}
              >

                {saving

                  ? "Saving..."

                  : editingId
                    ? "Update Notice"
                    : "Publish Notice"}

              </button>

            </form>

          )}


          {/* =================================================
              NOTICE LIST
          ================================================= */}

          {loading ? (

            <div className="admin-notices-empty">

              Loading notices...

            </div>

          ) : notices.length === 0 ? (

            <div className="admin-notices-empty">

              No notices available.

            </div>

          ) : (

            <div className="admin-notices-list">

              {notices.map(
                (notice) => (

                  <article
                    key={notice._id}
                    className="admin-notice-item"
                  >

                    <div>

                      <span
                        className="admin-notice-category"
                      >
                        {notice.category}
                      </span>


                      <h2>
                        {notice.title}
                      </h2>


                      <p>
                        {notice.description}
                      </p>


                      {/* =================================
                          EDIT / DELETE
                      ================================= */}

                      <div
                        className="admin-notice-actions"
                      >

                        <button
                          type="button"
                          className="admin-edit-button"
                          onClick={() =>
                            openEditForm(
                              notice
                            )
                          }
                          disabled={
                            deletingId ===
                            notice._id
                          }
                        >
                          ✏ Edit
                        </button>


                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(
                              notice._id
                            )
                          }
                          disabled={
                            deletingId ===
                            notice._id
                          }
                        >
                          {deletingId ===
                          notice._id
                            ? "Deleting..."
                            : "🗑 Delete"}
                        </button>

                      </div>

                    </div>


                    {/* =================================
                        DATE
                    ================================= */}

                    <div
                      className="admin-notice-date"
                    >

                      {new Date(
                        notice.date
                      ).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          )}

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


/* =========================================================
   EXPORT
========================================================= */

export default AdminNotices;