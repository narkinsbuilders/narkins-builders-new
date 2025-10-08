import Link from 'next/link';
import Image from 'next/image';
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
       <a href="https://www.narkinsbuilders.com/" className="flex items-center">
        <Image
         src="/media/common/logos/narkins-builders-logo-30-years-experience.webp"
         className="h-[5rem] w-auto me-3"
         alt="Narkin's Builders Logo"
         width={200}
         height={80}
         quality={90}
         loading="lazy"
         sizes="200px"
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
       <h2 className="mb-6 text-sm text-gray-900 uppercase">Pages</h2>
       <ul className="text-gray-500 ">
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
       <h2 className="mb-6 text-sm text-gray-900 uppercase">Follow us</h2>
       <ul className="text-gray-500 ">
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
       <h2 className="mb-6 text-sm text-gray-900 uppercase">Legal</h2>
       <ul className="text-gray-500 ">
        <li className="mb-4">
         <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
         </Link>
        </li>
        <li>
         <Link href="/terms" className="hover:underline">
          Terms & Conditions
         </Link>
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
    <div className="relative flex flex-col sm:flex-row sm:items-center">
     <div className="flex justify-center sm:justify-start mt-4 sm:mt-0 space-x-4 sm:relative sm:z-10">
      {/* Facebook */}
      <a
       href="https://www.facebook.com/narkinsbuilders"
       className="text-gray-500 hover:text-gray-900"
      >
       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
       </svg>
       <span className="sr-only">Facebook</span>
      </a>
      
      {/* Instagram */}
      <a
       href="https://www.instagram.com/narkinsbuilders"
       className="text-gray-500 hover:text-gray-900"
      >
       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
       </svg>
       <span className="sr-only">Instagram</span>
      </a>
      
      {/* YouTube */}
      <a
       href="https://youtu.be/tT7kkMM0pz0?si=YNTU-xPd-Dy7NoZn"
       className="text-gray-500 hover:text-gray-900"
      >
       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
       </svg>
       <span className="sr-only">YouTube</span>
      </a>
      
      {/* LinkedIn */}
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
     <span className="text-sm text-gray-500 text-center mt-4 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-full">
      © 2025{" "}
      <Link href="/" className="hover:underline">
       Narkin's Builders<sup className="text-xs">™</sup>
      </Link>{" "}
      with ❤ from{" "}
      <a href="https://otherdev.com/" className="underline">
       Other Dev
      </a>
     </span>
    </div>
   </div>
  </footer>
 </div>
);

export default Footer;
