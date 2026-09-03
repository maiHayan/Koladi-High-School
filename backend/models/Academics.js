/* =========================================================
   KOLADI HIGH SCHOOL
   COMPLETE ACADEMICS MODEL
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   FEATURE / HIGHLIGHT
========================================================= */

const featureSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    number: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: true,
  }
);


/* =========================================================
   SUBJECT / COURSE
========================================================= */

const courseSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    subjects: {
      type: [String],
      default: [],
    },
  },
  {
    _id: true,
  }
);


/* =========================================================
   LAB / CONTENT SECTION
========================================================= */

const contentSectionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "",
      trim: true,
    },

    heading: {
      type: String,
      default: "",
      trim: true,
    },

    description1: {
      type: String,
      default: "",
      trim: true,
    },

    description2: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    highlights: {
      type: [featureSchema],
      default: [],
    },

    points: {
      type: [String],
      default: [],
    },
  },
  {
    _id: true,
  }
);


/* =========================================================
   QUALITY EDUCATION
========================================================= */

const qualityEducationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      heroLabel: {
        type: String,
        default: "",
        trim: true,
      },

      heroHeading: {
        type: String,
        default: "",
        trim: true,
      },

      heroDescription: {
        type: String,
        default: "",
        trim: true,
      },

      introductionLabel: {
        type: String,
        default: "",
        trim: true,
      },

      introductionHeading: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription1: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription2: {
        type: String,
        default: "",
        trim: true,
      },

      introductionImage: {
        type: String,
        default: "",
        trim: true,
      },

      digitalLabel: {
        type: String,
        default: "",
        trim: true,
      },

      digitalHeading: {
        type: String,
        default: "",
        trim: true,
      },

      digitalDescription1: {
        type: String,
        default: "",
        trim: true,
      },

      digitalDescription2: {
        type: String,
        default: "",
        trim: true,
      },

      digitalImage: {
        type: String,
        default: "",
        trim: true,
      },

      featuresLabel: {
        type: String,
        default: "",
        trim: true,
      },

      featuresHeading: {
        type: String,
        default: "",
        trim: true,
      },

      featuresDescription: {
        type: String,
        default: "",
        trim: true,
      },

      features: {
        type: [featureSchema],
        default: [],
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   PRACTICAL LEARNING
========================================================= */

const practicalLearningSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      heroLabel: {
        type: String,
        default: "",
        trim: true,
      },

      heroHeading: {
        type: String,
        default: "",
        trim: true,
      },

      heroDescription: {
        type: String,
        default: "",
        trim: true,
      },

      introductionLabel: {
        type: String,
        default: "",
        trim: true,
      },

      introductionHeading: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription1: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription2: {
        type: String,
        default: "",
        trim: true,
      },

      introductionPoints: {
        type: [String],
        default: [],
      },

      introductionImage: {
        type: String,
        default: "",
        trim: true,
      },

      biology: {
        type: contentSectionSchema,
        default: {},
      },

      chemistry: {
        type: contentSectionSchema,
        default: {},
      },

      physics: {
        type: contentSectionSchema,
        default: {},
      },

      computer: {
        type: contentSectionSchema,
        default: {},
      },

      benefitsLabel: {
        type: String,
        default: "",
        trim: true,
      },

      benefitsHeading: {
        type: String,
        default: "",
        trim: true,
      },

      benefitsDescription: {
        type: String,
        default: "",
        trim: true,
      },

      benefits: {
        type: [featureSchema],
        default: [],
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   STUDENT ACHIEVEMENT
========================================================= */

const studentAchievementSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      heroLabel: {
        type: String,
        default: "",
        trim: true,
      },

      heroHeading: {
        type: String,
        default: "",
        trim: true,
      },

      heroDescription: {
        type: String,
        default: "",
        trim: true,
      },

      introductionLabel: {
        type: String,
        default: "",
        trim: true,
      },

      introductionHeading: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription1: {
        type: String,
        default: "",
        trim: true,
      },

      introductionDescription2: {
        type: String,
        default: "",
        trim: true,
      },

      introductionPoints: {
        type: [String],
        default: [],
      },

      introductionImage: {
        type: String,
        default: "",
        trim: true,
      },

      results: {
        type: contentSectionSchema,
        default: {},
      },

      sports: {
        type: contentSectionSchema,
        default: {},
      },

      cultural: {
        type: contentSectionSchema,
        default: {},
      },

      leadership: {
        type: contentSectionSchema,
        default: {},
      },

      coursesLabel: {
        type: String,
        default: "",
        trim: true,
      },

      coursesHeading: {
        type: String,
        default: "",
        trim: true,
      },

      coursesDescription: {
        type: String,
        default: "",
        trim: true,
      },

      courses: {
        type: [courseSchema],
        default: [],
      },

      developmentLabel: {
        type: String,
        default: "",
        trim: true,
      },

      developmentHeading: {
        type: String,
        default: "",
        trim: true,
      },

      developmentItems: {
        type: [featureSchema],
        default: [],
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   MAIN ACADEMICS SCHEMA
========================================================= */

const academicsSchema =
  new mongoose.Schema(
    {
      sectionLabel: {
        type: String,
        default:
          "OUR ACADEMIC STRENGTH",
        trim: true,
      },

      sectionHeading: {
        type: String,
        default:
          "Excellence in Education",
        trim: true,
      },

      sectionDescription: {
        type: String,
        default: "",
        trim: true,
      },

      sectionImage: {
        type: String,
        default: "",
        trim: true,
      },

      qualityEducation: {
        type:
          qualityEducationSchema,

        default: {},
      },

      practicalLearning: {
        type:
          practicalLearningSchema,

        default: {},
      },

      studentAchievement: {
        type:
          studentAchievementSchema,

        default: {},
      },
    },

    {
      timestamps: true,
    }
  );


/* =========================================================
   MODEL
========================================================= */

const Academics =
  mongoose.model(
    "Academics",
    academicsSchema
  );


module.exports =
  Academics;