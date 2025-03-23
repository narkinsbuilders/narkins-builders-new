import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';
import Testimonials from '@/components/testimonials/testimonials';
import BlogsSection from '@/components/blogs-section/blogs-section';
import dynamic from 'next/dynamic';

import { useGlobalLeadFormState } from '@/zustand';
import { GetServerSideProps } from 'next';
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { motion } from 'framer-motion'; // For animations

const Carousel = dynamic(() => import('@/components/carousel-op/carousel-op'), {
  ssr: false
});

interface Post {
  id: number;
  title: string;
  link: string;
  date: string;
  datetime: string;
  description: string;
  category: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}
const testimonials = [
  {
      name: "Saad Arshad",
      stars: [true, true, true, true, "half"],
      testimonial:
          "Highly committed to delivering in timelines, I wholeheartedly recommend considering investment in projects by Narkin’s Builders.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder avatar
  },
  {
      name: "Arsalan",
      stars: [true, true, true, true, true],
      testimonial:
          "Smooth booking experience, very transparent throughout the process.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg", // Placeholder avatar
  },
  {
      name: "Umair Iqrar",
      stars: [true, true, true, true, false],
      testimonial:
          "I decided to invest during the initial launch phase, and after just two years, I’ve seen substantial returns. It’s been a fantastic investment opportunity!",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Placeholder avatar
  },
];

