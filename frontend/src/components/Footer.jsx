  import React from 'react';
  import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
  import { motion } from 'framer-motion';
  import { Link } from 'react-router-dom'; // Import Link from react-router-dom

  function Footer() {
    return (
      <footer className="bg-[#2C698D] text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Column 1: About */}
            <div>
              <h2 className="text-2xl font-bold mb-4">DocuCare</h2>
              <p className="mb-4">Your trusted partner in healthcare, providing top-notch services for you and your family.</p>
              <p>Address: 123 Healthcare St, Wellness City, HC 12345</p>
              <p>Email: support@docucare.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul>
                <li className="mb-2 hover:text-yellow-400 transition duration-300">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2 hover:text-yellow-400 transition duration-300">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="mb-2 hover:text-yellow-400 transition duration-300">
                  <Link to="/contact">Contact</Link>
                </li>
                
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div>
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <p className="mb-4">Stay connected with us on social media:</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <motion.a
                  href="https://facebook.com"
                  className="text-white hover:text-yellow-400"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaFacebookF size={24} />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  className="text-white hover:text-yellow-400"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  className="text-white hover:text-yellow-400"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  className="text-white hover:text-yellow-400"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaLinkedinIn size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p>&copy; {new Date().getFullYear()} DocuCare. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    );
  }

  export default Footer;