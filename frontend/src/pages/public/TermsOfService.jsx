import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using JobLink, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to these Terms of Service, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              JobLink is an AI-powered job matching platform that connects job seekers with employers. 
              Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Resume upload and analysis</li>
              <li>Job posting and management for employers</li>
              <li>AI-powered job matching and recommendations</li>
              <li>Application tracking and management</li>
              <li>Communication tools between job seekers and employers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3.1 Registration</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must register for an account to use certain features of JobLink. You agree to provide 
              accurate, current, and complete information during registration and to update such information 
              to keep it accurate, current, and complete.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3.2 Account Security</h3>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for 
              all activities that occur under your account. You agree to notify us immediately of any 
              unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Post false, inaccurate, misleading, or fraudulent information</li>
              <li>Impersonate any person or entity</li>
              <li>Upload viruses or malicious code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the platform for any illegal purposes</li>
              <li>Scrape or collect data from the platform without permission</li>
              <li>Post discriminatory job listings or engage in discriminatory hiring practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Content Ownership and Rights</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">5.1 Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of any content you submit to JobLink, including resumes, job postings, 
              and profile information. By submitting content, you grant JobLink a worldwide, non-exclusive, 
              royalty-free license to use, store, and display such content for the purpose of providing 
              our services.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">5.2 JobLink Content</h3>
            <p className="text-gray-700 leading-relaxed">
              All content on JobLink, including text, graphics, logos, and software, is the property of 
              JobLink or its licensors and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Job Postings and Applications</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">6.1 Employer Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Employers agree to post only legitimate job opportunities and to comply with all applicable 
              employment laws and regulations. Job postings must not discriminate based on race, gender, 
              age, religion, disability, or any other protected characteristic.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">6.2 Job Seeker Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed">
              Job seekers agree to provide truthful and accurate information in their resumes and applications. 
              Misrepresentation may result in account termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. AI-Powered Features</h2>
            <p className="text-gray-700 leading-relaxed">
              JobLink uses artificial intelligence to analyze resumes and match candidates with job opportunities. 
              While we strive for accuracy, AI-generated recommendations are provided as suggestions only and 
              should not be the sole basis for hiring or application decisions. Users should exercise their 
              own judgment when using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Certain features of JobLink may require payment. You agree to provide current, complete, and 
              accurate payment information. All fees are non-refundable unless otherwise stated. We reserve 
              the right to change our pricing at any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation of these 
              Terms of Service or for any other reason at our sole discretion. You may also terminate your 
              account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              JobLink is provided "as is" and "as available" without warranties of any kind, either express 
              or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free. 
              We are not responsible for the conduct of users or the accuracy of job postings and resumes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, JobLink shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use of or inability to use the 
              service. Our total liability shall not exceed the amount paid by you, if any, for accessing 
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless JobLink and its affiliates from any claims, losses, 
              damages, liabilities, and expenses arising out of your use of the service, your violation of 
              these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. We will notify users of 
              significant changes via email or through a notice on our platform. Your continued use of 
              JobLink after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of the 
              jurisdiction in which JobLink operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our 
              Contact Us page or email us at legal@joblink.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;