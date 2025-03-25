import Link from 'next/link';
import React, { FC } from 'react';

interface FooterProps {
  map: string
}

const Footer: FC<FooterProps> = ({ map }) => (
  <div>
    <script async defer src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"></script>
    <footer className="bg-white border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://narkinsbuilders.com/" className="flex items-center">
              <img
                src="/images/narkins_logo.webp"
                className="h-[5rem] me-3"
                alt="FlowBite Logo"
              />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap -dark:text-white">
                {`Narkin's Builders`}
              </span> */}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase -dark:text-white">
                Pages
              </h2>
              <ul className="text-gray-500 -dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/narkins-boutique-residency" className="hover:underline">
                    {`Narkin's Boutique Residency`}
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
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase -dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 -dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/company/narkins-builders-and-developers?originalSubdomain=pk"
                    className="hover:underline "
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/narkinsbuilders"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.facebook.com/narkinsbuilders"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li className='mb-4'>
                  <a
                    href="https://youtu.be/tT7kkMM0pz0?si=YNTU-xPd-Dy7NoZn"
                    className="hover:underline"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@narkinsbuilders.com"
                    className="hover:underline mailtoui"
                  >
                    info@narkinsbuilders.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase -dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 -dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {map && <iframe src={map} className="border rounded-xl my-5 mt-[5rem]" height="600" style={{ width: '100%' }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>}
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center -dark:text-gray-400">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              {`Narkin's Builders`}™
            </Link>
            {' '}—All Rights Reserved · With ❤ from  <a href="https://otherdev.com/" className='underline'>The Other Dev</a>
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://www.facebook.com/narkinsbuilders"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            {/* <a
              href="#"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a> */}
            <a
              href="https://www.linkedin.com/company/narkins-builders-and-developers?originalSubdomain=pk"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white ms-5"
            >
              <svg id="linkedin" viewBox="0 0 16 16"
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor">
                <path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 8.2236 12.1044 7.6708 11.6968 7.26322C11.2892 6.85564 10.7364 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.61333 7.49333V6.75333H6.75333V12.3333H8.61333V9.04667C8.61333 8.53333 9.02667 8.11333 9.54 8.11333C9.78754 8.11333 10.0249 8.21167 10.2 8.3867C10.375 8.56173 10.4733 8.79913 10.4733 9.04667V12.3333H12.3333ZM4.58667 5.70667C4.88371 5.70667 5.16859 5.58867 5.37863 5.37863C5.58867 5.16859 5.70667 4.88371 5.70667 4.58667C5.70667 3.96667 5.20667 3.46 4.58667 3.46C4.28786 3.46 4.00128 3.5787 3.78999 3.78999C3.5787 4.00128 3.46 4.28786 3.46 4.58667C3.46 5.20667 3.96667 5.70667 4.58667 5.70667ZM5.51333 12.3333V6.75333H3.66667V12.3333H5.51333Z"></path>
              </svg>
              <span className="sr-only">LinkedIn account</span>
            </a>

            <a
              href="https://www.instagram.com/narkinsbuilders/&ved=2ahUKEwjm_dfDzNOFAxWcVfEDHVtLDiEQjjh6BAgREAE&usg=AOvVaw2nXeQp104b03-X7rNMqVEb"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white ms-5"
            >
              <svg id="instagram" viewBox="0 0 16 16"
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
              </svg>
              <span className="sr-only">Instagram Account</span>
            </a>
            <a
              href="https://youtu.be/tT7kkMM0pz0?si=YNTU-xPd-Dy7NoZn"
              className="text-gray-500 hover:text-gray-900 -dark:hover:text-white ms-5"
            >
              <svg id="youtube" viewBox="0 0 16 16" className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor">
                <path d="M6.85775 10.5578L10.3177 8.55778L6.85775 6.55778V10.5578ZM14.5644 5.33778C14.6511 5.65111 14.7111 6.07111 14.7511 6.60445C14.7977 7.13778 14.8177 7.59778 14.8177 7.99778L14.8577 8.55778C14.8577 10.0178 14.7511 11.0911 14.5644 11.7778C14.3977 12.3778 14.0111 12.7644 13.4111 12.9311C13.0977 13.0178 12.5244 13.0778 11.6444 13.1178C10.7777 13.1644 9.98441 13.1844 9.25108 13.1844L8.19108 13.2244C5.39775 13.2244 3.65775 13.1178 2.97108 12.9311C2.37108 12.7644 1.98441 12.3778 1.81775 11.7778C1.73108 11.4644 1.67108 11.0444 1.63108 10.5111C1.58441 9.97778 1.56441 9.51778 1.56441 9.11778L1.52441 8.55778C1.52441 7.09778 1.63108 6.02445 1.81775 5.33778C1.98441 4.73778 2.37108 4.35111 2.97108 4.18445C3.28441 4.09778 3.85775 4.03778 4.73775 3.99778C5.60441 3.95111 6.39775 3.93111 7.13108 3.93111L8.19108 3.89111C10.9844 3.89111 12.7244 3.99778 13.4111 4.18445C14.0111 4.35111 14.3977 4.73778 14.5644 5.33778Z"></path>
              </svg>
              <span className="sr-only">Youtube account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
