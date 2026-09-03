function Location() {
  return (
    <section
      className="location-section"
      id="location"
    >
      <div className="location-container">

        {/* =========================
            HEADING
        ========================= */}

        <div className="location-heading">

          <span>
            FIND OUR SCHOOL
          </span>

          <h2>
            Campus Location
          </h2>

          <p>
            Visit Koladi High School in Koladi,
            Pabna Sadar, Pabna, Bangladesh.
          </p>

        </div>

        {/* =========================
            MAP + INFORMATION
        ========================= */}

        <div className="location-content">

          {/* =========================
              GOOGLE MAP
          ========================= */}

          <div className="location-map">

            <iframe
              title="Koladi High School Location"
              src="https://www.google.com/maps?q=Koladi%20High%20School%2C%20Pabna%2C%20Bangladesh&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

          {/* =========================
              SCHOOL INFORMATION
          ========================= */}

          <div className="location-info">

            <span className="location-label">
              KOLADI HIGH SCHOOL
            </span>

            <h3>
              Visit Our Campus
            </h3>

            <p>
              Koladi, Pabna Sadar, Pabna,
              Bangladesh
            </p>

            {/* Information Cards */}

            <div className="location-details">

              <div>
                <strong>
                  EIIN
                </strong>

                <span>
                  125602
                </span>
              </div>

              <div>
                <strong>
                  Post Office
                </strong>

                <span>
                  Dublia
                </span>
              </div>

              <div>
                <strong>
                  Union
                </strong>

                <span>
                  Bharara
                </span>
              </div>

              <div>
                <strong>
                  Established
                </strong>

                <span>
                  1990
                </span>
              </div>

            </div>

            {/* Google Maps Button */}

            <button
              className="location-button"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/?api=1&query=Koladi+High+School+Pabna+Bangladesh",
                  "_blank"
                )
              }
            >
              Open in Google Maps →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Location;
