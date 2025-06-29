import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";
import Head from "next/head";
import { Fragment } from "react";

const Inovations = ['Reliability', 'Smart Door Locks', 'Smart Switches'];
export default function AboutUs() {
    return (
        <Fragment>
            <Head>
                <title>About {`Narkin\'s Builders`}</title>
            </Head>
            <Navigation />
            <div className={"mt-[10rem]"}>
                <div className="mx-auto max-w-7xl pb-[5rem] gap-y-2 flex flex-col px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold mb-[4rem] tracking-tight text-gray-900 sm:text-7xl">About {`Narkin's Builders`}</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Welcome to Narkin's Builders, our excellence meets innovation in construction and development. With a rich legacy spanning over 30 years, we have established ourselves as a leading name in the real estate development industry in Karachi, Pakistan.
                            <br /><br />
                        </p>
                    </div>
                    <div className="py-[5rem]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:max-xl:grid-cols-3 gap-4">
                            {[
                                // "/images/hill-crest-residency-construction-progress-2024.webp",
                                // "/images/hill-crest-residency-launch-ceremony-2021.webp",
                                // "/images/narkins-boutique-residency-construction-march-2024.webp",
                                // "/images/narkins-boutique-residency-construction-september-2023.webp",
                                "/images/smart-apartments-reliability-narkins-builders.webp",
                                "/images/smart-door-locks-narkins-apartments.webp",
                                "/images/smart-wifi-switches-narkins-residency.webp",
                            ].map((image, index) => (
                                <div key={image} className="group">
                                    <img src={image} className="hover:brightness-75 transition duration-[0.5s] border cursor-pointer filter w-full h-auto bg-neutral-100 object-cover rounded-lg" />
                                    <p className="text-lg my-2 font-medium text-gray-900">
                                        {Inovations[index]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:max-xl:grid-cols-3 gap-4">
                            {[
                                "/images/hill-crest-residency-construction-progress-2024.webp",
                                "/images/hill-crest-residency-launch-ceremony-2021.webp",
                                // "/images/narkins-boutique-residency-construction-march-2024.webp",
                                // "/images/narkins-boutique-residency-construction-september-2023.webp",
                            ].map((image, index) => (
                                <div key={image} className="group">
                                    <img src={image} className="hover:brightness-75 transition duration-[0.5s] border cursor-pointer filter w-full h-auto bg-neutral-100 object-cover rounded-lg" />
                                    <p className="text-lg my-2 font-medium text-gray-900">
                                        {Inovations[index]}
                                    </p>
                                </div>
                            ))}
                        </div> */}
                    <div className="py-[5rem] ml-auto">
                        <figure className="max-w-screen-md mx-auto text-right">
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
                </div>
                <div className="bg-white py-[5rem] border-t border-b-">
                    <div className="mx-auto max-w-7xl gap-y-2 flex flex-col px-6 lg:px-8">
                        <h3 className="text-3xl font-bold mb-[1rem] tracking-tight text-gray-900 sm:text-5xl">
                            Hill Crest Residency Journey
                        </h3>
                        <p className="mt-2 text-lg mb-[5rem] leading-8 text-gray-600 max-w-2xl">
                            Hill Crest Residency is an example of our commitment in terms of timeline, quality and customer satisfaction. Hill Crest Residency has also pioneered smart apartments in Bahria Town Karachi. Over the years, we have successfully delivered 5 high-rise projects in the most prime areas of Karachi, each showcasing our dedication to craftsmanship and attention to detail.
                        </p>
                        <div className="grid grid-cols-1 md:lg:grid-cols-2 gap-4">
                            <img src={"/images/hill-crest-residency-launch-ceremony-2021.webp"} className="hidden md:lg:block w-full h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                            <p className="text-lg my-2 font-medium text-gray-900 py-[1rem] hidden md:lg:block">
                                Hill Crest Residency Launch <i>2021</i>
                            </p>
                            <p className="text-lg my-2 font-medium text-gray-900 py-[1rem] hidden md:lg:block">
                                Hill Crest Residency Completion <i>2025</i>
                            </p>
                            <img src={"/images/hill-crest-residency-exterior-view-bahria-town-karachi.webp"} className="w-full hidden md:lg:block h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                            <div className="flex flex-col items-center md:lg:hidden">
                                <img src={"/images/hill-crest-residency-launch-ceremony-2021.webp"} className="w-full h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                                <p className="text-lg my-2 font-medium text-gray-900 px-[1rem]">
                                    Hill Crest Residency Completion <i>2025</i>
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:lg:hidden">
                                <img src={"/images/hill-crest-residency-construction-progress-2024.webp"} className="w-full bg-neutral-100 h-auto rounded-xl cursor-pointer" />
                                <p className="text-lg my-2 font-medium text-gray-900 px-[1rem]">
                                    Hill Crest Residency Launch <i>2021</i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-100 border-b py-[5rem]">
                    <div className="mx-auto max-w-7xl gap-y-2 flex flex-col px-6 lg:px-8">
                        <h3 className="text-3xl font-bold mb-[1rem] tracking-tight text-gray-900 sm:text-5xl">
                            Narkin{"'"}s Boutique Residency Journey
                        </h3>
                        <p className="mt-2 text-lg mb-[5rem] leading-8 max-w-2xl text-gray-600">
                            Narkin's Boutique Residency exemplifies our dedication to timely delivery, exceptional quality, and customer satisfaction. Just as Hill Crest Residency pioneered smart apartments in Bahria Town Karachi, Narkin's Boutique Residency continues this legacy of innovation and excellence. Over the years, we have successfully completed five high-rise projects in prime locations across Karachi, each reflecting our commitment to superior craftsmanship and meticulous attention to detail.
                        </p>
                        <div className="grid grid-cols-1 md:lg:grid-cols-2 gap-4">
                            <img src={"/images/narkins-boutique-residency-construction-september-2023.webp"} className="hidden md:lg:block w-full h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                            <p className="text-lg my-2 font-medium text-gray-900 py-[1rem] hidden md:lg:block">
                                Narkin’s Boutique Residency <i>September 2023</i>
                            </p>
                            <p className="text-lg my-2 font-medium text-gray-900 py-[1rem] hidden md:lg:block">
                                Narkin’s Boutique Residency <i>March 2024</i>
                            </p>
                            <img src={"/images/narkins-boutique-residency-construction-march-2024.webp"} className="w-full hidden md:lg:block h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                            <div className="flex flex-col items-center md:lg:hidden">
                                <img src={"/images/narkins-boutique-residency-construction-september-2023.webp"} className="w-full h-auto bg-neutral-100 rounded-xl cursor-pointer" />
                                <p className="text-lg my-2 font-medium text-gray-900 px-[1rem]">
                                    Narkin’s Boutique Residency <i>September 2023</i>
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:lg:hidden">
                                <img src={"/images/narkins-boutique-residency-construction-march-2024.webp"} className="w-full bg-neutral-100 h-auto rounded-xl cursor-pointer" />
                                <p className="text-lg my-2 font-medium text-gray-900 px-[1rem]">
                                    Narkin’s Boutique Residency <i>March 2024</i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="bg-neutral-100 border-t py-[5rem]">
                    <div className="mx-auto max-w-7xl gap-y-2 flex flex-col px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold mb-[1rem] tracking-tight text-gray-900 sm:text-5xl">A story of reliability</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Hill Crest Residency is an example of our commitment in terms of timeline, quality and customer satisfaction. Hill Crest Residency has also pioneered smart apartments in Bahria Town Karachi. Over the years, we have successfully delivered 5 high-rise projects in the most prime areas of Karachi, each showcasing our dedication to craftsmanship and attention to detail.
                            </p>
                        </div>
                        <div className="my-[5rem] relative max-w-4xl mx-auto" style={{ width: '100%', paddingBottom: '40.25%' }}>
                            <iframe
                                src="https://www.facebook.com/plugins/video.php?height=1080&href=https%3A%2F%2Fwww.facebook.com%2Fnarkinsbuilders%2Fvideos%2F881472746899551%2F&show_text=false&width=1920&t=0"
                                className="absolute top-0 left-0 w-full h-full border rounded-xl overflow-hidden"
                                style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }}
                                scrolling="no"
                                frameborder="0"
                                allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                allowFullScreen="true">
                            </iframe>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-[5rem]">
                    <div className="mx-auto max-w-7xl gap-y-2 flex flex-col px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold mb-[1rem] tracking-tight text-gray-900 sm:text-5xl">Narkin's Textile Industries</h2>
                            <div className="mx-auto=max-w-2xl=lg:mx-0">
                                <p className="mt-2 text-lg leading-8 text-gray-600">Narkin's is also a prominent player in the textile industry. As one of the largest manufacturers of garments in Pakistan, we have retail outlets spread across Karachi. Our manufacturing factory, Narkin's Textile Industries, located in the S.I.T.E area of Karachi, is a testament to our commitment to excellence and innovation across industries.</p>
                                {/* <p className="mt-4 text-lg leading-8 text-gray-600">Narkin's Builders continues to push the boundaries of construction and development in Karachi. We invite you to experience the Narkin's difference—where quality, reliability, and innovation converge to create exceptional living spaces.</p> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:lg:grid-cols-2 py-[5rem] gap-4">
                            <img src="/images/narkins-builders-eastern-wear-retail-outlet.webp" className="w-full h-full object-cover rounded-xl" />
                            <img src="/images/narkins-textile-industries-manufacturing-facility.webp" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <div className="mx-auto=max-w-2xl=lg:mx-0">
                                <p className="mt-4 text-lg leading-8 text-gray-600">Narkin's Builders continues to push the boundaries of construction and development in Karachi. We invite you to experience the Narkin's difference—where quality, reliability, and innovation converge to create exceptional living spaces.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </Fragment>
    )
}
