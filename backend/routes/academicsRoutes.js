/* =========================================================
   KOLADI HIGH SCHOOL
   COMPLETE ACADEMICS ROUTES
========================================================= */

const express = require("express");
const fs = require("fs");
const path = require("path");

const Academics =
  require("../models/Academics");

const protect =
  require("../middleware/authMiddleware");

const createUpload =
  require("../middleware/uploadMiddleware");

const upload =
  createUpload("academics");

const router =
  express.Router();


/* =========================================================
   GET ACADEMICS
   GET /api/academics
   Public
========================================================= */

router.get(
  "/",
  async (req, res) => {

    try {

      const academics =
        await Academics.findOne();

      if (!academics) {

        return res.status(404).json({
          message:
            "Academics information not found",
        });

      }

      res.status(200).json(
        academics
      );

    } catch (error) {

      console.error(
        "Academics fetch error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch academics information",
        error:
          error.message,
      });

    }

  }
);


/* =========================================================
   DELETE UPLOADED FILE
========================================================= */

const deleteUploadedFile =
  (imagePath) => {

    if (!imagePath) {
      return;
    }


    if (
      !imagePath.startsWith(
        "/uploads/"
      )
    ) {

      return;

    }


    const filePath =
      path.join(
        __dirname,
        "..",
        imagePath
      );


    if (
      fs.existsSync(
        filePath
      )
    ) {

      try {

        fs.unlinkSync(
          filePath
        );

      } catch (error) {

        console.error(
          "Failed to delete image:",
          error.message
        );

      }

    }

  };


/* =========================================================
   SET IMAGE
========================================================= */

const setUploadedImage =
  (
    currentImage,
    uploadedFile
  ) => {

    if (!uploadedFile) {
      return currentImage;
    }

    deleteUploadedFile(
      currentImage
    );

    return `/uploads/academics/${uploadedFile.filename}`;

  };


/* =========================================================
   UPDATE ACADEMICS
   PUT /api/academics
   Admin only
========================================================= */

