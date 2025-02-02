// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Asad Ali",
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "Asad Ali",
    type: "website",
    url: "http://asadali.tech/",
  },
};

//Home Page
const greeting = {
  title: "Asad Ali",
  logo_name: "AsadAli",
  nickname: "Data Scientist | SE",
  subTitle:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  resumeLink:
    "https://drive.google.com/drive/folders/1x3t0hOayDJxR9qdBI2YbpxIo0AyylIhU?usp=sharing",
  portfolio_repository: "https://github.com/asadali27232/asadali27232",
  githubProfile: "https://github.com/asadali27232",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/asadali27232",
  // linkedin: "https://www.linkedin.com/in/ashutosh-hathidara-88710b138/",
  // gmail: "asadali27232@gmail.com",
  // gitlab: "https://gitlab.com/ashutoshhathidara98",
  // facebook: "https://www.facebook.com/laymanbrother.19/",
  // twitter: "https://twitter.com/ashutosh_1919",
  // instagram: "https://www.instagram.com/layman_brother/"

  {
    name: "Github",
    link: "https://github.com/asadali27232",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/asadali27232/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "Gmail",
    link: "mailto:asadali27232@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "Twitter",
    link: "https://wa.me/923074315952/",
    fontAwesomeIcon: "fa-whatsapp", // Reference https://fontawesome.com/icons/twitter?style=brands
    backgroundColor: "#26d367", // Reference https://simpleicons.org/?q=twitter
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/asadali27232/",
    fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
    backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/asadali27232/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "Data Science & Data Engineering",
      fileName: "DataScienceImg",
      skills: [
        "Experience of working with Data Warehousing and Data Analysis projects",
        "Developing highly scalable production ready models for various deeplearning and statistical use cases",
        "Complex quantitative modelling for dynamic forecasting and time series analysis",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "Apache Spark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: {
            color: "#e35a16",
          },
        },
        {
          skillName: "Apache Airflow",
          fontAwesomeClassname: "simple-icons:apacheairflow",
          style: {
            color: "#00af43",
          },
        },
        {
          skillName: "Apache Kafka",
          fontAwesomeClassname: "simple-icons:apachekafka",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "Snowflake",
          fontAwesomeClassname: "simple-icons:snowflake",
          style: {
            color: "#29b5e8",
          },
        },
        {
          skillName: "Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: {
            color: "#ff3721",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Keras",
          fontAwesomeClassname: "simple-icons:keras",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
        {
          skillName: "scikit-learn",
          fontAwesomeClassname: "simple-icons:scikitlearn",
          style: {
            backgroundColor: "transparent",
            color: "#f89a36",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#202c3c",
          },
        },
        {
          skillName: "Power BI",
          fontAwesomeClassname: "simple-icons:powerbi",
          style: {
            color: "#e4a810",
          },
        },
      ],
    },
    {
      title: "Software Engineer",
      fileName: "FullStackImg",
      skills: [
        "Building resposive website front end using React-Redux",
        "Developing backend applications using Django, focusing on database management and API development.",
        "Creating application backend in Node, Express & Flask",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "fa-brands:node-js",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "ExpressJS",
          fontAwesomeClassname: "simple-icons:express",
          style: {
            color: "#212121",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "Django",
          fontAwesomeClassname: "simple-icons:django",
          style: {
            color: "#092E20",
          },
        },
        {
          skillName: "Flask",
          fontAwesomeClassname: "simple-icons:flask",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "simple-icons:mysql",
          style: {
            color: "#e48c04",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "Coursera",
      iconifyClassname: "simple-icons:coursera",
      style: {
        color: "#0056d2",
      },
      profileLink: "https://www.coursera.org/learner/asadali27232",
    },
    {
      siteName: "Datacamp",
      iconifyClassname: "simple-icons:datacamp",
      style: {
        color: "#03ed61",
      },
      profileLink: "https://www.datacamp.com/portfolio/asadali27232",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/asadali27232",
    },

    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/asadali27232",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/asadali27232",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "COMSATS University Islamabad, Lahore Campus",
      subtitle: "BS in Computer Science",
      logo_path: "comsats_logo.png",
      alt_name: "COMSATS",
      duration: "Feb 2021 - Jan 2025",
      descriptions: [
        "I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI, ML etc.",
        "Apart from this, I have done courses on Data Science, Deep Learning, Cloud Computing and Web Technologies.",
        "Gained hands-on experience with Python, SQL, data modelling, and relational databases, including Data Warehousing and Data Mining.",
      ],
      website_link: "https://lahore.comsats.edu.pk/default.aspx",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Crash Course on Python",
      subtitle: "Google · Course",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/9CTDEATG9N9Y",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "Introduction to Data Analytics",
      subtitle: "IBM · Course",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/N2Z8A4XXKFD3",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Data Visualization and Dashboards with Excel and Cognos",
      subtitle: "IBM · Course",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/QNRATRNUHUC8",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Introduction to Back-End Development",
      subtitle: "Meta · Course",
      logo_path: "meta_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/8BQOH65EH678",
      alt_name: "Meta",
      color_code: "#2A73CC",
    },
    {
      title: "Programming with JavaScript",
      subtitle: "Meta · Course",
      logo_path: "meta_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/2ICTIIVSV67N",
      alt_name: "Meta",
      color_code: "#2A73CC",
    },
    {
      title: "Introduction to Front-End Development",
      subtitle: "Meta · Course",
      logo_path: "meta_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/1Z7FHE84EXZO",
      alt_name: "Meta",
      color_code: "#2A73CC",
    },
    {
      title: "HTML and CSS in depth",
      subtitle: "Meta · Course",
      logo_path: "meta_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/47GF7OEV3TUI",
      alt_name: "Meta",
      color_code: "#2A73CC",
    },
    {
      title: "Version Control",
      subtitle: "Meta · Course",
      logo_path: "meta_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/H8HGFKA0K6VK",
      alt_name: "Meta",
      color_code: "#2A73CC",
    },
    {
      title: "Introduction to Git and GitHub",
      subtitle: "Google · Course",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/MLT5WJDJAZEU",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I have worked with both emerging startups and established companies, contributing as a Data Engineer, Software Engineer, and Full-Stack Developer. My expertise spans data science, machine learning, deep learning, web development, and data architecture. ",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "Data Engineer",
          company: "Intime Study Advisors",
          company_url: "https://www.intimestudyadvisors.com/",
          logo_path: "intime_logo.png",
          duration: "Aug 2024 - Jan 2025 · 6 mos",
          location: "Lahore, Pakistan",
          description:
            "Automated web scraping scripts, streamlining raw data integrations from multiple sources, and increasing data extraction efficiency from 1 website per week to 5 websites per day, resulting in a 100% improvement in processing speed.Designed and implemented an ETL pipeline using Python, transforming, cleaning, and storing data across multiple databases, thereby enhancing data processing efficiency and ensuring consistent, high-quality data for analytics and reporting.",
          color: "#d48344",
        },
        {
          title: "Web Developer",
          company: "PITB Incubation Wing",
          company_url: "https://www.linkedin.com/company/pitbincubation/about/",
          logo_path: "pitb_logo.png",
          duration: "Jul 2024 - Jan 2025 · 7 mos",
          location: "Lahore, Pakistan",
          description:
            "Developed a WordPress website from scratch without using any theme, enhancing their online presence with tailored CSS and JavaScript for showcasing their services. Built and deployed a cost-saving Laboratory Information Management System with features like test booking, report generation, and QR code tracking using HTML, CSS and JavaScript. This system reduced operational costs by 30% and increased efficiency by 40%.",
          color: "#009d17",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create Data Science projects and deploy them to web applications using cloud infrastructure.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description:
    "I have worked on and published a few research papers and publications of my own.",
  avatar_image_path: "projects_image.svg",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "pp.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with Data Science, ML, Django, Flask, ReactJs, NodeJs and DBMS.",
  },
  blogSection: {
    title: "GitHub",
    subtitle:
      "I believe in the power of code to create meaningful impact, shaping not just technology but individuals themselves. My mission is to encourage every new developer to start using Git from day one.",
    link: "https://github.com/asadali27232",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle:
      "Pak-Arab Housing Scheme, Ferozpur Road, Lahore, Pakistan - 54000",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/Yb5TmXnCUHJXKpgt7",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "+92 307 4315952",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  contactPageData,
};
