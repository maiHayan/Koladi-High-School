/* =========================================================
   KOLADI HIGH SCHOOL
   NOTICE DETAILS PAGE
========================================================= */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL = "http://localhost:5000/api/notices";


/* =========================================================
   NOTICE DETAILS COMPONENT
========================================================= */

function NoticeDetails() {

  const { id } = useParams();


  /* =======================================================
     STATE
  ======================================================= */

  const [notice, setNotice] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     FETCH NOTICE FROM BACKEND
  ======================================================= */

  useEffect(() => {

    const fetchNotice = async () => {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(
          `${API_URL}/${id}`
        );


        if (!response.ok) {

          if (response.status === 404) {

            setNotice(null);

            return;
          }

          throw new Error(
            "Failed to fetch notice"
          );
        }


        const data = await response.json();


        /* -----------------------------------------------
           Convert MongoDB notice to frontend format
        ------------------------------------------------ */

        const formattedNotice = {

          id: data._id,

          title: data.title,

          category: data.category,

          date: new Date(
            data.date
          ).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),

          description:
            data.description,

          isNew:
            data.isNewNotice ?? false,

          views:
            data.views ?? 0,

        };


        setNotice(formattedNotice);

      } catch (err) {

        console.error(
          "Notice details error:",
          err
        );

        setError(
          "Unable to load this notice."
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {
      fetchNotice();
    }

  }, [id]);


  /* =======================================================
     DOWNLOAD NOTICE AS PDF
  ======================================================= */

  const downloadPDF = () => {

    if (!notice) {
      return;
    }


    const doc = new jsPDF();


    const pageWidth =
      doc.internal.pageSize.getWidth();


    const pageHeight =
      doc.internal.pageSize.getHeight();


    /* =====================================================
       SCHOOL HEADER
    ===================================================== */

    doc.setFillColor(
      11,
      46,
      89
    );

    doc.rect(
      0,
      0,
      pageWidth,
      38,
      "F"
    );


    doc.setTextColor(
      255,
      255,
      255
    );


    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(20);


    doc.text(
      "KOLADI HIGH SCHOOL",
      pageWidth / 2,
      16,
      {
        align: "center",
      }
    );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);


    doc.text(
      "Established 1990  •  EIIN: 125602  •  Pabna, Bangladesh",
      pageWidth / 2,
      27,
      {
        align: "center",
      }
    );


    /* =====================================================
       OFFICIAL NOTICE
    ===================================================== */

    doc.setTextColor(
      11,
      46,
      89
    );


    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(18);


    doc.text(
      "OFFICIAL NOTICE",
      pageWidth / 2,
      55,
      {
        align: "center",
      }
    );


    /* =====================================================
       CATEGORY
    ===================================================== */

    doc.setFontSize(10);

    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.text(
      `CATEGORY: ${notice.category.toUpperCase()}`,
      20,
      70
    );


    /* =====================================================
       DATE
    ===================================================== */

    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.text(
      `Published: ${notice.date}`,
      pageWidth - 20,
      70,
      {
        align: "right",
      }
    );


    /* =====================================================
       DIVIDER
    ===================================================== */

    doc.setDrawColor(
      11,
      46,
      89
    );

    doc.setLineWidth(0.5);


    doc.line(
      20,
      77,
      pageWidth - 20,
      77
    );


    /* =====================================================
       NOTICE TITLE
    ===================================================== */

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(16);


    const titleLines =
      doc.splitTextToSize(
        notice.title,
        pageWidth - 40
      );


    doc.text(
      titleLines,
      20,
      92
    );


    /* =====================================================
       NOTICE DESCRIPTION
    ===================================================== */

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(11);


    doc.setTextColor(
      55,
      65,
      81
    );


    const contentLines =
      doc.splitTextToSize(
        notice.description,
        pageWidth - 40
      );


    const contentY =
      92 +
      titleLines.length * 8 +
      12;


    doc.text(
      contentLines,
      20,
      contentY
    );


    /* =====================================================
       PDF FOOTER
    ===================================================== */

    doc.setDrawColor(
      220,
      224,
      230
    );

    doc.setLineWidth(0.4);


    doc.line(
      20,
      pageHeight - 30,
      pageWidth - 20,
      pageHeight - 30
    );


    doc.setFontSize(9);


    doc.setTextColor(
      110,
      110,
      110
    );


    doc.text(
      "Koladi High School",
      20,
      pageHeight - 20
    );


    doc.text(
      "Official School Notice",
      pageWidth - 20,
      pageHeight - 20,
      {
        align: "right",
      }
    );


    /* =====================================================
       SAVE PDF
    ===================================================== */

    const fileName =
      notice.title
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_");


    doc.save(
      `${fileName}.pdf`
    );

  };


  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {

    return (

      <section className="notice-details-page">

        <div className="notice-details-container">

          <div className="notice-not-found">

            <h2>
              Loading Notice...
            </h2>

            <p>
              Please wait while we load the notice.
            </p>

          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error) {

    return (

      <section className="notice-details-page">

        <div className="notice-details-container">

          <div className="notice-not-found">

            <h2>
              Unable to Load Notice
            </h2>

            <p>
              {error}
            </p>


            <Link
              to="/notices"
              className="back-notices"
            >
              ← Back to Notices
            </Link>

          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     NOTICE NOT FOUND
  ======================================================= */

  if (!notice) {

    return (

      <section className="notice-details-page">

        <div className="notice-details-container">

          <div className="notice-not-found">

            <h2>
              Notice Not Found
            </h2>

            <p>
              The notice you are looking for
              does not exist.
            </p>


            <Link
              to="/notices"
              className="back-notices"
            >
              ← Back to Notices
            </Link>

          </div>

        </div>

      </section>

    );

  }


  /* =======================================================
     NOTICE DETAILS PAGE
  ======================================================= */

  return (

    <section className="notice-details-page">

      <div className="notice-details-container">


        {/* =================================================
            BACK TO NOTICES
        ================================================= */}

        <Link
          to="/notices"
          className="back-notices"
        >
          ← Back to Notices
        </Link>


        {/* =================================================
            NOTICE CARD
        ================================================= */}

        <article className="notice-details-card">


          {/* ===============================================
              CATEGORY + NEW
          =============================================== */}

          <div className="notice-details-header">

            <div className="notice-details-category">
              {notice.category}
            </div>


            {notice.isNew && (

              <span className="notice-details-new">
                NEW
              </span>

            )}

          </div>


          {/* ===============================================
              DATE
          =============================================== */}

          <div className="notice-details-date">

            📅 {notice.date}

          </div>


          {/* ===============================================
              TITLE
          =============================================== */}

          <h1>
            {notice.title}
          </h1>


          {/* ===============================================
              DIVIDER
          =============================================== */}

          <div className="notice-details-divider"></div>


          {/* ===============================================
              DESCRIPTION
          =============================================== */}

          <div className="notice-details-content">

            <p>
              {notice.description}
            </p>

          </div>


          {/* ===============================================
              FOOTER
          =============================================== */}

          <div className="notice-details-footer">

            <div className="notice-meta">

              <span>
                👁 {notice.views} views
              </span>


              <span>
                📢 Koladi High School
              </span>

            </div>


            {/* ===========================================
                ACTION BUTTONS
            =========================================== */}

            <div className="notice-actions">


              {/* -----------------------------------------
                  PRINT NOTICE
              ----------------------------------------- */}

              <button
                type="button"
                className="print-notice-btn"
                onClick={() =>
                  window.print()
                }
              >
                🖨 Print Notice
              </button>


              {/* -----------------------------------------
                  DOWNLOAD PDF
              ----------------------------------------- */}

              <button
                type="button"
                className="download-pdf-btn"
                onClick={downloadPDF}
              >
                📥 Download PDF
              </button>

            </div>

          </div>

        </article>

      </div>

    </section>

  );

}


/* =========================================================
   EXPORT
========================================================= */

export default NoticeDetails;