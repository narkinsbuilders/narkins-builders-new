import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';
import Testimonials from '@/components/testimonials/testimonials';
import BlogsSection from '@/components/blogs-section/blogs-section';
import dynamic from 'next/dynamic';
import Image from "next/image";

import { useGlobalLeadFormState, useLightboxStore } from '@/zustand';
import { GetServerSideProps } from 'next';
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { motion } from 'framer-motion'; // For animations

const Lightbox = dynamic(() => import('@/components/lightbox/lightbox'), { ssr: false });
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
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder avatar
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
  const openLightbox = useLightboxStore(state => state.openLightbox);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Narkin&apos;s Builders - Home Page</title>
      </Head>
      <Navigation fixed={true} />
      <div>
        <header className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto px-4"
            >
              <p className="text-lg font-semibold text-neutral-300">Welcome to</p>
              <h1 className="text-4xl lg:text-6xl font-bold mt-4 text-white">
                Narkin&apos;s Builders
              </h1>
              <p className="text-lg lg:text-xl mt-4 text-white">
                Creating Iconic Living Experiences.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  onClick={() => setOpen(true)}
                  className="border bg-primary border-white text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get More Information
                </Button>
              </div>
            </motion.div>
          </div>
          <video
            preload="yes"
            poster="/videoframe_0.webp"
            className="max-h-screen absolute w-auto min-w-full min-h-full object-cover brightness-50"
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
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carousel for Desktop */}
          <div className="hidden lg:block">
            <Carousel
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Heading */}
            <div className="text-left mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Narkin&apos;s Boutique Residency
              </h2>
              <p className="mt-4 text-lg text-neutral-300">
                Narkin&apos;s Boutique Residency in Bahria Town Karachi offers luxury and bespoke design in a Heritage
                Commercial area. With 20 floors, it features 2, 3, and 4-bedroom luxury apartments with panoramic views.
                Residents enjoy access to over 10 premium amenities, including fitness facilities, indoor swimming pools,
                and recreational areas. Experience the epitome of sophistication at Narkin&apos;s Boutique Residency.
              </p>
            </div>
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link href="/narkins-boutique-residency">
                Project Info <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </motion.div>

          {/* Carousel for Mobile */}
          <div className="lg:hidden">
            <Carousel
              swipe
              hideArrows={false}
              autoPlay
              slideShow
              hideIndicators
              loop
              rightToLeft
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
        </div>
      </section>

      {/* Hill Crest Residency Section */}
      <section className="relative flex items-center justify-center bg-cover bg-center bg-fixed">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hcr_new-scaled.webp')" }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto py-10 px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Hill Crest Residency
              </h2>
              <p className="mt-4 text-lg text-neutral-300">
              Conveniently located just a minute drive from the main entrance of Bahria Town Karachi, Hill Crest Residency offers an exceptional living experience with a selection of spacious and thoughtfully designed 2, 3, and 4-bedroom luxury apartments. Nestled in a prime and rapidly developing area, 
              the complex combines comfort, elegance, and modern amenities to create a lifestyle that’s both refined and relaxing. 
               Schedule your free tour today and discover what elevated living truly feels like.
              </p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/hill-crest-residency">
                  Project Info <span aria-hidden="true">&rarr;</span>
                </Link>
              </Button>
            </motion.div>

            {/* Image for Desktop */}
            <div className="hidden-lg:block">
              <Image
                src="/images/hcr_new.webp"
                alt="Hill Crest Residency"
                width={800}
                height={600}
                className="rounded-lg"
                priority
              />
              {/* Masonry Grid Gallery */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "/images/hcr_appartment/hcr_apartment_slide_1.webp",
                  "/images/hcr_appartment/hcr_apartment_slide_2.webp",
                  "/images/hcr_appartment/hcr_apartment_slide_3.webp",
                  "/images/hcr_appartment/hcr_apartment_slide_4.webp",].map((src, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => openLightbox({ src })}
                    >
                      <Image
                        src={src}
                        alt={`Gallery Image ${index + 1}`}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                          View
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <CompletedProjects />
      </section>
      {/* Trusted Partners Section */}
      <section className="bg-neutral-50 border-t py-16">
        <TrustedPartners />
      </section>

      {/* Testimonials Section */}
      <section className="bg-white border-t px-5 lg:px-8 py-20">
        <Testimonials testimonials={testimonials} />
      </section>
      <section className='bg-white border-b px-4 lg:px-8 py-20 w-full'>
        <div className="ml-auto">
          <figure className="max-w-screen-md ml-auto text-right">
            <svg className="w-10 h-10 mr-auto mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900">
                "At Narkin's Builders, we prioritize commitment, transparency, and innovation. For over 30 years, these values have fueled our success, driving us to deliver cutting-edge construction projects and luxury living spaces that exceed expectations. Our transparent approach ensures our customers are informed and involved, while our innovative solutions push the boundaries of what's possible. Thank you for choosing Narkin's Builders as your trusted partner in building your dream home."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-end mt-6 space-x-3 rtl:space-x-reverse">
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                <cite className="pe-3 font-medium text-gray-900">Mr. Ashraf Nara</cite>
                <cite className="ps-3 text-sm text-gray-500">CEO at Narkin's</cite>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Blogs Section */}
      <BlogsSection posts={posts} />

      {/* Footer */}
      <Footer />
      <Lightbox />
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

export function CompletedProjects() {
  const projects = [
    {
      image: "/images/Al Arz Terrace.webp",
      title: "Al Arz Terrace",
      description: "Luxury living with panoramic views.",
    },
    {
      image: "/images/Al Arz Homez.webp",
      title: "Al Arz Home",
      description: "Elegant designs for modern families.",
    },
    {
      image: "/images/Ferere Town Project.webp",
      title: "Palm Residency",
      description: "Tranquil surroundings with premium amenities.",
    },
    {
      image: "/images/Sharfabad_resized.webp",
      title: "Sharfabad Residency",
      description: "A blend of tradition and modernity.",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Completed Projects
        </h2>
        <p className="mt-4 text-lg text-neutral-700">
          At Narkins Builders & Developers, we deliver what we commit.
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-white">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export function TrustedPartners() {
  const partners = [
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-02-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-03-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-01-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-08-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/02/Trusted-Partners-09-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-06-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-05-320x202.png",
    "https://gromotions.com/narkin/wp-content/uploads/2024/01/Trusted-Partners-04-320x202.png",
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Our Trusted Partners
        </h2>
        <p className="mt-4 text-lg text-neutral-700">
          Partners that chose to work with us
        </p>
      </motion.div>

      {/* Partner Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="flex items-center justify-center p-0 bg-neutral-700 rounded-lg hover:bg-neutral-700 transition-all duration-300"
          >
            <Image
              src={src}
              alt={`Trusted Partner ${index + 1}`}
              width={160}
              height={100}
              className="w-full border h-auto rounded-lg object-contain grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}