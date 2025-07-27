import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/layout/navigation/navigation';
import Footer from '@/components/layout/footer/footer';

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Narkin's Builders</title>
        <meta name="description" content="Privacy policy for Narkin's Builders - protecting your personal information and data security" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20 sm:py-32 mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              How we protect and handle your personal information
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
            <span className="text-black">Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            
            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Narkin's Builders is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with our real estate projects. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We collect several types of information from and about users of our website and services:
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2 mb-4">
                <li>Full name and contact information (phone number, email address, mailing address)</li>
                <li>Financial information (income, employment details, investment capacity)</li>
                <li>Government-issued identification documents (CNIC, passport)</li>
                <li>Banking and payment information for property transactions</li>
                <li>Property preferences and investment interests</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>IP address, browser type, and operating system</li>
                <li>Website usage patterns and navigation behavior</li>
                <li>Device information and unique identifiers</li>
                <li>Cookies and tracking technologies data</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Collect Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We collect information through various methods:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Direct interactions when you contact us or fill out forms</li>
                <li>Website cookies and tracking technologies</li>
                <li>Third-party services such as Google Analytics and Google Maps</li>
                <li>Social media platforms and advertising networks</li>
                <li>Public records and databases for verification purposes</li>
                <li>Business partners and referral sources</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Provide personalized property recommendations and investment guidance</li>
                <li>Process property bookings, sales, and related transactions</li>
                <li>Communicate about our projects, offers, and market updates</li>
                <li>Conduct due diligence and verification processes</li>
                <li>Improve our website functionality and user experience</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and ensure transaction security</li>
                <li>Analyze market trends and customer preferences</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>With trusted business partners for property transactions</li>
                <li>With legal and financial advisors for due diligence</li>
                <li>With government authorities as required by law</li>
                <li>With service providers who assist in our operations</li>
                <li>In case of business merger, acquisition, or asset sale</li>
                <li>To protect our rights, property, or safety</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection best practices</li>
                <li>Incident response procedures for data breaches</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand user behavior</li>
                <li>Marketing cookies for targeted advertising</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                You can control cookies through your browser settings, though this may affect some functionality of our website.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our website integrates with third-party services that have their own privacy policies:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Google Maps for location services</li>
                <li>Social media platforms for marketing</li>
                <li>Payment processors for transactions</li>
                <li>Email marketing services</li>
                <li>Customer relationship management systems</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                We encourage you to review the privacy policies of these third-party services.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights and Choices</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Right to access and obtain copies of your personal data</li>
                <li>Right to correct inaccurate or incomplete information</li>
                <li>Right to request deletion of your personal data</li>
                <li>Right to restrict processing of your information</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to opt-out of marketing communications</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Property transaction records may be retained for longer periods as required by law.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than Pakistan for operational purposes. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Children's Privacy</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Policy</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                <li>Phone: +92-320-324-3970</li>
                <li>Email: info@narkinsbuilders.com</li>
                <li>Address: Bahria Town, Karachi, Pakistan</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                We are committed to addressing your privacy concerns promptly and professionally.
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
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-lg text-gray-300 mb-6">
              Contact our team if you have any questions about our privacy practices or your personal data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                ← Back to Home
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=923203243970&text=Hi!%20I%20have%20a%20question%20about%20your%20privacy%20policy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
    </>
  );
};

export default Privacy;