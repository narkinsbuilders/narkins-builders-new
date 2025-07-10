import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/footer/footer';

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Narkin's Builders</title>
      </Head>

      <main className="bg-gray-50 py-12 px-4">
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline text-yellow-600">Home</Link> / Privacy Policy
          </nav>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 pb-2 border-yellow-500 inline-block">
            Privacy Policy
          </h1>

          {/* Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-[16px]">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Information Collection</h2>
              <p>
                We collect personal data that you voluntarily provide to us, such as your name, email, and phone number, when you contact us or fill out forms.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Use of Information</h2>
              <p>
                Your information is used strictly to improve user experience, provide customer support, and respond to inquiries. We do not sell or trade your personal data.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data. However, no digital transmission or storage is 100% secure.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Third-Party Services</h2>
              <p>
                We may use third-party tools (like Google Maps or forms) which may collect data according to their own policies.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Changes to Policy</h2>
              <p>
                We may update this privacy policy occasionally. All changes will be reflected on this page with an updated revision date.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 mt-10 border-t pt-4">
            Last updated: July 2025
          </p>

          {/* Back to Home */}
          <div className="mt-6">
            <Link
              href="/"
              className="inline-block bg-black hover:bg-gray-800 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;
