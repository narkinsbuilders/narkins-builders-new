import Head from 'next/head';
import Navigation from '@/components/navigation/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { useLightboxStore } from '@/zustand';
import { PlayIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import SEOImage from '@/components/seo-image/seo-image';
import dynamic from 'next/dynamic';
import { 
  achievements, 
  values, 
  projects, 
  hcrYoutubeVideos, 
  nbrYoutubeVideos,
  innovationFeatures,
  whyChooseUs 
} from '@/data/about-data';

const Lightbox = dynamic(() => import('@/components/lightbox/lightbox'), { ssr: false });

const AboutPage = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const openLightbox = useLightboxStore(state => state.openLightbox);

  // Combine video arrays
  const allVideos = [...hcrYoutubeVideos, ...nbrYoutubeVideos];

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative isolate overflow-hidden pt-[10rem] pb-16">
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
              <div className="bg-neutral-50 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
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
    <section className="bg-neutral-50 py-16">
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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600">The principles that guide every project we undertake</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-neutral-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
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
        className={`flex-1 ${size === "sm" ? "max-w-xs" : "max-w-md"} relative z-30`}
      >
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${status === "current" ? "border-2 border-gray-700" : ""}`}>
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
                className={`w-full ${size === "sm" ? "h-40" : "h-48"} object-cover`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <MagnifyingGlassCircleIcon className={`${size === "sm" ? "w-10 h-10" : "w-12 h-12"} text-white opacity-0 group-hover:opacity-100 transition-all duration-300`} />
              </div>
            </motion.div>
          ) : (
            <div className={`w-full ${size === "sm" ? "h-40" : "h-48"} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0v-4" />
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold text-sm">COMPLETING</span>
              </div>
            </div>
          )}
          <div className={`${size === "sm" ? "p-4" : "p-6"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`${size === "sm" ? "w-2 h-2" : "w-3 h-3"} rounded-full ${status === "current" ? "bg-gray-700 animate-pulse" : "bg-primary"}`}></div>
              <span className="text-sm font-semibold text-primary">{stage}</span>
            </div>
            <h4 className={`${size === "sm" ? "text-lg" : "text-xl"} font-bold text-gray-900 mb-2`}>{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    );

    return (
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Construction Journey</h2>
            <p className="text-lg text-gray-600">Follow the visual progression from groundbreaking to completion</p>
          </div>
          
          {/* Hill Crest Journey */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hill Crest Residency Journey</h3>
              <p className="text-gray-600">From launch to successful delivery</p>
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
                  image="/images/hill-crest-residency-launch.webp"
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
                  image="/images/hill-crest-residency-exterior-view-bahria-town-karachi.webp"
                  stage="DELIVERED"
                  title="Successfully Delivered 2024"
                  description="Modern smart apartments with premium amenities and panoramic views"
                />
              </div>
            </div>
          </div>

          {/* NBR Journey */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Narkin's Boutique Residency Journey</h3>
              <p className="text-gray-600">Construction progress timeline</p>
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
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-20">
                <JourneyStage
                  image="/images/narkins-boutique-residency-construction-september-2023.webp"
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
                  image="/images/narkins-boutique-residency-construction-march-2024.webp"
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
                  title="2025"
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
              {projects.slice(2).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary text-white px-3 py-1 rounded-lg font-semibold text-sm">
                      {project.year}
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Innovation Section
  const InnovationSection = () => (
    <section className="bg-white py-16">
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
          <div className="bg-neutral-50 p-8 rounded-lg">
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

  // Video Showcase Section
  const VideoShowcase = () => (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Videos & Tours</h2>
          <p className="text-lg text-gray-600">Watch our project tours and see what customers are saying about us</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((video, index) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl"
            >
              <a
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="relative">
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <PlayIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      video.project === 'HCR' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      {video.project}
                    </div>
                  </div>
                </div>
              </a>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600">
                  {video.project === 'HCR' ? 'Hill Crest Residency' : "Narkin's Boutique Residency"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Leadership Quote Section
  const LeadershipQuote = () => (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <svg className="w-10 h-10 mx-auto mb-6 text-gray-400" fill="currentColor" viewBox="0 0 32 32">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-xl italic font-medium text-gray-900 mb-8">
            "At Narkin's Builders, we prioritize commitment, transparency, and innovation. For over 30 years, 
            these values have fueled our success, driving us to deliver cutting-edge construction projects and 
            luxury living spaces that exceed expectations. Our transparent approach ensures our customers are 
            informed and involved, while our innovative solutions push the boundaries of what's possible."
          </blockquote>
          <figcaption className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Mr. Ashraf Nara</div>
              <div className="text-gray-600">CEO at Narkin's</div>
              <div className="text-sm text-gray-500">Narkin's Builders</div>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );

  // Diversified Business Section
  const DiversifiedBusiness = () => (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond Real Estate</h2>
          <p className="text-lg text-gray-600">Our commitment to excellence extends across multiple industries</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Estate Development</h3>
            <p className="text-gray-600 mb-4">
              Our primary focus remains on creating exceptional residential projects in Karachi's most desirable locations, 
              with specialized expertise in Bahria Town developments.
            </p>
            <div className="text-sm text-gray-500 mb-4">
              • Premium apartment complexes • Smart home technology • Luxury amenities
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Textile Manufacturing</h3>
            <p className="text-gray-600 mb-4">
              As one of Pakistan's prominent textile manufacturers, Narkin's Textile Industries operates from our 
              state-of-the-art facility in the S.I.T.E area of Karachi.
            </p>
            <div className="text-sm text-gray-500 mb-4">
              • Garment manufacturing • Retail outlets across Karachi • Quality textile products
            </div>
            <div className="flex gap-4 mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox({ src: "/images/narkins-textile-industries-manufacturing-facility.webp" })}
              >
                <SEOImage
                  src="/images/narkins-textile-industries-manufacturing-facility.webp"
                  width={120}
                  height={80}
                  className="w-[120px] h-[80px] object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <MagnifyingGlassCircleIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox({ src: "/images/narkins-builders-eastern-wear-retail-outlet.webp" })}
              >
                <SEOImage
                  src="/images/narkins-builders-eastern-wear-retail-outlet.webp"
                  width={120}
                  height={80}
                  className="w-[120px] h-[80px] object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <MagnifyingGlassCircleIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // CTA Section
  const CallToAction = () => (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest in Your Dream Home?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join hundreds of satisfied families who have made Narkin's Builders their trusted partner. 
            With Hill Crest Residency successfully delivered and Narkin's Boutique Residency completing soon, 
            now is the perfect time to secure your luxury apartment in Bahria Town Karachi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => setContactOpen(true)}
              className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get More Information
            </Button>
            <a
              href="tel:+923203243970"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Call +923203243970
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <main>
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
        <meta property="og:image" content="https://narkinsbuilders.com/images/about-hero.jpg" />
        <meta property="og:site_name" content="Narkin's Builders" />
        
        {/* Instagram/Social Media Optimization */}
        <meta name="instagram:account" content="@narkinsbuilders" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Narkin's Builders - 30+ Years of Excellence" />
        
        <link rel="canonical" href="https://narkinsbuilders.com/about" />
      </Head>
      
      <Navigation />
      <HeroSection />
      <AchievementStats />
      <CoreValues />
      <ProjectJourney />
      <InnovationSection />
      <VideoShowcase />
      <LeadershipQuote />
      <DiversifiedBusiness />
      <CallToAction />
      <Lightbox />
    </main>
  );
};

export default AboutPage;