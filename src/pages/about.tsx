import Head from 'next/head';
import Navigation from '@/components/layout/navigation/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/ui/button';
import { useState } from 'react';
import Footer from '@/components/layout/footer/footer';
import Image from 'next/image';
import VideoShowcase from '@/components/features/video-showcase/video-showcase';
import { useLightboxStore } from '@/zustand';
import { PlayIcon, MagnifyingGlassCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { MdSecurity } from 'react-icons/md';
import { IoRocketSharp } from 'react-icons/io5';
import { FaAward, FaHammer } from 'react-icons/fa';
import SEOImage from '@/components/common/seo-image/seo-image';
import dynamic from 'next/dynamic';
import { 
  achievements, 
  values, 
  projects, 
  featuredVideos,
  innovationFeatures,
  whyChooseUs 
} from '@/data/about-data';

const Lightbox = dynamic(() => import('@/components/features/lightbox/lightbox'), { ssr: false });

const AboutPage = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const openLightbox = useLightboxStore(state => state.openLightbox);

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative isolate overflow-hidden pt-[10rem] pb-16" style={{backgroundColor: '#FAFAFA'}}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
              <div className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold">
                30+ Years
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium" style={{backgroundColor: '#FAFAFA'}}>
                5 Projects Delivered
              </div>
              <div className="bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
                HCR Delivered 2024
              </div>
              <div className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
                NBR Completing 2025
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              About Narkin's Builders
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Excellence meets innovation in construction and development. With a rich legacy spanning over 30 years, 
              we have established ourselves as Bahria Town Karachi's most trusted real estate partner.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Achievement Stats Section
  const AchievementStats = () => (
    <section className="py-16" style={{backgroundColor: '#FAFAFA'}}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
              <div className="text-gray-600 font-medium">{achievement.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Core Values Section  
  const CoreValues = () => (
    <section className="py-16" style={{backgroundColor: '#FAFAFA'}}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Narkin's Builders</h2>
          <p className="text-lg text-gray-600">Built on three decades of excellence and trust</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]" style={{backgroundColor: '#FAFAFA'}}>
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-6 flex items-center justify-center">
                  {value.title === 'Reliability' && <MdSecurity className="w-6 h-6 text-white" />}
                  {value.title === 'Innovation' && <IoRocketSharp className="w-6 h-6 text-white" />}
                  {value.title === 'Quality' && <FaAward className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Project Journey Section
  const ProjectJourney = () => {
    const JourneyStage = ({ image, stage, title, description, status = "completed", size = "md" }) => (
      <motion.div
        initial={{ opacity: 0, x: status === "current" ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex-1 ${size === "sm" ? "max-w-md lg:max-w-xs" : "max-w-md"} relative z-30`}
      >
        <div className={`rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden ${status === "current" ? "ring-gray-700" : "ring-gray-900/10"}`} style={{backgroundColor: '#FAFAFA'}}>
          {image ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="group relative cursor-pointer"
              onClick={() => openLightbox({ src: image })}
            >
              <SEOImage
                src={image}
                width={size === "sm" ? 300 : 400}
                height={size === "sm" ? 200 : 250}
                className={`w-full ${size === "sm" ? "h-48 lg:h-40" : "h-48"} object-cover`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <MagnifyingGlassCircleIcon className={`${size === "sm" ? "w-12 h-12 lg:w-10 lg:h-10" : "w-12 h-12"} text-white opacity-0 group-hover:opacity-100 transition-all duration-300`} />
              </div>
            </motion.div>
          ) : (
            <div className={`w-full ${size === "sm" ? "h-48 lg:h-40" : "h-48"} flex items-center justify-center`} style={{backgroundColor: '#FAFAFA'}}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaHammer className="w-8 h-8 text-white" />
                </div>
                <span className="text-primary font-semibold text-sm">COMPLETING SOON</span>
              </div>
            </div>
          )}
          <div className={`${size === "sm" ? "p-6 lg:p-4" : "p-6"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`${size === "sm" ? "w-3 h-3 lg:w-2 lg:h-2" : "w-3 h-3"} rounded-full ${status === "current" ? "bg-gray-700 animate-pulse" : "bg-primary"}`}></div>
              <span className="text-sm font-semibold text-primary">{stage}</span>
            </div>
            <h4 className={`${size === "sm" ? "text-xl lg:text-lg" : "text-xl"} font-bold text-gray-900 mb-2`}>{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    );

    return (
      <section className="py-16" style={{backgroundColor: '#FAFAFA'}}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hill Crest Residency */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hill Crest Residency</h3>
              <p className="text-gray-600">Successfully delivered flagship smart apartment project</p>
            </div>
            
            <div className="relative">
              {/* Journey Path */}
              <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 transform -translate-y-1/2 z-0">
                <svg className="w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M0 32 Q100 16 200 32 T360 32" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                    className="text-black"
                    strokeDasharray="8,4"
                  />
                  <polygon 
                    points="348,28 360,32 348,36" 
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
                <JourneyStage
                  image="/media/hcr/exterior/hill-crest-residency-launch.webp"
                  stage="LAUNCH"
                  title="Project Launch 2021"
                  description="Grand opening ceremony with community engagement and project unveiling"
                />
                
                {/* Mobile Arrow */}
                <div className="lg:hidden">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                <JourneyStage
                  image="/media/hcr/exterior/hill-crest-residency-exterior-view-bahria-town-karachi.webp"
                  stage="DELIVERED"
                  title="Successfully Delivered 2024"
                  description="Modern smart apartments with premium amenities and panoramic views"
                />
              </div>
            </div>
          </div>

          {/* NBR Progress */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Narkin's Boutique Residency</h3>
              <p className="text-gray-600">Current development nearing completion</p>
            </div>
            
            <div className="relative">
              {/* First Arrow: Foundation to Progress */}
              <div className="hidden lg:block absolute top-1/2 left-[25%] w-[17%] transform -translate-y-1/2 z-0">
                <svg className="w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M0 32 Q100 16 200 32 T360 32" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                    className="text-black"
                    strokeDasharray="8,4"
                  />
                  <polygon 
                    points="348,28 360,32 348,36" 
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </div>
              
              {/* Second Arrow: Progress to Finishing */}
              <div className="hidden lg:block absolute top-1/2 left-[58%] w-[17%] transform -translate-y-1/2 z-0">
                <svg className="w-full h-16" viewBox="0 0 400 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M0 32 Q100 16 200 32 T360 32" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                    className="text-black"
                    strokeDasharray="8,4"
                  />
                  <polygon 
                    points="348,28 360,32 348,36" 
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
                <JourneyStage
                  image="/media/nbr/exterior/narkins-boutique-residency-construction-september-2023.webp"
                  stage="FOUNDATION"
                  title="September 2023"
                  description="Foundation and structural work begins"
                  size="sm"
                />
                
                {/* Mobile Arrow */}
                <div className="lg:hidden">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                <JourneyStage
                  image="/media/nbr/exterior/narkins-boutique-residency-construction-march-2024.webp"
                  stage="PROGRESS"
                  title="March 2024"
                  description="Superstructure and facade development"
                  size="sm"
                />
                
                {/* Mobile Arrow */}
                <div className="lg:hidden">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                <JourneyStage
                  image={null}
                  stage="FINISHING"
                  title="Completing Soon"
                  description="Final touches and handover preparation"
                  status="current"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="pt-8 border-t border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Other Successful Projects</h3>
              <p className="text-gray-600">Our track record of completed developments</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(2).map((project, index) => {
                // Map project images
                const projectImages = {
                  "Classic Heights": "/media/completed-projects/classic-heights-completed-project-sharfabad-karachi.webp",
                  "Palm Residency": "/media/completed-projects/palm-residency-completed-project-frere-town-karachi.webp",
                  "Al Arz Homes": "/media/completed-projects/al-arz-homes-completed-project-narkins-builders-karachi.webp"
                };
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden" style={{backgroundColor: '#FAFAFA'}}
                  >
                    {/* Project Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group relative overflow-hidden cursor-pointer"
                      onClick={() => openLightbox({ src: projectImages[project.title] })}
                    >
                      <SEOImage
                        src={projectImages[project.title]}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <MagnifyingGlassCircleIcon className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </motion.div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {project.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Innovation Section
  const InnovationSection = () => (
    <section className="py-16" style={{backgroundColor: '#FAFAFA'}}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Innovation in Construction</h2>
            <p className="text-lg text-gray-600 mb-6">
              Hill Crest Residency successfully pioneered smart apartments in Bahria Town Karachi, setting new standards 
              with cutting-edge technology and sustainable building practices. Our current project, Narkin's Boutique Residency, 
              continues this legacy of innovation with luxury living spaces in Heritage Commercial area.
            </p>
            <div className="space-y-4">
              {innovationFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-lg" style={{backgroundColor: '#FAFAFA'}}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Narkin's Builders?</h3>
            <ul className="space-y-3 text-gray-600">
              {whyChooseUs.map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  
  // Leadership Quote Section with Facebook Video
const LeadershipQuote = () => (
  <section className="py-20" style={{backgroundColor: '#FAFAFA'}}>
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <svg className="w-8 h-8 mb-4 text-gray-400" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-lg italic font-medium text-gray-900 mb-6">
            "At Narkin's Builders, we prioritize commitment, transparency, and innovation. For over 30 years, 
            these values have fueled our success, driving us to deliver cutting-edge construction projects and 
            luxury living spaces that exceed expectations."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Mr. Ashraf Nara</div>
              <div className="text-gray-600">CEO at Narkin's</div>
              <div className="text-sm text-gray-500">Narkin's Builders</div>
            </div>
          </div>
        </motion.div>

        {/* Facebook Video Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div 
                className="relative w-full"
                style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
              >
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarkinsbuilders%2Fvideos%2F881472746899551%2F&show_text=0&width=560" 
                  style={{ 
                    border: 'none', 
                    overflow: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Watch our CEO discuss our commitment to excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

  // Diversified Business Section
const DiversifiedBusiness = () => (
  <section className="py-16" style={{backgroundColor: '#FAFAFA'}}>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond Real Estate</h2>
        <p className="text-lg text-gray-600">Our commitment to excellence extends across multiple industries</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 lg:p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]" style={{backgroundColor: '#FAFAFA'}}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Real Estate Development</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Creating exceptional residential projects in Karachi's prime locations with specialized Bahria Town expertise.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            • Premium complexes • Smart technology • Luxury amenities
          </div>
          <div className="space-y-2 lg:space-y-1">
            {/* First row - 2 images */}
            <div className="grid grid-cols-2 gap-2 lg:gap-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox({ src: "/media/common/logos/smart-apartments-reliability-narkins-builders.webp" })}
              >
                <SEOImage
                  src="/media/common/logos/smart-apartments-reliability-narkins-builders.webp"
                  width={180}
                  height={110}
                  className="w-full h-[110px] lg:h-[140px] object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <MagnifyingGlassCircleIcon className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox({ src: "/media/common/logos/smart-door-locks-narkins-apartments.webp" })}
              >
                <SEOImage
                  src="/media/common/logos/smart-door-locks-narkins-apartments.webp"
                  width={180}
                  height={110}
                  className="w-full h-[110px] lg:h-[140px] object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <MagnifyingGlassCircleIcon className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            </div>
            
            {/* Second row - 1 centered larger image */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer w-2/3 lg:w-3/4"
                onClick={() => openLightbox({ src: "/media/common/logos/smart-wifi-switches-narkins-residency.webp" })}
              >
                <SEOImage
                  src="/media/common/logos/smart-wifi-switches-narkins-residency.webp"
                  width={240}
                  height={120}
                  className="w-full h-[120px] lg:h-[150px] object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <MagnifyingGlassCircleIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="p-6 lg:p-8 rounded-3xl shadow-2xl ring-1 ring-gray-900/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]" style={{backgroundColor: '#FAFAFA'}}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Textile Manufacturing</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Leading textile manufacturer operating from our state-of-the-art S.I.T.E facility in Karachi.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            • Manufacturing • Retail outlets • Quality products
          </div>
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox({ src: "/media/common/logos/narkins-textile-industries-manufacturing-facility.webp" })}
            >
              <SEOImage
                src="/media/common/logos/narkins-textile-industries-manufacturing-facility.webp"
                width={180}
                height={110}
                className="w-full h-[110px] lg:h-[180px] object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <MagnifyingGlassCircleIcon className="w-7 h-7 lg:w-10 lg:h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox({ src: "/images/narkins-builders-eastern-wear-retail-outlet.webp" })}
            >
              <SEOImage
                src="/images/narkins-builders-eastern-wear-retail-outlet.webp"
                width={180}
                height={110}
                className="w-full h-[110px] lg:h-[180px] object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <MagnifyingGlassCircleIcon className="w-7 h-7 lg:w-10 lg:h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

  return (
    <>
      <Head>
        <title>About Narkin's Builders | 30+ Years of Excellence in Karachi Real Estate</title>
        <meta 
          name="description" 
          content="Learn about Narkin's Builders - 30+ years of real estate excellence in Karachi. Discover our commitment to quality, innovation, and customer satisfaction in Bahria Town developments." 
        />
        <meta 
          name="keywords" 
          content="Narkin's Builders about, Karachi real estate developer, Bahria Town builder, 30 years experience, construction company Karachi" 
        />
        <meta name="author" content="Narkin's Builders" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Narkin's Builders | 30+ Years of Excellence in Karachi Real Estate" />
        <meta 
          property="og:description" 
          content="Learn about Narkin's Builders - 30+ years of real estate excellence in Karachi. Discover our commitment to quality, innovation, and customer satisfaction." 
        />
        <meta property="og:url" content="https://narkinsbuilders.com/about" />
        <meta property="og:image" content="https://narkinsbuilders.com/images/narkins-builders-logo-30-years-experience.webp" />
        <meta property="og:site_name" content="Narkin's Builders" />
        
        {/* Instagram/Social Media Optimization */}
        <meta name="instagram:account" content="@narkinsbuilders" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Narkin's Builders - 30+ Years of Excellence" />
        
        <link rel="canonical" href="https://narkinsbuilders.com/about" />
      </Head>
      
      <main>
        <Navigation />
        <HeroSection />
        <CoreValues />
        <ProjectJourney />
        <InnovationSection />
        <VideoShowcase />
        <LeadershipQuote />
        <DiversifiedBusiness />
        <Lightbox />
      </main>
      
      <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
    </>
  );
};

export default AboutPage;