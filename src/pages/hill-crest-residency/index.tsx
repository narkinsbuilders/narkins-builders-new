import Navigation from "@/components/navigation/navigation";
import VideoPlayer from "@/components/video-player/video-player";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Footer from "@/components/footer/footer";
import { Lightbox } from "@/components/lightbox/lightbox";
import Link from "next/link";
import Map from "@/components/map/map";
import Head from "next/head";
import Carousel from "@/components/carousel-op/carousel-op";
import AdsCampaign from "@/components/ads-campaign/ads-campaign";

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const categories = ['2 Bed', '3 Bed', '4 Bed'];
const cards = [[
    { title: '2 Bed Diamond', size: '1276 Square Feet', location: 'Jinnah View', image: "/images/Diamond HCR.png" },
    { title: '2 Bed Gold', size: '1180 Square Feet', location: 'Gold Safari View', image: "/images/Gold HCR.png" },
    { title: '2 Bed Sapphire', size: '881 Square Feet', location: 'Sapphire Safari View', image: "/images/Sapphire HCR.png" },
], [
    { title: '3 Bed Platinum', size: '1884 Feet', location: 'Jinnah View', image: "/images/Platinium HCR.png" },
], [
    { title: '4 Bed Rhodium', size: '2507 Feet', location: 'Jinnah View', image: "/images/Rhodium HCR.png" },
    { title: '4 Bed Sapphire-A', size: '1762 Feet', location: 'Safari View', image: "/images/Sapphire A 4 bed.png" },
]];

