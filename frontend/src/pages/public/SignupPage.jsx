import { Link } from 'react-router-dom';
import SignupForm from '../../components/auth/SignupForm';
import { Briefcase, TrendingUp, Users, Award } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="bg-gray-900 p-12 lg:p-16 text-white flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Join JobLink</h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Start your journey to finding the perfect job or talent with our AI-powered platform.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart Matching</h3>
                    <p className="text-gray-300 text-sm">
                      AI-powered algorithms match you with relevant opportunities
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">For Everyone</h3>
                    <p className="text-gray-300 text-sm">
                      Whether you're hiring or looking for work, we've got you covered
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Career Growth</h3>
                    <p className="text-gray-300 text-sm">
                      Track your applications and grow your professional network
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Get started with JobLink today</p>
              </div>

              <SignupForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-gray-900 hover:text-gray-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;