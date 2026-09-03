/* =========================================================
   KOLADI HIGH SCHOOL
   CREATE / UPDATE COMPLETE ACADEMICS DATA
========================================================= */

const mongoose = require("mongoose");

require("dotenv").config();

const Academics =
  require("./models/Academics");


/* =========================================================
   COMPLETE ACADEMICS DATA
========================================================= */

const academicsData = {

  /* =======================================================
     MAIN ACADEMICS SECTION
  ======================================================= */

  sectionLabel:
    "OUR ACADEMIC STRENGTH",

  sectionHeading:
    "Excellence in Education",

  sectionDescription:
    "We focus on building strong academic foundations, practical skills and confidence while encouraging students to grow and achieve their potential.",

  sectionImage:
    "",


  /* =======================================================
     QUALITY EDUCATION
  ======================================================= */

  qualityEducation: {

    title:
      "Quality Education",

    description:
      "Modern classrooms supported by digital learning resources create an engaging environment where students can learn more effectively.",


    /* -------------------------------------------------------
       HERO
    ------------------------------------------------------- */

    heroLabel:
      "QUALITY EDUCATION",

    heroHeading:
      "Modern Learning for a Better Educational Experience",

    heroDescription:
      "Creating a supportive learning environment through modern classrooms, digital resources and student-focused teaching.",


    /* -------------------------------------------------------
       INTRODUCTION
    ------------------------------------------------------- */

    introductionLabel:
      "MODERN CLASSROOMS",

    introductionHeading:
      "Learning in a Modern Environment",

    introductionDescription1:
      "Koladi High School aims to provide students with a learning environment that supports effective teaching, active participation and continuous academic development.",

    introductionDescription2:
      "Digital classroom resources can help teachers present lessons in a more engaging way while giving students opportunities to understand concepts through visual and interactive learning.",

    introductionImage:
      "/academics/Digital Classroom.jpg",


    /* -------------------------------------------------------
       DIGITAL LEARNING
    ------------------------------------------------------- */

    digitalLabel:
      "DIGITAL LEARNING",

    digitalHeading:
      "Technology-Supported Education",

    digitalDescription1:
      "Digital learning resources can make classroom lessons more visual, engaging and easier to understand. They also support teachers in presenting educational content in an organized and effective way.",

    digitalDescription2:
      "A technology-supported classroom creates additional opportunities for students to participate actively and develop confidence in their learning.",

    digitalImage:
      "/academics/Digital Classroom1.jpg",


    /* -------------------------------------------------------
       FEATURES
    ------------------------------------------------------- */

    featuresLabel:
      "LEARNING ENVIRONMENT",

    featuresHeading:
      "What Makes Our Learning Environment Special",

    featuresDescription:
      "Our approach focuses on creating a positive, engaging and supportive environment for students.",

    features: [

      {
        icon:
          "💻",

        title:
          "Digital Learning",

        description:
          "Technology-supported lessons help make classroom learning more engaging and visual.",

        number:
          "",
      },


      {
        icon:
          "🏫",

        title:
          "Modern Classrooms",

        description:
          "A structured classroom environment supports focused learning and active participation.",

        number:
          "",
      },


      {
        icon:
          "👨‍🏫",

        title:
          "Student-Focused Teaching",

        description:
          "Students are encouraged to participate, understand concepts and develop confidence.",

        number:
          "",
      },

    ],

  },


  /* =======================================================
     PRACTICAL LEARNING
  ======================================================= */

  practicalLearning: {

    title:
      "Practical Learning",

    description:
      "Students connect classroom knowledge with experiments, hands-on activities and technology-based learning through dedicated laboratory facilities.",


    /* -------------------------------------------------------
       HERO
    ------------------------------------------------------- */

    heroLabel:
      "PRACTICAL LEARNING",

    heroHeading:
      "Learning Through Experience, Experimentation & Discovery",

    heroDescription:
      "Practical learning helps students connect classroom concepts with observation, experiments, technology and hands-on activities.",


    /* -------------------------------------------------------
       INTRODUCTION
    ------------------------------------------------------- */

    introductionLabel:
      "LEARNING BY DOING",

    introductionHeading:
      "Connecting Knowledge with Practical Experience",

    introductionDescription1:
      "Practical learning gives students the opportunity to understand academic concepts through direct observation, experimentation and hands-on activities.",

    introductionDescription2:
      "Laboratory-based education encourages curiosity, scientific thinking, problem-solving and confidence while helping students connect classroom knowledge with practical experience.",

    introductionPoints: [

      "✓ Hands-on activities",

      "✓ Scientific observation",

      "✓ Experiment-based learning",

      "✓ Technology-supported practice",

    ],

    introductionImage:
      "/academics/Learning.png",


    /* -------------------------------------------------------
       BIOLOGY
    ------------------------------------------------------- */

    biology: {

      label:
        "BIOLOGY LABORATORY",

      heading:
        "Exploring Life Through Observation",

      description1:
        "The Biology Lab provides students with an environment for exploring biological concepts through observation and practical activities.",

      description2:
        "Laboratory-based learning encourages curiosity, careful observation and scientific thinking.",

      image:
        "/academics/Biology Lab.png",

      highlights: [

        {
          number:
            "01",

          title:
            "Observation",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Investigation",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Scientific Thinking",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       CHEMISTRY
    ------------------------------------------------------- */

    chemistry: {

      label:
        "CHEMISTRY LABORATORY",

      heading:
        "Understanding Chemistry Through Experimentation",

      description1:
        "The Chemistry Lab helps students connect theoretical concepts with practical scientific activities and observation.",

      description2:
        "Practical work supports understanding of chemical concepts, reactions and scientific procedures.",

      image:
        "/academics/Chemistry Lab.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Experimentation",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Analysis",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Scientific Practice",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       PHYSICS
    ------------------------------------------------------- */

    physics: {

      label:
        "PHYSICS LABORATORY",

      heading:
        "Discovering the Principles of Physics",

      description1:
        "The Physics Lab supports learning through experiments, observation, measurement and practical activities.",

      description2:
        "Students can connect physical laws and theories with real-world phenomena through practical investigation.",

      image:
        "/academics/Physics Lab.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Measurement",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Observation",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Application",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       COMPUTER
    ------------------------------------------------------- */

    computer: {

      label:
        "COMPUTER LABORATORY",

      heading:
        "Developing Digital Skills for the Future",

      description1:
        "The Computer Lab supports students in developing digital literacy and practical computing skills.",

      description2:
        "Hands-on computer learning helps students build confidence with digital tools, technology and problem-solving.",

      image:
        "/academics/Computer Lab.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Digital Literacy",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Technology Skills",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Problem Solving",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       BENEFITS
    ------------------------------------------------------- */

    benefitsLabel:
      "WHY PRACTICAL LEARNING MATTERS",

    benefitsHeading:
      "More Than Learning From a Textbook",

    benefitsDescription:
      "Practical experiences help students understand, apply and remember what they learn while developing valuable academic skills.",

    benefits: [

      {
        icon:
          "🔎",

        title:
          "Observation",

        description:
          "Students learn to observe carefully and understand concepts through direct experience.",

        number:
          "",
      },


      {
        icon:
          "🧠",

        title:
          "Critical Thinking",

        description:
          "Practical activities encourage analysis, questioning and logical problem-solving.",

        number:
          "",
      },


      {
        icon:
          "🛠️",

        title:
          "Practical Skills",

        description:
          "Students gain experience with equipment, procedures, technology and practical work.",

        number:
          "",
      },


      {
        icon:
          "💡",

        title:
          "Curiosity",

        description:
          "Hands-on learning encourages curiosity, creativity and a deeper interest in learning.",

        number:
          "",
      },

    ],

  },


  /* =======================================================
     STUDENT ACHIEVEMENT
  ======================================================= */

  studentAchievement: {

    title:
      "Student Achievement",

    description:
      "Students are encouraged to achieve excellence in academics while developing their talents through sports, cultural activities and leadership opportunities.",


    /* -------------------------------------------------------
       HERO
    ------------------------------------------------------- */

    heroLabel:
      "STUDENT ACHIEVEMENT",

    heroHeading:
      "Encouraging Excellence, Talent & Leadership",

    heroDescription:
      "We encourage students to grow through academic achievement, sports, cultural participation and leadership opportunities.",


    /* -------------------------------------------------------
       INTRODUCTION
    ------------------------------------------------------- */

    introductionLabel:
      "BEYOND THE CLASSROOM",

    introductionHeading:
      "Helping Students Discover Their Potential",

    introductionDescription1:
      "Student development extends beyond academic results. We encourage students to participate in activities that build confidence, teamwork, creativity, discipline and leadership.",

    introductionDescription2:
      "Through academic performance, sports, cultural programmes and leadership opportunities, students can develop skills and experiences that support their personal and educational growth.",

    introductionPoints: [

      "✓ Academic development",

      "✓ Sports participation",

      "✓ Cultural activities",

      "✓ Leadership development",

    ],

    introductionImage:
      "/academics/Helping.png",


    /* -------------------------------------------------------
       RESULTS
    ------------------------------------------------------- */

    results: {

      label:
        "ACADEMIC RESULTS",

      heading:
        "Supporting Academic Excellence",

      description1:
        "Academic achievement reflects the dedication of students, teachers and families toward learning and continuous improvement.",

      description2:
        "We encourage students to develop strong study habits, maintain discipline and work consistently toward their academic goals.",

      image:
        "/academics/Results.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Academic Performance",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Continuous Improvement",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Learning Discipline",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       SPORTS
    ------------------------------------------------------- */

    sports: {

      label:
        "SPORTS",

      heading:
        "Building Teamwork Through Sports",

      description1:
        "Sports participation helps students develop teamwork, discipline, confidence and a positive attitude toward healthy competition.",

      description2:
        "Participation in sports also gives students opportunities to build friendships, take responsibility and develop resilience.",

      image:
        "/academics/Sports.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Teamwork",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Discipline",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Confidence",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       CULTURAL
    ------------------------------------------------------- */

    cultural: {

      label:
        "CULTURAL ACTIVITIES",

      heading:
        "Creativity, Culture & Expression",

      description1:
        "Cultural programmes provide students with opportunities to express creativity, celebrate culture and develop confidence in front of others.",

      description2:
        "Participation in cultural activities can also strengthen communication, teamwork and a sense of community.",

      image:
        "/academics/Cultural.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Creativity",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Expression",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Participation",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       LEADERSHIP
    ------------------------------------------------------- */

    leadership: {

      label:
        "LEADERSHIP",

      heading:
        "Preparing Students to Lead",

      description1:
        "Leadership opportunities help students develop responsibility, communication, confidence and decision-making skills.",

      description2:
        "We encourage students to take initiative, cooperate with others and contribute positively to their school community.",

      image:
        "/academics/Leadership.jpg",

      highlights: [

        {
          number:
            "01",

          title:
            "Responsibility",

          description:
            "",
        },


        {
          number:
            "02",

          title:
            "Communication",

          description:
            "",
        },


        {
          number:
            "03",

          title:
            "Initiative",

          description:
            "",
        },

      ],

      points: [],

    },


    /* -------------------------------------------------------
       ACADEMIC COURSES
    ------------------------------------------------------- */

    coursesLabel:
      "ACADEMIC STREAMS",

    coursesHeading:
      "Courses & Subjects",

    coursesDescription:
      "Students can explore different academic pathways according to their interests and educational goals.",

    courses: [

      {
        icon:
          "🔬",

        title:
          "Science",

        description:
          "A science-focused pathway that develops analytical thinking, scientific understanding and problem-solving skills.",

        subjects: [

          "Physics",

          "Chemistry",

          "Biology",

          "Higher Mathematics",

          "General Mathematics",

          "Information & Communication Technology",

        ],

      },


      {
        icon:
          "📖",

        title:
          "Humanities",

        description:
          "A humanities pathway that develops understanding of society, history, culture, language and human relationships.",

        subjects: [

          "Bangla",

          "English",

          "History",

          "Civics & Citizenship",

          "Geography",

          "Social Studies",

        ],

      },


      {
        icon:
          "💼",

        title:
          "Business Studies",

        description:
          "A business-oriented pathway introducing students to accounting, finance, entrepreneurship and business-related concepts.",

        subjects: [

          "Accounting",

          "Finance & Banking",

          "Business Entrepreneurship",

          "Business Organization",

          "General Mathematics",

          "Information & Communication Technology",

        ],

      },

    ],


    /* -------------------------------------------------------
       STUDENT DEVELOPMENT
    ------------------------------------------------------- */

    developmentLabel:
      "STUDENT DEVELOPMENT",

    developmentHeading:
      "Education Beyond a Single Subject",

    developmentItems: [

      {
        title:
          "Knowledge",

        description:
          "Building strong academic foundations",

        icon:
          "",

        number:
          "",
      },


      {
        title:
          "Confidence",

        description:
          "Encouraging students to express themselves",

        icon:
          "",

        number:
          "",
      },


      {
        title:
          "Discipline",

        description:
          "Developing consistent learning habits",

        icon:
          "",

        number:
          "",
      },


      {
        title:
          "Leadership",

        description:
          "Preparing responsible and capable students",

        icon:
          "",

        number:
          "",
      },

    ],

  },

};


/* =========================================================
   CREATE / UPDATE
========================================================= */

const createAcademics =
  async () => {

    try {

      await mongoose.connect(
        process.env.MONGO_URI
      );


      console.log(
        "MongoDB connected"
      );


      const existing =
        await Academics.findOne();


      if (existing) {

        await Academics.findByIdAndUpdate(
          existing._id,
          academicsData,
          {
            new: true,
            runValidators: true,
            overwrite: true,
          }
        );


        console.log(
          "Existing Academics information replaced with complete data."
        );

      } else {

        await Academics.create(
          academicsData
        );


        console.log(
          "Complete Academics information created successfully."
        );

      }


      await mongoose.disconnect();


    } catch (error) {

      console.error(
        "Failed to create Academics information:",
        error.message
      );

      process.exit(1);

    }

  };


/* =========================================================
   RUN
========================================================= */

createAcademics();