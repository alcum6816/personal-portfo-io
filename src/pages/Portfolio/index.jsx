
import { useState, useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion"

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs and animation controls for each section
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)

  const heroControls = useAnimation()
  const aboutControls = useAnimation()
  const projectsControls = useAnimation()
  const skillsControls = useAnimation()
  const contactControls = useAnimation()
  const footerControls = useAnimation()

  const isHeroInView = useInView(heroRef, { margin: "-100px" })
  const isAboutInView = useInView(aboutRef, { margin: "-100px" })
  const isProjectsInView = useInView(projectsRef, { margin: "-100px" })
  const isSkillsInView = useInView(skillsRef, { margin: "-100px" })
  const isContactInView = useInView(contactRef, { margin: "-100px" })
  const isFooterInView = useInView(footerRef, { margin: "-100px" })

  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Trigger profile picture animation first, then other content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      heroControls.start("visible")
    }, 1200) // Delay for bounce animation
    return () => clearTimeout(timer)
  }, [heroControls])

  // Trigger section animations when in view
  useEffect(() => {
    if (isAboutInView) aboutControls.start("visible")
    if (isProjectsInView) projectsControls.start("visible")
    if (isSkillsInView) skillsControls.start("visible")
    if (isContactInView) contactControls.start("visible")
    if (isFooterInView) footerControls.start("visible")
  }, [isAboutInView, isProjectsInView, isSkillsInView, isContactInView, isFooterInView, aboutControls, projectsControls, skillsControls, contactControls, footerControls])

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      emailjs.init("HjVwWPhv4B_4c5RAp")
      await emailjs.send(
        "service_92kq0p9",
        "template_p5zo9w4",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Afnan Junjwadkar",
        },
      )
      alert("Thank you for your message! I will get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Failed to send email:", error)
      alert("Sorry, there was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMenuOpen(false)
    }
  }

  const handleDownloadResume = () => {
    window.open("https://drive.google.com/file/d/1N5OBM7DXegUC37nMVoe9G9kOGKKBLvcS/view?usp=sharing", "_blank")
  }

  const handleGitHubClick = () => {
    window.open("https://github.com/alcum6816", "_blank")
  }

  const handleLinkedInClick = () => {
    window.open("https://in.linkedin.com/in/afnan-junjwadkar-344ba01a0", "_blank")
  }

  const projects = [
    {
      id: 1,
      title: "CampusSync",
      description: "Government-sponsored student platform for seamless campus management and communication.",
      image: "/images/img_campussync.png",
      technologies: ["React.js", "Next.js", "Firebase", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Vehicle E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI and robust backend architecture.",
      image: "/images/img_vehicle_ecommerce_platform.png",
      technologies: ["React.js", "Node.js", "MongoDB", "Express"],
    },
    {
      id: 3,
      title: "TechTune Motors",
      description: "Vehicle management system with comprehensive dashboard and analytics.",
      image: "/images/img_ridewise.png",
      technologies: ["React.js", "Firebase", "Chart.js", "Material-UI"],
    },
    {
      id: 4,
      title: "Classroom Automation System",
      description: "IoT-based classroom automation with Android app integration.",
      image: "/images/img_classroom_automation_system.png",
      technologies: ["Android", "Arduino", "Firebase", "IoT"],
    },
    {
      id: 5,
      title: "IoT Switch",
      description: "Custom-built automation controller for smart home applications.",
      image: "/images/img_iot_switch.png",
      technologies: ["Arduino", "ESP32", "React.js", "MQTT"],
    },
  ]

  const skills = [
    {
      category: "Languages",
      icon: "/images/img__43x30.png",
      items: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      icon: "/images/svg.svg",
      items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Framer Motion", "Express.js"],
    },
    {
      category: "Mobile Development",
      icon: "/images/img__32x24.png",
      items: ["Android Development", "Java", "Firebase", "React Native"],
    },
    {
      category: "Databases",
      icon: "/images/image.png",
      items: ["MongoDB", "MySQL", "Firebase", "PostgreSQL"],
    },
    {
      category: "Tools & Platforms",
      icon: "/images/tools2.png",
      items: ["Git", "Postman", "Figma", "Arduino IDE", "VS Code", "Docker", "Native"],
    },
    {
      category: "IoT & Hardware",
      icon: "/images/img__3.png",
      items: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Sensor Integration"],
    },
  ]

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        duration: 1.2,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, rotate: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.6,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.05, 
      y: -10,
      rotate: 2,
      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2), 0 5px 15px rgba(34, 211, 238, 0.2)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, x: -20, rotate: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: { 
      scale: 1.08,
      rotate: 3,
      boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: { scale: 0.95, rotate: -2 }
  }

  const imageVariants = {
    initial: { scale: 1.2, y: 20 },
    animate: { 
      scale: 1,
      y: 0,
      transition: { 
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 3,
      transition: { duration: 0.4 }
    }
  }

  const profilePictureVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      rotate: -15,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        duration: 1.2
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -30, rotate: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotate: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    }
  }

  const parallaxVariants = {
    hidden: { y: 50, opacity: 0.3 },
    visible: { 
      y: 0, 
      opacity: 0.7,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 1.5
      }
    }
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    }
  }

  // Split text into letters for animation
  const splitText = (text) => text.split("").map((char, index) => (
    <motion.span
      key={index}
      variants={letterVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <motion.header 
        className="fixed top-0 w-full z-50 bg-secondary/80 backdrop-blur-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: isLoading ? 1.3 : 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: isLoading ? 1.4 : 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              Afnan.dev
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-muted hover:text-primary transition-colors duration-500"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: isLoading ? 1.5 + index * 0.1 : 0.4 + index * 0.1 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </nav>
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-muted hover:text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </motion.button>
            </div>
          </div>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden bg-secondary/95 backdrop-blur-sm py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {["home", "about", "projects", "skills", "contact"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 text-muted hover:text-primary transition-colors duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28"
        ref={heroRef}
        variants={sectionVariants}
        initial="hidden"
        animate={heroControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-20">
          <motion.div 
            className="mb-8 mt-8 sm:mt-12"
            variants={profilePictureVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1">
              <motion.div 
                className="w-full h-full rounded-full bg-card p-1"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src="/images/img_afnan_junjwadkar.png"
                  alt="Afnan Junjwadkar"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          {!isLoading && (
            <>
              <motion.div 
                className="text-base sm:text-lg text-muted mb-4"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                👋 Hi there! I am
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {splitText("Afnan")}
                </span>
                <br />
                <span className="text-secondary">
                  {splitText("Junjwadkar")}
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                Full-Stack, Next.js & Android Developer specializing in{" "}
                <motion.span 
                  className="text-blue-500 font-semibold"
                  whileHover={{ scale: 1.05, color: "#22d3ee" }}
                  transition={{ duration: 0.3 }}
                >
                  React.js
                </motion.span>,{" "}
                <motion.span 
                  className="text-cyan-400 font-semibold"
                  whileHover={{ scale: 1.05, color: "#3b82f6" }}
                  transition={{ duration: 0.3 }}
                >
                  Firebase
                </motion.span>, and{" "}
                <motion.span 
                  className="text-blue-500 font-semibold"
                  whileHover={{ scale: 1.05, color: "#22d3ee" }}
                  transition={{ duration: 0.3 }}
                >
                  IoT applications
                </motion.span>
              </motion.p>
              <motion.div 
                className="flex items-center justify-center mb-8"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <motion.img 
                  src="/images/img_.png" 
                  alt="Location" 
                  className="w-4 h-4 mr-2"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="text-muted">Belagavi, Karnataka, India</span>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-medium hover:shadow-xl transition-all duration-500"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  See My Work
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 sm:px-8 py-3 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500/20 transition-all duration-500"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Let's Connect
                </motion.button>
              </motion.div>
              <motion.div 
                className="flex flex-wrap justify-center gap-6 sm:gap-8"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                {["React", "Android", "Firebase", "Next.js"].map((tech, index) => (
                  <motion.div 
                    key={tech}
                    className="text-center"
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    <motion.div 
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-card rounded-lg flex items-center justify-center mb-2"
                      whileHover={{ rotate: 15, scale: 1.2, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img src={`/images/${tech === "React" ? "svg.svg" : tech === "Android" ? "img__32x24.png" : tech === "Firebase" ? "img__1.png" : "img__2.png"}`} alt={tech} className="w-6 sm:w-8 h-5 sm:h-6" />
                    </motion.div>
                    <span className="text-xs text-muted">{tech}</span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-16 sm:py-20 bg-card-light relative"
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={aboutControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{ y: parallaxY, translateY: parallaxY }}
          variants={parallaxVariants}
          initial="hidden"
          animate={aboutControls}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={sectionVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-secondary">{splitText("About ")}</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{splitText("Me")}</span>
            </h2>
            <motion.p 
              className="text-lg sm:text-xl text-muted"
              variants={textVariants}
            >
              Passionate about crafting digital experiences that make a difference
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <motion.div 
              className="space-y-6"
              variants={sectionVariants}
            >
              <motion.p 
                className="text-base sm:text-lg text-muted leading-relaxed"
                variants={textVariants}
              >
                I am <motion.span className="text-blue-500 font-semibold" whileHover={{ scale: 1.05, color: "#22d3ee" }}>Afnan Junjwadkar</motion.span>, a software developer
                specializing in responsive web interfaces and mobile applications. With a focus on{" "}
                <motion.span className="text-cyan-400 font-semibold" whileHover={{ scale: 1.05, color: "#3b82f6" }}>React.js</motion.span> and{" "}
                <motion.span className="text-cyan-400 font-semibold" whileHover={{ scale: 1.05, color: "#3b82f6" }}>Next.js</motion.span> frameworks, I also bring experience in
                building real-time IoT applications and Android tools using Firebase.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg text-muted leading-relaxed"
                variants={textVariants}
              >
                I am passionate about clean code, elegant UI, and performance-first design. My goal is to create digital
                solutions that not only look great but also provide exceptional user experiences.
              </motion.p>
              <motion.button
                onClick={handleDownloadResume}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-medium hover:shadow-xl transition-all duration-500"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.img 
                  src="/images/img_component_1_white_a700.svg" 
                  alt="Download" 
                  className="w-4 h-4 mr-2"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                />
                Download Resume
              </motion.button>
            </motion.div>
            <motion.div 
              className="space-y-4"
              variants={sectionVariants}
            >
              {[
                { title: "Location", content: "Belagavi, Karnataka", icon: "/images/img_overlay.svg" },
                { 
                  title: "Languages", 
                  content: ["Hindi", "English", "Kannada", "Marathi"], 
                  icon: "/images/img_overlay_cyan_400.svg",
                  isList: true 
                },
                { title: "Email", content: "afnanjunjwadkar786@gmail.com", icon: "/images/img_overlay_blue_a200.svg" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-card-overlay border border-section rounded-lg p-4 sm:p-6"
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 }}
                >
                  <div className={item.isList ? "flex items-start" : "flex items-center"}>
                    <motion.div 
                      className={`w-10 sm:w-12 h-10 sm:h-12 ${item.isList ? "bg-accent-light" : "bg-highlight-light"} rounded-lg flex items-center justify-center mr-4 ${item.isList ? "flex-shrink-0" : ""}`}
                      whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img src={item.icon} alt={item.title} className="w-6 h-6" />
                    </motion.div>
                    <div className={item.isList ? "flex-1" : ""}>
                      <motion.h3 
                        className="text-secondary font-semibold mb-3"
                        variants={textVariants}
                      >
                        {splitText(item.title)}
                      </motion.h3>
                      {item.isList ? (
                        <div className="flex flex-wrap gap-2">
                          {item.content.map((lang, idx) => (
                            <motion.span 
                              key={lang}
                              className="px-3 py-1 bg-section text-muted text-sm rounded-full"
                              variants={listItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.1, backgroundColor: "#e0f7fa", boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)" }}
                            >
                              {lang}
                            </motion.span>
                          ))}
                        </div>
                      ) : (
                        <motion.p 
                          className="text-muted text-sm sm:text-base"
                          variants={textVariants}
                        >
                          {item.content}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-16 sm:py-20 relative"
        ref={projectsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={projectsControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{ y: parallaxY, translateY: parallaxY }}
          variants={parallaxVariants}
          initial="hidden"
          animate={projectsControls}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={sectionVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-secondary">{splitText("Featured ")}</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{splitText("Projects")}</span>
            </h2>
            <motion.p 
              className="text-lg sm:text-xl text-muted max-w-3xl mx-auto"
              variants={textVariants}
            >
              A showcase of my latest work in web development, mobile apps, and IoT solutions
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-card-overlay border border-section rounded-lg overflow-hidden transition-all duration-500"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover="hover"
                transition={{ delay: index * 0.15 }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-semibold text-secondary mb-2"
                    variants={textVariants}
                  >
                    {splitText(project.title)}
                  </motion.h3>
                  <motion.p 
                    className="text-muted mb-4 text-sm sm:text-base leading-relaxed"
                    variants={textVariants}
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-highlight-light text-blue-500 text-xs sm:text-sm font-semibold rounded-full"
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: "#e0f7fa", boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button
                    onClick={handleGitHubClick}
                    className="w-full py-2 border border-blue-500/20 text-secondary text-sm sm:text-base font-medium rounded-md hover:bg-blue-500/20 transition-all duration-500"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Code
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center"
            variants={sectionVariants}
          >
            <motion.button
              onClick={handleGitHubClick}
              className="px-6 sm:px-8 py-3 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500/20 transition-all duration-500"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="py-16 sm:py-20 bg-card-light relative"
        ref={skillsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={skillsControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{ y: parallaxY, translateY: parallaxY }}
          variants={parallaxVariants}
          initial="hidden"
          animate={skillsControls}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={sectionVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-secondary">{splitText("Technical ")}</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{splitText("Skills")}</span>
            </h2>
            <motion.p 
              className="text-lg sm:text-xl text-muted"
              variants={textVariants}
            >
              A comprehensive toolkit for building modern digital solutions
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                className="bg-card-overlay border border-section rounded-lg p-4 sm:p-6"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover="hover"
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-center mb-6">
                  <motion.div 
                    className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.15, rotate: 15, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {skill.icon && (
                      <img src={skill.icon || "/placeholder.svg"} alt={skill.category} className="w-6 sm:w-8 h-5 sm:h-6" />
                    )}
                  </motion.div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-semibold text-secondary"
                    variants={textVariants}
                  >
                    {splitText(skill.category)}
                  </motion.h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <motion.span 
                      key={item}
                      className="px-3 py-1 bg-section-overlay text-muted text-sm rounded-full"
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: "#e0f7fa", boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)" }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center"
            variants={sectionVariants}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-semibold text-secondary mb-6"
              variants={textVariants}
            >
              {splitText("Proficiency Levels")}
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {[
                { color: "bg-blue-500", label: "Expert" },
                { color: "bg-cyan-400", label: "Advanced" },
                { color: "bg-section", label: "Intermediate" }
              ].map((level, index) => (
                <motion.div 
                  key={level.label}
                  className="flex items-center"
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 }}
                >
                  <motion.div 
                    className={`w-4 h-4 ${level.color} rounded-lg mr-2`}
                    whileHover={{ scale: 1.2, rotate: 45, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                    transition={{ type: "spring", stiffness: 200 }}
                  ></motion.div>
                  <motion.span 
                    className="text-muted text-sm sm:text-base"
                    variants={textVariants}
                  >
                    {level.label}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-16 sm:py-20 relative"
        ref={contactRef}
        variants={sectionVariants}
        initial="hidden"
        animate={contactControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{ y: parallaxY, translateY: parallaxY }}
          variants={parallaxVariants}
          initial="hidden"
          animate={contactControls}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={sectionVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-secondary">{splitText("Let's ")}</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{splitText("Connect")}</span>
            </h2>
            <motion.p 
              className="text-lg sm:text-xl text-muted"
              variants={textVariants}
            >
              Ready to bring your ideas to life? Let's discuss your next project!
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div 
              className="space-y-8"
              variants={sectionVariants}
            >
              <div>
                <motion.h3 
                  className="text-xl sm:text-2xl font-semibold text-secondary mb-4"
                  variants={textVariants}
                >
                  {splitText("Get in Touch")}
                </motion.h3>
                <motion.p 
                  className="text-base sm:text-lg text-muted leading-relaxed mb-8"
                  variants={textVariants}
                >
                  I am always open to discussing new opportunities, innovative projects, or just having a conversation
                  about technology. Feel free to reach out!
                </motion.p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Email", content: "afnanjunjwadkar786@gmail.com", icon: "/images/img_overlay_blue_a200.svg" },
                  { title: "Phone", content: "+91 8884622068", icon: "/images/img_overlay_blue_a200_48x48.svg" },
                  { title: "Location", content: "Belagavi, Karnataka", icon: "/images/img_overlay.svg" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-card-overlay border border-section rounded-lg p-4 sm:p-6"
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="w-10 sm:w-12 h-10 sm:h-12 bg-highlight-light rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <img src={item.icon} alt={item.title} className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <motion.h4 
                          className="text-secondary font-semibold text-sm sm:text-base"
                          variants={textVariants}
                        >
                          {splitText(item.title)}
                        </motion.h4>
                        <motion.p 
                          className="text-muted text-sm sm:text-base"
                          variants={textVariants}
                        >
                          {item.content}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="flex space-x-4"
                variants={sectionVariants}
              >
                {[
                  { onClick: handleGitHubClick, icon: "/images/img_component_1_gray_50.svg", alt: "GitHub" },
                  { onClick: handleLinkedInClick, icon: "/images/img_component_7.svg", alt: "LinkedIn" }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={social.onClick}
                    className="w-10 h-10 border border-blue-500/20 rounded-md flex items-center justify-center hover:bg-blue-500/20 transition-all duration-500"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 }}
                  >
                    <motion.img 
                      src={social.icon} 
                      alt={social.alt} 
                      className="w-5 h-5"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="bg-card-overlay border border-section rounded-lg p-6 sm:p-8"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold text-secondary mb-6"
                variants={textVariants}
              >
                {splitText("Send a Message")}
              </motion.h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {["name", "email", "message"].map((field, index) => (
                  <motion.div
                    key={field}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 + index * 0.15 }}
                  >
                    {field === "message" ? (
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="4"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-overlay-1 border border-section rounded-md text-secondary placeholder-muted focus:outline-none focus:border-blue-500 transition-all duration-500 hover:border-blue-400 hover:shadow-md disabled:opacity-50 resize-none"
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        value={formData[field]}
                        onChange={handleFormChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-overlay-1 border border-section rounded-md text-secondary placeholder-muted focus:outline-none focus:border-blue-500 transition-all duration-500 hover:border-blue-400 hover:shadow-md disabled:opacity-50"
                      />
                    )}
                  </motion.div>
                ))}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-md font-medium hover:shadow-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-card-overlay border-t border-section py-12 relative"
        ref={footerRef}
        variants={sectionVariants}
        initial="hidden"
        animate={footerControls}
        viewport={{ once: true, margin: "-200px" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{ y: parallaxY, translateY: parallaxY }}
          variants={parallaxVariants}
          initial="hidden"
          animate={footerControls}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div variants={sectionVariants}>
              <motion.div 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4"
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Afnan.dev
              </motion.div>
              <motion.p 
                className="text-muted text-sm sm:text-base leading-relaxed"
                variants={textVariants}
              >
                Crafting digital experiences with passion and precision. Let's build something amazing together.
              </motion.p>
            </motion.div>
            <motion.div variants={sectionVariants}>
              <motion.h4 
                className="text-secondary font-semibold mb-4 text-sm sm:text-base"
                variants={textVariants}
              >
                {splitText("Quick Links")}
              </motion.h4>
              <div className="space-y-2">
                {["home", "about", "projects", "skills", "contact"].map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-muted hover:text-primary transition-colors duration-500 text-sm sm:text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={sectionVariants}>
              <motion.h4 
                className="text-secondary font-semibold mb-4 text-sm sm:text-base"
                variants={textVariants}
              >
                {splitText("Services")}
              </motion.h4>
              <div className="space-y-2 text-muted text-sm sm:text-base">
                {["Web Development", "Mobile App Development", "IoT Solutions", "UI/UX Design", "Technical Consulting"].map((service, index) => (
                  <motion.p 
                    key={service}
                    variants={cardVariants}
                    whileHover={{ x: 8, color: "#3b82f6" }}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    {service}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="border-t border-section pt-8"
            variants={sectionVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p 
                className="text-muted text-sm"
                variants={textVariants}
              >
                © 2024 Afnan Junjwadkar. All rights reserved.
              </motion.p>
              <motion.p 
                className="text-muted text-sm mt-4 md:mt-0"
                variants={textVariants}
              >
                Belagavi, India
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Portfolio