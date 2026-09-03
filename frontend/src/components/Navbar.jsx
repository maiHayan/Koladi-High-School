import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";


/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();


  /* =========================================================
     GO TO HOMEPAGE SECTION
  ========================================================= */

  const goToSection = (sectionId) => {

    /* -------------------------------------------------------
       If already on homepage
    ------------------------------------------------------- */

    if (location.pathname === "/") {

      const section =
        document.getElementById(sectionId);

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

      return;
    }


    /* -------------------------------------------------------
       If on another page
       Go to homepage first
    ------------------------------------------------------- */

    navigate(`/#${sectionId}`);

  };


  /* =========================================================
     GO HOME
  ========================================================= */

  const goHome = () => {

    if (location.pathname === "/") {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    } else {

      navigate("/");

    }

  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <nav className="navbar">


      {/* =====================================================
          SCHOOL BRAND
      ===================================================== */}

      <div
        className="navbar-brand"
        onClick={goHome}
      >

        <img
          src={logo}
          alt="Koladi High School Logo"
          className="navbar-logo"
        />

        <h2>
          Koladi High School
        </h2>

      </div>


      {/* =====================================================
          NAVIGATION LINKS
      ===================================================== */}

      <ul>

        {/* Home */}

        <li onClick={goHome}>
          Home
        </li>


        {/* About */}

        <li
          onClick={() =>
            goToSection("about")
          }
        >
          About
        </li>


        {/* Academics */}

        <li
          onClick={() =>
            goToSection("academics")
          }
        >
          Academics
        </li>


        {/* =================================================
            NOTICES

            IMPORTANT:
            This scrolls to the Notices section on the
            homepage instead of opening /notices.
        ================================================= */}

        <li
          onClick={() =>
            goToSection("notices")
          }
        >
          Notices
        </li>


        {/* Gallery */}

        <li
          onClick={() =>
            goToSection("gallery")
          }
        >
          Gallery
        </li>


        {/* Contact */}

        <li
          onClick={() =>
            goToSection("contact")
          }
        >
          Contact
        </li>

      </ul>

    </nav>
  );
}


export default Navbar;
