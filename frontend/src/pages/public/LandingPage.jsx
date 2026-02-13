import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Users, Building2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Ultra Professional */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect Career Match
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect talented professionals with leading companies through AI-powered 
              resume analysis and intelligent job matching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/signup" 
                className="btn btn-lg bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 rounded-md shadow-sm"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/login" 
                className="btn btn-lg btn-outline border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 px-8 rounded-md"
              >
                Sign In
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-900" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-900" />
                <span>AI-powered matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-900" />
                <span>Instant analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How JobLink Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect with your next opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Your Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up and upload your resume. Our AI instantly analyzes your skills 
                and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Matched
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse personalized job recommendations based on your profile and 
                career goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Apply with Confidence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Submit applications with one click and track your progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Employers Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-12 lg:p-16">
              <div className="text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Hiring? Find Top Talent Fast
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Post jobs, review AI-matched candidates, and build your dream team 
                  with intelligent recruitment tools.
                </p>
                <Link 
                  to="/signup" 
                  className="btn btn-lg bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 rounded-md shadow-sm"
                >
                  Post a Job
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and companies using JobLink
          </p>
          <Link 
            to="/signup" 
            className="btn btn-lg bg-white hover:bg-gray-100 text-gray-900 border-0 px-8 rounded-md shadow-sm"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;