export default function NarkinsBoutiqueResidency() {
    const [lightbox, setLightbox] = useState({
        open: false, image: ''
    });
    const openLightbox = ({ image }: { image: string }) => {
        setLightbox({ ...lightbox, open: true, image });
    }
    const [query, setQuery] = useState('')
    const matches = useMediaQuery('(min-width: 768px)');
    const [amenityIndex, setAmenityIndex] = useState(0);

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <main>
            <Head>
                <title>Hill Crest Residency</title>
            </Head>
            <Navigation />
            <Lightbox {...lightbox} onClose={() => setLightbox({ ...lightbox, open: false, image: '' })} />
            <div className="bg-white pt-[6rem]">
                <div className="px-4 bg-neutral-50 relative md:xl:px-0 w-full h-auto max-w-7xl z-index-0 bg-transparent mx-auto my-8 rounded-xl overflow-hidden -md:lg:rounded-none">
                    <VideoPlayer src="/hillcrest.mp4" poster={'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h25m05s134-1.jpg'} />
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
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid invisible grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                                {[{ name: 'Project Info', href: "#our-offerings" }].map((link) => (
                                    <Link key={link.name} className="text-black" href={link.href}>
                                        {link.name} <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                ))}
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">

                                {/* {stats.map((stat) => (
                                <div key={stat.name} className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                                </div>
                            ))} */}
                            </dl>
                        </div>
                    </div>
                </div>
                <section className=" bg-black">
                    <div className="mx-auto max-w-7xl py-[5rem] lg:px-8">
                        <div className="mx-auto px-6 max-w-2xl lg:mx-0">
                            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl capitalize">Our offerings</h3>
                        </div>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 gap-2 px-6 my-5 mb-5 border-b-neutral-900 rounded-xl bg-neutral-900/20 p-1">
                                {categories.map(category => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-neutral-400 text-neutral-700 shadow'
                                                    : 'text-neutral-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }>
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                {cards.map((items, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                    >
                                        <div className="grid mt-[5rem] overflow-hidden grid-cols-1 md:lg:grid-cols-3 gap-y-[2.5rem]">
                                            {items.map((item, index) => (
                                                <div key={index} onClick={() => openLightbox({ image: item.image })} className="hover:filter group block rounded-xl overflow-hidden hover:scale-[1.025] -hover:bg-neutral-900 hover:brightness-[110%] px-6 duration-[.5s] transition hover:duration-[.5s]">
                                                    <div
                                                        className={classNames(
                                                            'bg-neutral-900 p-3 rounded-lg group relative',
                                                            'ring-white/60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2'
                                                        )}>
                                                        <img src={item.image} alt="" className="w-full h-auto" loading={idx === 0 ? "eager" : "lazy"} />
                                                        <div className="duration-[.5s] transition group-hover:duration-[.5s] invisible group-hover:visible left-[85%] top-[85%] absolute">
                                                            <MagnifyingGlassCircleIcon width={'3rem'} height={'3rem'} color="white" />
                                                        </div>
                                                    </div>
                                                    <div className="py-2 ">
                                                        <h1 className="mt-1 text-1xl font-semibold text-white">{item.title}</h1>
                                                        {/* <p className="text-neutral-400">Our Magnificent and eminent master piece is located at 29-30A Jinnah Avenue,</p> */}
                                                        <p className="text-sm my-2 leading-4 font-medium text-white">
                                                            <strong>Size</strong>: {item.size}, <strong>Location</strong>: {item.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </section>
                <section className="bg-white py-5 mx-auto max-w-7xl py-[5rem] lg:px-8">
                    <div className="mx-auto px-6 my-5 max-w-2xl lg:mx-0">
                        <h3 className="text-3xl font-bold tracking-tight text-black sm:text-4xl capitalize">Amenities in {`Hill Crest Residency`}</h3>
                        <p className="mt-6 text-lg leading-8 text-gray-800">
                            Top-notch Amenities in our project
                        </p>
                    </div>
                    <div className="max-w-7xl w-full px-5 mx-auto overflow-hidden">
                        <ul className="col-span-3 mb-4 grid- hidden grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 xl:gap-x-8">
                            {[
                                ["https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Gym.webp", "Gym"],
                                ["http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/360_F_192497991_zopc1FKgPsa0UmnpH8cV7l0FwrqmYLCO.jpg", "Prayer Area"],
                                ["https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/steam-bath.webp", "Steam Bath"],
                                ["https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Grand-Lobby.webp", "Grand Lobby"],
                            ].map(([image, name], index) => (
                                <li key={index}>
                                    <div className="group relative before:absolute before:-inset-2.5 before:rounded-[20px] before:bg-gray-50 before:opacity-0 hover:before:opacity-100">
                                        <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10">
                                            <img
                                                src={image}
                                                alt="" loading="lazy"
                                                className="absolute inset-0 h-full w-full"
                                            />
                                        </div>
                                        <h4 className="mt-4 text-sm font-medium text-slate-900 group-hover:text-black">
                                            <div onClick={() => openLightbox({ image })} className="cursor-pointer">
                                                <span className="absolute -inset-2.5 z-10" />
                                                <span className="relative">{name}</span>
                                            </div>
                                        </h4>
                                        <p className="hidden relative mt-1.5 text-xs font-medium text-slate-500">
                                            12 components
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="relative h-full w-full">
                            <Carousel
                                id="carousel"
                                swipe
                                // hideArrows={!matches}
                                autoPlay={false}
                                slideShow={false}
                                loop
                                rightToLeft
                                hideIndicators={true} onChange={setAmenityIndex}
                                className="w-full rounded-xl h-[30rem]"
                                displayMode="default"
                                dataSource={[
                                    "/hcr-scaled/gym.jpg",
                                    "/hcr-scaled/grand-lobby.jpg",
                                    "/hcr-scaled/mosque.jpg",
                                    "/hcr-scaled/steam-bath.jpg",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Mosque-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Play-Area-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Pool-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Reception-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Steam-Bath-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Billiard-Rooms-with-title.webp",
                                    // "http://admin.narkinsbuilders.com/wp-content/uploads/2024/05/Gym-with-title.webp",
                                ].map((i, _) => ({ image: i }))}
                            />
                            <div className="p-4 px-0">
                                <h2 className="mt-2 font-bold text-lg leading-8 text-gray-800">
                                    {['Gym', 'Grand Lobby', 'Mosque', 'Steam Bath'][amenityIndex]}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-neutral-100 px-5 py-[4rem] lg:px-8">
                    <div className="py-5 mx-auto max-w-7xl">
                        <div className="mx-auto -px-6 my-5 max-w-2xl lg:mx-auto">
                            {/* <h3 className="text-3xl font-bold tracking-tight text-black sm:text-4xl capitalize">Gallery</h3> */}
                        </div>
                        <div className="max-w-7xl mt-5 mx-auto w-full overflow-hidden">
                            <Carousel
                                id='carousel'
                                swipe hideArrows={false} autoPlay={true} slideShow={true} loop={true}
                                hideIndicators={true} className={`w-full rounded-xl ${!matches ? 'aspect-video' : 'h-[40rem]'}`} displayMode="default"
                                dataSource={[
                                    // Change These

                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-30-23h21m35s735.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-30-23h26m38s830.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-30-23h28m41s223.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h43m54s456.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m02s449.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m08s928.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m28s208.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m47s413.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h25m05s134.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m19s559.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m36s758.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m44s064.jpg"
                                ].map(i => ({ image: i }))}
                            />
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                // Change These

                                [
                                    "/images/NBR_SLIDE_1.png",
                                    "/images/NBR_SLIDE_2.png",
                                    "/images/NBR_SLIDE_3.png"
                                ],
                                [
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h43m54s456.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m02s449.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m08s928.jpg"
                                ],
                                [
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m28s208.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h24m47s413.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2023-11-29-02h25m05s134.jpg"
                                ],
                                [
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m19s559.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m36s758.jpg",
                                    "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/vlcsnap-2024-01-21-01h42m44s064.jpg"
                                ]
                            ].map((images, index) => (
                                <div className="grid gap-4" key={images.join()}>
                                    {images.slice(0, 2).map((src) => <div key={src} className="px-4" onClick={() => openLightbox({ image: src })}>
                                        <img className={`h-auto max-w-full rounded-lg`} src={src} alt="" />
                                    </div>)}
                                </div>
                            ))}
                        </div>
                        {/* <AdsCampaign
                            onlyForm={false}
                            image={'http://admin.narkinsbuilders.com/wp-content/uploads/2024/06/Picture1.png'}
                            headline={"2, 3 & 4 Bedroom Luxury Apartments "}
                            features={[
                                "Main Jinnah Avenue, 2 mins from the main gate",
                                "Smart Apartments",
                                "High speed lifts, Reception area & standby generators",
                                "Gym, community hall, steam bath",
                                "Inhouse Mosque"
                            ]}
                        /> */}
                        <Map map={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.871134778674!2d67.3134228!3d25.0044944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1714296481726!5m2!1sen!2s'} />
                    </div>
                </section>
                <section className="bg-neutral-100 border-t -px-5 lg:px-8 py-[4rem]">
                    <div className="py-5 -px-5 mx-auto max-w-7xl">
                        <div className="mx-auto px-5 my-5 max-w-2xl lg:mx-0">
                            <h3 className="text-3xl font-bold tracking-tight text-black sm:text-4xl capitalize">Testimonials</h3>
                        </div>
                        <div className="grid mb-8 px-5 max-w-7xl mt-5 lg:mb-12 gap-2 gap-y-2 lg:grid-cols-2">
                            {[
                                {
                                    name: "Saad Arshad",
                                    stars: [true, true, true, true, "half"],
                                    testimonial:
                                        "Highly committed to delivering in timelines, I wholeheartedly recommend considering investment in projects by Narkin’s Builders.",
                                },
                                {
                                    name: "Arsalan",
                                    stars: [true, true, true, true, true],
                                    testimonial:
                                        "Smooth booking experience, very transparent throughout the process.",
                                },
                                {
                                    name: "Umair Iqrar",
                                    stars: [true, true, true, true, false],
                                    testimonial:
                                        "I decided to invest during the initial launch phase, and after just two years, I’ve seen substantial returns. It’s been a fantastic investment opportunity!",
                                },
                            ].map((item, index) => (
                                <figure key={index} className="flex border hover:bg-[#FAFAFA] transition transition-duration-100 cursor-pointer flex-col justify-center items-center p-8 text-center bg-white border-b border-gray-200 md:p-12 lg:border rounded-xl">
                                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500">
                                        <h3 className="text-lg font-semibold text-gray-900 -dark:text-white">

                                        </h3>
                                        <ul className="flex justify-center my-4">
                                            {item.stars.map((star, starIndex) => (
                                                <li key={starIndex}>
                                                    <i
                                                        className={`fas ${star === true
                                                            ? "fa-star text-yellow-400"
                                                            : star === "half"
                                                                ? "fa-star-half-alt text-yellow-400"
                                                                : "far fa-star text-yellow-400"
                                                            }`}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="my-4">
                                            {item.testimonial}
                                        </p>
                                    </blockquote>
                                    <figcaption className="flex justify-center items-center space-x-3">
                                        {/* <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                    alt="profile picture"
                  /> */}
                                        <div className="space-y-0.5 font-medium -dark:text-white text-left">
                                            <div>{item.name}</div>
                                            <div className="text-sm font-light text-gray-500 -dark:text-gray-400">
                                                Client
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                        {/* <div className="text-center">
            <a href="#" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 -dark:focus:ring-gray-700 -dark:bg-gray-800 -dark:text-gray-400 -dark:border-gray-600 -dark:hover:text-white -dark:hover:bg-gray-700">Show more...</a>
          </div> */}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}