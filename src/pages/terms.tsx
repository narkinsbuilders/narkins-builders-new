import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/footer/footer'; 

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Narkin's Builders</title>
      </Head>

      <main className="bg-gray-50 py-12 px-4">
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline text-yellow-600">Home</Link> / Terms & Conditions
          </nav>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 pb-2 border-yellow-500 inline-block">
            Terms & Conditions
          </h1>

          {/* Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-[16px]">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance</h2>
              <p>
                By accessing this website, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using the site.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Intellectual Property</h2>
              <p>
                All content on this website is the property of Narkin’s Builders unless otherwise stated. Unauthorized use is prohibited.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Limitation of Liability</h2>
              <p>
                We are not liable for any damages arising from the use or inability to use the materials on our website.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Updates</h2>
              <p>
                We reserve the right to change these terms at any time without notice. Please check this page regularly.
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

      <Footer /> {/* No map */}
    </>
  );
};

export default Terms;
