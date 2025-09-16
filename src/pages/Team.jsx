// src/components/OurTeam.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUsers, FaFileAlt, FaBuilding, FaBars, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';



const Team = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const teamMembers = [
    {
      name: "Sameer Mohanty",
      role: "Developer",
      email: "sameermohanty@email.com",
      phone: "+91 1234567890"
    },
    {
      name: "Mr Nobody",
      role: "Developer",
      email: "mrnobody@email.com",
      phone: "+91 1234567890"
    },
    {
      name: "Shibananda Behera",
      role: "Developer",
      email: "shibanandabehera@email.com",
         phone: "+91 1234567890"
    },
    {
      name: "Kumar Chidanandam",
      role: "Developer",
      email: "kumarchidanandam@email.com",
        phone: "+91 1234567890"
    },
    {
      name: "Barsha Priyadarshini",
      role: "Developer",
      email: "barshapriyadarshini@email.com",
        phone: "+91 1234567890"
    },
    {
      name: "Gaurisankar Tarasia",
      role: "Developer",
      email: "gaurisankartarasia@emai;.com",
        phone: "+91 1234567890"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-3xl text-blue-600" />
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">HR Policy</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
              <ul className="flex space-x-8">
                <li><button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"><FaHome /><span>Home</span></button></li>
                <li><button onClick={() => navigate('/about')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"><FaInfoCircle /><span>About Us</span></button></li>
                <li><button onClick={() => navigate('/policies')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"><FaFileAlt /><span>Policies</span></button></li>
                <li><button onClick={() => navigate('/team')} className="flex items-center space-x-2 text-blue-600 font-bold"><FaUsers /><span>Our Team</span></button></li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                Employee Login
              </button>
            </nav>

            <button className="md:hidden text-2xl text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl transition-all duration-300">
            <nav className="container mx-auto px-6 pt-4 pb-6 flex flex-col space-y-4 text-lg font-medium">
              <button onClick={() => navigate('/')} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600"><FaHome /><span>Home</span></button>
              <button onClick={() => navigate('/about')} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600"><FaInfoCircle /><span>About Us</span></button>
              <button onClick={() => navigate('/policies')} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600"><FaFileAlt /><span>Policies</span></button>
              <button onClick={() => navigate('/team')} className="flex items-center space-x-3 text-blue-600 font-bold"><FaUsers /><span>Our Team</span></button>
              <div className="border-t border-gray-200 my-4"></div>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                Employee Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transform hover:scale-[1.05] transition-transform duration-300">
                <div className="text-blue-600 text-6xl mb-4">
                  <FaUsers />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <div className="flex flex-col space-y-2 text-left w-full">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-blue-600" />
                    <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-700 transition-colors">{member.email}</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-blue-600" />
                    <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-blue-700 transition-colors">{member.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10 mb-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-4">
                <FaBuilding className="text-3xl text-blue-500" />
                <h3 className="text-2xl font-bold text-white">PolicyPro</h3>
              </div>
              <p className="text-gray-400 max-w-sm">Your comprehensive and transparent guide to all company policies and procedures.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/')} className="text-gray-400 hover:text-blue-500 transition-colors">Home</button></li>
                <li><button onClick={() => navigate('/about')} className="text-gray-400 hover:text-blue-500 transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/policies')} className="text-gray-400 hover:text-blue-500 transition-colors">Policies</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/faq')} className="text-gray-400 hover:text-blue-500 transition-colors">FAQ</button></li>
                <li><button onClick={() => navigate('/handbook')} className="text-gray-400 hover:text-blue-500 transition-colors">Employee Handbook</button></li>
                <li><button onClick={() => navigate('/forms')} className="text-gray-400 hover:text-blue-500 transition-colors">Forms & Documents</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic space-y-2">
                <p>123 Innovation Drive</p>
                <p>Corporate Hub, CA 90210</p>
                <p className="mt-2">Email: <a href="mailto:hr@policypro.com" className="hover:text-blue-500">hr@policypro.com</a></p>
                <p>Phone: <a href="tel:+1234567890" className="hover:text-blue-500">(123) 456-7890</a></p>
              </address>
            </div>
          </div>
          <div className="text-center text-gray-500">
            <p>© {new Date().getFullYear()} PolicyPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;