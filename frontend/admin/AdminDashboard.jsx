/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN DASHBOARD
========================================================= */

import { useNavigate } from "react-router-dom";


function AdminDashboard() {

  const navigate =
    useNavigate();

  const username =
    localStorage.getItem(
      "adminUsername"
    ) || "Admin";


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminUsername"
    );

    navigate(
      "/admin/login"
    );

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>

      <style>{`

        .admin-dashboard-page {
          min-height: 100vh;
          background: #eef5fb;
          padding: 60px 20px 80px;
          color: #0b2e59;
        }


        .admin-dashboard-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .admin-dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;

          padding: 35px 40px;
          margin-bottom: 35px;

          background: #0b2e59;
          border-radius: 20px;

          color: #ffffff;

          box-shadow:
            0 15px 40px
            rgba(11, 46, 89, 0.15);
        }


        .admin-dashboard-header span {
          display: inline-block;
          margin-bottom: 10px;

          color: #ffd700;

          font-size: 0.78rem;
          font-weight: 800;

          letter-spacing: 2px;
        }


        .admin-dashboard-header h1 {
          margin: 0 0 8px;

          font-size: 2.4rem;
          line-height: 1.15;
        }


        .admin-dashboard-header p {
          margin: 0;

          color: #dbe8f5;

          font-size: 0.98rem;
          line-height: 1.6;
        }


        /* =================================================
           LOGOUT
        ================================================= */

        .admin-dashboard-header button {
          flex-shrink: 0;

          padding: 11px 22px;

          border: 2px solid #ffd700;
          border-radius: 999px;

          background: #ffd700;
          color: #0b2e59;

          font-size: 0.9rem;
          font-weight: 700;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            background-color 0.25s ease,
            color 0.25s ease;
        }


        .admin-dashboard-header button:hover {
          background: transparent;
          color: #ffd700;

          transform:
            translateY(-3px);
        }


        /* =================================================
           DASHBOARD GRID
        ================================================= */

        .admin-dashboard-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 24px;
        }


        /* =================================================
           CARD
        ================================================= */

        .admin-dashboard-card {
          position: relative;

          padding: 30px;

          background: #ffffff;

          border:
            1px solid #dfe7f0;

          border-radius: 18px;

          box-shadow:
            0 10px 28px
            rgba(11, 46, 89, 0.07);

          overflow: hidden;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }


        .admin-dashboard-card::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 4px;

          background: #0b2e59;
        }


        .admin-dashboard-card:hover {
          transform:
            translateY(-6px);

          box-shadow:
            0 18px 35px
            rgba(11, 46, 89, 0.13);
        }


        .admin-dashboard-card h2 {
          margin:
            0 0 12px;

          color:
            #0b2e59;

          font-size:
            1.35rem;
        }


        .admin-dashboard-card p {
          min-height:
            52px;

          margin:
            0 0 22px;

          color:
            #687384;

          font-size:
            0.95rem;

          line-height:
            1.7;
        }


        .admin-dashboard-card button {
          padding:
            10px 18px;

          border:
            2px solid #0b2e59;

          border-radius:
            999px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-size:
            0.87rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            all 0.25s ease;
        }


        .admin-dashboard-card button:hover {
          background:
            #ffd700;

          color:
            #0b2e59;

          border-color:
            #ffd700;

          transform:
            translateY(-3px);
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (
          max-width: 1000px
        ) {

          .admin-dashboard-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 700px
        ) {

          .admin-dashboard-page {
            padding:
              30px 15px 50px;
          }


          .admin-dashboard-grid {
            grid-template-columns:
              1fr;
          }


          .admin-dashboard-header {
            flex-direction:
              column;

            align-items:
              flex-start;

            padding:
              25px;
          }


          .admin-dashboard-header h1 {
            font-size:
              2rem;
          }


          .admin-dashboard-header button {
            width:
              100%;
          }


          .admin-dashboard-card {
            padding:
              25px;
          }

        }

      `}</style>


      <main
        className="
          admin-dashboard-page
        "
      >

        <div
          className="
            admin-dashboard-container
          "
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <header
            className="
              admin-dashboard-header
            "
          >

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Admin Dashboard
              </h1>

              <p>
                Welcome back, {username}.
              </p>

            </div>


            <button
              type="button"
              onClick={
                handleLogout
              }
            >
              Logout
            </button>

          </header>


          {/* =================================================
              CARDS
          ================================================= */}

          <section
            className="
              admin-dashboard-grid
            "
          >


            {/* =================================================
                1. HOME
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Home
              </h2>

              <p>
                Edit the homepage school information,
                tagline and statistics.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/home"
                  )
                }
              >
                Manage Home →
              </button>

            </div>


            {/* =================================================
                2. ABOUT
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                About
              </h2>

              <p>
                Edit the school's About section,
                mission, vision, descriptions
                and highlights.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/about"
                  )
                }
              >
                Manage About →
              </button>

            </div>


            {/* =================================================
                3. ACADEMICS
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Academics
              </h2>

              <p>
                Manage Quality Education,
                Practical Learning and
                Student Achievement.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/academics"
                  )
                }
              >
                Manage Academics →
              </button>

            </div>


            {/* =================================================
                4. NOTICES
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Notices
              </h2>

              <p>
                Add, edit and delete school
                notices from the administration
                panel.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/notices"
                  )
                }
              >
                Manage Notices →
              </button>

            </div>


            {/* =================================================
                5. GALLERY
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Gallery
              </h2>

              <p>
                Add, edit and delete school
                gallery photos from the
                administration panel.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/gallery"
                  )
                }
              >
                Manage Gallery →
              </button>

            </div>


            {/* =================================================
                6. CONTACT
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Contact
              </h2>

              <p>
                Manage the school's contact
                information, address, phone,
                email and location.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/contact"
                  )
                }
              >
                Manage Contact →
              </button>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Footer
              </h2>

              <p>
                Manage the website footer, social links,
                contact details and information sections.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/footer")
                }
              >
                Manage Footer →
              </button>

            </div>

            {/* =================================================
                WEBSITE
            ================================================= */}

            <div
              className="
                admin-dashboard-card
              "
            >

              <h2>
                Website
              </h2>

              <p>
                Quickly open the public Koladi High School
                website from the administration panel.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/")
                }
              >
                Open Website →
              </button>

            </div>


          </section>

        </div>

      </main>

    </>
  );
}


export default AdminDashboard;