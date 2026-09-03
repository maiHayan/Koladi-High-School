import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import heroImage from "../assets/Ing1.jpg";


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
  "http://localhost:5000/api/home";


/* =========================================================
   HERO COMPONENT
========================================================= */

function Hero() {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  /* =======================================================
     HOME DATA
  ======================================================= */

  const [home, setHome] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  /* =======================================================
     COUNTER STATES
  ======================================================= */

  const [students, setStudents] =
    useState(0);

  const [teachers, setTeachers] =
    useState(0);

  const [gpaStudents, setGpaStudents] =
    useState(0);


  /* =======================================================
     FETCH HOME DATA
  ======================================================= */

  useEffect(() => {

    const fetchHome =
      async () => {

        try {

          const response =
            await fetch(API_URL);


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to load home page data."
            );

          }


          setHome(data);

        } catch (error) {

          console.error(
            "Home API error:",
            error
          );

        } finally {

          setLoading(false);

        }

      };


    fetchHome();

  }, []);


  /* =======================================================
     COUNTER ANIMATION
  ======================================================= */

  useEffect(() => {

    if (!home) {
      return;
    }


    const targets = {

      students:
        Number(
          home.studentsCount
        ) || 0,

      teachers:
        Number(
          home.teachersCount
        ) || 0,

      gpaStudents:
        Number(
          home.gpa5Count
        ) || 0,

    };


    const duration =
      1800;


    let animationFrame;

    const startTime =
      performance.now();


    const animate = (
      currentTime
    ) => {

      const elapsed =
        currentTime -
        startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /* ---------------------------------------------------
         Smooth ease-out
      --------------------------------------------------- */

      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      setStudents(
        Math.floor(
          targets.students *
          easedProgress
        )
      );


      setTeachers(
        Math.floor(
          targets.teachers *
          easedProgress
        )
      );


      setGpaStudents(
        Math.floor(
          targets.gpaStudents *
          easedProgress
        )
      );


      if (progress < 1) {

        animationFrame =
          requestAnimationFrame(
            animate
          );

      } else {

        /* -----------------------------------------------
           Exact final values
        ----------------------------------------------- */

        setStudents(
          targets.students
        );

        setTeachers(
          targets.teachers
        );

        setGpaStudents(
          targets.gpaStudents
        );

      }

    };


    animationFrame =
      requestAnimationFrame(
        animate
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [home]);


  /* =======================================================
     HOMEPAGE SECTION NAVIGATION
  ======================================================= */

  const goToSection =
    (sectionId) => {

      /* ---------------------------------------------------
         Already on homepage
      --------------------------------------------------- */

      if (
        location.pathname === "/"
      ) {

        const section =
          document.getElementById(
            sectionId
          );


        if (section) {

          section.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });

        }

        return;

      }


      /* ---------------------------------------------------
         From another page
      --------------------------------------------------- */

      navigate(
        `/#${sectionId}`
      );

    };


  /* =======================================================
     LOADING FALLBACK
  ======================================================= */

  if (
    loading ||
    !home
  ) {

    return (

      <section
        className="hero"
        id="home"
      >

        <div
          className="hero-content"
        >

          <h1>
            Koladi High School
          </h1>

          <p>
            Loading school information...
          </p>

        </div>

      </section>

    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section
      className="hero"
      id="home"

      style={{
        backgroundImage: `
          linear-gradient(
            rgba(11, 46, 89, 0.55),
            rgba(11, 46, 89, 0.55)
          ),
          url("${heroImage}")
        `,
      }}
    >

      <div className="hero-content">


        {/* =================================================
            SCHOOL NAME
        ================================================= */}

        <h1>
          {home.schoolName}
        </h1>


        {/* =================================================
            SCHOOL INFORMATION
        ================================================= */}

        <h3>

          Established {home.establishedYear}

          {" • "}

          EIIN: {home.eiin}

          {" • "}

          {home.location}

        </h3>


        {/* =================================================
            SCHOOL TAGLINE
        ================================================= */}

        <p>
          {home.tagline}
        </p>


        {/* =================================================
            HERO BUTTONS
        ================================================= */}

        <div className="hero-buttons">


          <button
            type="button"
            onClick={() =>
              navigate("/about")
            }
          >
            Explore More
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/notices")
            }
          >
            Latest Notices
          </button>


        </div>


        {/* =================================================
            HERO STATISTICS
        ================================================= */}

        <div className="hero-stats">


          {/* -------------------------------------------------
              STUDENTS
          ------------------------------------------------- */}

          <div
            className="
              hero-stat-item
            "
          >

            <h2>
              {students}+
            </h2>

            <p>
              Students
            </p>

          </div>


          {/* -------------------------------------------------
              TEACHERS
          ------------------------------------------------- */}

          <div
            className="
              hero-stat-item
            "
          >

            <h2>
              {teachers}+
            </h2>

            <p>
              Teachers
            </p>

          </div>


          {/* -------------------------------------------------
              GPA-5
          ------------------------------------------------- */}

          <div
            className="
              hero-stat-item
            "
          >

            <h2>
              {gpaStudents}+
            </h2>

            <p>
              GPA-5
            </p>

          </div>


        </div>

      </div>

    </section>

  );

}


export default Hero;