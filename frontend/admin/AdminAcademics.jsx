/* =========================================================
   KOLADI HIGH SCHOOL
   COMPLETE ADMIN ACADEMICS MANAGEMENT
========================================================= */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPasskeyModal from "./AdminPasskeyModal";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/academics";

const BACKEND_URL =
  "http://localhost:5000";


/* =========================================================
   DEFAULT FORM
========================================================= */

const DEFAULT_FORM = {

  sectionLabel: "",
  sectionHeading: "",
  sectionDescription: "",


  /* -------------------------------------------------------
     QUALITY EDUCATION
  ------------------------------------------------------- */

  qualityTitle: "",
  qualityDescription: "",

  qualityHeroLabel: "",
  qualityHeroHeading: "",
  qualityHeroDescription: "",

  qualityIntroductionLabel: "",
  qualityIntroductionHeading: "",
  qualityIntroductionDescription1: "",
  qualityIntroductionDescription2: "",

  qualityDigitalLabel: "",
  qualityDigitalHeading: "",
  qualityDigitalDescription1: "",
  qualityDigitalDescription2: "",

  qualityFeaturesLabel: "",
  qualityFeaturesHeading: "",
  qualityFeaturesDescription: "",


  /* -------------------------------------------------------
     PRACTICAL LEARNING
  ------------------------------------------------------- */

  practicalTitle: "",
  practicalDescription: "",

  practicalHeroLabel: "",
  practicalHeroHeading: "",
  practicalHeroDescription: "",

  practicalIntroductionLabel: "",
  practicalIntroductionHeading: "",
  practicalIntroductionDescription1: "",
  practicalIntroductionDescription2: "",


  /* Biology */

  biologyLabel: "",
  biologyHeading: "",
  biologyDescription1: "",
  biologyDescription2: "",

  biologyHighlight1: "",
  biologyHighlight2: "",
  biologyHighlight3: "",


  /* Chemistry */

  chemistryLabel: "",
  chemistryHeading: "",
  chemistryDescription1: "",
  chemistryDescription2: "",

  chemistryHighlight1: "",
  chemistryHighlight2: "",
  chemistryHighlight3: "",


  /* Physics */

  physicsLabel: "",
  physicsHeading: "",
  physicsDescription1: "",
  physicsDescription2: "",

  physicsHighlight1: "",
  physicsHighlight2: "",
  physicsHighlight3: "",


  /* Computer */

  computerLabel: "",
  computerHeading: "",
  computerDescription1: "",
  computerDescription2: "",

  computerHighlight1: "",
  computerHighlight2: "",
  computerHighlight3: "",


  /* Benefits */

  benefitsLabel: "",
  benefitsHeading: "",
  benefitsDescription: "",

  benefit1Title: "",
  benefit1Description: "",

  benefit2Title: "",
  benefit2Description: "",

  benefit3Title: "",
  benefit3Description: "",

  benefit4Title: "",
  benefit4Description: "",


  /* -------------------------------------------------------
     STUDENT ACHIEVEMENT
  ------------------------------------------------------- */

  achievementTitle: "",
  achievementDescription: "",

  achievementHeroLabel: "",
  achievementHeroHeading: "",
  achievementHeroDescription: "",

  achievementIntroductionLabel: "",
  achievementIntroductionHeading: "",
  achievementIntroductionDescription1: "",
  achievementIntroductionDescription2: "",

  /* Results */

  resultsLabel: "",
  resultsHeading: "",
  resultsDescription1: "",
  resultsDescription2: "",

  resultsHighlight1: "",
  resultsHighlight2: "",
  resultsHighlight3: "",


  /* Sports */

  sportsLabel: "",
  sportsHeading: "",
  sportsDescription1: "",
  sportsDescription2: "",

  sportsHighlight1: "",
  sportsHighlight2: "",
  sportsHighlight3: "",


  /* Cultural */

  culturalLabel: "",
  culturalHeading: "",
  culturalDescription1: "",
  culturalDescription2: "",

  culturalHighlight1: "",
  culturalHighlight2: "",
  culturalHighlight3: "",


  /* Leadership */

  leadershipLabel: "",
  leadershipHeading: "",
  leadershipDescription1: "",
  leadershipDescription2: "",

  leadershipHighlight1: "",
  leadershipHighlight2: "",
  leadershipHighlight3: "",


  /* Courses */

  coursesLabel: "",
  coursesHeading: "",
  coursesDescription: "",

  scienceTitle: "",
  scienceDescription: "",
  scienceSubjects: "",

  humanitiesTitle: "",
  humanitiesDescription: "",
  humanitiesSubjects: "",

  businessTitle: "",
  businessDescription: "",
  businessSubjects: "",


  /* Development */

  developmentLabel: "",
  developmentHeading: "",

  development1Title: "",
  development1Description: "",

  development2Title: "",
  development2Description: "",

  development3Title: "",
  development3Description: "",

  development4Title: "",
  development4Description: "",

};


/* =========================================================
   COMPONENT
========================================================= */

