import { Link } from "react-router-dom";

function AcademicsDetails() {
  return (
    <main className="academics-details-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="academics-details-hero">

        <div className="academics-details-hero-content">

          <span>
            ACADEMICS
          </span>

          <h1>
            Learning with Purpose,
            Knowledge and Practical Skills
          </h1>

          <p>
            A learning environment focused on academic
            development, practical education, discipline,
            creativity and student growth.
          </p>

        </div>

      </section>

      <div className="academics-details-container">

        <Link
          to="/"
          className="academics-details-back"
        >
          ← Back to Home
        </Link>

        {/* =========================
            QUALITY EDUCATION
        ========================= */}

        <section className="academic-detail-section">

          <div className="academic-detail-content">

            <span>
              QUALITY EDUCATION
            </span>

            <h2>
              A Strong Foundation for Learning
            </h2>

            <p>
              Koladi High School aims to provide students with
              a supportive classroom environment where they can
              strengthen their academic foundations and develop
              effective learning habits.
            </p>

            <p>
              Education is approached not only as the
              acquisition of knowledge, but also as an
              opportunity to develop discipline, confidence,
              creativity and responsibility.
            </p>

          </div>

          <div className="academic-detail-points">

            <div>
              <strong>01</strong>
              <span>Supportive classrooms</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Strong academic foundation</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Disciplined learning environment</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Student-focused development</span>
            </div>

          </div>

        </section>

        {/* =========================
            PRACTICAL LEARNING
        ========================= */}

        <section className="academic-detail-section academic-labs">

          <div className="academic-detail-content">

            <span>
              PRACTICAL LEARNING
            </span>

            <h2>
              Learning Beyond the Classroom
            </h2>

            <p>
              Practical learning helps students connect
              theoretical knowledge with experiments,
              observation and real-world applications.
            </p>

          </div>

          <div className="academic-lab-grid">

            <div>
              <span>🧬</span>
              <h3>Biology Laboratory</h3>
              <p>
                Practical exploration of biological concepts
                and scientific observation.
              </p>
            </div>

            <div>
              <span>⚗️</span>
              <h3>Chemistry Laboratory</h3>
              <p>
                Practical activities that help students
                understand chemical concepts and reactions.
              </p>
            </div>

            <div>
              <span>⚙️</span>
              <h3>Physics Laboratory</h3>
              <p>
                Practical learning through observation,
                experiments and scientific principles.
              </p>
            </div>

          </div>

        </section>

        {/* =========================
            COURSES
        ========================= */}

        <section className="academic-streams">

          <div className="academic-streams-heading">

            <span>
              ACADEMIC STREAMS
            </span>

            <h2>
              Explore Our Academic Courses
            </h2>

            <p>
              The following stream structure can be presented
              on the website and updated according to the
              school's official curriculum.
            </p>

          </div>

          <div className="academic-stream-grid">

            {/* Science */}

            <div className="academic-stream-card">

              <div className="academic-stream-icon">
                🔬
              </div>

              <h3>
                Science
              </h3>

              <p>
                A science-focused academic pathway that
                develops analytical thinking and scientific
                understanding.
              </p>

              <div className="academic-subjects">

                <span>Physics</span>
                <span>Chemistry</span>
                <span>Biology</span>
                <span>Mathematics</span>

              </div>

            </div>

            {/* Arts */}

            <div className="academic-stream-card">

              <div className="academic-stream-icon">
                📖
              </div>

              <h3>
                Arts / Humanities
              </h3>

              <p>
                A pathway focused on language, society,
                history, culture and human development.
              </p>

              <div className="academic-subjects">

                <span>Bangla</span>
                <span>English</span>
                <span>History</span>
                <span>Social Studies</span>

              </div>

            </div>

            {/* Commerce */}

            <div className="academic-stream-card">

              <div className="academic-stream-icon">
                💼
              </div>

              <h3>
                Commerce
              </h3>

              <p>
                A business-oriented pathway introducing
                students to accounting, finance and
                business concepts.
              </p>

              <div className="academic-subjects">

                <span>Accounting</span>
                <span>Finance</span>
                <span>Business Studies</span>
                <span>Management</span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            ACHIEVEMENT
        ========================= */}

        <section className="academic-achievement-section">

          <div className="academic-achievement-content">

            <span>
              STUDENT ACHIEVEMENT
            </span>

            <h2>
              Encouraging Excellence Beyond the Classroom
            </h2>

            <p>
              Academic success is an important part of student
              development, but participation in cultural,
              sports and extracurricular activities also plays
              an important role in building confidence,
              teamwork and leadership.
            </p>

          </div>

          <div className="academic-achievement-grid">

            <div>
              <strong>Academic</strong>
              <span>Results & performance</span>
            </div>

            <div>
              <strong>Sports</strong>
              <span>Participation & teamwork</span>
            </div>

            <div>
              <strong>Cultural</strong>
              <span>Creativity & expression</span>
            </div>

            <div>
              <strong>Leadership</strong>
              <span>Confidence & responsibility</span>
            </div>

          </div>

        </section>

        {/* =========================
            RETURN
        ========================= */}

        <div className="academic-details-return">

          <Link
            to="/"
            className="academics-button"
          >
            Return to Home →
          </Link>

        </div>

      </div>

    </main>
  );
}

export default AcademicsDetails;