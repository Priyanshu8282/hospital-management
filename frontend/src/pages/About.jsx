import React from 'react';
import { about, image2, team_1, team_2, team_3, team_4, team_5, team_6 } from '../assets'; // Ensure you have all team images in your assets folder
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'; // Import Swiper modules
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Import Coverflow effect styles

function About() {
  // Array of team members
  const teamMembers = [
    { name: "Dr. John Doe", role: "Cardiologist", img: team_1 },
    { name: "Dr. Jane Smith", role: "Neurologist", img: team_2 },
    { name: "Dr. Emily Johnson", role: "Pediatrician", img: team_3 },
    { name: "Dr. Michael Brown", role: "Orthopedic Surgeon", img: team_4 },
    { name: "Dr. Sarah Wilson", role: "Dermatologist", img: team_5 },
    { name: "Dr. Laura Davis", role: "Gynecologist", img: team_6 },
  ];

  return (
    <div className="about-page bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2]">
      {/* Hero Section with Image */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={about}
          alt="About Us"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center">
            About Us
          </h1>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 lg:px-20 py-16">
        {/* Introduction Section */}
        <motion.section
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold text-[#2C698D] mb-4">Welcome to DocuCare</h2>
            <p className="text-lg text-gray-600">
              At <span className="font-bold text-[#2C698D]">DocuCare</span>, we are dedicated to providing exceptional healthcare services. 
              Our mission is to ensure the well-being of our patients through innovation, compassion, and excellence.
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={image2}
              alt="Welcome to DocuCare"
              className="rounded-lg  w-3/4 md:w-2/3 lg:w-1/2"
            />
          </motion.div>
        </motion.section>

        {/* Mission and Vision Section */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-[#2C698D] mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To deliver high-quality, patient-centered healthcare with compassion, innovation, and excellence. 
              We aim to make healthcare accessible and affordable for everyone.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-[#2C698D] mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be a leading healthcare provider recognized for our commitment to improving lives through advanced medical care, 
              cutting-edge technology, and a dedicated team of professionals.
            </p>
          </div>
        </motion.section>

        {/* Team Section with Coverflow Effect */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-[#2C698D] mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mb-10">
            Our team of experienced doctors, nurses, and healthcare professionals is dedicated to providing the best care possible.
          </p>
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="max-w-6xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="team-card p-6 bg-white shadow-lg rounded-lg">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-bold text-[#2C698D]">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>
      </div>
    </div>
  );
}

export default About;