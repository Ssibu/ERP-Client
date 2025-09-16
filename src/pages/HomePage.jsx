import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaInfoCircle, FaEnvelope, FaUsers, FaFileAlt, FaBuilding,
  FaHandshake, FaBars, FaTimes, FaShieldAlt, FaChartLine, FaRegLightbulb
} from 'react-icons/fa';
import useAuth from "@/hooks/useAuth"

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthenticated} =useAuth()

  const policies = [
    { icon: <FaUsers />, title: "Recruitment Policy", description: "Guidelines for hiring processes, interviews, and onboarding new employees." },
    { icon: <FaHandshake />, title: "Code of Conduct", description: "Expected professional behavior and workplace ethics for all employees." },
    { icon: <FaFileAlt />, title: "Leave Policy", description: "Rules governing vacation, sick leave, and other time-off requests." },
    { icon: <FaBuilding />, title: "Workplace Safety", description: "Procedures to ensure a safe and healthy work environment." }
  ];

  if(isAuthenticated) navigate("/dashboard")

  const PolicyCard = ({ icon, title, description }) => (
    <div className="relative bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <div className="text-blue-600 text-4xl mb-4 transition-colors duration-300 group-hover:text-blue-700">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <button
        onClick={() => navigate('/policies')}
        className="mt-6 text-blue-600 font-bold hover:text-blue-800 transition-colors"
      >
        Read Policy →
      </button>
    </div>
  );

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
                <li><button onClick={() => navigate('/team')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"><FaUsers /><span>Our Team</span></button></li>
              </ul>
            {isAuthenticated ?   <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                Go to dashboard
              </button> :   <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                Employee Login
              </button>}
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
              <button onClick={() => navigate('/team')} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600"><FaUsers /><span>Our Team</span></button>
              <div className="border-t border-gray-200 my-4"></div>

              {isAuthenticated ?    <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                  Go to dashboard
              </button> :    <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
               Employee Login
              </button> }
           
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://www.transparentpng.com/download/lines/P7R89b-blue-wavy-lines-transparent-background-download.png')" }}></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">Your Guide to Workplace Excellence</h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8 animate-fade-in-up">
              Find, understand, and apply the latest company policies and procedures with ease.
            </p>
            <button
              onClick={() => navigate('/policies')}
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 animate-fade-in-up delay-300"
            >
              Explore Policies
            </button>
          </div>
        </section>

        {/* Featured Policies */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">Key Policies at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {policies.map((policy, index) => (
                <PolicyCard
                  key={index}
                  icon={policy.icon}
                  title={policy.title}
                  description={policy.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-800">Why Use Our Portal?</h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                We make it easy for you to stay informed and aligned with company standards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-inner">
                <FaShieldAlt className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Clarity & Transparency</h3>
                <p className="text-gray-600">
                  Access official policies anytime, ensuring you have the right information at your fingertips.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-inner">
                <FaChartLine className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Increased Productivity</h3>
                <p className="text-gray-600">
                  Quickly find what you need without interrupting colleagues, allowing you to focus on your work.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-inner">
                <FaRegLightbulb className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Effortless Compliance</h3>
                <p className="text-gray-600">
                  Stay updated on policy changes and remain compliant with company-wide regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
            <p className="text-xl font-light mb-8 max-w-2xl mx-auto">
              Log in to your account to access all employee resources, documents, and policies.
            </p>
      {isAuthenticated ?       <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Go to Dashboard
            </button> :       <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Go to Login
            </button>}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10 mb-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-4">
                <FaBuilding className="text-3xl text-blue-500" />
                <h3 className="text-2xl font-bold text-white">Hr Policy</h3>
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

export default HomePage;