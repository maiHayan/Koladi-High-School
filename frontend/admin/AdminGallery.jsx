/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN GALLERY MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "http://localhost:5000/api/gallery";


/* =========================================================
   ADMIN GALLERY COMPONENT
========================================================= */

function AdminGallery() {

  const navigate = useNavigate();

  const adminToken =
    localStorage.getItem("adminToken");


  /* =======================================================
     GALLERY ITEMS
  ======================================================= */

  const [galleryItems, setGalleryItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


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
    useState("Campus");

  const [description, setDescription] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");


  /* =======================================================
     ACTION STATE
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
     FETCH GALLERY
  ======================================================= */

  const fetchGallery = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(API_URL);


      if (!response.ok) {

        throw new Error(
          "Failed to fetch gallery"
        );

      }


      const data =
        await response.json();


      setGalleryItems(data);

    } catch (error) {

      console.error(
        "Gallery fetch error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /* =======================================================
     LOAD GALLERY
  ======================================================= */

  useEffect(() => {

    fetchGallery();

  }, []);


  /* =======================================================
     CLEANUP PREVIEW URL
  ======================================================= */

  useEffect(() => {

    return () => {

      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {

        URL.revokeObjectURL(
          imagePreview
        );

      }

    };

  }, [imagePreview]);


  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {

    setTitle("");

    setCategory("Campus");

    setDescription("");

    setImageFile(null);

    setImagePreview("");

    setEditingId(null);

    setFormError("");

    setShowForm(false);

  };


  /* =======================================================
     OPEN ADD FORM
  ======================================================= */

  const openAddForm = () => {

    setTitle("");

    setCategory("Campus");

    setDescription("");

    setImageFile(null);

    setImagePreview("");

    setEditingId(null);

    setFormError("");

    setShowForm(true);

  };


  /* =======================================================
     OPEN EDIT FORM
  ======================================================= */

  const openEditForm = (item) => {

    setEditingId(item._id);

    setTitle(
      item.title || ""
    );

    setCategory(
      item.category || "Campus"
    );

    setDescription(
      item.description || ""
    );

    setImageFile(null);

    setImagePreview(
      item.imageUrl || ""
    );

    setFormError("");

    setShowForm(true);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =======================================================
     HANDLE IMAGE SELECTION
  ======================================================= */

  const handleImageChange = (
    event
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {

      return;

    }


    /* -------------------------------------------------------
       Validate file type
    ------------------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setFormError(
        "Only JPG, JPEG, PNG and WebP images are allowed."
      );

      event.target.value = "";

      return;

    }


    /* -------------------------------------------------------
       Validate file size
       Backend limit = 5 MB
    ------------------------------------------------------- */

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      setFormError(
        "Image size must be 5 MB or smaller."
      );

      event.target.value = "";

      return;

    }


    /* -------------------------------------------------------
       Create preview
    ------------------------------------------------------- */

    const previewUrl =
      URL.createObjectURL(file);


    setImageFile(file);

    setImagePreview(previewUrl);

    setFormError("");

  };


  /* =======================================================
     CREATE / UPDATE GALLERY ITEM
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setFormError("");


    /* -------------------------------------------------------
       Validate before requesting passkey
    ------------------------------------------------------- */

    if (!title.trim()) {

      setFormError(
        "Please enter a title."
      );

      return;

    }


    if (
      !editingId &&
      !imageFile
    ) {

      setFormError(
        "Please choose an image."
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


      const isEditing =
        Boolean(editingId);


      const url = isEditing

        ? `${API_URL}/${editingId}`

        : API_URL;


      const formData =
        new FormData();


      formData.append(
        "title",
        title.trim()
      );


      formData.append(
        "category",
        category
      );


      formData.append(
        "description",
        description.trim()
      );


      /* ---------------------------------------------------
         Add image only when selected
      --------------------------------------------------- */

      if (imageFile) {

        formData.append(
          "image",
          imageFile
        );

      }


      /* ---------------------------------------------------
         Send request
      --------------------------------------------------- */

      const response =
        await fetch(url, {

          method:
            isEditing
              ? "PUT"
              : "POST",

          headers: {

            ...(adminToken && {
              Authorization:
                `Bearer ${adminToken}`,
            }),

          },

          body: formData,

        });


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          (
            isEditing
              ? "Failed to update gallery item."
              : "Failed to create gallery item."
          )
        );

      }


      /* ---------------------------------------------------
         Refresh gallery
      --------------------------------------------------- */

      await fetchGallery();


      /* ---------------------------------------------------
         Reset
      --------------------------------------------------- */

      resetForm();

    } catch (error) {

      console.error(
        "Gallery save error:",
        error
      );


      setFormError(
        error.message ||
        "Unable to save gallery item."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     DELETE GALLERY ITEM
  ======================================================= */

  const handleDelete = async (
    itemId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this photo?"
      );


    if (!confirmed) {

      return;

    }


    setPendingDeleteId(itemId);
    setShowPasskeyModal(true);

  };


  const performDelete = async (
    itemId
  ) => {

    try {

      setDeletingId(itemId);


      const response =
        await fetch(
          `${API_URL}/${itemId}`,
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
          "Failed to delete gallery item."
        );

      }


      await fetchGallery();

    } catch (error) {

      console.error(
        "Gallery delete error:",
        error
      );


      alert(
        error.message ||
        "Unable to delete gallery item."
      );

    } finally {

      setDeletingId(null);

    }

  };


  /* =======================================================
     GET IMAGE URL
  ======================================================= */

  const getImageUrl = (
    imageUrl
  ) => {

    if (!imageUrl) {

      return "";

    }


    /* -------------------------------------------------------
       Existing public gallery images
       Example:
       /gallery/gallery-1.jpg
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith(
        "/gallery/"
      )
    ) {

      return imageUrl;

    }


    /* -------------------------------------------------------
       Uploaded images
       Example:
       /uploads/gallery/filename.jpg
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith(
        "/uploads/"
      )
    ) {

      return `http://localhost:5000${imageUrl}`;

    }


    /* -------------------------------------------------------
       Full URL
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith(
        "http://"
      ) ||
      imageUrl.startsWith(
        "https://"
      )
    ) {

      return imageUrl;

    }


    return imageUrl;

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

        .admin-gallery-page {
          min-height: 100vh;

          background: #eef5fb;

          padding:
            55px 20px 80px;

          color: #0b2e59;
        }


        .admin-gallery-container {
          width: 100%;

          max-width: 1180px;

          margin: 0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .admin-gallery-header {
          display: flex;

          justify-content:
            space-between;

          align-items:
            center;

          gap: 30px;

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
            rgba(11, 46, 89, 0.15);
        }


        .admin-gallery-header span {
          display:
            inline-block;

          margin-bottom:
            10px;

          color:
            #ffd700;

          font-size:
            0.78rem;

          font-weight:
            800;

          letter-spacing:
            2px;
        }


        .admin-gallery-header h1 {
          margin:
            0 0 8px;

          font-size:
            2.4rem;

          line-height:
            1.15;
        }


        .admin-gallery-header p {
          margin:
            0;

          color:
            #dbe8f5;

          font-size:
            0.97rem;

          line-height:
            1.6;
        }


        .admin-gallery-header
        > div:last-child {
          display:
            flex;

          gap:
            12px;

          flex-shrink:
            0;
        }


        .admin-gallery-header button {
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
            0.88rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all 0.25s ease;
        }


        .admin-gallery-header button:hover {
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

        .admin-gallery-form {
          margin-bottom:
            30px;

          padding:
            32px;

          background:
            #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius:
            20px;

          box-shadow:
            0 12px 30px
            rgba(11, 46, 89, 0.07);
        }


        .admin-gallery-form h2 {
          margin:
            0 0 25px;

          color:
            #0b2e59;

          font-size:
            1.6rem;
        }


        .admin-gallery-form-group {
          margin-bottom:
            20px;
        }


        .admin-gallery-form label {
          display:
            block;

          margin-bottom:
            8px;

          color:
            #0b2e59;

          font-size:
            0.9rem;

          font-weight:
            700;
        }


        .admin-gallery-form input,
        .admin-gallery-form select,
        .admin-gallery-form textarea {
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
            0.95rem;

          outline:
            none;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .admin-gallery-form input:focus,
        .admin-gallery-form select:focus,
        .admin-gallery-form textarea:focus {
          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11, 46, 89, 0.08);
        }


        .admin-gallery-form textarea {
          min-height:
            120px;

          resize:
            vertical;

          line-height:
            1.6;
        }


        /* =================================================
           FILE INPUT
        ================================================= */

        .admin-gallery-file-input {
          padding:
            12px;

          background:
            #f8fbfe !important;

          cursor:
            pointer;
        }


        .admin-gallery-file-help {
          margin-top:
            7px;

          color:
            #687384;

          font-size:
            0.82rem;

          line-height:
            1.5;
        }


        /* =================================================
           IMAGE PREVIEW
        ================================================= */

        .admin-gallery-preview {
          margin-top:
            15px;

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
            #f5f8fb;
        }


        .admin-gallery-preview img {
          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

          display:
            block;
        }


        /* =================================================
           ERROR
        ================================================= */

        .admin-gallery-form-error {
          margin:
            10px 0 18px;

          padding:
            11px 14px;

          border-radius:
            9px;

          background:
            #fff1f0;

          color:
            #c62828;

          font-size:
            0.9rem;
        }


        /* =================================================
           SUBMIT
        ================================================= */

        .admin-gallery-form > button {
          padding:
            12px 22px;

          border:
            2px solid #0b2e59;

          border-radius:
            999px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-size:
            0.9rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all 0.25s ease;
        }


        .admin-gallery-form > button:hover {
          background:
            #ffd700;

          color:
            #0b2e59;

          border-color:
            #ffd700;

          transform:
            translateY(-2px);
        }


        .admin-gallery-form > button:disabled {
          opacity:
            0.7;

          cursor:
            not-allowed;

          transform:
            none;
        }


        /* =================================================
           EMPTY STATE
        ================================================= */

        .admin-gallery-empty {
          padding:
            55px 25px;

          background:
            #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius:
            18px;

          text-align:
            center;

          color:
            #687384;

          box-shadow:
            0 10px 28px
            rgba(11, 46, 89, 0.06);
        }


        .admin-gallery-empty h2 {
          margin:
            0 0 8px;

          color:
            #0b2e59;
        }


        /* =================================================
           GALLERY GRID
        ================================================= */

        .admin-gallery-grid {
          display:
            grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap:
            22px;
        }


        /* =================================================
           GALLERY CARD
        ================================================= */

        .admin-gallery-card {
          overflow:
            hidden;

          background:
            #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius:
            17px;

          box-shadow:
            0 10px 28px
            rgba(11, 46, 89, 0.06);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }


        .admin-gallery-card:hover {
          transform:
            translateY(-5px);

          border-color:
            #b9cce0;

          box-shadow:
            0 18px 35px
            rgba(11, 46, 89, 0.12);
        }


        .admin-gallery-card-image {
          width:
            100%;

          height:
            220px;

          overflow:
            hidden;

          background:
            #dce8f5;
        }


        .admin-gallery-card-image img {
          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

          display:
            block;
        }


        .admin-gallery-card-content {
          padding:
            21px;
        }


        .admin-gallery-category {
          display:
            inline-block;

          margin-bottom:
            10px;

          padding:
            6px 12px;

          border-radius:
            999px;

          background:
            #eaf1f9;

          color:
            #0b2e59;

          font-size:
            0.74rem;

          font-weight:
            800;

          text-transform:
            uppercase;
        }


        .admin-gallery-card h2 {
          margin:
            0 0 9px;

          color:
            #0b2e59;

          font-size:
            1.15rem;

          line-height:
            1.35;
        }


        .admin-gallery-card p {
          margin:
            0 0 16px;

          color:
            #687384;

          font-size:
            0.9rem;

          line-height:
            1.65;
        }


        /* =================================================
           ACTIONS
        ================================================= */

        .admin-gallery-actions {
          display:
            flex;

          gap:
            9px;
        }


        .admin-gallery-edit,
        .admin-gallery-delete {
          flex:
            1;

          padding:
            8px 12px;

          border-radius:
            8px;

          font-size:
            0.82rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all 0.2s ease;
        }


        .admin-gallery-edit {
          border:
            1px solid #0b2e59;

          background:
            #0b2e59;

          color:
            #ffffff;
        }


        .admin-gallery-edit:hover {
          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;
        }


        .admin-gallery-delete {
          border:
            1px solid #e53935;

          background:
            #ffffff;

          color:
            #e53935;
        }


        .admin-gallery-delete:hover {
          background:
            #e53935;

          color:
            #ffffff;
        }


        .admin-gallery-edit:disabled,
        .admin-gallery-delete:disabled {
          opacity:
            0.6;

          cursor:
            not-allowed;
        }


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 950px) {

          .admin-gallery-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }


        @media (max-width: 650px) {

          .admin-gallery-page {
            padding:
              30px 15px 55px;
          }


          .admin-gallery-header {
            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;

            gap:
              22px;
          }


          .admin-gallery-header
          h1 {
            font-size:
              2rem;
          }


          .admin-gallery-header
          > div:last-child {
            width:
              100%;

            flex-direction:
              column;
          }


          .admin-gallery-header
          button {
            width:
              100%;
          }


          .admin-gallery-form {
            padding:
              24px 20px;
          }


          .admin-gallery-preview {
            width:
              100%;

            max-width:
              280px;
          }


          .admin-gallery-grid {
            grid-template-columns:
              1fr;
          }

        }

      `}</style>


      {/* ===================================================
          PAGE
      =================================================== */}

      <main className="admin-gallery-page">

        <div className="admin-gallery-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="admin-gallery-header"
          >

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Gallery Management
              </h1>

              <p>
                Add, edit and remove school gallery photos.
              </p>

            </div>


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
                  : "+ Add Photo"}
              </button>

            </div>

          </header>


          {/* =================================================
              ADD / EDIT FORM
          ================================================= */}

          {showForm && (

            <form
              className="admin-gallery-form"
              onSubmit={
                handleSubmit
              }
            >

              <h2>
                {editingId
                  ? "Edit Gallery Photo"
                  : "Add New Gallery Photo"}
              </h2>


              {/* =================================================
                  TITLE
              ================================================= */}

              <div
                className="
                  admin-gallery-form-group
                "
              >

                <label htmlFor="gallery-title">
                  Title
                </label>

                <input
                  id="gallery-title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="e.g. School Annual Sports Day"
                />

              </div>


              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div
                className="
                  admin-gallery-form-group
                "
              >

                <label htmlFor="gallery-category">
                  Category
                </label>

                <select
                  id="gallery-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                >

                  <option value="Campus">
                    Campus
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Events">
                    Events
                  </option>

                  <option value="Activities">
                    Activities
                  </option>

                </select>

              </div>


              {/* =================================================
                  IMAGE UPLOAD
              ================================================= */}

              <div
                className="
                  admin-gallery-form-group
                "
              >

                <label htmlFor="gallery-image">
                  {editingId
                    ? "Replace Image (Optional)"
                    : "Choose Image"}
                </label>

                <input
                  id="gallery-image"
                  className="
                    admin-gallery-file-input
                  "
                  type="file"
                  accept="
                    image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp
                  "
                  onChange={
                    handleImageChange
                  }
                />

                <div
                  className="
                    admin-gallery-file-help
                  "
                >
                  JPG, JPEG, PNG or WebP ·
                  Maximum 5 MB
                </div>


                {/* ---------------------------------------------
                    IMAGE PREVIEW
                --------------------------------------------- */}

                {imagePreview && (

                  <div
                    className="
                      admin-gallery-preview
                    "
                  >

                    <img
                      src={
                        imagePreview.startsWith(
                          "blob:"
                        )
                          ? imagePreview
                          : getImageUrl(
                              imagePreview
                            )
                      }
                      alt="Gallery preview"
                    />

                  </div>

                )}

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div
                className="
                  admin-gallery-form-group
                "
              >

                <label htmlFor="gallery-description">
                  Description
                </label>

                <textarea
                  id="gallery-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Write a short description..."
                />

              </div>


              {/* =================================================
                  ERROR
              ================================================= */}

              {formError && (

                <p
                  className="
                    admin-gallery-form-error
                  "
                >
                  {formError}
                </p>

              )}


              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Photo"
                    : "Add Photo"}

              </button>

            </form>

          )}


          {/* =================================================
              GALLERY CONTENT
          ================================================= */}

          {loading ? (

            <div
              className="
                admin-gallery-empty
              "
            >
              Loading gallery...
            </div>

          ) : galleryItems.length === 0 ? (

            <div
              className="
                admin-gallery-empty
              "
            >

              <h2>
                No Gallery Photos Yet
              </h2>

              <p>
                Click “Add Photo” to add the
                first school gallery image.
              </p>

            </div>

          ) : (

            <div
              className="
                admin-gallery-grid
              "
            >

              {galleryItems.map(
                (item) => (

                  <article
                    key={item._id}
                    className="
                      admin-gallery-card
                    "
                  >

                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div
                      className="
                        admin-gallery-card-image
                      "
                    >

                      <img
                        src={
                          getImageUrl(
                            item.imageUrl
                          )
                        }
                        alt={
                          item.title
                        }
                        onError={(
                          event
                        ) => {

                          event.currentTarget.src =
                            "/icons.svg";

                        }}
                      />

                    </div>


                    {/* =====================================
                        CONTENT
                    ===================================== */}

                    <div
                      className="
                        admin-gallery-card-content
                      "
                    >

                      <span
                        className="
                          admin-gallery-category
                        "
                      >
                        {item.category}
                      </span>


                      <h2>
                        {item.title}
                      </h2>


                      {item.description && (

                        <p>
                          {item.description}
                        </p>

                      )}


                      {/* =================================
                          ACTION BUTTONS
                      ================================= */}

                      <div
                        className="
                          admin-gallery-actions
                        "
                      >

                        <button
                          type="button"
                          className="
                            admin-gallery-edit
                          "
                          onClick={() =>
                            openEditForm(
                              item
                            )
                          }
                        >
                          ✏ Edit
                        </button>


                        <button
                          type="button"
                          className="
                            admin-gallery-delete
                          "
                          disabled={
                            deletingId ===
                            item._id
                          }
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          {deletingId ===
                          item._id
                            ? "Deleting..."
                            : "🗑 Delete"}
                        </button>

                      </div>

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

export default AdminGallery;