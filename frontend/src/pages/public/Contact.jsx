import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a question or need assistance? Our team is here to help. 
            Reach out to us using the information below.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-3">We typically respond within one business day.</p>
            <a href="mailto:support@joblink.com" className="text-gray-900 font-medium">
              support@joblink.com
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-3">Mon–Fri, 9:00 AM – 6:00 PM</p>
            <a href="tel:+15551234567" className="text-gray-900 font-medium">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Office</h3>
            <p className="text-gray-600">
              123 Tech Street <br />
              San Francisco, CA 94105 <br />
              United States
            </p>
          </div>

        </div>

        {/* FAQ + Business Hours */}
        <div className="max-w-4xl mx-auto space-y-10">

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does it take to get a response?
                </h3>
                <p className="text-gray-600">
                  Most inquiries receive a response within one business day.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do you support both job seekers and employers?
                </h3>
                <p className="text-gray-600">
                  Yes. We assist both candidates and employers with platform-related questions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I schedule a demo?
                </h3>
                <p className="text-gray-600">
                  Employers interested in scheduling a demo can contact us via email.
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Business Hours
              </h2>
            </div>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="font-medium">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">10:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
