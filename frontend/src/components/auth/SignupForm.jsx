import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    userType: 'candidate',
  });
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    alert('Google Sign-Up coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Google Sign Up Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full btn btn-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-md"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      {/* Account Type Selection */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-gray-700">I am a</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`btn h-auto py-4 rounded-md ${
              formData.userType === 'candidate'
                ? 'bg-gray-900 text-white hover:bg-gray-800 border-0'
                : 'btn-outline border-2 border-gray-300 hover:border-gray-900'
            }`}
            onClick={() => setFormData({ ...formData, userType: 'candidate' })}
          >
            <div className="flex flex-col items-center gap-2">
              <User className="w-5 h-5" />
              <span>Job Seeker</span>
            </div>
          </button>
          <button
            type="button"
            className={`btn h-auto py-4 rounded-md ${
              formData.userType === 'company'
                ? 'bg-gray-900 text-white hover:bg-gray-800 border-0'
                : 'btn-outline border-2 border-gray-300 hover:border-gray-900'
            }`}
            onClick={() => setFormData({ ...formData, userType: 'company' })}
          >
            <div className="flex flex-col items-center gap-2">
              <Building className="w-5 h-5" />
              <span>Employer</span>
            </div>
          </button>
        </div>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              {formData.userType === 'candidate' ? 'Full Name' : 'Company Name'}
            </span>
          </label>
          <label className="input input-bordered flex items-center gap-3 focus-within:border-gray-900 rounded-md h-12 border-gray-300">
            {formData.userType === 'candidate' ? (
              <User className="w-5 h-5 text-gray-400" />
            ) : (
              <Building className="w-5 h-5 text-gray-400" />
            )}
            <input
              type="text"
              placeholder={formData.userType === 'candidate' ? 'John Doe' : 'ABC Corp'}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="grow text-gray-900"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Email Address</span>
          </label>
          <label className="input input-bordered flex items-center gap-3 focus-within:border-gray-900 rounded-md h-12 border-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="grow text-gray-900"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-3 focus-within:border-gray-900 rounded-md h-12 border-gray-300">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="grow text-gray-900"
            />
          </label>
          <label className="label">
            <span className="label-text-alt text-gray-500">Minimum 6 characters</span>
          </label>
        </div>

        <div className="form-control">
          <label className="cursor-pointer flex items-start gap-3">
            <input type="checkbox" className="checkbox checkbox-sm mt-1 border-gray-300" required />
            <span className="label-text text-sm text-gray-600">
              I agree to the <a href="#" className="text-gray-900 hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-gray-900 hover:underline">Privacy Policy</a>
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-lg w-full bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-md" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;