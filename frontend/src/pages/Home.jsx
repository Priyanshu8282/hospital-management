import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import { Cardiology, Orthopedics, Neurology, Dermatology, Pediatrics, Gynecology,General_Consultation } from '../assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/autoplay';
import { FaUserMd, FaHeartbeat, FaAmbulance, FaPills, FaVials, FaStethoscope } from 'react-icons/fa'; 

/** Service Card Component */
const ServiceCard = ({ title, desc, icon }) => (
  <div className="service-card p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
    <div className="icon-container mb-4">
      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#2C698D] to-[#5EBEC4] text-white flex items-center justify-center rounded-full shadow-lg">
        {icon} 
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

/** Speciality Card Component */
const SpecialityCard = ({ img, title, desc }) => (
  <motion.div
    className="speciality-card p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <img src={img} alt={title} loading="lazy" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

function  Home() {
  // Services Data
  const services = [
    { title: "General Consultation", desc: "Get expert advice and diagnosis from our experienced doctors.", icon: <FaUserMd size={24} /> },
    { title: "Specialist Services", desc: "Access specialists in various fields for advanced care.", icon: <FaStethoscope size={24} /> },
    { title: "Emergency Care", desc: "24/7 emergency services to handle critical situations.", icon: <FaAmbulance size={24} /> },
    { title: "Pharmacy", desc: "Order medicines online and get them delivered to your doorstep.", icon: <FaPills size={24} /> },
    { title: "Lab Tests", desc: "Book diagnostic tests and get accurate results quickly.", icon: <FaVials size={24} /> },
    { title: "Health Checkups", desc: "Comprehensive health checkup packages for preventive care.", icon: <FaHeartbeat size={24} /> },
  ];

  // Specialities Data
  const specialities = [
    { title: "Cardiology", img: Cardiology, desc: "Advanced heart care with experienced cardiologists." },
    { title: "Orthopedics", img: Orthopedics, desc: "Comprehensive bone and joint care for all ages." },
    { title: "Neurology", img: Neurology, desc: "Expert care for neurological disorders and treatments." },
    { title: "Dermatology", img: Dermatology, desc: "Skin care and treatments for all dermatological needs." },
    { title: "Pediatrics", img: Pediatrics, desc: "Specialized care for infants, children, and adolescents." },
    { title: "Gynecology", img: Gynecology, desc: "Comprehensive care for women's health and wellness." }
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <About />

        {/* Services Section */}
        <section className="services py-16 text-center bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2]">
        <h2 className="text-4xl font-extrabold text-[#2C698D] mb-6">Our Services</h2>
        <p className="text-lg text-gray-600 mb-10">
          Discover the wide range of services we offer to ensure your health and well-being.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Specialities Section with Swiper Autoplay */}
      <section className="specialities py-16 text-center bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2]">
        <h2 className="text-3xl font-bold mb-4">Our Specialities</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore our wide range of medical specialities designed to provide expert care for all your health needs.
        </p>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {specialities.map((speciality, index) => (
            <SwiperSlide key={index}>
              <SpecialityCard {...speciality} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}

export default Home;