import { GetServerSideProps, GetStaticProps } from "next";
import { useState } from "react";

import Image from "next/image";
import BlogsSection from "@/components/features/blogs-section/blogs-section";

import Navigation from "@/components/layout/navigation/navigation";
import VideoPlayer from "@/components/features/video-player/video-player";
import Footer from "@/components/layout/footer/footer";
import { Lightbox } from "@/components/features/lightbox/lightbox";
import Link from "next/link";
import Map from "@/components/features/map/map";
import Head from "next/head";
import Carousel from "@/components/features/carousel-op/carousel-op";
import { Card, CardHeader, CardContent } from "@/components/common/ui/card"; // shadcn/ui Card
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/common/ui/tabs";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

interface PostWithCategory extends BlogPost {
  id: number;
  link: string;
  datetime: string;
  description: string;
  category: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}
import { useLightboxStore } from "@/zustand";
import { PlayIcon, MagnifyingGlassCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Testimonials from "@/components/features/testimonials/testimonials";
import { getAllPostsServer } from "@/lib/blog-server";
import SEOImage from "@/components/common/seo-image/seo-image";
import { HillCrestResidencySchema } from '@/components/common/schema/HillCrestResidencySchema';

const categories = ['2 Bed', '3 Bed', '4 Bed'];
const cards = [[
    { title: '2 Bed Diamond', size: '1276 Square Feet', location: 'Jinnah View', image: "/images/hill-crest-residency-2-bedroom-diamond-plan-1009-sqft.webp" },
    { title: '2 Bed Gold', size: '1180 Square Feet', location: 'Gold Safari View', image: "/images/hill-crest-residency-2-bedroom-gold-plan-933-sqft.webp" },
    { title: '2 Bed Sapphire', size: '881 Square Feet', location: 'Sapphire Safari View', image: "/images/hill-crest-residency-2-bedroom-sapphire-plan-697-sqft.webp" },
], [
    { title: '3 Bed Platinum', size: '1884 Square Feet', location: 'Jinnah View', image: "/images/hill-crest-residency-3-bedroom-platinum-plan-1490-sqft.webp" },
], [
    { title: '4 Bed Rhodium', size: '2594 Square Feet', location: 'Jinnah View', image: "/images/hill-crest-residency-4-bedroom-rhodium-plan-1996-sqft.webp" },
    { title: '4 Bed Sapphire-A', size: '1756 Square Feet', location: 'Safari View', image: "/images/hill-crest-residency-4-bedroom-sapphire-a-plan-1388-sqft.webp" },
]];

const amenities = [
    { 
        image: "/images/amenities/hill-crest-residency/hill-crest-residency-gym-fitness-center.webp", 
        name: "Gym",
        alt: "Hill Crest Residency modern gym and fitness center with premium equipment"
    },
    { 
        image: "/images/amenities/hill-crest-residency/hill-crest-residency-prayer-area-mosque.webp", 
        name: "Prayer Area",
        alt: "Hill Crest Residency in-house prayer area and mosque facility for residents"
    },
    { 
        image: "/images/amenities/hill-crest-residency/hill-crest-residency-steam-bath-wellness.webp", 
        name: "Steam Bath",
        alt: "Hill Crest Residency steam bath and spa wellness center for residents"
    },
    { 
        image: "/images/amenities/hill-crest-residency/hill-crest-residency-grand-lobby-reception.webp", 
        name: "Grand Lobby",
        alt: "Hill Crest Residency grand lobby and reception area with luxury finishes"
    },
];

const galleryImages = [
    "/images/hill-crest-residency-apartment-interior-living-room-luxury.webp",
    "/images/hill-crest-residency-apartment-bedroom-master-suite.webp",
    "/images/hill-crest-residency-apartment-kitchen-modern-design.webp",
    "/images/hill-crest-residency-apartment-bathroom-luxury-fixtures.webp",
    "/images/hill-crest-residency-apartment-balcony-panoramic-view.webp",
    "/images/hill-crest-residency-apartment-dining-area-modern.webp",
    "/images/hill-crest-residency-apartment-guest-bedroom.webp",
    "/images/hill-crest-residency-apartment-guest-bathroom.webp",
    "/images/hill-crest-residency-apartment-storage-area.webp",
    "/images/hill-crest-residency-apartment-entrance-lobby.webp",
    "/images/hill-crest-residency-apartment-utility-room.webp",
    "/images/hill-crest-residency-apartment-family-lounge.webp",
    "/images/hill-crest-residency-apartment-powder-room.webp",
];

const youtubeVideos = [
    { id: "TSiLOTW2s4g", title: "Tour of Hill Crest Residency", type: "youtube" },
    { id: "5zv639iO31w", title: "Luxury Living at Hill Crest", type: "youtube" },
    { id: "D5YaV4CdaxE", title: "Customer Review", type: "youtube" },
    // { id: "1P8vDFyHGu", title: "Facebook Post", type: "facebook" }, // Added Facebook post
    { id: "iNbSrOL8HD4", title: "Hill Crest Residency Walkthrough", type: "youtube" },
    { id: "cneUzaJe-Cg", title: "Why Choose Hill Crest?", type: "youtube" },
];

const testimonials = [
  {
    name: "Saad Arshad",
    stars: [true, true, true, true, "half"] as const,
    testimonial:
      "Highly committed to delivering in timelines, I wholeheartedly recommend considering investment in projects by Narkin's Builders.",
    avatar: "/images/testimonials/saad-arshad-testimonial-narkins-builders.webp",
  },
  {
    name: "Arsalan",
    stars: [true, true, true, true, true] as const,
    testimonial:
      "Smooth booking experience, very transparent throughout the process.",
    avatar: "/images/testimonials/arsalan-testimonial-narkins-builders.webp",
  },
  {
    name: "Umair Iqrar",
    stars: [true, true, true, true, "half"] as const,
    testimonial:
      "I decided to invest during the initial launch phase, and after just two years, I've seen substantial returns. It's been a fantastic investment opportunity!",
    avatar: "/images/testimonials/umair-iqrar-testimonial-narkins-builders.webp",
  },
];

const Amenities = () => {
    const [amenityIndex, setAmenityIndex] = useState(0);
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Heading and Subheading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                    Amenities in Hill Crest Residency
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore the top-notch amenities designed to enhance your living experience.
                </p>
            </div>

            {/* Amenities Grid */}
            <div className="max-w-7xl w-full mx-auto">
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {amenities.map((amenity, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="group">
                            <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10">
                                <Image
                                    src={amenity.image}
                                    alt={amenity.alt}
                                    width={500}
                                    height={300}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        {amenity.name}
                                    </span>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Carousel Section */}
            <div className="mt-16 relative h-[30rem] md:h-[35rem] lg:h-[40rem] w-full rounded-xl overflow-hidden">
                <Carousel
                    id="carousel"
                    swipe
                    autoPlay={false}
                    slideShow={false}
                    loop
                    rightToLeft
                    hideIndicators={true}
                    onChange={setAmenityIndex}
                    className="w-full h-full"
                    displayMode="default"
                    dataSource={amenities}
                />
            </div>
        </div>
    )
};

export default function HillCrestResidency({ posts }: { posts: PostWithCategory[] }) {
    const openLightbox = useLightboxStore(state => state.openLightbox);

    return (
        <main>
            <Head>
                {/* Primary Meta Tags */}
                <title>Hill Crest Residency | Luxury Apartments in Bahria Town Karachi</title>
                <meta
                    name="description"
                    content="Discover Hill Crest Residency, offering luxurious 2, 3, and 4-bedroom apartments in Bahria Town Karachi. Experience modern living with premium amenities and panoramic views."
                />
                <meta
                    name="keywords"
                    content="Hill Crest Residency, Bahria Town Karachi, luxury apartments, modern living, 2-bedroom apartments, 3-bedroom apartments, 4-bedroom apartments, premium amenities"
                />
                <meta name="author" content="Narkin's Builders" />

                {/* Open Graph / Facebook Meta Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Hill Crest Residency | Luxury Apartments in Bahria Town Karachi" />
                <meta
                    property="og:description"
                    content="Discover Hill Crest Residency, offering luxurious 2, 3, and 4-bedroom apartments in Bahria Town Karachi. Experience modern living with premium amenities and panoramic views."
                />
                <meta property="og:url" content="https://narkinsbuilders.com/hill-crest-residency" />
                <meta
                    property="og:image"
                    content="https://narkinsbuilders.com/images/narkins-builders-logo-30-years-experience.webp"
                />
                <meta property="og:site_name" content="Hill Crest Residency" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hill Crest Residency | Luxury Apartments in Bahria Town Karachi" />
                <meta
                    name="twitter:description"
                    content="Discover Hill Crest Residency, offering luxurious 2, 3, and 4-bedroom apartments in Bahria Town Karachi. Experience modern living with premium amenities and panoramic views."
                />
            </Head>
            <HillCrestResidencySchema />
            <Navigation />
            <Lightbox />
            <div className="bg-white pt-[6rem]">
                <div className="px-4 bg-neutral-50 relative md:xl:px-0 w-full h-auto max-w-7xl z-index-0 bg-transparent mx-auto my-8 rounded-xl overflow-hidden -md:lg:rounded-none">
                    <VideoPlayer src="/hillcrest.mp4" poster={'/images/hill-crest-residency-exterior-view-bahria-town-karachi.webp'} />
                </div>
                <div className="relative isolate overflow-hidden py-20 pt-5 sm:py-[28px]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-7xl">Hill Crest Residency</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-800">
                                Our Magnificent and eminent master piece is located at 29-30A Jinnah Avenue,  Just 30 seconds away and nearly 1 km drive from the main gate. We ensure a luxurious and modern lifestyle with all your necessities as well as opulence being taken care of, once you book with us a place of your own in Hill Crest.
                                <br /><br />
                                We are currently providing a variety of 2 bed and 3 bed luxury apartments along with lounge and dining that features panoramic view of the beauty of Bahria town. It will surely let you experience the lifestyle you always dreamed for your family and upcoming generations!
                            </p>
                        </div>
                    </div>
                </div>
                <section className="bg-black py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Heading and Subheading */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Explore Our Offerings
                            </h2>
                            <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
                                Discover a range of luxurious apartments designed to meet your lifestyle needs. Each offering combines elegance, comfort, and modern amenities.
                            </p>
                        </div>
                        <Tabs defaultValue={categories[0]} className="w-full mt-10">
                            {/* Tabs List */}
                            <TabsList className="flex space-x-1 gap-2 py-2 mb-5 border-b-neutral-900 rounded-xl bg-neutral-900/20">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 data-[state=active]:bg-neutral-400 data-[state=active]:text-neutral-700 data-[state=active]:shadow text-neutral-100 hover:bg-white/[0.12] hover:text-white transition-all duration-300"
                                    >
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* Tabs Content */}
                            {cards.map((items, idx) => (
                                <TabsContent key={idx} value={categories[idx]}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid mt-10 overflow-hidden min-h-[25rem] overflow-y-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {items.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                // whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                                className="group"
                                            >
                                                <Card
                                                    onClick={() => openLightbox({ src: item.image, title: item.title })}
                                                    className="bg-neutral-900 rounded-lg overflow-hidden cursor-pointer border border-neutral-800 hover:border-neutral-400 transition-all duration-300"
                                                >
                                                    <CardHeader className="relative">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            width={500}
                                                            height={300}
                                                            className="w-full h-auto rounded-t-lg"
                                                            loading={idx === 0 ? "eager" : "lazy"}
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                                            <MagnifyingGlassCircleIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="p-4">
                                                        <h1 className="text-xl font-semibold text-white">{item.title}</h1>
                                                        <p className="text-sm mt-2 text-neutral-300">
                                                            <strong>Size</strong>: {item.size}, <strong>Location</strong>: {item.location}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
                <section className="bg-white py-20">
                    <Amenities />
                </section>
                <section className="bg-neutral-100 px-5 mx-auto py-20 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {/* Gallery Heading (Optional) */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                                Gallery
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Explore the stunning visuals of Hill Crest Residency.
                            </p>
                        </div>

                        {/* Masonry Grid Gallery */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {galleryImages.map((src, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => openLightbox({ src })}
                                >
                                    <SEOImage
                                        src={src}
                                        width={500}
                                        height={300}
                                        context="gallery"
                                        index={index}
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

                        {/* Map Section (Unchanged) */}
                        <div className="mt-16">
                            <Map map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.871134778674!2d67.3134228!3d25.0044944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1714296481726!5m2!1sen!2s" />
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-100 border-t px-5 lg:px-8 py-20">
                    <Testimonials testimonials={testimonials} />
                </section>
                <section className="bg-white py-20 border-b border">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                                What Social Media is Saying
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                See what people are saying about Hill Crest Residency on YouTube and Facebook.
                            </p>
                        </div>

                        {/* Masonry Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-[minmax(200px, auto)]">
                            {youtubeVideos.map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative overflow-hidden min-h-[300px] shadow-lg hover:shadow-xl"
                                >
                                    {/* YouTube Thumbnail */}
                                    <a
                                        href={`https://youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-full"
                                    >
                                        <Image
                                            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                                            alt={video.title}
                                            width={500}
                                            height={300}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            quality={80}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute bottom-[4rem] left-4 flex items-center justify-center">
                                            <Image alt={'youtube-logo'} src="/youtube.svg" width={50} height={150 / 2} style={{ height: 'auto' }} quality={90} sizes="50px" />
                                        </div>
                                    </a>

                                    {/* Overlay with Title and Watch Now Button */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 bg-linear-to-b from-transparent to-black group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                        <a
                                            href={`https://youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        >
                                            <PlayIcon className="w-20 h-20" />
                                        </a>
                                    </div>

                                    {/* Video Title */}
                                    <div className="absolute flex items-middle bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                                        <p className="text-white text-lg font-semibold">{video.title}</p>
                                        <div className="ml-auto mt-1"><ArrowTopRightOnSquareIcon className="h-4 w-4 text-white" /></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                <BlogsSection posts={posts} />
            </div>
            <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
        </main >
    )
}
// CHANGED: Transform MDX data to match BlogsSection expected format
export const getStaticProps: GetStaticProps = async () => {
  try {
    // Get latest 3 blog posts from MDX
    const mdxPosts = getAllPostsServer().slice(0, 3);

    // Transform MDX format to match BlogsSection expected format
    const posts = mdxPosts.map((post, index) => ({
      id: index + 1,
      slug: post.slug,
      title: post.title,
      link: `/blog/${post.slug}`,
      date: post.date,
      datetime: post.date,
      description: post.excerpt,
      excerpt: post.excerpt,
      category: "Real Estate",
      image: post.image,
      author: {
        name: "Narkin's Builders",
        role: "Real Estate Expert",
        imageUrl: "/images/narkins-builders-logo-30-years-experience.webp"
      }
    }));

    return {
      props: { posts },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { props: { posts: [] } };
  }
};
