  import React, { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {
    faUser,
    faCalendarCheck,
    faFileMedical,
    faSignOutAlt,
    faUserMd,
  } from '@fortawesome/free-solid-svg-icons';
  import { Outlet, useNavigate } from 'react-router-dom';
  import { logo } from '../../assets'; // Import the logo

  function Dashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      navigate('/'); // Redirect to home page
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
        {/* Sidebar */}
        <div
          className={`lg:flex lg:flex-col lg:w-64 bg-[#2C698D] text-white ${
            isSidebarOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Logo Section */}
          <div className="p-6 flex items-center space-x-3">
            <img src={logo} alt="DocuCare Logo" className="h-12 w-12" />
            <h2 className="text-2xl font-bold">DocuCare</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow">
            <ul className="space-y-4 p-4">
              <li>
  <button
    className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded transition duration-300"
    onClick={() => {
      navigate('/patient-dashboard/profile');
      setIsSidebarOpen(false); // Close sidebar after clicking
    }}
  >
    <FontAwesomeIcon icon={faUser} />
    <span>Profile</span>
  </button>
</li>
<li>
  <button
    className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded transition duration-300"
    onClick={() => {
      navigate('/patient-dashboard/appointments');
      setIsSidebarOpen(false);
    }}
  >
    <FontAwesomeIcon icon={faCalendarCheck} />
    <span>Appointments</span>
  </button>
</li>
<li>
  <button
    className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded transition duration-300"
    onClick={() => {
      navigate('/patient-dashboard/medical-records');
      setIsSidebarOpen(false);
    }}
  >
    <FontAwesomeIcon icon={faFileMedical} />
    <span>Medical Records</span>
  </button>
</li>
<li>
  <button
    className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded transition duration-300"
    onClick={() => {
      navigate('/patient-dashboard/doctors');
      setIsSidebarOpen(false);
    }}
  >
    <FontAwesomeIcon icon={faUserMd} />
    <span>All Doctors</span>
  </button>
</li>

            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4">
            <button
              className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded transition duration-300"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 lg:ml-64">
          <Outlet /> {/* Render the child routes here */}
        </div>
      </div>
    );
  }

  export default Dashboard;