export default function Index({ posts }: { posts: Post[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const setOpen = useGlobalLeadFormState((state: { setOpen: any }) => state.setOpen);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.play().catch((error) => console.error('Video play failed', error));
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Narkin&apos;s Builders - Home Page</title>
      </Head>
      <Navigation fixed={false} />
      <div>
        <header className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
          <div className="relative z-10 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto px-4"
            >
              <p className="caption hidden lg:block text-lg font-semibold">
                <strong>Welcome to</strong>
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold mt-4">Narkin&apos;s Builders</h1>
              <p className="text-lg lg:text-xl mt-4 text-gray-100">Creating Iconic Living Experiences.</p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get More Information
                </Button>
              </div>
            </motion.div>
          </div>
          <video
            ref={videoRef}
            preload="yes"
            poster="/videoframe_0.webp"
            className="max-h-screen absolute w-auto min-w-full min-h-full filter brightness-50 max-w-none"
            loop
            autoPlay
            playsInline
            muted
            controls={false}
            disablePictureInPicture
          >
            <source src="/C_Narkins_Exterior.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </header>
      </div>

      {/* Narkin's Boutique Residency Section */}
      <section className="text-white flex overflow-hidden bg-black">
        <div className="hidden lg:flex xl:flex md:flex flex-grow w-1/2 flex-1 h-full max-w-[50vw]">
          <Carousel
            id="carousel"
            isNotRounded
            swipe
            hideArrows={false}
            autoPlay
            slideShow
            loop
            rightToLeft
            hideIndicators
            keyboard
            displayMode="default"
            interval={10000}
            dataSource={[
              '/images/NBR_SLIDE_1.webp',
              '/images/NBR_SLIDE_2.webp',
              '/images/NBR_SLIDE_3.webp',
              '/images/NBR_SLIDE_4.webp',
            ].map((i) => ({ image: i }))}
          />
        </div>
        <div className="max-w-7xl h-full py-[2.5rem] mx-auto px-4">
          <div className="flex flex-col pt-10 justify-center h-full md:flex-row">
            <div className="lg:hidden xl:hidden md:hidden w-full rounded">
              <Carousel
                id="carousel"
                swipe
                hideArrows={false}
                autoPlay
                slideShow
                hideIndicators
                loop
                rightToLeft
                keyboard
                displayMode="default"
                interval={10000}
                dataSource={[
                  '/images/NBR_SLIDE_1.webp',
                  '/images/NBR_SLIDE_2.webp',
                  '/images/NBR_SLIDE_3.webp',
                  '/images/NBR_SLIDE_4.webp',
                ].map((i) => ({ image: i }))}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-left md:lg:pr-[10rem] mx-auto pb-[5rem] gap-y-2 py-10 mt-[5%]"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Narkin&apos;s Boutique Residency
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Narkin&apos;s Boutique Residency in Bahria Town Karachi offers luxury and bespoke design in a Heritage
                Commercial area. With 29 floors, it features 2, 3, and 4-bedroom luxury apartments with panoramic views.
                Residents enjoy access to over 10 premium amenities, including fitness facilities, indoor swimming pools,
                and recreational areas. Experience the epitome of sophistication at Narkin&apos;s Boutique Residency.
              </p>
              <div className="mt-10">
                <Link href="/narkins-boutique-residency">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                    Project Info <span aria-hidden="true">&rarr;</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hill Crest Residency Section */}
      <section
        className="text-white min-h-[80vh] flex items-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/hcr_new-scaled.webp')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-[5rem]">
          <div className="md:lg:hidden block w-full">
            <img
              src="/images/hcr_new.webp"
              alt="Hill Crest Residency"
              className="rounded-lg w-full min-w-[40vw]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center h-full md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl px-0 md:lg:px-[15px] gap-y-2 py-10 mt-[5%]"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Hill Crest Residency</h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Conveniently situated just two minutes from the main gate of Bahria Town Karachi, Hill Crest Residency
                presents a selection of luxurious 2, 3, and 4-bedroom apartments. Schedule your free tour today and
                experience refined living at its finest!
              </p>
              <div className="mt-10">
                <Link href="/hill-crest-residency">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                    Project Info <span aria-hidden="true">&rarr;</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="hidden md:block md:w-1/2 ml-[5rem]">
              <img
                src="/images/hcr_new.webp"
                alt="Hill Crest Residency"
                className="rounded-lg w-full min-w-[40vw]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="bg-gray-100 py-[10vh]">
        <div className="py-5 max-w-7xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="row"
          >
            <div className="mx-auto py-4 text-left">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Completed Projects</h2>
              <p className="text-lg mt-4 leading-8 text-neutral-900">
                At Narkins Builders & Developers, we deliver what we commit.
              </p>
            </div>
            <div className="mx-auto py-4 my-4 rounded-xl w-full max-w-3xl overflow-hidden">
              <Carousel
                swipe
                autoPlay
                slideShow
                loop
                rightToLeft
                keyboard
                displayMode="3d"
                interval={10000}
                dataSource={[
                  '/images/al-arz-residency-scaled.webp',
                  '/images/al-arz-home-scaled.webp',
                  '/images/palm-residency-scaled.webp',
                  '/images/Sharfabad_resized.webp',
                ].map((i) => ({ image: i }))}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="bg-black h-[60vh] pt-[10vh]">
        <div className="py-5 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="row"
          >
            <div className="col-md-12 mx-auto py-4 text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted Partners</h2>
              <p className="mt-4 text-lg leading-8 text-gray-100">Partners that chose to work with us</p>
            </div>
            <div className="mx-auto mt-5 py-4 no-scrollbar flex overflow-x-auto snap-x gap-4 no-scrollbar">
              {[
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-02-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-03-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-01-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-08-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-09-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-06-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-05-320x202.webp',
                'https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-04-320x202.webp',
              ].map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt={`Trusted Partner ${index + 1}`}
                  className="inline-block snap-center rounded-lg border w-40 h-auto hover:scale-105 transition-all duration-300"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white border-t px-5 lg:px-8 py-20">
        <Testimonials testimonials={testimonials} />
      </section>

      {/* Blogs Section */}
      <BlogsSection posts={posts} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('https://admin.narkinsbuilders.com/wp-json/wp/v2/posts?per_page=3');
    const data = await response.json();

    const posts: Post[] = data.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      link: post.link,
      date: new Date(post.date).toLocaleDateString(),
      datetime: post.date,
      description: post.excerpt.rendered,
      category: post.categories?.[0] || 'Uncategorized',
      author: {
        name: post._embedded?.author?.[0]?.name || 'Unknown',
        role: post._embedded?.author?.[0]?.description || '',
        imageUrl: post._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
      },
    }));

    return {
      props: { posts },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { props: { posts: [] } };
  }
};