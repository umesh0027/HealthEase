// import React from 'react';

// const TermsAndConditions = () => {
//   return (
    // <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
    //     <div className="px-6 py-8 lg:py-12">
    //       <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
    //         Terms and Conditions
    //       </h1>
    //       <p className="text-gray-700 leading-relaxed text-lg mb-4">
    //         Welcome to <span className="font-semibold">[Your Hospital Name]</span>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
    //       </p>

    //       <div className="mt-8 space-y-6">
    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Acceptance of Terms</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             By using this website, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree, please refrain from using our website.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">2. Medical Disclaimer</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             The information provided on this website is for general informational purposes only and does not constitute medical advice. For specific medical concerns, please consult a licensed healthcare professional.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Privacy Policy</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             We value your privacy. Please refer to our <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a> for information about how we collect, use, and protect your personal data.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Use of Website</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             You agree to use this website only for lawful purposes. Any unauthorized use, including but not limited to hacking or violating security protocols, is strictly prohibited.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Appointment Booking</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             Our online appointment booking system is intended for non-emergency cases. For medical emergencies, please contact our hospital directly or call your local emergency services.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Intellectual Property</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             All content on this website, including text, images, and logos, is the property of <span className="font-semibold">[Your Hospital Name]</span>. Unauthorized use or reproduction is prohibited.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Limitation of Liability</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             We are not responsible for any damages arising from the use of this website or the information provided herein. Use the website at your own risk.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Modifications to Terms</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             We reserve the right to update or modify these terms at any time without prior notice. Please check this page regularly for updates.
    //           </p>
    //         </section>

    //         <section>
    //           <h2 className="text-xl font-semibold text-blue-700 mb-2">9. Contact Us</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             If you have any questions about these terms and conditions, please contact us at: 
    //           </p>
    //           <ul className="text-gray-700 leading-relaxed mt-2">
    //             <li>Email: <a href="mailto:info@yourhospital.com" className="text-blue-500 hover:underline">info@yourhospital.com</a></li>
    //             <li>Phone: +1 234 567 8900</li>
    //             <li>Address: 123 Health St, Wellness City, USA</li>
    //           </ul>
    //         </section>
    //       </div>

    //       <p className="text-sm text-gray-500 mt-8 text-center">
    //         &copy; {new Date().getFullYear()} [Your Hospital Name]. All rights reserved.
    //       </p>
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default TermsAndConditions;
import React from 'react';
import NavBar from '../Component/Common/NavBar';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const TermsAndConditions = () => {
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
            Terms and Conditions
          </h1>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Welcome to <span className="font-semibold">Health Ease</span>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By using this website, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree, please refrain from using our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">2. Medical Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The information provided on this website is for general informational purposes only and does not constitute medical advice. For specific medical concerns, please consult a licensed healthcare professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We value your privacy. Please refer to our <a href="/privacy" className="text-blue-500 underline text-bold font-bold hover:underline">Privacy Policy</a> for information about how we collect, use, and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Use of Website</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to use this website only for lawful purposes. Any unauthorized use, including but not limited to hacking or violating security protocols, is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Appointment Booking</h2>
              <p className="text-gray-700 leading-relaxed">
                Our online appointment booking system is intended for non-emergency cases. For medical emergencies, please contact our hospital directly or call your local emergency services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this website, including text, images, and logos, is the property of <span className="font-semibold">Health Ease</span>. Unauthorized use or reproduction is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for any damages arising from the use of this website or the information provided herein. Use the website at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update or modify these terms at any time without prior notice. Please check this page regularly for updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these terms and conditions, please contact us at: 
              </p>
              <ul className="text-gray-700 leading-relaxed mt-2">
                <li>Email: <a href="mailto:healthease0027@gmail.com" className="text-blue-500 hover:underline">info@yourhospital.com</a></li>
                <li>Phone: 011 87653732</li>
                <li>Address: Health Ease 154/7 connaught place-delhi</li>
              </ul>
            </section>
          </div>

          <p className="text-sm text-gray-500 mt-8 text-center">
            &copy; {new Date().getFullYear()} Health Ease. All rights reserved.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;
