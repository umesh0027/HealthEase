import React from 'react';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import NavBar from '../Component/Common/NavBar';
const PrivacyPolicy = () => {
  const navigate = useNavigate()
  return (
   <>
   <NavBar/>
    <div className="min-h-screen bg-blue-150 py-8 px-4 sm:px-6 lg:px-8">
      <button onClick={()=>navigate(-1)} className='hover:bg-blue-50 px-6 py-3 border-2 border-white text-white mt-4 my-2 rounded-xl flex gap-1 justify-center items-center ' >
       
       <MdArrowBackIos />Back
             </button>
      <div className="max-w-5xl mx-auto bg-blue-250 shadow-lg rounded-lg">
        <div className="px-6 py-8 lg:py-12">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Welcome to <span className="font-semibold">HEALTH EASE</span>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect personal information you provide during registration, appointment scheduling, or other interactions with our platform. This may include:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 leading-relaxed">
                <li>Full name, contact details, and demographic information</li>
                <li>Health records and appointment details</li>
                <li>Payment information for processing transactions</li>
                <li>Device and usage data to improve platform performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                The information we collect is used to:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 leading-relaxed">
                <li>Facilitate appointment scheduling and confirmations</li>
                <li>Provide access to medical records and healthcare services</li>
                <li>Process secure payments and transactions</li>
                <li>Enhance user experience and improve platform features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement robust security measures to protect your data, including encryption, secure session management, and regular system audits. While we strive to ensure your information is secure, no online system is entirely risk-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Data Sharing and Third Parties</h2>
              <p className="text-gray-700 leading-relaxed">
                Your personal information will never be sold. We may share your data with trusted third parties, such as healthcare providers or payment processors, strictly for the purpose of delivering our services. These third parties are required to comply with our privacy and security standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, update, or delete your personal information stored on our platform. To make such requests, please contact us using the details provided below. Note that some data may be retained for legal or operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform uses cookies and similar technologies to enhance user experience and analyze website performance. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our practices or applicable laws. Users are encouraged to review this page regularly for updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data handling practices, please contact us at:
              </p>
              <ul className="text-gray-700 leading-relaxed mt-2">
              <li>Email: <a href="mailto:healthease0027@gmail.com" className="text-blue-500 hover:underline">info@yourhospital.com</a></li>
                <li>Phone: 011 87653732</li>
                <li>Address:Health Ease 154/7 connaught place-delhi</li>
              </ul>
            </section>
          </div>

          <p className="text-sm text-gray-500 mt-8 text-center">
            &copy; {new Date().getFullYear()} HEALTH EASE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
   </>
  );
};

export default PrivacyPolicy;
