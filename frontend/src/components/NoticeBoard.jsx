/* =========================================================
   NOTICE BOARD
   Loads notices from the backend API
========================================================= */

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL = "http://localhost:5000/api/notices";


/* =========================================================
   NOTICE BOARD COMPONENT
========================================================= */

function NoticeBoard() {

  /* =======================================================
     STATE
  ======================================================= */

  const [notices, setNotices] = useState([]);

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTransitioning, setIsTransitioning] =
    useState(true);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     FETCH NOTICES FROM BACKEND
  ======================================================= */

  useEffect(() => {

    const fetchNotices = async () => {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(API_URL);


        if (!response.ok) {
          throw new Error(
            "Failed to fetch notices"
          );
        }


        const data = await response.json();


        /*
          Convert MongoDB data into the format
          currently used by the frontend.
        */

        const formattedNotices = data.map(
          (notice) => ({

            id: notice._id,

            title: notice.title,

            category: notice.category,

            date: new Date(
              notice.date
            ).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            ),

            description:
              notice.description,

            isNew:
              notice.isNewNotice ?? false,

            views:
              notice.views ?? 0,

          })
        );


        setNotices(formattedNotices);

      } catch (err) {

        console.error(
          "Notice fetch error:",
          err
        );

        setError(
          "Unable to load notices. Please try again later."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchNotices();

  }, []);


  /* =======================================================
     FILTER NOTICES
  ======================================================= */

  const filteredNotices = useMemo(() => {

    return notices.filter((notice) => {

      const matchesCategory =
        activeCategory === "All" ||
        notice.category === activeCategory;


      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =
        notice.title
          .toLowerCase()
          .includes(searchText) ||

        notice.description
          .toLowerCase()
          .includes(searchText);


      return (
        matchesCategory &&
        matchesSearch
      );

    });

  }, [
    notices,
    search,
    activeCategory,
  ]);


  /* =======================================================
     CAROUSEL
  ======================================================= */

  const hasCarousel =
    filteredNotices.length > 3;


  /* -------------------------------------------------------
     Reset carousel when search/category changes
  ------------------------------------------------------- */

  useEffect(() => {

    setIsTransitioning(false);

    setCurrentIndex(0);


    const timer = setTimeout(() => {

      setIsTransitioning(true);

    }, 50);


    return () => {
      clearTimeout(timer);
    };

  }, [
    search,
    activeCategory,
  ]);


  /* -------------------------------------------------------
     Automatic sliding every 3 seconds
  ------------------------------------------------------- */

  useEffect(() => {

    if (!hasCarousel) {
      return;
    }


    const timer = setInterval(() => {

      setCurrentIndex(
        (prev) => prev + 1
      );

    }, 3000);


    return () => {
      clearInterval(timer);
    };

  }, [hasCarousel]);


  /* =======================================================
     INFINITE CAROUSEL
  ======================================================= */

  const carouselNotices = hasCarousel
    ? [
        ...filteredNotices,
        ...filteredNotices.slice(0, 3),
      ]
    : filteredNotices;


  /* =======================================================
     RESET AFTER CLONED NOTICES
  ======================================================= */

  useEffect(() => {

    if (
      !hasCarousel ||
      currentIndex !==
        filteredNotices.length
    ) {
      return;
    }


    const timer = setTimeout(() => {

      setIsTransitioning(false);

      setCurrentIndex(0);


      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          setIsTransitioning(true);

        });

      });

    }, 700);


    return () => {
      clearTimeout(timer);
    };

  }, [
    currentIndex,
    filteredNotices.length,
    hasCarousel,
  ]);


  /* =======================================================
     NEXT NOTICE
  ======================================================= */

  const nextNotice = () => {

    if (
      !hasCarousel ||
      !isTransitioning
    ) {
      return;
    }


    setCurrentIndex(
      (prev) => prev + 1
    );

  };


  /* =======================================================
     PREVIOUS NOTICE
  ======================================================= */

  const previousNotice = () => {

    if (
      !hasCarousel ||
      !isTransitioning
    ) {
      return;
    }


    if (currentIndex === 0) {

      setIsTransitioning(false);

      setCurrentIndex(
        filteredNotices.length
      );


      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          setIsTransitioning(true);

        });

      });

      return;
    }


    setCurrentIndex(
      (prev) => prev - 1
    );

  };


  /* =======================================================
     NOTICE CATEGORIES
  ======================================================= */

  const categories = [
    "All",
    "Academic",
    "Admission",
    "Examination",
    "Holiday",
  ];


  /* =======================================================
     CATEGORY COUNTS
  ======================================================= */

  const getCategoryCount = (
    category
  ) => {

    if (category === "All") {
      return notices.length;
    }


    return notices.filter(
      (notice) =>
        notice.category === category
    ).length;

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section
      id="notices"
      className="notice-board"
    >

      <style>{`

        /* =========================
           NOTICE HEADER
        ========================= */

        .notice-header {
          max-width: 1080px;
          margin: 0 auto 26px;
          padding: 28px 34px;
          text-align: center;
        }

        .notice-title {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          background: #0b2e59;
          color: #ffffff;

          padding: 10px 26px;
          border-radius: 9px;

          font-size: 23px;
          font-weight: 700;

          box-shadow:
            0 8px 22px
            rgba(11, 46, 89, 0.16);
        }


        .notice-header p {
          margin: 14px auto 0;

          max-width: 900px;

          color: #5f6875;

          font-size: 15px;
          line-height: 1.6;
        }


        .notice-search {
          max-width: 100%;

          margin-top: 22px;
        }


        .notice-search input {
          width: 100%;

          padding: 13px 18px;

          border: 1px solid #d9e1eb;

          border-radius: 9px;

          background: #ffffff;

          color: #1f2937;

          font-size: 15px;

          outline: none;

          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }


        .notice-search input:focus {
          border-color: #0b2e59;

          box-shadow:
            0 0 0 3px
            rgba(11, 46, 89, 0.08);
        }


        /* =========================
           CATEGORY TABS
        ========================= */

        .notice-tabs {
          display: flex;

          justify-content: center;
          align-items: center;

          flex-wrap: wrap;

          gap: 11px;

          margin-bottom: 26px;
        }


        .notice-tabs button {
          background: #ffffff;

          color: #0b2e59;

          border: 1px solid #d9e1eb;

          padding: 9px 17px;

          border-radius: 8px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: all 0.3s ease;
        }


        .notice-tabs button:hover {
          background: #0b2e59;

          color: #ffffff;

          transform:
            translateY(-2px);
        }


        .notice-tabs button.active {
          background: #0b2e59;

          color: #ffffff;

          border-color: #0b2e59;
        }


        /* =========================
           CAROUSEL
        ========================= */

        .notice-carousel-wrapper {
          width: 100%;

          max-width: 1080px;

          margin: 0 auto;
        }


        .notice-carousel-viewport {
          width: 100%;

          overflow: hidden;

          position: relative;
        }


        .notice-carousel-track {
          display: flex;

          gap: 18px;

          width: max-content;

          transform:
            translateX(
              calc(
                -${currentIndex} *
                (
                  (
                    min(
                      1080px,
                      100vw - 80px
                    ) - 36px
                  ) / 3
                  + 18px
                )
              )
            );

          transition:
            ${
              isTransitioning
                ? "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none"
            };
        }


        .notice-carousel-slide {
          width:
            calc(
              (
                min(
                  1080px,
                  100vw - 80px
                ) - 36px
              ) / 3
            );

          flex:
            0 0
            calc(
              (
                min(
                  1080px,
                  100vw - 80px
                ) - 36px
              ) / 3
            );
        }


        /* =========================
           NOTICE CARD
        ========================= */

        .notice-carousel-card {
          width: 100%;

          height: 390px;

          display: flex;

          flex-direction: column;

          padding: 28px 32px;

          overflow: hidden;
        }


        .notice-carousel-card > p {
          flex: 1;

          overflow: hidden;

          display:
            -webkit-box;

          -webkit-line-clamp: 4;

          -webkit-box-orient: vertical;
        }


        .notice-carousel-card
        .notice-card-bottom {
          margin-top: auto;
        }


        /* =========================
           CONTROLS
        ========================= */

        .notice-carousel-controls {
          display: flex;

          justify-content: center;

          align-items: center;

          gap: 14px;

          margin-top: 22px;
        }


        .notice-carousel-controls button {
          width: 38px;

          height: 38px;

          border: 1px solid #dbe4ef;

          border-radius: 50%;

          background: #ffffff;

          color: #0b2e59;

          font-size: 17px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.3s ease;
        }


        .notice-carousel-controls
        button:hover {
          background: #0b2e59;

          color: #ffffff;

          transform:
            translateY(-2px);
        }


        .notice-carousel-indicator {
          min-width: 65px;

          text-align: center;

          color: #6b7280;

          font-size: 13px;

          font-weight: 600;
        }


        /* =========================
           LOADING
        ========================= */

        .notice-loading {
          max-width: 1080px;

          margin: 30px auto;

          padding: 45px 25px;

          text-align: center;

          color: #687384;

          font-size: 1rem;
        }


        /* =========================
           ERROR
        ========================= */

        .notice-error {
          max-width: 1080px;

          margin: 30px auto;

          padding: 30px 25px;

          border-radius: 14px;

          background: #ffffff;

          color: #b42318;

          text-align: center;

          box-shadow:
            0 10px 30px
            rgba(11, 46, 89, 0.07);
        }


        /* =========================
           NO NOTICES
        ========================= */

        .no-notices {
          max-width: 1080px;

          margin: 35px auto 60px;

          background: #ffffff;

          text-align: center;

          padding: 50px 25px;

          border-radius: 14px;

          box-shadow:
            0 10px 30px
            rgba(11, 46, 89, 0.07);
        }


        .no-notices h3 {
          color: #0b2e59;

          margin-bottom: 8px;
        }


        .no-notices p {
          color: #6b7280;
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1140px) {

          .notice-carousel-wrapper {
            max-width:
              calc(100vw - 80px);
          }

          .notice-carousel-slide {
            width:
              calc(
                (100vw - 116px) / 3
              );

            flex-basis:
              calc(
                (100vw - 116px) / 3
              );
          }

        }


        /* =========================
           TABLET / MOBILE
        ========================= */

        @media (max-width: 900px) {

          .notice-header {
            padding:
              25px 24px;
          }

          .notice-carousel-wrapper {
            max-width:
              calc(100vw - 50px);
          }

          .notice-carousel-track {

            transform:
              translateX(
                calc(
                  -${currentIndex} *
                  (
                    (
                      100vw - 86px
                    ) / 2
                    + 18px
                  )
                )
              );

          }

          .notice-carousel-slide {

            width:
              calc(
                (100vw - 86px) / 2
              );

            flex-basis:
              calc(
                (100vw - 86px) / 2
              );

          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 650px) {

          .notice-header {
            padding:
              22px 18px;
          }


          .notice-title {
            font-size: 20px;

            padding:
              9px 20px;
          }


          .notice-header p {
            font-size: 14px;
          }


          .notice-tabs {
            gap: 8px;
          }


          .notice-tabs button {

            padding:
              8px 13px;

            font-size: 13px;
          }


          .notice-carousel-wrapper {
            max-width:
              calc(100vw - 30px);
          }


          .notice-carousel-track {

            transform:
              translateX(
                calc(
                  -${currentIndex} *
                  (
                    (100vw - 30px)
                    + 18px
                  )
                )
              );

          }


          .notice-carousel-slide {

            width:
              calc(100vw - 30px);

            flex-basis:
              calc(100vw - 30px);
          }

        }

      `}</style>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="container">

        <div className="notice-header">

          <div className="notice-title">
            📢 Latest Notices
          </div>


          <p>
            Stay updated with the latest school notices,
            examinations, admissions, holidays and
            important announcements.
          </p>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="notice-search">

            <input
              type="text"

              placeholder="🔍 Search notices..."

              value={search}

              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>


        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <div className="notice-tabs">

          {categories.map(
            (category) => (

              <button
                key={category}

                className={
                  activeCategory ===
                  category
                    ? "active"
                    : ""
                }

                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >

                {category} (
                {getCategoryCount(category)}
                )

              </button>

            )
          )}

        </div>


        {/* =====================================================
            LOADING STATE
        ===================================================== */}

        {loading && (

          <div className="notice-loading">

            Loading notices...

          </div>

        )}


        {/* =====================================================
            ERROR STATE
        ===================================================== */}

        {!loading && error && (

          <div className="notice-error">

            {error}

          </div>

        )}


        {/* =====================================================
            NOTICE CAROUSEL
        ===================================================== */}

        {!loading &&
        !error &&
        filteredNotices.length > 0 ? (

          <div className="notice-carousel-wrapper">

            <div className="notice-carousel-viewport">

              <div className="notice-carousel-track">

                {carouselNotices.map(
                  (notice, index) => (

                    <div
                      className="notice-carousel-slide"
                      key={
                        `${notice.id}-${index}`
                      }
                    >

                      <div className="notice-card notice-carousel-card">


                        {/* =================================
                            CARD TOP
                        ================================= */}

                        <div className="notice-card-top">

                          <span className="notice-category">
                            {notice.category}
                          </span>


                          {notice.isNew && (

                            <span className="notice-new">
                              NEW
                            </span>

                          )}

                        </div>


                        {/* =================================
                            DATE
                        ================================= */}

                        <div className="notice-date">

                          📅 {notice.date}

                        </div>


                        {/* =================================
                            TITLE
                        ================================= */}

                        <h3>
                          {notice.title}
                        </h3>


                        {/* =================================
                            DESCRIPTION
                        ================================= */}

                        <p>
                          {notice.description}
                        </p>


                        {/* =================================
                            CARD BOTTOM
                        ================================= */}

                        <div className="notice-card-bottom">

                          <span className="notice-views">
                            👁 {notice.views} views
                          </span>


                          <Link
                            to={
                              `/notices/${notice.id}`
                            }

                            className="read-more"
                          >
                            Read More →
                          </Link>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                CAROUSEL CONTROLS
            ================================================= */}

            {hasCarousel && (

              <div className="notice-carousel-controls">

                <button
                  onClick={previousNotice}
                  aria-label="Previous notice"
                >
                  ←
                </button>


                <span className="notice-carousel-indicator">

                  {(currentIndex %
                    filteredNotices.length) + 1}

                  {" / "}

                  {filteredNotices.length}

                </span>


                <button
                  onClick={nextNotice}
                  aria-label="Next notice"
                >
                  →
                </button>

              </div>

            )}

          </div>

        ) : (

          !loading &&
          !error && (

            <div className="no-notices">

              <h3>
                No notices found
              </h3>

              <p>
                Try another search term or select
                a different category.
              </p>

            </div>

          )

        )}

      </div>

    </section>
  );
}


/* =========================================================
   EXPORT
========================================================= */

export default NoticeBoard;