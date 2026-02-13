import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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

        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At JobLink, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our AI-powered job matching platform. 
              Please read this policy carefully to understand our practices regarding your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-3">We collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Account Information:</strong> Name, email address, password, phone number</li>
              <li><strong>Profile Information:</strong> Professional experience, education, skills, certifications</li>
              <li><strong>Resume Data:</strong> Work history, achievements, references</li>
              <li><strong>Company Information:</strong> Company name, description, industry, location</li>
              <li><strong>Job Postings:</strong> Job titles, descriptions, requirements, salary ranges</li>
              <li><strong>Communications:</strong> Messages sent through our platform, customer support inquiries</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">When you use JobLink, we automatically collect:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on platform</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies</li>
              <li><strong>Log Data:</strong> Server logs, error reports, performance data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Information from Third Parties</h3>
            <p className="text-gray-700 leading-relaxed">
              We may receive information about you from third-party services if you choose to link your 
              account or import data from platforms like LinkedIn or other professional networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Service Delivery:</strong> To provide, maintain, and improve our job matching services</li>
              <li><strong>AI Processing:</strong> To analyze resumes and job descriptions using our AI algorithms</li>
              <li><strong>Matching:</strong> To connect job seekers with relevant job opportunities</li>
              <li><strong>Communication:</strong> To send notifications, updates, and respond to inquiries</li>
              <li><strong>Personalization:</strong> To customize your experience and provide tailored recommendations</li>
              <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other security issues</li>
              <li><strong>Analytics:</strong> To understand how users interact with our platform and improve our services</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Marketing:</strong> To send promotional materials (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. AI and Data Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              JobLink uses artificial intelligence and machine learning algorithms to analyze resumes, job 
              descriptions, and user behavior to provide intelligent matching and recommendations. This processing includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Extracting skills, experience, and qualifications from resumes</li>
              <li>Analyzing job requirements and company preferences</li>
              <li>Generating compatibility scores between candidates and positions</li>
              <li>Providing personalized job recommendations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our AI systems are designed to be fair and unbiased, but we cannot guarantee perfect accuracy. 
              Users should review AI-generated suggestions critically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 With Other Users</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you apply for a job, your resume and profile information will be shared with the employer. 
              When employers post jobs, job seekers can view job details and company information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Service Providers</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with third-party service providers who perform services on our behalf, 
              such as hosting, analytics, payment processing, and customer support.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Legal Requirements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose your information if required by law, court order, or governmental request, or 
              to protect our rights, property, or safety.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.4 Business Transfers</h3>
            <p className="text-gray-700 leading-relaxed">
              If JobLink is involved in a merger, acquisition, or sale of assets, your information may be 
              transferred as part of that transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure data storage and backup procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect 
              your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-3">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request limitation of data processing</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us through our Contact Us page or email privacy@joblink.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on JobLink. 
              Cookies are small data files stored on your device that help us remember your preferences 
              and understand how you use our platform.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">Types of cookies we use:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Performance Cookies:</strong> Help us analyze platform usage and performance</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with your consent)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling certain cookies may 
              affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and 
              comply with legal obligations. When you delete your account, we will delete or anonymize 
              your personal data within 90 days, except where we are required to retain it for legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              JobLink is not intended for users under the age of 18. We do not knowingly collect personal 
              information from children. If we become aware that we have collected information from a child 
              under 18, we will take steps to delete such information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of 
              residence. These countries may have different data protection laws. We ensure appropriate 
              safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or 
              legal requirements. We will notify you of significant changes via email or through a prominent 
              notice on our platform. Your continued use of JobLink after such changes constitutes acceptance 
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
              practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
              <p><strong>Email:</strong> privacy@joblink.com</p>
              <p><strong>Contact Form:</strong> Available on our Contact Us page</p>
              <p><strong>Data Protection Officer:</strong> dpo@joblink.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;