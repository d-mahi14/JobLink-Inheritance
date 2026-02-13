import { Briefcase, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
            src="/logo1.png" 
            alt="JobLink" 
          className="h-12 w-auto object-contain"
        />
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered platform connecting talented professionals with leading companies 
              through intelligent resume analysis and job matching.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/d-mahi14/JobLink-Inheritance.git" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/candidate/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/candidate/resumes" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/candidate/applications" className="text-gray-600 hover:text-gray-900 transition-colors">
                  My Applications
                </Link>
              </li>
              <li>
                <Link to="/candidate/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company/create-job" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/company/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link to="/company/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/company/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Company Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} JobLink. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;