function AdminAcademics() {

  const navigate = useNavigate();

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );


  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] =
    useState(DEFAULT_FORM);


  /* =======================================================
     IMAGES
  ======================================================= */

  const [images, setImages] =
    useState({

      section: null,

      qualityIntroduction: null,

      qualityDigital: null,

      practicalIntroduction: null,

      biology: null,

      chemistry: null,

      physics: null,

      computer: null,

      achievementIntroduction: null,

      results: null,

      sports: null,

      cultural: null,

      leadership: null,

    });


  const [previews, setPreviews] =
    useState({

      section: "",

      qualityIntroduction: "",
      qualityDigital: "",

      practicalIntroduction: "",
      biology: "",
      chemistry: "",
      physics: "",
      computer: "",

      achievementIntroduction: "",
      results: "",
      sports: "",
      cultural: "",
      leadership: "",

    });


  const [
    removeImages,
    setRemoveImages
  ] = useState({

    section: false,

    qualityIntroduction: false,
    qualityDigital: false,

    practicalIntroduction: false,
    biology: false,
    chemistry: false,
    physics: false,
    computer: false,

    achievementIntroduction: false,
    results: false,
    sports: false,
    cultural: false,
    leadership: false,

  });


  /* =======================================================
     STATUS
  ======================================================= */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showPasskeyModal, setShowPasskeyModal] = useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (
    image
  ) => {

    if (!image) {
      return "";
    }


    if (
      image.startsWith(
        "/uploads/"
      )
    ) {

      return `${BACKEND_URL}${image}`;

    }


    return encodeURI(
      image
    );

  };


  /* =======================================================
     FETCH ACADEMICS
  ======================================================= */

  useEffect(() => {

    const fetchAcademics =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await fetch(
              API_URL
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Failed to load Academics."
            );

          }


          /* -------------------------------------------------
             Convert API data to editable form
          ------------------------------------------------- */

          setForm({

            sectionLabel:
              data.sectionLabel || "",

            sectionHeading:
              data.sectionHeading || "",

            sectionDescription:
              data.sectionDescription || "",


            /* QUALITY */

            qualityTitle:
              data.qualityEducation?.title || "",

            qualityDescription:
              data.qualityEducation?.description || "",

            qualityHeroLabel:
              data.qualityEducation?.heroLabel || "",

            qualityHeroHeading:
              data.qualityEducation?.heroHeading || "",

            qualityHeroDescription:
              data.qualityEducation?.heroDescription || "",

            qualityIntroductionLabel:
              data.qualityEducation?.introductionLabel || "",

            qualityIntroductionHeading:
              data.qualityEducation?.introductionHeading || "",

            qualityIntroductionDescription1:
              data.qualityEducation?.introductionDescription1 || "",

            qualityIntroductionDescription2:
              data.qualityEducation?.introductionDescription2 || "",

            qualityDigitalLabel:
              data.qualityEducation?.digitalLabel || "",

            qualityDigitalHeading:
              data.qualityEducation?.digitalHeading || "",

            qualityDigitalDescription1:
              data.qualityEducation?.digitalDescription1 || "",

            qualityDigitalDescription2:
              data.qualityEducation?.digitalDescription2 || "",

            qualityFeaturesLabel:
              data.qualityEducation?.featuresLabel || "",

            qualityFeaturesHeading:
              data.qualityEducation?.featuresHeading || "",

            qualityFeaturesDescription:
              data.qualityEducation?.featuresDescription || "",


            /* PRACTICAL */

            practicalTitle:
              data.practicalLearning?.title || "",

            practicalDescription:
              data.practicalLearning?.description || "",

            practicalHeroLabel:
              data.practicalLearning?.heroLabel || "",

            practicalHeroHeading:
              data.practicalLearning?.heroHeading || "",

            practicalHeroDescription:
              data.practicalLearning?.heroDescription || "",

            practicalIntroductionLabel:
              data.practicalLearning?.introductionLabel || "",

            practicalIntroductionHeading:
              data.practicalLearning?.introductionHeading || "",

            practicalIntroductionDescription1:
              data.practicalLearning?.introductionDescription1 || "",

            practicalIntroductionDescription2:
              data.practicalLearning?.introductionDescription2 || "",


            biologyLabel:
              data.practicalLearning?.biology?.label || "",

            biologyHeading:
              data.practicalLearning?.biology?.heading || "",

            biologyDescription1:
              data.practicalLearning?.biology?.description1 || "",

            biologyDescription2:
              data.practicalLearning?.biology?.description2 || "",

            biologyHighlight1:
              data.practicalLearning?.biology?.highlights?.[0]?.title || "",

            biologyHighlight2:
              data.practicalLearning?.biology?.highlights?.[1]?.title || "",

            biologyHighlight3:
              data.practicalLearning?.biology?.highlights?.[2]?.title || "",


            chemistryLabel:
              data.practicalLearning?.chemistry?.label || "",

            chemistryHeading:
              data.practicalLearning?.chemistry?.heading || "",

            chemistryDescription1:
              data.practicalLearning?.chemistry?.description1 || "",

            chemistryDescription2:
              data.practicalLearning?.chemistry?.description2 || "",

            chemistryHighlight1:
              data.practicalLearning?.chemistry?.highlights?.[0]?.title || "",

            chemistryHighlight2:
              data.practicalLearning?.chemistry?.highlights?.[1]?.title || "",

            chemistryHighlight3:
              data.practicalLearning?.chemistry?.highlights?.[2]?.title || "",


            physicsLabel:
              data.practicalLearning?.physics?.label || "",

            physicsHeading:
              data.practicalLearning?.physics?.heading || "",

            physicsDescription1:
              data.practicalLearning?.physics?.description1 || "",

            physicsDescription2:
              data.practicalLearning?.physics?.description2 || "",

            physicsHighlight1:
              data.practicalLearning?.physics?.highlights?.[0]?.title || "",

            physicsHighlight2:
              data.practicalLearning?.physics?.highlights?.[1]?.title || "",

            physicsHighlight3:
              data.practicalLearning?.physics?.highlights?.[2]?.title || "",


            computerLabel:
              data.practicalLearning?.computer?.label || "",

            computerHeading:
              data.practicalLearning?.computer?.heading || "",

            computerDescription1:
              data.practicalLearning?.computer?.description1 || "",

            computerDescription2:
              data.practicalLearning?.computer?.description2 || "",

            computerHighlight1:
              data.practicalLearning?.computer?.highlights?.[0]?.title || "",

            computerHighlight2:
              data.practicalLearning?.computer?.highlights?.[1]?.title || "",

            computerHighlight3:
              data.practicalLearning?.computer?.highlights?.[2]?.title || "",


            benefitsLabel:
              data.practicalLearning?.benefitsLabel || "",

            benefitsHeading:
              data.practicalLearning?.benefitsHeading || "",

            benefitsDescription:
              data.practicalLearning?.benefitsDescription || "",

            benefit1Title:
              data.practicalLearning?.benefits?.[0]?.title || "",

            benefit1Description:
              data.practicalLearning?.benefits?.[0]?.description || "",

            benefit2Title:
              data.practicalLearning?.benefits?.[1]?.title || "",

            benefit2Description:
              data.practicalLearning?.benefits?.[1]?.description || "",

            benefit3Title:
              data.practicalLearning?.benefits?.[2]?.title || "",

            benefit3Description:
              data.practicalLearning?.benefits?.[2]?.description || "",

            benefit4Title:
              data.practicalLearning?.benefits?.[3]?.title || "",

            benefit4Description:
              data.practicalLearning?.benefits?.[3]?.description || "",


            /* ACHIEVEMENT */

            achievementTitle:
              data.studentAchievement?.title || "",

            achievementDescription:
              data.studentAchievement?.description || "",

            achievementHeroLabel:
              data.studentAchievement?.heroLabel || "",

            achievementHeroHeading:
              data.studentAchievement?.heroHeading || "",

            achievementHeroDescription:
              data.studentAchievement?.heroDescription || "",

            achievementIntroductionLabel:
              data.studentAchievement?.introductionLabel || "",

            achievementIntroductionHeading:
              data.studentAchievement?.introductionHeading || "",

            achievementIntroductionDescription1:
              data.studentAchievement?.introductionDescription1 || "",

            achievementIntroductionDescription2:
              data.studentAchievement?.introductionDescription2 || "",


            resultsLabel:
              data.studentAchievement?.results?.label || "",

            resultsHeading:
              data.studentAchievement?.results?.heading || "",

            resultsDescription1:
              data.studentAchievement?.results?.description1 || "",

            resultsDescription2:
              data.studentAchievement?.results?.description2 || "",

            resultsHighlight1:
              data.studentAchievement?.results?.highlights?.[0]?.title || "",

            resultsHighlight2:
              data.studentAchievement?.results?.highlights?.[1]?.title || "",

            resultsHighlight3:
              data.studentAchievement?.results?.highlights?.[2]?.title || "",


            sportsLabel:
              data.studentAchievement?.sports?.label || "",

            sportsHeading:
              data.studentAchievement?.sports?.heading || "",

            sportsDescription1:
              data.studentAchievement?.sports?.description1 || "",

            sportsDescription2:
              data.studentAchievement?.sports?.description2 || "",

            sportsHighlight1:
              data.studentAchievement?.sports?.highlights?.[0]?.title || "",

            sportsHighlight2:
              data.studentAchievement?.sports?.highlights?.[1]?.title || "",

            sportsHighlight3:
              data.studentAchievement?.sports?.highlights?.[2]?.title || "",


            culturalLabel:
              data.studentAchievement?.cultural?.label || "",

            culturalHeading:
              data.studentAchievement?.cultural?.heading || "",

            culturalDescription1:
              data.studentAchievement?.cultural?.description1 || "",

            culturalDescription2:
              data.studentAchievement?.cultural?.description2 || "",

            culturalHighlight1:
              data.studentAchievement?.cultural?.highlights?.[0]?.title || "",

            culturalHighlight2:
              data.studentAchievement?.cultural?.highlights?.[1]?.title || "",

            culturalHighlight3:
              data.studentAchievement?.cultural?.highlights?.[2]?.title || "",


            leadershipLabel:
              data.studentAchievement?.leadership?.label || "",

            leadershipHeading:
              data.studentAchievement?.leadership?.heading || "",

            leadershipDescription1:
              data.studentAchievement?.leadership?.description1 || "",

            leadershipDescription2:
              data.studentAchievement?.leadership?.description2 || "",

            leadershipHighlight1:
              data.studentAchievement?.leadership?.highlights?.[0]?.title || "",

            leadershipHighlight2:
              data.studentAchievement?.leadership?.highlights?.[1]?.title || "",

            leadershipHighlight3:
              data.studentAchievement?.leadership?.highlights?.[2]?.title || "",


            coursesLabel:
              data.studentAchievement?.coursesLabel || "",

            coursesHeading:
              data.studentAchievement?.coursesHeading || "",

            coursesDescription:
              data.studentAchievement?.coursesDescription || "",

            scienceTitle:
              data.studentAchievement?.courses?.[0]?.title || "",

            scienceDescription:
              data.studentAchievement?.courses?.[0]?.description || "",

            scienceSubjects:
              data.studentAchievement?.courses?.[0]?.subjects?.join("\n") || "",

            humanitiesTitle:
              data.studentAchievement?.courses?.[1]?.title || "",

            humanitiesDescription:
              data.studentAchievement?.courses?.[1]?.description || "",

            humanitiesSubjects:
              data.studentAchievement?.courses?.[1]?.subjects?.join("\n") || "",

            businessTitle:
              data.studentAchievement?.courses?.[2]?.title || "",

            businessDescription:
              data.studentAchievement?.courses?.[2]?.description || "",

            businessSubjects:
              data.studentAchievement?.courses?.[2]?.subjects?.join("\n") || "",


            developmentLabel:
              data.studentAchievement?.developmentLabel || "",

            developmentHeading:
              data.studentAchievement?.developmentHeading || "",

            development1Title:
              data.studentAchievement?.developmentItems?.[0]?.title || "",

            development1Description:
              data.studentAchievement?.developmentItems?.[0]?.description || "",

            development2Title:
              data.studentAchievement?.developmentItems?.[1]?.title || "",

            development2Description:
              data.studentAchievement?.developmentItems?.[1]?.description || "",

            development3Title:
              data.studentAchievement?.developmentItems?.[2]?.title || "",

            development3Description:
              data.studentAchievement?.developmentItems?.[2]?.description || "",

            development4Title:
              data.studentAchievement?.developmentItems?.[3]?.title || "",

            development4Description:
              data.studentAchievement?.developmentItems?.[3]?.description || "",

          });


          setPreviews({

            section:
              getImageUrl(
                data.sectionImage
              ),

            qualityIntroduction:
              getImageUrl(
                data.qualityEducation?.introductionImage
              ),

            qualityDigital:
              getImageUrl(
                data.qualityEducation?.digitalImage
              ),

            practicalIntroduction:
              getImageUrl(
                data.practicalLearning?.introductionImage
              ),

            biology:
              getImageUrl(
                data.practicalLearning?.biology?.image
              ),

            chemistry:
              getImageUrl(
                data.practicalLearning?.chemistry?.image
              ),

            physics:
              getImageUrl(
                data.practicalLearning?.physics?.image
              ),

            computer:
              getImageUrl(
                data.practicalLearning?.computer?.image
              ),

            achievementIntroduction:
              getImageUrl(
                data.studentAchievement?.introductionImage
              ),

            results:
              getImageUrl(
                data.studentAchievement?.results?.image
              ),

            sports:
              getImageUrl(
                data.studentAchievement?.sports?.image
              ),

            cultural:
              getImageUrl(
                data.studentAchievement?.cultural?.image
              ),

            leadership:
              getImageUrl(
                data.studentAchievement?.leadership?.image
              ),

          });

        } catch (err) {

          console.error(
            "Academics fetch error:",
            err
          );

          setError(
            err.message ||
            "Unable to load Academics."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchAcademics();

  }, []);


  /* =======================================================
     INPUT
  ======================================================= */

  const handleChange =
    (event) => {

      const {
        name,
        value
      } = event.target;


      setForm(
        previous => ({
          ...previous,
          [name]: value,
        })
      );

    };


  /* =======================================================
     IMAGE SELECT
  ======================================================= */

  const handleImageChange = (
    event,
    imageKey
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Only JPG, JPEG, PNG and WebP images are allowed."
      );

      event.target.value = "";

      return;

    }


    if (
      file.size >
      5 * 1024 * 1024
    ) {

      setError(
        "Image size must be 5 MB or smaller."
      );

      event.target.value = "";

      return;

    }


    const preview =
      URL.createObjectURL(
        file
      );


    setImages(
      previous => ({
        ...previous,
        [imageKey]:
          file,
      })
    );


    setPreviews(
      previous => ({
        ...previous,
        [imageKey]:
          preview,
      })
    );


    setRemoveImages(
      previous => ({
        ...previous,
        [imageKey]:
          false,
      })
    );


    setError("");

  };


  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const handleRemoveImage = (
    imageKey
  ) => {

    setImages(
      previous => ({
        ...previous,
        [imageKey]:
          null,
      })
    );


    setPreviews(
      previous => ({
        ...previous,
        [imageKey]:
          "",
      })
    );


    setRemoveImages(
      previous => ({
        ...previous,
        [imageKey]:
          true,
      })
    );

  };


  /* =======================================================
     PASSKEY CONFIRMATION
  ======================================================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setMessage("");
      setError("");
      setShowPasskeyModal(true);

    };


  const handlePasskeyConfirmed =
    async () => {

      setShowPasskeyModal(false);

      await performSave();

    };


  /* =======================================================
     SAVE
  ======================================================= */

  const performSave =
    async () => {

      setSaving(true);
      setMessage("");
      setError("");


      try {

        const formData =
          new FormData();


        /* ---------------------------------------------------
           BASIC FIELDS
        --------------------------------------------------- */

        Object.entries(
          form
        ).forEach(
          ([key, value]) => {

            formData.append(
              key,
              value
            );

          }
        );


        /* ---------------------------------------------------
           QUALITY IMAGES
        --------------------------------------------------- */

        if (
          images.qualityIntroduction
        ) {

          formData.append(
            "qualityIntroductionImage",
            images.qualityIntroduction
          );

        }


        if (
          images.qualityDigital
        ) {

          formData.append(
            "qualityDigitalImage",
            images.qualityDigital
          );

        }


        /* ---------------------------------------------------
           PRACTICAL IMAGES
        --------------------------------------------------- */

        if (
          images.practicalIntroduction
        ) {

          formData.append(
            "practicalIntroductionImage",
            images.practicalIntroduction
          );

        }


        if (images.biology) {

          formData.append(
            "biologyImage",
            images.biology
          );

        }


        if (images.chemistry) {

          formData.append(
            "chemistryImage",
            images.chemistry
          );

        }


        if (images.physics) {

          formData.append(
            "physicsImage",
            images.physics
          );

        }


        if (images.computer) {

          formData.append(
            "computerImage",
            images.computer
          );

        }


        /* ---------------------------------------------------
           ACHIEVEMENT IMAGES
        --------------------------------------------------- */

        if (
          images.achievementIntroduction
        ) {

          formData.append(
            "achievementIntroductionImage",
            images.achievementIntroduction
          );

        }


        if (images.results) {

          formData.append(
            "resultsImage",
            images.results
          );

        }


        if (images.sports) {

          formData.append(
            "sportsImage",
            images.sports
          );

        }


        if (images.cultural) {

          formData.append(
            "culturalImage",
            images.cultural
          );

        }


        if (images.leadership) {

          formData.append(
            "leadershipImage",
            images.leadership
          );

        }


        /* ---------------------------------------------------
           REMOVE FLAGS
        --------------------------------------------------- */

        Object.entries(
          removeImages
        ).forEach(
          ([key, value]) => {

            formData.append(
              `remove${key
                .charAt(0)
                .toUpperCase()}${key.slice(1)}Image`,
              value
            );

          }
        );


        /* ---------------------------------------------------
           REQUEST
        --------------------------------------------------- */

        const response =
          await fetch(
            API_URL,
            {

              method:
                "PUT",

              headers: {

                ...(adminToken && {

                  Authorization:
                    `Bearer ${adminToken}`,

                }),

              },

              body:
                formData,

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to save Academics."
          );

        }


        setMessage(
          "Academics information saved successfully."
        );


        /* ---------------------------------------------------
           Refresh previews
        --------------------------------------------------- */

        setImages({

          section: null,

          qualityIntroduction: null,
          qualityDigital: null,

          practicalIntroduction: null,
          biology: null,
          chemistry: null,
          physics: null,
          computer: null,

          achievementIntroduction: null,
          results: null,
          sports: null,
          cultural: null,
          leadership: null,

        });


        setRemoveImages({

          section: false,

          qualityIntroduction: false,
          qualityDigital: false,

          practicalIntroduction: false,
          biology: false,
          chemistry: false,
          physics: false,
          computer: false,

          achievementIntroduction: false,
          results: false,
          sports: false,
          cultural: false,
          leadership: false,

        });


        setPreviews({

          section:
            getImageUrl(
              data.sectionImage
            ),

          qualityIntroduction:
            getImageUrl(
              data.qualityEducation?.introductionImage
            ),

          qualityDigital:
            getImageUrl(
              data.qualityEducation?.digitalImage
            ),

          practicalIntroduction:
            getImageUrl(
              data.practicalLearning?.introductionImage
            ),

          biology:
            getImageUrl(
              data.practicalLearning?.biology?.image
            ),

          chemistry:
            getImageUrl(
              data.practicalLearning?.chemistry?.image
            ),

          physics:
            getImageUrl(
              data.practicalLearning?.physics?.image
            ),

          computer:
            getImageUrl(
              data.practicalLearning?.computer?.image
            ),

          achievementIntroduction:
            getImageUrl(
              data.studentAchievement?.introductionImage
            ),

          results:
            getImageUrl(
              data.studentAchievement?.results?.image
            ),

          sports:
            getImageUrl(
              data.studentAchievement?.sports?.image
            ),

          cultural:
            getImageUrl(
              data.studentAchievement?.cultural?.image
            ),

          leadership:
            getImageUrl(
              data.studentAchievement?.leadership?.image
            ),

        });


      } catch (err) {

        console.error(
          "Academics save error:",
          err
        );

        setError(
          err.message ||
          "Unable to save Academics."
        );

      } finally {

        setSaving(false);

      }

    };


  /* =======================================================
     IMAGE EDITOR
  ======================================================= */

  const ImageEditor = ({
    label,
    imageKey,
  }) => (

    <div className="academic-image-editor">

      <label>
        {label}
      </label>


      <input
        type="file"
        accept="
          image/jpeg,
          image/jpg,
          image/png,
          image/webp
        "
        onChange={(event) =>
          handleImageChange(
            event,
            imageKey
          )
        }
      />


      <small>
        JPG, JPEG, PNG or WebP ·
        Maximum 5 MB
      </small>


      {previews[imageKey] && (

        <div className="academic-image-preview">

          <img
            src={
              previews[imageKey]
            }
            alt={label}
          />

        </div>

      )}


      {previews[imageKey] && (

        <button
          type="button"
          className="academic-remove-button"
          onClick={() =>
            handleRemoveImage(
              imageKey
            )
          }
        >
          🗑 Remove Photo
        </button>

      )}

    </div>

  );


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <main className="admin-academics-page">

        <div className="admin-academics-loading">

          Loading Academics...

        </div>

      </main>

    );

  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>

      <style>{`

        .admin-academics-page {
          min-height: 100vh;
          background: #eef5fb;
          padding: 50px 20px 80px;
          color: #0b2e59;
        }


        .admin-academics-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }


        .admin-academics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          padding: 35px 40px;
          margin-bottom: 30px;
          background: #0b2e59;
          border-radius: 20px;
          color: white;
        }


        .admin-academics-header span {
          display: inline-block;
          margin-bottom: 10px;
          color: #ffd700;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: 2px;
        }


        .admin-academics-header h1 {
          margin: 0 0 8px;
          font-size: 2.35rem;
        }


        .admin-academics-header p {
          margin: 0;
          color: #dbe8f5;
          line-height: 1.6;
        }


        .admin-academics-header button {
          padding: 11px 18px;
          border: 2px solid #ffd700;
          border-radius: 999px;
          background: #ffd700;
          color: #0b2e59;
          font-weight: 700;
          cursor: pointer;
        }


        .admin-academics-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }


        .academic-section {
          padding: 30px;
          background: #ffffff;
          border: 1px solid #dfe7f0;
          border-radius: 20px;
          box-shadow:
            0 10px 28px
            rgba(11,46,89,.06);
        }


        .academic-section-header {
          margin-bottom: 25px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e4ebf2;
        }


        .academic-section-header h2 {
          margin: 0 0 6px;
          font-size: 1.45rem;
        }


        .academic-section-header p {
          margin: 0;
          color: #687384;
        }


        .academic-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 20px;
        }


        .academic-field {
          display: flex;
          flex-direction: column;
        }


        .academic-full {
          grid-column: 1 / -1;
        }


        .academic-field label {
          margin-bottom: 8px;
          font-size: .9rem;
          font-weight: 700;
        }


        .academic-field input,
        .academic-field textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 15px;
          border: 1px solid #d7e1ec;
          border-radius: 10px;
          font-family: inherit;
          font-size: .95rem;
          outline: none;
        }


        .academic-field textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.65;
        }


        .academic-field input:focus,
        .academic-field textarea:focus {
          border-color: #0b2e59;
          box-shadow:
            0 0 0 3px
            rgba(11,46,89,.08);
        }


        .academic-subsection {
          grid-column: 1 / -1;
          margin-top: 10px;
          padding-top: 20px;
          border-top: 1px solid #edf1f5;
        }


        .academic-subsection h3 {
          margin: 0 0 18px;
          font-size: 1.1rem;
        }


        .academic-image-editor {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }


        .academic-image-editor label {
          font-weight: 700;
        }


        .academic-image-editor input {
          width: 100%;
          padding: 10px;
          border: 1px solid #d7e1ec;
          border-radius: 10px;
          background: #f8fbfe;
          cursor: pointer;
        }


        .academic-image-editor small {
          color: #687384;
        }


        .academic-image-preview {
          width: 280px;
          height: 175px;
          overflow: hidden;
          margin-top: 6px;
          border: 1px solid #dfe7f0;
          border-radius: 12px;
          background: #f3f6fa;
        }


        .academic-image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }


        .academic-remove-button {
          padding: 8px 14px;
          border: 1px solid #e53935;
          border-radius: 8px;
          background: #ffffff;
          color: #e53935;
          font-weight: 700;
          cursor: pointer;
        }


        .academic-remove-button:hover {
          background: #e53935;
          color: #ffffff;
        }


        .admin-academics-success,
        .admin-academics-error {
          padding: 12px 15px;
          border-radius: 10px;
          font-weight: 600;
        }


        .admin-academics-success {
          background: #ecfdf3;
          color: #117a4d;
        }


        .admin-academics-error {
          background: #fff1f0;
          color: #c62828;
        }


        .admin-academics-save {
          width: 100%;
          padding: 14px 24px;
          border: 2px solid #0b2e59;
          border-radius: 999px;
          background: #0b2e59;
          color: #ffffff;
          font-size: .95rem;
          font-weight: 700;
          cursor: pointer;
        }


        .admin-academics-save:hover {
          background: #ffd700;
          border-color: #ffd700;
          color: #0b2e59;
        }


        .admin-academics-save:disabled {
          opacity: .7;
          cursor: not-allowed;
        }


        .admin-academics-loading {
          max-width: 700px;
          margin: 100px auto;
          padding: 50px;
          background: #ffffff;
          border-radius: 18px;
          text-align: center;
          color: #687384;
        }


        @media (max-width: 800px) {

          .admin-academics-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 25px;
          }


          .admin-academics-header button {
            width: 100%;
          }


          .academic-grid {
            grid-template-columns: 1fr;
          }


          .academic-full,
          .academic-subsection {
            grid-column: auto;
          }

        }


        @media (max-width: 600px) {

          .admin-academics-page {
            padding:
              30px 15px 55px;
          }


          .academic-section {
            padding: 20px;
          }


          .academic-image-preview {
            width: 100%;
            max-width: 280px;
          }

        }

      `}</style>


      <main className="admin-academics-page">

        <div className="admin-academics-container">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="admin-academics-header">

            <div>

              <span>
                KOLADI HIGH SCHOOL
              </span>

              <h1>
                Academics Management
              </h1>

              <p>
                Manage the complete Academics section
                and all three detail pages.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/admin")
              }
            >
              ← Dashboard
            </button>

          </header>


          <form
            className="admin-academics-form"
            onSubmit={handleSubmit}
          >

            {message && (
              <div className="admin-academics-success">
                {message}
              </div>
            )}


            {error && (
              <div className="admin-academics-error">
                {error}
              </div>
            )}


            {/* =================================================
                MAIN ACADEMICS
            ================================================= */}

            <section className="academic-section">

              <div className="academic-section-header">

                <h2>
                  Main Academics Section
                </h2>

                <p>
                  Content displayed on the homepage Academics section.
                </p>

              </div>


              <div className="academic-grid">

                <div className="academic-field academic-full">

                  <label>
                    Section Label
                  </label>

                  <input
                    name="sectionLabel"
                    value={form.sectionLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Section Heading
                  </label>

                  <input
                    name="sectionHeading"
                    value={form.sectionHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Section Description
                  </label>

                  <textarea
                    name="sectionDescription"
                    value={form.sectionDescription}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Main Academics Photo"
                  imageKey="section"
                />

              </div>

            </section>


            {/* =================================================
                QUALITY EDUCATION
            ================================================= */}

            <section className="academic-section">

              <div className="academic-section-header">

                <h2>
                  Quality Education
                </h2>

                <p>
                  Manage the Quality Education card
                  and its complete detail page.
                </p>

              </div>


              <div className="academic-grid">


                <div className="academic-field academic-full">

                  <label>
                    Card Heading
                  </label>

                  <input
                    name="qualityTitle"
                    value={form.qualityTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Card Description
                  </label>

                  <textarea
                    name="qualityDescription"
                    value={form.qualityDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Hero
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Hero Label
                  </label>

                  <input
                    name="qualityHeroLabel"
                    value={form.qualityHeroLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Hero Heading
                  </label>

                  <input
                    name="qualityHeroHeading"
                    value={form.qualityHeroHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Hero Description
                  </label>

                  <textarea
                    name="qualityHeroDescription"
                    value={form.qualityHeroDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Modern Classrooms
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="qualityIntroductionLabel"
                    value={form.qualityIntroductionLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="qualityIntroductionHeading"
                    value={form.qualityIntroductionHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="qualityIntroductionDescription1"
                    value={
                      form.qualityIntroductionDescription1
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="qualityIntroductionDescription2"
                    value={
                      form.qualityIntroductionDescription2
                    }
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Modern Classrooms Photo"
                  imageKey="qualityIntroduction"
                />


                <div className="academic-subsection">

                  <h3>
                    Digital Learning
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="qualityDigitalLabel"
                    value={form.qualityDigitalLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="qualityDigitalHeading"
                    value={form.qualityDigitalHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="qualityDigitalDescription1"
                    value={
                      form.qualityDigitalDescription1
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="qualityDigitalDescription2"
                    value={
                      form.qualityDigitalDescription2
                    }
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Digital Learning Photo"
                  imageKey="qualityDigital"
                />


                <div className="academic-subsection">

                  <h3>
                    Learning Environment
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Section Label
                  </label>

                  <input
                    name="qualityFeaturesLabel"
                    value={form.qualityFeaturesLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="qualityFeaturesHeading"
                    value={form.qualityFeaturesHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="qualityFeaturesDescription"
                    value={
                      form.qualityFeaturesDescription
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                PRACTICAL LEARNING
            ================================================= */}

            <section className="academic-section">

              <div className="academic-section-header">

                <h2>
                  Practical Learning
                </h2>

                <p>
                  Manage the complete practical-learning
                  detail page.
                </p>

              </div>


              <div className="academic-grid">


                <div className="academic-field academic-full">

                  <label>
                    Card Heading
                  </label>

                  <input
                    name="practicalTitle"
                    value={form.practicalTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Card Description
                  </label>

                  <textarea
                    name="practicalDescription"
                    value={form.practicalDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Hero
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Hero Label
                  </label>

                  <input
                    name="practicalHeroLabel"
                    value={form.practicalHeroLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Hero Heading
                  </label>

                  <input
                    name="practicalHeroHeading"
                    value={form.practicalHeroHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Hero Description
                  </label>

                  <textarea
                    name="practicalHeroDescription"
                    value={form.practicalHeroDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Introduction
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="practicalIntroductionLabel"
                    value={form.practicalIntroductionLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="practicalIntroductionHeading"
                    value={
                      form.practicalIntroductionHeading
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="practicalIntroductionDescription1"
                    value={
                      form.practicalIntroductionDescription1
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="practicalIntroductionDescription2"
                    value={
                      form.practicalIntroductionDescription2
                    }
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Introduction Photo"
                  imageKey="practicalIntroduction"
                />


                {/* Biology */}

                <div className="academic-subsection">

                  <h3>
                    Biology Laboratory
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="biologyLabel"
                    value={form.biologyLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="biologyHeading"
                    value={form.biologyHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="biologyDescription1"
                    value={form.biologyDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="biologyDescription2"
                    value={form.biologyDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="biologyHighlight1"
                    value={form.biologyHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="biologyHighlight2"
                    value={form.biologyHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="biologyHighlight3"
                    value={form.biologyHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Biology Lab Photo"
                  imageKey="biology"
                />


                {/* Chemistry */}

                <div className="academic-subsection">

                  <h3>
                    Chemistry Laboratory
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="chemistryLabel"
                    value={form.chemistryLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="chemistryHeading"
                    value={form.chemistryHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="chemistryDescription1"
                    value={form.chemistryDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="chemistryDescription2"
                    value={form.chemistryDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="chemistryHighlight1"
                    value={form.chemistryHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="chemistryHighlight2"
                    value={form.chemistryHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="chemistryHighlight3"
                    value={form.chemistryHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Chemistry Lab Photo"
                  imageKey="chemistry"
                />


                {/* Physics */}

                <div className="academic-subsection">

                  <h3>
                    Physics Laboratory
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="physicsLabel"
                    value={form.physicsLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="physicsHeading"
                    value={form.physicsHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="physicsDescription1"
                    value={form.physicsDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="physicsDescription2"
                    value={form.physicsDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="physicsHighlight1"
                    value={form.physicsHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="physicsHighlight2"
                    value={form.physicsHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="physicsHighlight3"
                    value={form.physicsHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Physics Lab Photo"
                  imageKey="physics"
                />


                {/* Computer */}

                <div className="academic-subsection">

                  <h3>
                    Computer Laboratory
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="computerLabel"
                    value={form.computerLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="computerHeading"
                    value={form.computerHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="computerDescription1"
                    value={form.computerDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="computerDescription2"
                    value={form.computerDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="computerHighlight1"
                    value={form.computerHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="computerHighlight2"
                    value={form.computerHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="computerHighlight3"
                    value={form.computerHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Computer Lab Photo"
                  imageKey="computer"
                />


                {/* Benefits */}

                <div className="academic-subsection">

                  <h3>
                    Benefits
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Section Label
                  </label>

                  <input
                    name="benefitsLabel"
                    value={form.benefitsLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="benefitsHeading"
                    value={form.benefitsHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="benefitsDescription"
                    value={form.benefitsDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 1 Title
                  </label>

                  <input
                    name="benefit1Title"
                    value={form.benefit1Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 1 Description
                  </label>

                  <textarea
                    name="benefit1Description"
                    value={form.benefit1Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 2 Title
                  </label>

                  <input
                    name="benefit2Title"
                    value={form.benefit2Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 2 Description
                  </label>

                  <textarea
                    name="benefit2Description"
                    value={form.benefit2Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 3 Title
                  </label>

                  <input
                    name="benefit3Title"
                    value={form.benefit3Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 3 Description
                  </label>

                  <textarea
                    name="benefit3Description"
                    value={form.benefit3Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 4 Title
                  </label>

                  <input
                    name="benefit4Title"
                    value={form.benefit4Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Benefit 4 Description
                  </label>

                  <textarea
                    name="benefit4Description"
                    value={form.benefit4Description}
                    onChange={handleChange}
                  />

                </div>


              </div>

            </section>


            {/* =================================================
                STUDENT ACHIEVEMENT
            ================================================= */}

            <section className="academic-section">

              <div className="academic-section-header">

                <h2>
                  Student Achievement
                </h2>

                <p>
                  Manage the complete Student Achievement
                  detail page.
                </p>

              </div>


              <div className="academic-grid">


                <div className="academic-field academic-full">

                  <label>
                    Card Heading
                  </label>

                  <input
                    name="achievementTitle"
                    value={form.achievementTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Card Description
                  </label>

                  <textarea
                    name="achievementDescription"
                    value={form.achievementDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Hero
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Hero Label
                  </label>

                  <input
                    name="achievementHeroLabel"
                    value={form.achievementHeroLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Hero Heading
                  </label>

                  <input
                    name="achievementHeroHeading"
                    value={form.achievementHeroHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Hero Description
                  </label>

                  <textarea
                    name="achievementHeroDescription"
                    value={form.achievementHeroDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-subsection">

                  <h3>
                    Introduction
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="achievementIntroductionLabel"
                    value={
                      form.achievementIntroductionLabel
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="achievementIntroductionHeading"
                    value={
                      form.achievementIntroductionHeading
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="achievementIntroductionDescription1"
                    value={
                      form.achievementIntroductionDescription1
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="achievementIntroductionDescription2"
                    value={
                      form.achievementIntroductionDescription2
                    }
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Introduction Photo"
                  imageKey="achievementIntroduction"
                />


                {/* Results */}

                <div className="academic-subsection">

                  <h3>
                    Academic Results
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="resultsLabel"
                    value={form.resultsLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="resultsHeading"
                    value={form.resultsHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="resultsDescription1"
                    value={form.resultsDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="resultsDescription2"
                    value={form.resultsDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="resultsHighlight1"
                    value={form.resultsHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="resultsHighlight2"
                    value={form.resultsHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="resultsHighlight3"
                    value={form.resultsHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Academic Results Photo"
                  imageKey="results"
                />


                {/* Sports */}

                <div className="academic-subsection">

                  <h3>
                    Sports
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="sportsLabel"
                    value={form.sportsLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="sportsHeading"
                    value={form.sportsHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="sportsDescription1"
                    value={form.sportsDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="sportsDescription2"
                    value={form.sportsDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="sportsHighlight1"
                    value={form.sportsHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="sportsHighlight2"
                    value={form.sportsHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="sportsHighlight3"
                    value={form.sportsHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Sports Photo"
                  imageKey="sports"
                />


                {/* Cultural */}

                <div className="academic-subsection">

                  <h3>
                    Cultural Activities
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="culturalLabel"
                    value={form.culturalLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="culturalHeading"
                    value={form.culturalHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="culturalDescription1"
                    value={form.culturalDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="culturalDescription2"
                    value={form.culturalDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="culturalHighlight1"
                    value={form.culturalHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="culturalHighlight2"
                    value={form.culturalHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="culturalHighlight3"
                    value={form.culturalHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Cultural Activities Photo"
                  imageKey="cultural"
                />


                {/* Leadership */}

                <div className="academic-subsection">

                  <h3>
                    Leadership
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Label
                  </label>

                  <input
                    name="leadershipLabel"
                    value={form.leadershipLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="leadershipHeading"
                    value={form.leadershipHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 1
                  </label>

                  <textarea
                    name="leadershipDescription1"
                    value={form.leadershipDescription1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Paragraph 2
                  </label>

                  <textarea
                    name="leadershipDescription2"
                    value={form.leadershipDescription2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 1
                  </label>

                  <input
                    name="leadershipHighlight1"
                    value={form.leadershipHighlight1}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 2
                  </label>

                  <input
                    name="leadershipHighlight2"
                    value={form.leadershipHighlight2}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Highlight 3
                  </label>

                  <input
                    name="leadershipHighlight3"
                    value={form.leadershipHighlight3}
                    onChange={handleChange}
                  />

                </div>


                <ImageEditor
                  label="Leadership Photo"
                  imageKey="leadership"
                />


                {/* Courses */}

                <div className="academic-subsection">

                  <h3>
                    Courses & Subjects
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Section Label
                  </label>

                  <input
                    name="coursesLabel"
                    value={form.coursesLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="coursesHeading"
                    value={form.coursesHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="coursesDescription"
                    value={form.coursesDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Science Heading
                  </label>

                  <input
                    name="scienceTitle"
                    value={form.scienceTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Science Description
                  </label>

                  <textarea
                    name="scienceDescription"
                    value={form.scienceDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Science Subjects
                  </label>

                  <textarea
                    name="scienceSubjects"
                    value={form.scienceSubjects}
                    onChange={handleChange}
                    placeholder={
                      "One subject per line"
                    }
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Humanities Heading
                  </label>

                  <input
                    name="humanitiesTitle"
                    value={form.humanitiesTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Humanities Description
                  </label>

                  <textarea
                    name="humanitiesDescription"
                    value={form.humanitiesDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Humanities Subjects
                  </label>

                  <textarea
                    name="humanitiesSubjects"
                    value={form.humanitiesSubjects}
                    onChange={handleChange}
                    placeholder={
                      "One subject per line"
                    }
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Business Studies Heading
                  </label>

                  <input
                    name="businessTitle"
                    value={form.businessTitle}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Business Studies Description
                  </label>

                  <textarea
                    name="businessDescription"
                    value={form.businessDescription}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field academic-full">

                  <label>
                    Business Studies Subjects
                  </label>

                  <textarea
                    name="businessSubjects"
                    value={form.businessSubjects}
                    onChange={handleChange}
                    placeholder={
                      "One subject per line"
                    }
                  />

                </div>


                {/* Development */}

                <div className="academic-subsection">

                  <h3>
                    Student Development
                  </h3>

                </div>


                <div className="academic-field">

                  <label>
                    Section Label
                  </label>

                  <input
                    name="developmentLabel"
                    value={form.developmentLabel}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Heading
                  </label>

                  <input
                    name="developmentHeading"
                    value={form.developmentHeading}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Knowledge Title
                  </label>

                  <input
                    name="development1Title"
                    value={form.development1Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Knowledge Description
                  </label>

                  <input
                    name="development1Description"
                    value={form.development1Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Confidence Title
                  </label>

                  <input
                    name="development2Title"
                    value={form.development2Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Confidence Description
                  </label>

                  <input
                    name="development2Description"
                    value={form.development2Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Discipline Title
                  </label>

                  <input
                    name="development3Title"
                    value={form.development3Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Discipline Description
                  </label>

                  <input
                    name="development3Description"
                    value={form.development3Description}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Leadership Title
                  </label>

                  <input
                    name="development4Title"
                    value={form.development4Title}
                    onChange={handleChange}
                  />

                </div>


                <div className="academic-field">

                  <label>
                    Leadership Description
                  </label>

                  <input
                    name="development4Description"
                    value={form.development4Description}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="submit"
              className="admin-academics-save"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save All Academics Changes"}

            </button>

          </form>

        </div>

      </main>


      {showPasskeyModal && (

        <AdminPasskeyModal
          onConfirm={handlePasskeyConfirmed}
          onCancel={() =>
            setShowPasskeyModal(false)
          }
        />

      )}

    </>
  );
}


export default AdminAcademics;