import { useEffect, useRef, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
// import Script from 'next/script';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';
// import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon, Bars3Icon, BellIcon, ChartPieIcon, ChevronDownIcon, CursorArrowRaysIcon, FingerPrintIcon, PhoneIcon, PlayCircleIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Testimonials from '@/components/testimonials/testimonials';
import BlogsSection from '@/components/blogs-section/blogs-section';
import Carousel from "@/components/carousel-op/carousel-op";
// import AdsCampaign from '@/components/ads-campaign/ads-campaign';
import { useGlobalLeadFormState } from '@/zustand';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const solutions = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const videoRef = useRef(null);
  const open = useGlobalLeadFormState(state => state.open);
  const setOpen = useGlobalLeadFormState(state => state.setOpen);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsinline = true;
      // videoRef.current.play().catch(error => console.error("Video play failed", error));
    }
  }, [videoRef.current]);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{`Narkin's Builders - Home Page`}</title>
      </Head>
      <Navigation fixed={false}/>
      <style dangerouslySetInnerHTML={{
        __html: `
            .parallax {
                overflow-x: hidden;
                perspective: 1px;
          }
            .parallax-layer {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
          }
            body {
          }
            .scrollbox {
                overflow: auto;
                background-image: linear-gradient(to right, white, white), linear-gradient(to right, white, white), linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.5)), linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.5));
                background-position: left center, right center, left center, right center;
                background-repeat: no-repeat;
                background-color: white;
                background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
              /* Opera doesn't support this in the shorthand */
                background-attachment: local, local, scroll, scroll;
          }
            .scrollbox ul {
                max-width: 200%;
          }
            .scrollbox li {
                background-color: red;
                display: table-cell;
                padding: 1em;
                border: 1px solid #bebebe;
      }`}} type="text/css" />
      {/* Modal */}

      <div>
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        /> */}
        <header className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
          <div
            className="relative z-10 text-white"
          >
            <div className="mx-auto px-4">
              <div className="row">
                <div
                  className="text-center text-white"
                  style={{ marginTop: "7rem" }}
                >
                  <p className="caption hidden -lg:block">
                    <strong>Welcome to</strong>
                  </p>
                  <h2 className="text-3xl lg:text-6xl sm:text-6xl font-bold">{`Narkin's Builders`}</h2>
                  <div className="text-lg leading-8 text-gray-100">
                    Creating Iconic Living Experiences.
                  </div>
                  <div
                    className="d-flex mt-[4rem]"
                    style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="bg-white hover:bg-gray-100- text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      data-bs-toggle="modal"
                      data-bs-target="#get-more-information"
                    >
                      Get more information
                    </button>
                    <button type="button" className="btn btn-outline-light hidden">
                      Light
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <video ref={videoRef} preload='yes' pposter='/videoframe_0.png' className="max-h-screen- absolute w-auto min-w-full min-h-full filter brightness-50 max-w-none"
            loop autoPlay={true} playsInline={true} muted={true} controls={false} disablePictureInPicture>
            <source src="hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>


          {/* <video
            preload="yes" playsInline={true} controls loop={true} muted={true} autoPlay
            className="absolute z-10 w-auto min-w-full min-h-full filter brightness-[50%] max-w-none"
          >
            <source
              src="https://www.w3schools.com/html/movie.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
        </header>
      </div>
      {/* Page section example for content below the video header */}
      <section className="text-white flex overflow-hidden bg-black">
        <div className="hidden lg:flex xl:flex md:flex flex-grow w-1/2 flex-1 h--full max-w-[50vw]">
          <Carousel
            id='carousel' isNotRounded={true}
            swipe hideArrows={false} autoPlay slideShow loop rightToLeft
            hideIndicators={true} keyboard displayMode="default" interval={10000}
            dataSource={[
              "/images/NBR_SLIDE_1.png",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-33.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-34.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-35.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-36.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-37.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-38.jpg",
              "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-39.jpg"
            ].map(i => ({ image: i }))}
          />
        </div>
        <div className="max-w-7xl h-full py-[2.5rem] mx-auto px-4">
          <div className="flex flex-col pt-10 justify-center h-full md:flex-row">
            <div className="lg:hidden xl:hidden md:hidden w-full rounded">
              <Carousel
                id='carousel'
                swipe hideArrows={false} autoPlay slideShow
                hideIndicators={true} loop rightToLeft keyboard displayMode="default" interval={10000}
                dataSource={[
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-32.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-33.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-34.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-35.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-36.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-37.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-38.jpg",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-39.jpg"
                ].map(i => ({ image: i }))}
              />
            </div>
            <div className="max-w-3xl text-left- md:lg:pr-[10rem] mx-auto pb-[5rem] gap-y-2 py-10 mt-[5%]">
              <p className="caption hidden -lg:block">
                <strong>Welcome to</strong>
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{`Narkin's Boutique Residency`}</h2>
              <div className="mt-6 text-lg leading-8 text-gray-100">
                {`Narkin’s`} Boutique Residency in Bahria Town Karachi offers luxury and bespoke design in a Heritage Commercial area. With 29 floors, it features 2, 3, and 4-bedroom luxury apartments with panoramic views. Residents enjoy access to over 10 premium amenities, including fitness facilities, indoor swimming pools, and recreational areas. Experience the epitome of sophistication at Narkin’s Boutique Residency.                <br />
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                    {[{ name: 'Project Info', href: "/narkins-boutique-residency" }].map((link) => (
                      <Link key={link.name} className="text-white" href={link.href}>
                        {link.name} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Page section example for content below the video header */}
      <section className="text-white min-h-[80vh] flex items-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-04-29-01h34m42s043-scaled.webp)" }}>
        <div className="max-w-7xl mx-auto px-4 py-[5rem]">
          <div className="md:lg:hidden block w-full">
            <img src="https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-04-29-01h34m42s043-scaled.webp" alt="Hill Crest Residency" className="rounded-lg w-full min-w-[40vw]" />
          </div>
          <div className="flex flex-col justify-center h-full md:flex-row">
            <div className="max-w-3xl px-0 md:lg:px-[15px] gap-y-2 py-10 mt-[5%]">
              <p className="caption hidden -lg:block">
                <strong>Welcome to</strong>
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{`Hill Crest Residency`}</h2>
              <div className="mt-6 text-lg leading-8 text-gray-100">
                Conveniently situated just two minutes from the main gate of Bahria Town Karachi, Hill Crest Residency presents a selection of luxurious 2, 3, and 4-bedroom apartments. Schedule your free tour today and experience refined living at its finest!
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                    {[{ name: 'Project Info', href: "/hill-crest-residency" }].map((link) => (
                      <Link key={link.name} className="text-white" href={link.href}>
                        {link.name} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 ml-[5rem]">
              <img src="https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-04-29-01h34m42s043-scaled.webp" alt="Hill Crest Residency" className="rounded-lg w-full min-w-[40vw]" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-[10vh]">
        <div className="py-5 max-w-7xl px-4 mx-auto">
          <div className="row">
            <div
              className="mx-auto py-4 text-left"
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column"
              }}
            >
              {/* <div style={{ flexGrow: "1 1 auto" }} /> */}
              <p className="caption hidden">
                <strong>Welcome to</strong>
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Completed Projects</h2>
              <div className="text-lg mt-4 leading-8 text-neutral-900">
                We always deliver what we promise.
              </div>
            </div>
            <div
              className="mx-auto py-4- my-4 rounded-xl w-full mx-auto mt-5 max-w-3xl overflow-hidden"
              style={{
                display: "flex",
                paddingTop: "0rem",
                flexDirection: "column", background: 'rgb(243 244 246)', height: '80vh', maxHeight: '30rem'
              }}
            >
              <Carousel swipe autoPlay slideShow  loop rightToLeft keyboard displayMode="3d" interval={10000} dataSource={[
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/al-arz-home-scaled.webp",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/al-arz-residency-scaled.webp",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/palm-residency-scaled.webp",
                  "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-28-at-12.49.08-AM.jpeg"
                ].map(i => ({ image: i }))}></Carousel>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-black h-[60vh] pt-[10vh]'>
        <div className="py-5 max-w-7xl mx-auto px-4">
          <div className="row">
            <div
              className="col-md-12 mx-auto py-4 text-left"
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column"
              }}
            >
              <div style={{ flexGrow: "1 1 auto" }} />
              <p className="caption hidden">
                <strong>Welcome to</strong>
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted Partners</h2>
              <div className="mt-4 text-lg leading-8 text-gray-100">
                Partners that chose to work with us
              </div>
              <div className="text-gray"></div>
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".trusted-partners { -ms-overflow-style: none;  /* Internet Explorer 10+ */ scrollbar-width: none;  /* Firefox */} .trusted-partners::-webkit-scrollbar { display: none;  /* Safari and Chrome */ }"
              }}
            />
            <style
              dangerouslySetInnerHTML={{
                __html:
                  '.scroll-max-w-7xl { position: relative; overflow-x: scroll; width: 100%; background:black; }.scroll-containe-r::before, .scroll-containe-r::after { content: ""; position: absolute; top: 0; width: 20px; /* Adjust the width of the shadow as needed */ height: 100%; pointer-events: none; } .scroll-containe-r::before { left: 0; background: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1) 90%); } .scroll-containe-r::after { right: 0; background: linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1) 90%); }'
              }}
            />
            <div className="mx-auto mt-5 py-4 no-scrollbar flex overflow-x-auto snap-x gap-4 no-scrollbar">
              {[
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-02-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-03-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-01-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-08-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-09-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-06-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-05-320x202.png",
                "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-04-320x202.png"
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Trusted Partner ${index + 1}`}
                  className="inline-block snap-center rounded-lg border w-40 h-auto"
                  loading="lazy"
                />
              ))}
            </div>

          </div>
        </div>
      </section>
      <section className="bg-white">
        <Testimonials />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <symbol id="bootstrap" viewBox="0 0 118 94">
          <title>Bootstrap</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
            fill="white"
          />
        </symbol>
        <symbol id="facebook" viewBox="0 0 16 16">
          <path
            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            fill="white"
          />
        </symbol>
        <symbol id="instagram" viewBox="0 0 16 16">
          <path
            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            fill="white"
          />
        </symbol>
        <symbol id="twitter" viewBox="0 0 16 16">
          <path
            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            fill="white"
          />
        </symbol>
        <symbol id="linkedin" viewBox="0 0 16 16">
          <path
            d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 8.2236 12.1044 7.6708 11.6968 7.26322C11.2892 6.85564 10.7364 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.61333 7.49333V6.75333H6.75333V12.3333H8.61333V9.04667C8.61333 8.53333 9.02667 8.11333 9.54 8.11333C9.78754 8.11333 10.0249 8.21167 10.2 8.3867C10.375 8.56173 10.4733 8.79913 10.4733 9.04667V12.3333H12.3333ZM4.58667 5.70667C4.88371 5.70667 5.16859 5.58867 5.37863 5.37863C5.58867 5.16859 5.70667 4.88371 5.70667 4.58667C5.70667 3.96667 5.20667 3.46 4.58667 3.46C4.28786 3.46 4.00128 3.5787 3.78999 3.78999C3.5787 4.00128 3.46 4.28786 3.46 4.58667C3.46 5.20667 3.96667 5.70667 4.58667 5.70667ZM5.51333 12.3333V6.75333H3.66667V12.3333H5.51333Z"
            fill="white"
          />
        </symbol>
        <symbol id="youtube" viewBox="0 0 16 16">
          <path
            d="M6.85775 10.5578L10.3177 8.55778L6.85775 6.55778V10.5578ZM14.5644 5.33778C14.6511 5.65111 14.7111 6.07111 14.7511 6.60445C14.7977 7.13778 14.8177 7.59778 14.8177 7.99778L14.8577 8.55778C14.8577 10.0178 14.7511 11.0911 14.5644 11.7778C14.3977 12.3778 14.0111 12.7644 13.4111 12.9311C13.0977 13.0178 12.5244 13.0778 11.6444 13.1178C10.7777 13.1644 9.98441 13.1844 9.25108 13.1844L8.19108 13.2244C5.39775 13.2244 3.65775 13.1178 2.97108 12.9311C2.37108 12.7644 1.98441 12.3778 1.81775 11.7778C1.73108 11.4644 1.67108 11.0444 1.63108 10.5111C1.58441 9.97778 1.56441 9.51778 1.56441 9.11778L1.52441 8.55778C1.52441 7.09778 1.63108 6.02445 1.81775 5.33778C1.98441 4.73778 2.37108 4.35111 2.97108 4.18445C3.28441 4.09778 3.85775 4.03778 4.73775 3.99778C5.60441 3.95111 6.39775 3.93111 7.13108 3.93111L8.19108 3.89111C10.9844 3.89111 12.7244 3.99778 13.4111 4.18445C14.0111 4.35111 14.3977 4.73778 14.5644 5.33778Z"
            fill="white"
          />
        </symbol>
      </svg>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n            .bd-placeholder-img {\n            font-size: 1.125rem;\n            text-anchor: middle;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            user-select: none;\n            }\n            @media (min-width: 768px) {\n            .bd-placeholder-img-lg {\n            font-size: 3.5rem;\n            }\n            }\n            .b-example-divider {\n            width: 100%;\n            height: 3rem;\n            background-color: rgba(0, 0, 0, .1);\n            border: solid rgba(0, 0, 0, .15);\n            border-width: 1px 0;\n            box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);\n            }\n            .b-example-vr {\n            flex-shrink: 0;\n            width: 1.5rem;\n            height: 100vh;\n            }\n            .bi {\n            vertical-align: -.125em;\n            fill: currentColor;\n            }\n            .nav-scroller {\n            position: relative;\n            z-index: 2;\n            height: 2.75rem;\n            overflow-y: hidden;\n            }\n            .nav-scroller .nav {\n            display: flex;\n            flex-wrap: nowrap;\n            padding-bottom: 1rem;\n            margin-top: -1px;\n            overflow-x: auto;\n            text-align: center;\n            white-space: nowrap;\n            -webkit-overflow-scrolling: touch;\n            }\n            .btn-bd-primary {\n            --bd-violet-bg: #712cf9;\n            --bd-violet-rgb: 112.520718, 44.062154, 249.437846;\n            --bs-btn-font-weight: 600;\n            --bs-btn-color: var(--bs-white);\n            --bs-btn-bg: var(--bd-violet-bg);\n            --bs-btn-border-color: var(--bd-violet-bg);\n            --bs-btn-hover-color: var(--bs-white);\n            --bs-btn-hover-bg: #6528e0;\n            --bs-btn-hover-border-color: #6528e0;\n            --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);\n            --bs-btn-active-color: var(--bs-btn-hover-color);\n            --bs-btn-active-bg: #5a23c8;\n            --bs-btn-active-border-color: #5a23c8;\n            }\n            .bd-mode-toggle {\n            z-index: 1500;\n            }\n            .bd-mode-toggle .dropdown-menu .active .bi {\n            display: block !important;\n            }\n        "
        }}
      />
      <BlogsSection />
      <Footer />
    </>
  )
}
