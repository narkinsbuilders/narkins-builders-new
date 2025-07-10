import Link from 'next/link';
import React, { FC } from 'react';

interface FooterProps {
  map: string;
}

const Footer: FC<FooterProps> = ({ map }) => (
  <div>
    <script async defer src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script>
    <footer className="bg-white border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Map in one block */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="mb-6 md:mb-0">
              <a href="https://narkinsbuilders.com/" className="flex items-center">
                <img
                  src="/images/narkins-builders-logo-30-years-experience.webp"
                  className="h-[5rem] me-3"
                  alt="Narkin's Builders Logo"
                />
              </a>
            </div>

            {/* Desktop Map (beside logo) */}
            {map && (
              <div className="hidden md:block w-full">
                <iframe
                  src={map}
                  className="w-full h-[280px] rounded-lg shadow border border-gray-200"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Page Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Pages</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/narkins-boutique-residency" className="hover:underline">
                    Narkin's Boutique Residency
                  </Link>
                </li>
                <li>
                  <Link href="/hill-crest-residency" className="hover:underline">
                    Hill Crest Residency
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="https://www.linkedin.com/company/narkins-builders-and-developers?originalSubdomain=pk" className="hover:underline">
                    LinkedIn
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://www.instagram.com/narkinsbuilders" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://www.facebook.com/narkinsbuilders" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://youtu.be/tT7kkMM0pz0?si=YNTU-xPd-Dy7NoZn" className="hover:underline">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="mailto:info@narkinsbuilders.com" className="hover:underline mailtoui">
                    info@narkinsbuilders.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile-only Map (centered below all content) */}
        {map && (
          <div className="w-full flex justify-center my-8 md:hidden">
            <iframe
              src={map}
              className="w-full max-w-2xl h-[250px] rounded-lg shadow-md border border-gray-300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        {/* Footer Bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              Narkin's Builders™
            </Link>{" "}
            — All Rights Reserved · With ❤ from{" "}
            <a href="https://otherdev.com/" className="underline">
              The Other Dev
            </a>
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
            {/* Add your social icons or keep just this LinkedIn if you like */}
            <a
              href="https://www.linkedin.com/company/narkins-builders-and-developers?originalSubdomain=pk"
              className="text-gray-500 hover:text-gray-900"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 8.2236 12.1044 7.6708 11.6968 7.26322C11.2892 6.85564 10.7364 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.61333 7.49333V6.75333H6.75333V12.3333H8.61333V9.04667C8.61333 8.53333 9.02667 8.11333 9.54 8.11333C9.78754 8.11333 10.0249 8.21167 10.2 8.3867C10.375 8.56173 10.4733 8.79913 10.4733 9.04667V12.3333H12.3333ZM4.58667 5.70667C4.88371 5.70667 5.16859 5.58867 5.37863 5.37863C5.58867 5.16859 5.70667 4.88371 5.70667 4.58667C5.70667 3.96667 5.20667 3.46 4.58667 3.46C4.28786 3.46 4.00128 3.5787 3.78999 3.78999C3.5787 4.00128 3.46 4.28786 3.46 4.58667C3.46 5.20667 3.96667 5.70667 4.58667 5.70667ZM5.51333 12.3333V6.75333H3.66667V12.3333H5.51333Z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
