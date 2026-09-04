/* =========================================================
   KOLADI HIGH SCHOOL
   ADMIN LOGIN
========================================================= */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../src/assets/Logo.png";


/* =========================================================
   API
========================================================= */

const API_URL =
  "https://koladi-high-school-1.onrender.com/api/admin/login";


/* =========================================================
   COMPONENT
========================================================= */

function AdminLogin() {

  const navigate =
    useNavigate();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /* =======================================================
     LOGIN
  ======================================================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      /* ---------------------------------------------------
         VALIDATION
      --------------------------------------------------- */

      if (!username.trim()) {

        setError(
          "Please enter your username."
        );

        return;

      }


      if (!password) {

        setError(
          "Please enter your password."
        );

        return;

      }


      try {

        setLoading(true);


        /* -------------------------------------------------
           LOGIN REQUEST
        ------------------------------------------------- */

        const response =
          await fetch(
            API_URL,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                "Accept":
                  "application/json",
              },

              body:
                JSON.stringify({

                  username:
                    username.trim(),

                  password:
                    password,

                }),

            }
          );


        /* -------------------------------------------------
           CHECK RESPONSE TYPE
        ------------------------------------------------- */

        const contentType =
          response.headers.get(
            "content-type"
          ) || "";


        if (
          !contentType.includes(
            "application/json"
          )
        ) {

          const text =
            await response.text();


          console.error(
            "Unexpected server response:",
            text
          );


          throw new Error(
            response.status === 404
              ? "Login API was not found. Please make sure the backend is running and the admin route is mounted."
              : "The server returned an unexpected response."
          );

        }


        /* -------------------------------------------------
           READ JSON
        ------------------------------------------------- */

        const data =
          await response.json();


        /* -------------------------------------------------
           BACKEND ERROR
        ------------------------------------------------- */

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Invalid username or password."
          );

        }


        /* -------------------------------------------------
           TOKEN
        ------------------------------------------------- */

        if (!data.token) {

          throw new Error(
            "Login succeeded, but no authentication token was returned."
          );

        }


        /* -------------------------------------------------
           STORE SESSION
        ------------------------------------------------- */

        localStorage.setItem(
          "adminToken",
          data.token
        );


        localStorage.setItem(
          "adminUsername",
          data.admin?.username ||
          username.trim()
        );


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        setSuccess(
          "Login successful. Redirecting..."
        );


        /* -------------------------------------------------
           REDIRECT
        ------------------------------------------------- */

        setTimeout(() => {

          navigate(
            "/admin",
            {
              replace: true,
            }
          );

        }, 500);


      } catch (err) {

        console.error(
          "Admin login error:",
          err
        );


        setError(
          err.message ||
          "Unable to sign in. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main className="admin-login-page">

      <style>{`

        /* =================================================
           PAGE
        ================================================= */

        .admin-login-page {

          min-height:
            100vh;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            30px 20px;

          box-sizing:
            border-box;

          background:
            linear-gradient(
              135deg,
              #eef5fb 0%,
              #dfeaf5 50%,
              #eef5fb 100%
            );

          position:
            relative;

          overflow:
            hidden;

        }


        /* =================================================
           BACKGROUND DECORATION
        ================================================= */

        .admin-login-page::before {

          content:
            "";

          position:
            absolute;

          width:
            420px;

          height:
            420px;

          border-radius:
            50%;

          background:
            rgba(
              11,
              46,
              89,
              0.06
            );

          top:
            -170px;

          left:
            -150px;

        }


        .admin-login-page::after {

          content:
            "";

          position:
            absolute;

          width:
            500px;

          height:
            500px;

          border-radius:
            50%;

          background:
            rgba(
              255,
              215,
              0,
              0.08
            );

          bottom:
            -230px;

          right:
            -180px;

        }


        /* =================================================
           LOGIN CARD
        ================================================= */

        .admin-login-wrapper {

          width:
            100%;

          max-width:
            980px;

          min-height:
            600px;

          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          position:
            relative;

          z-index:
            2;

          overflow:
            hidden;

          border-radius:
            24px;

          background:
            #ffffff;

          box-shadow:
            0 25px 70px
            rgba(
              11,
              46,
              89,
              0.16
            );

        }


        /* =================================================
           LEFT BRAND PANEL
        ================================================= */

        .admin-login-brand {

          position:
            relative;

          display:
            flex;

          flex-direction:
            column;

          justify-content:
            center;

          padding:
            55px;

          background:
            linear-gradient(
              145deg,
              #0b2e59,
              #123f73
            );

          color:
            #ffffff;

          overflow:
            hidden;

        }


        .admin-login-brand::before {

          content:
            "";

          position:
            absolute;

          width:
            330px;

          height:
            330px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius:
            50%;

          right:
            -145px;

          top:
            -120px;

        }


        .admin-login-brand::after {

          content:
            "";

          position:
            absolute;

          width:
            290px;

          height:
            290px;

          border:
            1px solid
            rgba(
              255,
              215,
              0,
              0.12
            );

          border-radius:
            50%;

          left:
            -145px;

          bottom:
            -130px;

        }


        .admin-login-brand-inner {

          position:
            relative;

          z-index:
            2;

        }


        /* =================================================
           LOGO
        ================================================= */

        .admin-login-badge {

          width:
            88px;

          height:
            88px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          margin-bottom:
            25px;

          border-radius:
            18px;

          background:
            #ffffff;

          box-shadow:
            0 12px 28px
            rgba(
              0,
              0,
              0,
              0.17
            );

          overflow:
            hidden;

        }


        .admin-login-badge img {

          width:
            100%;

          height:
            100%;

          object-fit:
            contain;

        }


        /* =================================================
           SCHOOL NAME
        ================================================= */

        .admin-login-brand h1 {

          margin:
            0 0 14px;

          font-size:
            2.25rem;

          line-height:
            1.15;

          letter-spacing:
            -0.5px;

        }


        .admin-login-brand p {

          margin:
            0;

          max-width:
            410px;

          color:
            #dbe8f5;

          font-size:
            1rem;

          line-height:
            1.75;

        }


        /* =================================================
           FEATURES
        ================================================= */

        .admin-login-feature-list {

          margin-top:
            35px;

          display:
            flex;

          flex-direction:
            column;

          gap:
            15px;

        }


        .admin-login-feature {

          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          color:
            #eaf2f9;

          font-size:
            0.92rem;

        }


        .admin-login-feature-icon {

          width:
            36px;

          height:
            36px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            10px;

          background:
            rgba(
              255,
              255,
              255,
              0.1
            );

          font-size:
            16px;

        }


        /* =================================================
           RIGHT FORM PANEL
        ================================================= */

        .admin-login-form-panel {

          display:
            flex;

          align-items:
            center;

          padding:
            55px;

          background:
            #ffffff;

        }


        .admin-login-form-container {

          width:
            100%;

          max-width:
            390px;

          margin:
            0 auto;

        }


        /* =================================================
           FORM HEADER
        ================================================= */

        .admin-login-form-eyebrow {

          display:
            inline-block;

          margin-bottom:
            10px;

          color:
            #0b2e59;

          font-size:
            0.75rem;

          font-weight:
            800;

          letter-spacing:
            2px;

        }


        .admin-login-form-container h2 {

          margin:
            0 0 10px;

          color:
            #0b2e59;

          font-size:
            2rem;

          line-height:
            1.2;

        }


        .admin-login-form-description {

          margin:
            0 0 28px;

          color:
            #687384;

          line-height:
            1.65;

          font-size:
            0.95rem;

        }


        /* =================================================
           ERROR / SUCCESS
        ================================================= */

        .admin-login-error,
        .admin-login-success {

          margin-bottom:
            18px;

          padding:
            13px 15px;

          border-radius:
            10px;

          font-size:
            0.88rem;

          line-height:
            1.5;

        }


        .admin-login-error {

          border:
            1px solid
            #ffc9c5;

          background:
            #fff4f3;

          color:
            #b42318;

        }


        .admin-login-success {

          border:
            1px solid
            #b7ebcd;

          background:
            #effcf4;

          color:
            #117a4d;

        }


        /* =================================================
           FORM GROUP
        ================================================= */

        .admin-login-group {

          margin-bottom:
            20px;

        }


        .admin-login-group label {

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


        .admin-login-input-wrapper {

          position:
            relative;

        }


        .admin-login-input-icon {

          position:
            absolute;

          top:
            50%;

          left:
            15px;

          transform:
            translateY(-50%);

          color:
            #7b8da1;

          font-size:
            16px;

          pointer-events:
            none;

        }


        .admin-login-input {

          width:
            100%;

          box-sizing:
            border-box;

          min-height:
            50px;

          padding:
            13px 46px 13px 44px;

          border:
            1px solid
            #d7e1eb;

          border-radius:
            11px;

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


        .admin-login-input::placeholder {

          color:
            #9aa7b6;

        }


        .admin-login-input:hover {

          border-color:
            #b9c8d7;

        }


        .admin-login-input:focus {

          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 4px
            rgba(
              11,
              46,
              89,
              0.08
            );

        }


        /* =================================================
           PASSWORD TOGGLE
        ================================================= */

        .admin-login-password-toggle {

          position:
            absolute;

          top:
            50%;

          right:
            12px;

          transform:
            translateY(-50%);

          width:
            34px;

          height:
            34px;

          border:
            none;

          background:
            transparent;

          color:
            #718096;

          cursor:
            pointer;

          border-radius:
            8px;

          font-size:
            15px;

        }


        .admin-login-password-toggle:hover {

          background:
            #f1f5f9;

          color:
            #0b2e59;

        }


        /* =================================================
           SIGN IN BUTTON
        ================================================= */

        .admin-login-submit {

          width:
            100%;

          min-height:
            50px;

          margin-top:
            6px;

          border:
            2px solid
            #0b2e59;

          border-radius:
            11px;

          background:
            #0b2e59;

          color:
            #ffffff;

          font-family:
            inherit;

          font-size:
            0.95rem;

          font-weight:
            700;

          cursor:
            pointer;

          transition:
            background-color 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;

        }


        .admin-login-submit:hover {

          background:
            #ffd700;

          border-color:
            #ffd700;

          color:
            #0b2e59;

          transform:
            translateY(-2px);

          box-shadow:
            0 10px 22px
            rgba(
              11,
              46,
              89,
              0.16
            );

        }


        .admin-login-submit:active {

          transform:
            translateY(0);

          box-shadow:
            none;

        }


        .admin-login-submit:disabled {

          opacity:
            0.7;

          cursor:
            not-allowed;

          transform:
            none;

          box-shadow:
            none;

        }


        /* =================================================
           SECURITY
        ================================================= */

        .admin-login-security {

          display:
            flex;

          align-items:
            flex-start;

          gap:
            8px;

          margin-top:
            22px;

          padding-top:
            18px;

          border-top:
            1px solid
            #edf1f5;

          color:
            #7b8796;

          font-size:
            0.78rem;

          line-height:
            1.5;

        }


        /* =================================================
           FOOTER
        ================================================= */

        .admin-login-footer {

          margin-top:
            28px;

          text-align:
            center;

          color:
            #9aa7b6;

          font-size:
            0.78rem;

        }


        /* =================================================
           TABLET
        ================================================= */

        @media (
          max-width: 800px
        ) {

          .admin-login-wrapper {

            max-width:
              520px;

            min-height:
              auto;

            grid-template-columns:
              1fr;

          }


          .admin-login-brand {

            padding:
              40px 35px;

          }


          .admin-login-brand h1 {

            font-size:
              1.9rem;

          }


          .admin-login-feature-list {

            display:
              none;

          }


          .admin-login-form-panel {

            padding:
              40px 30px;

          }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (
          max-width: 500px
        ) {

          .admin-login-page {

            padding:
              15px;

          }


          .admin-login-wrapper {

            border-radius:
              18px;

          }


          .admin-login-brand {

            padding:
              30px 25px;

          }


          .admin-login-form-panel {

            padding:
              32px 22px;

          }


          .admin-login-form-container h2 {

            font-size:
              1.75rem;

          }

        }

      `}</style>


      {/* =====================================================
          LOGIN WRAPPER
      ===================================================== */}

      <div className="admin-login-wrapper">


        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <section className="admin-login-brand">

          <div className="admin-login-brand-inner">


            {/* SCHOOL LOGO */}

            <div className="admin-login-badge">

              <img
                src={logo}
                alt="Koladi High School Logo"
              />

            </div>


            {/* SCHOOL NAME */}

            <h1>
              Koladi High School
            </h1>


            <p>
              Welcome to the secure administration
              portal of Koladi High School.
            </p>


            {/* FEATURES */}

            <div className="
              admin-login-feature-list
            ">


              <div className="
                admin-login-feature
              ">

                <span className="
                  admin-login-feature-icon
                ">
                  🔐
                </span>

                <span>
                  Secure administrator access
                </span>

              </div>


              <div className="
                admin-login-feature
              ">

                <span className="
                  admin-login-feature-icon
                ">
                  🏫
                </span>

                <span>
                  Manage school website content
                </span>

              </div>


              <div className="
                admin-login-feature
              ">

                <span className="
                  admin-login-feature-icon
                ">
                  📚
                </span>

                <span>
                  Keep academic information updated
                </span>

              </div>


              <div className="
                admin-login-feature
              ">

                <span className="
                  admin-login-feature-icon
                ">
                  📢
                </span>

                <span>
                  Manage notices and announcements
                </span>

              </div>


            </div>

          </div>

        </section>


        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <section className="
          admin-login-form-panel
        ">

          <div className="
            admin-login-form-container
          ">


            <span className="
              admin-login-form-eyebrow
            ">
              ADMINISTRATION PORTAL
            </span>


            <h2>
              Admin Login
            </h2>


            <p className="
              admin-login-form-description
            ">
              Sign in to manage school information,
              notices, academics and website content.
            </p>


            {/* ERROR */}

            {error && (

              <div className="
                admin-login-error
              ">
                {error}
              </div>

            )}


            {/* SUCCESS */}

            {success && (

              <div className="
                admin-login-success
              ">
                {success}
              </div>

            )}


            {/* LOGIN FORM */}

            <form
              onSubmit={
                handleSubmit
              }
            >


              {/* USERNAME */}

              <div className="
                admin-login-group
              ">

                <label
                  htmlFor="admin-username"
                >
                  Username
                </label>


                <div className="
                  admin-login-input-wrapper
                ">

                  <span className="
                    admin-login-input-icon
                  ">
                    👤
                  </span>


                  <input
                    id="admin-username"

                    className="
                      admin-login-input
                    "

                    type="text"

                    value={
                      username
                    }

                    onChange={(event) =>
                      setUsername(
                        event.target.value
                      )
                    }

                    placeholder="Enter username"

                    autoComplete="username"

                    autoFocus

                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="
                admin-login-group
              ">

                <label
                  htmlFor="admin-password"
                >
                  Password
                </label>


                <div className="
                  admin-login-input-wrapper
                ">

                  <span className="
                    admin-login-input-icon
                  ">
                    🔒
                  </span>


                  <input
                    id="admin-password"

                    className="
                      admin-login-input
                    "

                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    value={
                      password
                    }

                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }

                    placeholder="Enter password"

                    autoComplete="current-password"

                  />


                  <button
                    type="button"

                    className="
                      admin-login-password-toggle
                    "

                    onClick={() =>
                      setShowPassword(
                        previous =>
                          !previous
                      )
                    }

                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }

                  >

                    {showPassword
                      ? "🙈"
                      : "👁️"}

                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"

                className="
                  admin-login-submit
                "

                disabled={
                  loading
                }

              >

                {loading
                  ? "Signing In..."
                  : "Sign In →"}

              </button>


            </form>


            {/* SECURITY */}

            <div className="
              admin-login-security
            ">

              <span>
                🔒
              </span>

              <span>
                This area is restricted to authorized
                school administrators.
              </span>

            </div>


            {/* FOOTER */}

            <div className="
              admin-login-footer
            ">

              Koladi High School
              {" • "}
              Administration Portal

            </div>


          </div>

        </section>

      </div>

    </main>

  );
}


export default AdminLogin;
