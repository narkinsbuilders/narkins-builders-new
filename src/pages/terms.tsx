import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Narkin's Builders</title>
        <meta name="description" content="Terms and conditions for Narkin's Builders - luxury property development in Bahria Town Karachi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20 sm:py-32 mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Terms & Conditions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Legal terms and conditions for using our services and website
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Terms & Conditions</span>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            
            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                By accessing and using this website, contacting us, or engaging with our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services. These terms constitute a legally binding agreement between you and Narkin's Builders.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Company Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Narkin's Builders is a registered real estate development company operating in Pakistan with over 30 years of experience in construction and property development. We specialize in luxury residential projects in Bahria Town Karachi and other premium locations.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Property Information and Representations</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All property details, floor plans, specifications, prices, payment schedules, and project timelines displayed on our website are subject to change without notice. While we strive for accuracy, all information should be verified directly with our sales team before making any investment decisions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Renderings, images, and virtual tours are for illustrative purposes only and may not represent the final constructed property. Actual specifications, finishes, and layouts may vary from those shown.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Investment Risks and Disclaimers</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Real estate investments carry inherent risks including but not limited to market fluctuations, construction delays, regulatory changes, and economic conditions. Past performance does not guarantee future results. We strongly recommend consulting with independent financial and legal advisors before making any investment decisions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Property values can increase or decrease, and investors may not recover their initial investment. Construction timelines are estimates and may be affected by various factors beyond our control.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Booking and Payment Terms</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All bookings are subject to our standard booking terms and payment schedule. A separate agreement will be executed for property purchases. Booking amounts are non-refundable except as specifically provided in the purchase agreement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Payment schedules are linked to construction milestones and may be adjusted based on project progress. Late payment charges may apply as per the purchase agreement.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                All content on this website, including but not limited to text, images, floor plans, project renderings, logos, and multimedia content, is the property of Narkin's Builders and is protected by intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Website Use and Prohibited Activities</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                You agree to use our website only for lawful purposes and in accordance with these terms. You shall not:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Use the website for any fraudulent or illegal activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Scrape or copy content without permission</li>
                <li>Impersonate our company or representatives</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Narkin's Builders shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or services. Our total liability shall not exceed the amount paid by you for our services.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Force Majeure</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We shall not be liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to acts of God, government actions, natural disasters, pandemics, war, terrorism, or other unforeseeable events.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Jurisdiction</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Karachi, Pakistan.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Privacy and Data Protection</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of your data as described in our Privacy Policy.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time without prior notice. Changes will be effective immediately upon posting on this website. Your continued use of our services after any modifications constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                For any questions regarding these Terms and Conditions, please contact us at +92-320-324-3970 or visit our office. We are committed to addressing your concerns promptly and professionally.
              </p>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: July 2025 | Version 2.0
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-black text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Invest?</h3>
            <p className="text-lg text-gray-300 mb-6">
              Contact our team for personalized guidance on your property investment journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                ← Back to Home
              </Link>
              <a
                href="tel:+923203243970"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Call Now: +92-320-324-3970
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
    </>
  );
};

export default Terms;