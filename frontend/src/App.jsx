/* =========================================================
   KOLADI HIGH SCHOOL
   MAIN APPLICATION ROUTER
========================================================= */

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";


/* =========================================================
   MAIN COMPONENTS
========================================================= */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Academics from "./components/Academics";
import NoticeBoard from "./components/NoticeBoard";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Footer from "./components/Footer";


/* =========================================================
   ADMIN COMPONENTS
========================================================= */

import AdminHome from "../admin/AdminHome";
import AdminAcademics from "../admin/AdminAcademics";
import AdminLogin from "../admin/AdminLogin";
import AdminDashboard from "../admin/AdminDashboard";
import AdminNotices from "../admin/AdminNotices";
import AdminGallery from "../admin/AdminGallery";
import AdminAbout from "../admin/AdminAbout";
import AdminContact from "../admin/AdminContact";
import AdminFooter from "../admin/AdminFooter";


/* =========================================================
   DETAIL / INNER PAGES
========================================================= */

import AboutDetails from "./components/AboutDetails";
import AcademicsDetails from "./components/AcademicsDetails";
import QualityEducationDetails from "./components/QualityEducationDetails";
import PracticalLearningDetails from "./components/PracticalLearningDetails";
import StudentAchievementDetails from "./components/StudentAchievementDetails";
import NoticeDetails from "./components/NoticeDetails";


/* =========================================================
   SCROLL MANAGER
========================================================= */

function ScrollManager() {

  const location =
    useLocation();


  useEffect(() => {

    const timer =
      setTimeout(() => {

        /* -----------------------------------------------
           HASH SECTION
        ----------------------------------------------- */

        if (location.hash) {

          const sectionId =
            location.hash.substring(1);

          const section =
            document.getElementById(
              sectionId
            );


          if (section) {

            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            return;

          }

        }


        /* -----------------------------------------------
           TOP OF PAGE
        ----------------------------------------------- */

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });

      }, 50);


    return () => {
      clearTimeout(timer);
    };

  }, [
    location.pathname,
    location.hash,
  ]);


  return null;
}


/* =========================================================
   ADMIN PROTECTED ROUTE

   Every admin page except /admin/login must have
   a valid adminToken stored in localStorage.

   If there is no token, the user is sent to login.
========================================================= */

function ProtectedAdminRoute({
  children,
}) {

  const token =
    localStorage.getItem(
      "adminToken"
    );


  if (!token) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }


  return children;
}


/* =========================================================
   HOME
========================================================= */

function Home() {

  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Academics />

      <NoticeBoard />

      <Gallery />

      <Contact />

      <Location />

      <Footer />
    </>
  );

}


/* =========================================================
   NOTICES PAGE
========================================================= */

function NoticesPage() {

  return (
    <>
      <Navbar />

      <NoticeBoard />

      <Footer />
    </>
  );

}


/* =========================================================
   APP
========================================================= */

function App() {

  return (

    <HashRouter>

      <ScrollManager />


      <Routes>


        {/* =================================================
            PUBLIC HOME
        ================================================= */}

        <Route
          path="/"
          element={
            <Home />
          }
        />


        {/* =================================================
            ADMIN LOGIN

            This route is intentionally NOT protected.
        ================================================= */}

        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />


        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin"
          element={

            <ProtectedAdminRoute>

              <AdminDashboard />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN NOTICES
        ================================================= */}

        <Route
          path="/admin/notices"
          element={

            <ProtectedAdminRoute>

              <AdminNotices />

            </ProtectedAdminRoute>

          }
        />



        {/* =================================================
            ADMIN GALLERY
        ================================================= */}

        <Route
          path="/admin/gallery"
          element={

            <ProtectedAdminRoute>

              <AdminGallery />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN ABOUT
        ================================================= */}

        <Route
          path="/admin/about"
          element={

            <ProtectedAdminRoute>

              <AdminAbout />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN HOME
        ================================================= */}

        <Route
          path="/admin/home"
          element={

            <ProtectedAdminRoute>

              <AdminHome />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN ACADEMICS
        ================================================= */}

        <Route
          path="/admin/academics"
          element={

            <ProtectedAdminRoute>

              <AdminAcademics />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN CONTACT
        ================================================= */}

        <Route
          path="/admin/contact"
          element={

            <ProtectedAdminRoute>

              <AdminContact />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ADMIN FOOTER
        ================================================= */}

        <Route
          path="/admin/footer"
          element={

            <ProtectedAdminRoute>

              <AdminFooter />

            </ProtectedAdminRoute>

          }
        />


        {/* =================================================
            ABOUT DETAILS
        ================================================= */}

        <Route
          path="/about"
          element={
            <>
              <Navbar />

              <AboutDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            ACADEMICS DETAILS
        ================================================= */}

        <Route
          path="/academics"
          element={
            <>
              <Navbar />

              <AcademicsDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            QUALITY EDUCATION
        ================================================= */}

        <Route
          path="/quality-education"
          element={
            <>
              <Navbar />

              <QualityEducationDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            PRACTICAL LEARNING
        ================================================= */}

        <Route
          path="/practical-learning"
          element={
            <>
              <Navbar />

              <PracticalLearningDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            STUDENT ACHIEVEMENT
        ================================================= */}

        <Route
          path="/student-achievement"
          element={
            <>
              <Navbar />

              <StudentAchievementDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            ALL NOTICES
        ================================================= */}

        <Route
          path="/notices"
          element={
            <NoticesPage />
          }
        />


        {/* =================================================
            INDIVIDUAL NOTICE
        ================================================= */}

        <Route
          path="/notices/:id"
          element={
            <>
              <Navbar />

              <NoticeDetails />

              <Footer />
            </>
          }
        />


        {/* =================================================
            FALLBACK

            Any unknown route goes to the homepage.
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />


      </Routes>

    </HashRouter>

  );

}


/* =========================================================
   EXPORT
========================================================= */

export default App;

