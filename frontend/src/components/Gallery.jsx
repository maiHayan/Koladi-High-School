import { useEffect, useState } from "react";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "https://koladi-high-school-1.onrender.com/api/gallery";

const BACKEND_URL =
  "https://koladi-high-school-1.onrender.com";


/* =========================================================
   GALLERY
========================================================= */

function Gallery() {

  const [galleryItems, setGalleryItems] =
    useState([]);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =======================================================
     CONVERT IMAGE PATH
  ======================================================= */

  const getImageUrl = (imageUrl) => {

    if (!imageUrl) {
      return "";
    }


    /* -------------------------------------------------------
       Uploaded backend images
       /uploads/gallery/...
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("/uploads/")
    ) {

      return `${BACKEND_URL}${imageUrl}`;

    }


    /* -------------------------------------------------------
       Existing public images
       /gallery/gallery-1.jpg
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("/gallery/")
    ) {

      return `${import.meta.env.BASE_URL}${imageUrl.replace(/^\/+/, "")}`;

    }


    /* -------------------------------------------------------
       Full external URL
    ------------------------------------------------------- */

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {

      return `${import.meta.env.BASE_URL}${imageUrl.replace(/^\/+/, "")}`;

    }


    return `${import.meta.env.BASE_URL}${imageUrl.replace(/^\/+/, "")}`;

  };


  /* =======================================================
     FETCH GALLERY
  ======================================================= */

  useEffect(() => {

    const fetchGallery = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await fetch(API_URL);


        if (!response.ok) {

          throw new Error(
            "Failed to load gallery"
          );

        }


        const data =
          await response.json();


        setGalleryItems(data);

      } catch (err) {

        console.error(
          "Gallery fetch error:",
          err
        );

        setError(
          "Unable to load gallery right now."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchGallery();

  }, []);


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (
        event.key === "Escape"
      ) {

        setSelectedImage(null);

      }

    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section
      className="gallery-section"
      id="gallery"
    >

      <div className="gallery-container">


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="gallery-heading">

          <span>
            OUR CAMPUS & ACTIVITIES
          </span>

          <h2>
            School Gallery
          </h2>

          <p>
            Explore moments from our campus,
            academic activities, cultural programs,
            sports and student life.
          </p>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="gallery-status">
            Loading gallery...
          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading &&
          error && (

            <div
              className="
                gallery-status
                gallery-error
              "
            >
              {error}
            </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          galleryItems.length === 0 && (

            <div className="gallery-status">

              No gallery photos available yet.

            </div>

        )}


        {/* =================================================
            GALLERY GRID
        ================================================= */}

        {!loading &&
          !error &&
          galleryItems.length > 0 && (

            <div className="gallery-grid">

              {galleryItems.map(
                (item) => (

                  <div
                    className="gallery-item"
                    key={item._id}
                    onClick={() =>
                      setSelectedImage(item)
                    }
                  >

                    <img
                      src={
                        getImageUrl(
                          item.imageUrl
                        )
                      }
                      alt={item.title}
                      loading="lazy"
                    />


                    <div
                      className="
                        gallery-overlay
                      "
                    >

                      <div>

                        <h3>
                          {item.title}
                        </h3>

                        {item.description && (

                          <p>
                            {item.description}
                          </p>

                        )}

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

        )}

      </div>


      {/* ===================================================
          LIGHTBOX
      =================================================== */}

      {selectedImage && (

        <div
          className="gallery-lightbox"
          onClick={() =>
            setSelectedImage(null)
          }
        >


          {/* =================================================
              CLOSE
          ================================================= */}

          <button
            type="button"
            className="gallery-close"
            onClick={() =>
              setSelectedImage(null)
            }
            aria-label="Close image"
          >
            ✕
          </button>


          {/* =================================================
              LIGHTBOX CONTENT
          ================================================= */}

          <div
            className="
              gallery-lightbox-content
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={
                getImageUrl(
                  selectedImage.imageUrl
                )
              }
              alt={
                selectedImage.title
              }
            />


            <div
              className="
                gallery-lightbox-info
              "
            >

              <h3>
                {selectedImage.title}
              </h3>

              {selectedImage.description && (

                <p>
                  {selectedImage.description}
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </section>

  );
}


export default Gallery;