router.put(
  "/",
  protect,

  upload.fields([

    {
      name:
        "sectionImage",
      maxCount:
        1,
    },

    {
      name:
        "qualityIntroductionImage",
      maxCount:
        1,
    },

    {
      name:
        "qualityDigitalImage",
      maxCount:
        1,
    },

    {
      name:
        "practicalIntroductionImage",
      maxCount:
        1,
    },

    {
      name:
        "biologyImage",
      maxCount:
        1,
    },

    {
      name:
        "chemistryImage",
      maxCount:
        1,
    },

    {
      name:
        "physicsImage",
      maxCount:
        1,
    },

    {
      name:
        "computerImage",
      maxCount:
        1,
    },

    {
      name:
        "achievementIntroductionImage",
      maxCount:
        1,
    },

    {
      name:
        "resultsImage",
      maxCount:
        1,
    },

    {
      name:
        "sportsImage",
      maxCount:
        1,
    },

    {
      name:
        "culturalImage",
      maxCount:
        1,
    },

    {
      name:
        "leadershipImage",
      maxCount:
        1,
    },

  ]),

  async (req, res) => {

    try {

      let academics =
        await Academics.findOne();


      if (!academics) {

        academics =
          new Academics();

      }


      /* =================================================
         MAIN ACADEMICS
      ================================================= */

      if (
        req.body.sectionLabel !==
        undefined
      ) {

        academics.sectionLabel =
          req.body.sectionLabel.trim();

      }


      if (
        req.body.sectionHeading !==
        undefined
      ) {

        academics.sectionHeading =
          req.body.sectionHeading.trim();

      }


      if (
        req.body.sectionDescription !==
        undefined
      ) {

        academics.sectionDescription =
          req.body.sectionDescription.trim();

      }


      /* =================================================
         QUALITY EDUCATION
      ================================================= */

      const quality =
        academics.qualityEducation;


      if (
        req.body.qualityTitle !==
        undefined
      ) {

        quality.title =
          req.body.qualityTitle.trim();

      }


      if (
        req.body.qualityDescription !==
        undefined
      ) {

        quality.description =
          req.body.qualityDescription.trim();

      }


      if (
        req.body.qualityHeroLabel !==
        undefined
      ) {

        quality.heroLabel =
          req.body.qualityHeroLabel.trim();

      }


      if (
        req.body.qualityHeroHeading !==
        undefined
      ) {

        quality.heroHeading =
          req.body.qualityHeroHeading.trim();

      }


      if (
        req.body.qualityHeroDescription !==
        undefined
      ) {

        quality.heroDescription =
          req.body.qualityHeroDescription.trim();

      }


      if (
        req.body.qualityIntroductionLabel !==
        undefined
      ) {

        quality.introductionLabel =
          req.body.qualityIntroductionLabel.trim();

      }


      if (
        req.body.qualityIntroductionHeading !==
        undefined
      ) {

        quality.introductionHeading =
          req.body.qualityIntroductionHeading.trim();

      }


      if (
        req.body.qualityIntroductionDescription1 !==
        undefined
      ) {

        quality.introductionDescription1 =
          req.body.qualityIntroductionDescription1.trim();

      }


      if (
        req.body.qualityIntroductionDescription2 !==
        undefined
      ) {

        quality.introductionDescription2 =
          req.body.qualityIntroductionDescription2.trim();

      }


      if (
        req.body.qualityDigitalLabel !==
        undefined
      ) {

        quality.digitalLabel =
          req.body.qualityDigitalLabel.trim();

      }


      if (
        req.body.qualityDigitalHeading !==
        undefined
      ) {

        quality.digitalHeading =
          req.body.qualityDigitalHeading.trim();

      }


      if (
        req.body.qualityDigitalDescription1 !==
        undefined
      ) {

        quality.digitalDescription1 =
          req.body.qualityDigitalDescription1.trim();

      }


      if (
        req.body.qualityDigitalDescription2 !==
        undefined
      ) {

        quality.digitalDescription2 =
          req.body.qualityDigitalDescription2.trim();

      }


      if (
        req.body.qualityFeaturesLabel !==
        undefined
      ) {

        quality.featuresLabel =
          req.body.qualityFeaturesLabel.trim();

      }


      if (
        req.body.qualityFeaturesHeading !==
        undefined
      ) {

        quality.featuresHeading =
          req.body.qualityFeaturesHeading.trim();

      }


      if (
        req.body.qualityFeaturesDescription !==
        undefined
      ) {

        quality.featuresDescription =
          req.body.qualityFeaturesDescription.trim();

      }


      /* -------------------------------------------------
         QUALITY IMAGES
      ------------------------------------------------- */

      if (
        req.body.removeQualityIntroductionImage ===
        "true"
      ) {

        deleteUploadedFile(
          quality.introductionImage
        );

        quality.introductionImage =
          "";

      }


      if (
        req.body.removeQualityDigitalImage ===
        "true"
      ) {

        deleteUploadedFile(
          quality.digitalImage
        );

        quality.digitalImage =
          "";

      }


      if (
        req.files?.qualityIntroductionImage?.[0]
      ) {

        quality.introductionImage =
          setUploadedImage(
            quality.introductionImage,
            req.files.qualityIntroductionImage[0]
          );

      }


      if (
        req.files?.qualityDigitalImage?.[0]
      ) {

        quality.digitalImage =
          setUploadedImage(
            quality.digitalImage,
            req.files.qualityDigitalImage[0]
          );

      }


      /* =================================================
         PRACTICAL LEARNING
      ================================================= */

      const practical =
        academics.practicalLearning;


      if (
        req.body.practicalTitle !==
        undefined
      ) {

        practical.title =
          req.body.practicalTitle.trim();

      }


      if (
        req.body.practicalDescription !==
        undefined
      ) {

        practical.description =
          req.body.practicalDescription.trim();

      }


      if (
        req.body.practicalHeroLabel !==
        undefined
      ) {

        practical.heroLabel =
          req.body.practicalHeroLabel.trim();

      }


      if (
        req.body.practicalHeroHeading !==
        undefined
      ) {

        practical.heroHeading =
          req.body.practicalHeroHeading.trim();

      }


      if (
        req.body.practicalHeroDescription !==
        undefined
      ) {

        practical.heroDescription =
          req.body.practicalHeroDescription.trim();

      }


      if (
        req.body.practicalIntroductionLabel !==
        undefined
      ) {

        practical.introductionLabel =
          req.body.practicalIntroductionLabel.trim();

      }


      if (
        req.body.practicalIntroductionHeading !==
        undefined
      ) {

        practical.introductionHeading =
          req.body.practicalIntroductionHeading.trim();

      }


      if (
        req.body.practicalIntroductionDescription1 !==
        undefined
      ) {

        practical.introductionDescription1 =
          req.body.practicalIntroductionDescription1.trim();

      }


      if (
        req.body.practicalIntroductionDescription2 !==
        undefined
      ) {

        practical.introductionDescription2 =
          req.body.practicalIntroductionDescription2.trim();

      }


      /* -------------------------------------------------
         PRACTICAL INTRODUCTION POINTS
      ------------------------------------------------- */

      if (
        req.body.practicalIntroductionPoints !==
        undefined
      ) {

        practical.introductionPoints =
          req.body.practicalIntroductionPoints
            .split("\n")
            .map(
              item => item.trim()
            )
            .filter(Boolean);

      }


      /* -------------------------------------------------
         BIOLOGY
      ------------------------------------------------- */

      const biology =
        practical.biology;


      if (
        req.body.biologyLabel !==
        undefined
      ) {

        biology.label =
          req.body.biologyLabel.trim();

      }


      if (
        req.body.biologyHeading !==
        undefined
      ) {

        biology.heading =
          req.body.biologyHeading.trim();

      }


      if (
        req.body.biologyDescription1 !==
        undefined
      ) {

        biology.description1 =
          req.body.biologyDescription1.trim();

      }


      if (
        req.body.biologyDescription2 !==
        undefined
      ) {

        biology.description2 =
          req.body.biologyDescription2.trim();

      }


      if (
        req.body.biologyHighlight1 !==
        undefined
      ) {

        biology.highlights[0].title =
          req.body.biologyHighlight1.trim();

      }


      if (
        req.body.biologyHighlight2 !==
        undefined
      ) {

        biology.highlights[1].title =
          req.body.biologyHighlight2.trim();

      }


      if (
        req.body.biologyHighlight3 !==
        undefined
      ) {

        biology.highlights[2].title =
          req.body.biologyHighlight3.trim();

      }


      /* -------------------------------------------------
         CHEMISTRY
      ------------------------------------------------- */

      const chemistry =
        practical.chemistry;


      if (
        req.body.chemistryLabel !==
        undefined
      ) {

        chemistry.label =
          req.body.chemistryLabel.trim();

      }


      if (
        req.body.chemistryHeading !==
        undefined
      ) {

        chemistry.heading =
          req.body.chemistryHeading.trim();

      }


      if (
        req.body.chemistryDescription1 !==
        undefined
      ) {

        chemistry.description1 =
          req.body.chemistryDescription1.trim();

      }


      if (
        req.body.chemistryDescription2 !==
        undefined
      ) {

        chemistry.description2 =
          req.body.chemistryDescription2.trim();

      }


      if (
        req.body.chemistryHighlight1 !==
        undefined
      ) {

        chemistry.highlights[0].title =
          req.body.chemistryHighlight1.trim();

      }


      if (
        req.body.chemistryHighlight2 !==
        undefined
      ) {

        chemistry.highlights[1].title =
          req.body.chemistryHighlight2.trim();

      }


      if (
        req.body.chemistryHighlight3 !==
        undefined
      ) {

        chemistry.highlights[2].title =
          req.body.chemistryHighlight3.trim();

      }


      /* -------------------------------------------------
         PHYSICS
      ------------------------------------------------- */

      const physics =
        practical.physics;


      if (
        req.body.physicsLabel !==
        undefined
      ) {

        physics.label =
          req.body.physicsLabel.trim();

      }


      if (
        req.body.physicsHeading !==
        undefined
      ) {

        physics.heading =
          req.body.physicsHeading.trim();

      }


      if (
        req.body.physicsDescription1 !==
        undefined
      ) {

        physics.description1 =
          req.body.physicsDescription1.trim();

      }


      if (
        req.body.physicsDescription2 !==
        undefined
      ) {

        physics.description2 =
          req.body.physicsDescription2.trim();

      }


      if (
        req.body.physicsHighlight1 !==
        undefined
      ) {

        physics.highlights[0].title =
          req.body.physicsHighlight1.trim();

      }


      if (
        req.body.physicsHighlight2 !==
        undefined
      ) {

        physics.highlights[1].title =
          req.body.physicsHighlight2.trim();

      }


      if (
        req.body.physicsHighlight3 !==
        undefined
      ) {

        physics.highlights[2].title =
          req.body.physicsHighlight3.trim();

      }


      /* -------------------------------------------------
         COMPUTER
      ------------------------------------------------- */

      const computer =
        practical.computer;


      if (
        req.body.computerLabel !==
        undefined
      ) {

        computer.label =
          req.body.computerLabel.trim();

      }


      if (
        req.body.computerHeading !==
        undefined
      ) {

        computer.heading =
          req.body.computerHeading.trim();

      }


      if (
        req.body.computerDescription1 !==
        undefined
      ) {

        computer.description1 =
          req.body.computerDescription1.trim();

      }


      if (
        req.body.computerDescription2 !==
        undefined
      ) {

        computer.description2 =
          req.body.computerDescription2.trim();

      }


      if (
        req.body.computerHighlight1 !==
        undefined
      ) {

        computer.highlights[0].title =
          req.body.computerHighlight1.trim();

      }


      if (
        req.body.computerHighlight2 !==
        undefined
      ) {

        computer.highlights[1].title =
          req.body.computerHighlight2.trim();

      }


      if (
        req.body.computerHighlight3 !==
        undefined
      ) {

        computer.highlights[2].title =
          req.body.computerHighlight3.trim();

      }


      /* -------------------------------------------------
         PRACTICAL BENEFITS
      ------------------------------------------------- */

      if (
        req.body.benefitsLabel !==
        undefined
      ) {

        practical.benefitsLabel =
          req.body.benefitsLabel.trim();

      }


      if (
        req.body.benefitsHeading !==
        undefined
      ) {

        practical.benefitsHeading =
          req.body.benefitsHeading.trim();

      }


      if (
        req.body.benefitsDescription !==
        undefined
      ) {

        practical.benefitsDescription =
          req.body.benefitsDescription.trim();

      }


      if (
        req.body.benefit1Title !==
        undefined
      ) {

        practical.benefits[0].title =
          req.body.benefit1Title.trim();

      }


      if (
        req.body.benefit1Description !==
        undefined
      ) {

        practical.benefits[0].description =
          req.body.benefit1Description.trim();

      }


      if (
        req.body.benefit2Title !==
        undefined
      ) {

        practical.benefits[1].title =
          req.body.benefit2Title.trim();

      }


      if (
        req.body.benefit2Description !==
        undefined
      ) {

        practical.benefits[1].description =
          req.body.benefit2Description.trim();

      }


      if (
        req.body.benefit3Title !==
        undefined
      ) {

        practical.benefits[2].title =
          req.body.benefit3Title.trim();

      }


      if (
        req.body.benefit3Description !==
        undefined
      ) {

        practical.benefits[2].description =
          req.body.benefit3Description.trim();

      }


      if (
        req.body.benefit4Title !==
        undefined
      ) {

        practical.benefits[3].title =
          req.body.benefit4Title.trim();

      }


      if (
        req.body.benefit4Description !==
        undefined
      ) {

        practical.benefits[3].description =
          req.body.benefit4Description.trim();

      }


      /* -------------------------------------------------
         PRACTICAL IMAGES
      ------------------------------------------------- */

      const practicalImages = [

        {
          bodyName:
            "removePracticalIntroductionImage",

          fileName:
            "practicalIntroductionImage",

          field:
            "introductionImage",

          object:
            practical,
        },

        {
          bodyName:
            "removeBiologyImage",

          fileName:
            "biologyImage",

          field:
            "image",

          object:
            biology,
        },

        {
          bodyName:
            "removeChemistryImage",

          fileName:
            "chemistryImage",

          field:
            "image",

          object:
            chemistry,
        },

        {
          bodyName:
            "removePhysicsImage",

          fileName:
            "physicsImage",

          field:
            "image",

          object:
            physics,
        },

        {
          bodyName:
            "removeComputerImage",

          fileName:
            "computerImage",

          field:
            "image",

          object:
            computer,
        },

      ];


      practicalImages.forEach(
        item => {

          if (
            req.body[
              item.bodyName
            ] === "true"
          ) {

            deleteUploadedFile(
              item.object[
                item.field
              ]
            );

            item.object[
              item.field
            ] = "";

          }

        }
      );


      if (
        req.files?.practicalIntroductionImage?.[0]
      ) {

        practical.introductionImage =
          setUploadedImage(
            practical.introductionImage,
            req.files.practicalIntroductionImage[0]
          );

      }


      if (
        req.files?.biologyImage?.[0]
      ) {

        biology.image =
          setUploadedImage(
            biology.image,
            req.files.biologyImage[0]
          );

      }


      if (
        req.files?.chemistryImage?.[0]
      ) {

        chemistry.image =
          setUploadedImage(
            chemistry.image,
            req.files.chemistryImage[0]
          );

      }


      if (
        req.files?.physicsImage?.[0]
      ) {

        physics.image =
          setUploadedImage(
            physics.image,
            req.files.physicsImage[0]
          );

      }


      if (
        req.files?.computerImage?.[0]
      ) {

        computer.image =
          setUploadedImage(
            computer.image,
            req.files.computerImage[0]
          );

      }


      /* =================================================
         STUDENT ACHIEVEMENT
      ================================================= */

      const achievement =
        academics.studentAchievement;


      if (
        req.body.achievementTitle !==
        undefined
      ) {

        achievement.title =
          req.body.achievementTitle.trim();

      }


      if (
        req.body.achievementDescription !==
        undefined
      ) {

        achievement.description =
          req.body.achievementDescription.trim();

      }


      if (
        req.body.achievementHeroLabel !==
        undefined
      ) {

        achievement.heroLabel =
          req.body.achievementHeroLabel.trim();

      }


      if (
        req.body.achievementHeroHeading !==
        undefined
      ) {

        achievement.heroHeading =
          req.body.achievementHeroHeading.trim();

      }


      if (
        req.body.achievementHeroDescription !==
        undefined
      ) {

        achievement.heroDescription =
          req.body.achievementHeroDescription.trim();

      }


      if (
        req.body.achievementIntroductionLabel !==
        undefined
      ) {

        achievement.introductionLabel =
          req.body.achievementIntroductionLabel.trim();

      }


      if (
        req.body.achievementIntroductionHeading !==
        undefined
      ) {

        achievement.introductionHeading =
          req.body.achievementIntroductionHeading.trim();

      }


      if (
        req.body.achievementIntroductionDescription1 !==
        undefined
      ) {

        achievement.introductionDescription1 =
          req.body.achievementIntroductionDescription1.trim();

      }


      if (
        req.body.achievementIntroductionDescription2 !==
        undefined
      ) {

        achievement.introductionDescription2 =
          req.body.achievementIntroductionDescription2.trim();

      }


      /* -------------------------------------------------
         RESULTS
      ------------------------------------------------- */

      const results =
        achievement.results;


      if (
        req.body.resultsLabel !==
        undefined
      ) {

        results.label =
          req.body.resultsLabel.trim();

      }


      if (
        req.body.resultsHeading !==
        undefined
      ) {

        results.heading =
          req.body.resultsHeading.trim();

      }


      if (
        req.body.resultsDescription1 !==
        undefined
      ) {

        results.description1 =
          req.body.resultsDescription1.trim();

      }


      if (
        req.body.resultsDescription2 !==
        undefined
      ) {

        results.description2 =
          req.body.resultsDescription2.trim();

      }


      if (
        req.body.resultsHighlight1 !==
        undefined
      ) {

        results.highlights[0].title =
          req.body.resultsHighlight1.trim();

      }


      if (
        req.body.resultsHighlight2 !==
        undefined
      ) {

        results.highlights[1].title =
          req.body.resultsHighlight2.trim();

      }


      if (
        req.body.resultsHighlight3 !==
        undefined
      ) {

        results.highlights[2].title =
          req.body.resultsHighlight3.trim();

      }


      /* -------------------------------------------------
         SPORTS
      ------------------------------------------------- */

      const sports =
        achievement.sports;


      if (
        req.body.sportsLabel !==
        undefined
      ) {

        sports.label =
          req.body.sportsLabel.trim();

      }


      if (
        req.body.sportsHeading !==
        undefined
      ) {

        sports.heading =
          req.body.sportsHeading.trim();

      }


      if (
        req.body.sportsDescription1 !==
        undefined
      ) {

        sports.description1 =
          req.body.sportsDescription1.trim();

      }


      if (
        req.body.sportsDescription2 !==
        undefined
      ) {

        sports.description2 =
          req.body.sportsDescription2.trim();

      }


      if (
        req.body.sportsHighlight1 !==
        undefined
      ) {

        sports.highlights[0].title =
          req.body.sportsHighlight1.trim();

      }


      if (
        req.body.sportsHighlight2 !==
        undefined
      ) {

        sports.highlights[1].title =
          req.body.sportsHighlight2.trim();

      }


      if (
        req.body.sportsHighlight3 !==
        undefined
      ) {

        sports.highlights[2].title =
          req.body.sportsHighlight3.trim();

      }


      /* -------------------------------------------------
         CULTURAL
      ------------------------------------------------- */

      const cultural =
        achievement.cultural;


      if (
        req.body.culturalLabel !==
        undefined
      ) {

        cultural.label =
          req.body.culturalLabel.trim();

      }


      if (
        req.body.culturalHeading !==
        undefined
      ) {

        cultural.heading =
          req.body.culturalHeading.trim();

      }


      if (
        req.body.culturalDescription1 !==
        undefined
      ) {

        cultural.description1 =
          req.body.culturalDescription1.trim();

      }


      if (
        req.body.culturalDescription2 !==
        undefined
      ) {

        cultural.description2 =
          req.body.culturalDescription2.trim();

      }


      if (
        req.body.culturalHighlight1 !==
        undefined
      ) {

        cultural.highlights[0].title =
          req.body.culturalHighlight1.trim();

      }


      if (
        req.body.culturalHighlight2 !==
        undefined
      ) {

        cultural.highlights[1].title =
          req.body.culturalHighlight2.trim();

      }


      if (
        req.body.culturalHighlight3 !==
        undefined
      ) {

        cultural.highlights[2].title =
          req.body.culturalHighlight3.trim();

      }


      /* -------------------------------------------------
         LEADERSHIP
      ------------------------------------------------- */

      const leadership =
        achievement.leadership;


      if (
        req.body.leadershipLabel !==
        undefined
      ) {

        leadership.label =
          req.body.leadershipLabel.trim();

      }


      if (
        req.body.leadershipHeading !==
        undefined
      ) {

        leadership.heading =
          req.body.leadershipHeading.trim();

      }


      if (
        req.body.leadershipDescription1 !==
        undefined
      ) {

        leadership.description1 =
          req.body.leadershipDescription1.trim();

      }


      if (
        req.body.leadershipDescription2 !==
        undefined
      ) {

        leadership.description2 =
          req.body.leadershipDescription2.trim();

      }


      if (
        req.body.leadershipHighlight1 !==
        undefined
      ) {

        leadership.highlights[0].title =
          req.body.leadershipHighlight1.trim();

      }


      if (
        req.body.leadershipHighlight2 !==
        undefined
      ) {

        leadership.highlights[1].title =
          req.body.leadershipHighlight2.trim();

      }


      if (
        req.body.leadershipHighlight3 !==
        undefined
      ) {

        leadership.highlights[2].title =
          req.body.leadershipHighlight3.trim();

      }


      /* -------------------------------------------------
         ACHIEVEMENT COURSES
      ------------------------------------------------- */

      if (
        req.body.coursesLabel !==
        undefined
      ) {

        achievement.coursesLabel =
          req.body.coursesLabel.trim();

      }


      if (
        req.body.coursesHeading !==
        undefined
      ) {

        achievement.coursesHeading =
          req.body.coursesHeading.trim();

      }


      if (
        req.body.coursesDescription !==
        undefined
      ) {

        achievement.coursesDescription =
          req.body.coursesDescription.trim();

      }


      const parseSubjects =
        value =>
          value
            .split("\n")
            .map(
              item =>
                item.trim()
            )
            .filter(Boolean);


      if (
        req.body.scienceTitle !==
        undefined
      ) {

        achievement.courses[0].title =
          req.body.scienceTitle.trim();

      }


      if (
        req.body.scienceDescription !==
        undefined
      ) {

        achievement.courses[0].description =
          req.body.scienceDescription.trim();

      }


      if (
        req.body.scienceSubjects !==
        undefined
      ) {

        achievement.courses[0].subjects =
          parseSubjects(
            req.body.scienceSubjects
          );

      }


      if (
        req.body.humanitiesTitle !==
        undefined
      ) {

        achievement.courses[1].title =
          req.body.humanitiesTitle.trim();

      }


      if (
        req.body.humanitiesDescription !==
        undefined
      ) {

        achievement.courses[1].description =
          req.body.humanitiesDescription.trim();

      }


      if (
        req.body.humanitiesSubjects !==
        undefined
      ) {

        achievement.courses[1].subjects =
          parseSubjects(
            req.body.humanitiesSubjects
          );

      }


      if (
        req.body.businessTitle !==
        undefined
      ) {

        achievement.courses[2].title =
          req.body.businessTitle.trim();

      }


      if (
        req.body.businessDescription !==
        undefined
      ) {

        achievement.courses[2].description =
          req.body.businessDescription.trim();

      }


      if (
        req.body.businessSubjects !==
        undefined
      ) {

        achievement.courses[2].subjects =
          parseSubjects(
            req.body.businessSubjects
          );

      }


      /* -------------------------------------------------
         DEVELOPMENT
      ------------------------------------------------- */

      if (
        req.body.developmentLabel !==
        undefined
      ) {

        achievement.developmentLabel =
          req.body.developmentLabel.trim();

      }


      if (
        req.body.developmentHeading !==
        undefined
      ) {

        achievement.developmentHeading =
          req.body.developmentHeading.trim();

      }


      if (
        req.body.development1Title !==
        undefined
      ) {

        achievement.developmentItems[0].title =
          req.body.development1Title.trim();

      }


      if (
        req.body.development1Description !==
        undefined
      ) {

        achievement.developmentItems[0].description =
          req.body.development1Description.trim();

      }


      if (
        req.body.development2Title !==
        undefined
      ) {

        achievement.developmentItems[1].title =
          req.body.development2Title.trim();

      }


      if (
        req.body.development2Description !==
        undefined
      ) {

        achievement.developmentItems[1].description =
          req.body.development2Description.trim();

      }


      if (
        req.body.development3Title !==
        undefined
      ) {

        achievement.developmentItems[2].title =
          req.body.development3Title.trim();

      }


      if (
        req.body.development3Description !==
        undefined
      ) {

        achievement.developmentItems[2].description =
          req.body.development3Description.trim();

      }


      if (
        req.body.development4Title !==
        undefined
      ) {

        achievement.developmentItems[3].title =
          req.body.development4Title.trim();

      }


      if (
        req.body.development4Description !==
        undefined
      ) {

        achievement.developmentItems[3].description =
          req.body.development4Description.trim();

      }


      /* -------------------------------------------------
         ACHIEVEMENT IMAGES
      ------------------------------------------------- */

      const achievementImages = [

        {
          remove:
            "removeAchievementIntroductionImage",

          file:
            "achievementIntroductionImage",

          field:
            "introductionImage",

          object:
            achievement,
        },

        {
          remove:
            "removeResultsImage",

          file:
            "resultsImage",

          field:
            "image",

          object:
            results,
        },

        {
          remove:
            "removeSportsImage",

          file:
            "sportsImage",

          field:
            "image",

          object:
            sports,
        },

        {
          remove:
            "removeCulturalImage",

          file:
            "culturalImage",

          field:
            "image",

          object:
            cultural,
        },

        {
          remove:
            "removeLeadershipImage",

          file:
            "leadershipImage",

          field:
            "image",

          object:
            leadership,
        },

      ];


      achievementImages.forEach(
        item => {

          if (
            req.body[
              item.remove
            ] === "true"
          ) {

            deleteUploadedFile(
              item.object[
                item.field
              ]
            );

            item.object[
              item.field
            ] = "";

          }

        }
      );


      if (
        req.files?.achievementIntroductionImage?.[0]
      ) {

        achievement.introductionImage =
          setUploadedImage(
            achievement.introductionImage,
            req.files.achievementIntroductionImage[0]
          );

      }


      if (
        req.files?.resultsImage?.[0]
      ) {

        results.image =
          setUploadedImage(
            results.image,
            req.files.resultsImage[0]
          );

      }


      if (
        req.files?.sportsImage?.[0]
      ) {

        sports.image =
          setUploadedImage(
            sports.image,
            req.files.sportsImage[0]
          );

      }


      if (
        req.files?.culturalImage?.[0]
      ) {

        cultural.image =
          setUploadedImage(
            cultural.image,
            req.files.culturalImage[0]
          );

      }


      if (
        req.files?.leadershipImage?.[0]
      ) {

        leadership.image =
          setUploadedImage(
            leadership.image,
            req.files.leadershipImage[0]
          );

      }


      /* =================================================
         MAIN SECTION IMAGE
      ================================================= */

      if (
        req.body.removeSectionImage ===
        "true"
      ) {

        deleteUploadedFile(
          academics.sectionImage
        );

        academics.sectionImage =
          "";

      }


      if (
        req.files?.sectionImage?.[0]
      ) {

        academics.sectionImage =
          setUploadedImage(
            academics.sectionImage,
            req.files.sectionImage[0]
          );

      }


      /* =================================================
         SAVE
      ================================================= */

      const savedAcademics =
        await academics.save();


      res.status(200).json(
        savedAcademics
      );

    } catch (error) {

      console.error(
        "Academics update error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update academics information",

        error:
          error.message,

      });

    }

  }
);


/* =========================================================
   EXPORT
========================================================= */

module.exports =
  router;