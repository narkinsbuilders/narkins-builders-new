import Navigation from "@/components/navigation/navigation";
import VideoPlayer from "@/components/video-player/video-player";
import { Tab } from "@headlessui/react";
import {
  MagnifyingGlassCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Footer from "@/components/footer/footer";
import { Lightbox } from "@/components/lightbox/lightbox";
import Link from "next/link";
import Head from "next/head";
import Map from "@/components/map/map";
import Carousel from "@/components/carousel-op/carousel-op";
import AdsCampaign from "@/components/ads-campaign/ads-campaign";

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const categories = ['2 Bed', '3 Bed', '4 Bed', 'Sky Villa Duplex'];
const cards = [
    [
        { title: '2 Bed Diamond', size: '1276 Square Feet', location: 'Jinnah View', image: "/images/Diamond HCR.png" },
        { title: '2 Bed Gold', size: '1180 Square Feet', location: 'Gold Safari View', image: "/images/Gold HCR.png" },
        { title: '2 Bed Sapphire', size: '881 Square Feet', location: 'Sapphire Safari View', image: "/images/Sapphire HCR.png" },
    ],
    [
        { title: '3 Bed Platinum', size: '1884 Feet', location: 'Jinnah View', image: "/images/Platinium HCR.png" },
    ],
    [
        { title: '4 Bed Rhodium', size: '2507 Feet', location: 'Jinnah View', image: "/images/Rhodium HCR.png" },
        { title: '4 Bed Sapphire-A', size: '1762 Feet', location: 'Safari View', image: "/images/Sapphire A 4 bed.png" },
    ],
];

export default function NarkinsBoutiqueResidency() {
    const [lightbox, setLightbox] = useState({ open: false, image: '' });
    const openLightbox = ({ image }) => setLightbox({ ...lightbox, open: true, image });
    const matches = useMediaQuery('(min-width: 768px)');
    const [amenityIndex, setAmenityIndex] = useState(0);

    return (
        <main>
            <Head>
                <title>Narkin's Boutique Residency</title>
            </Head>
            <Navigation />
            <Lightbox {...lightbox} onClose={() => setLightbox({ ...lightbox, open: false, image: '' })} />
            <div className="bg-white pt-[6rem]">
                <div className="px-4 bg-neutral-50 relative md:xl:px-0 w-full h-auto max-w-7xl z-index-0 bg-transparent mx-auto my-8 rounded-xl overflow-hidden -md:lg:rounded-none">
                    <VideoPlayer src="/nbr.mp4" poster={'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/Screenshot-32.jpg'} />
                </div>
            </div>
            <section className="bg-neutral-100 px-5 py-[4rem] lg:px-8">
                <div className="py-5 mx-auto max-w-7xl">
                    <div className="mx-auto px-6 my-5 max-w-2xl lg:mx-0">
                        <h3 className="text-3xl font-bold tracking-tight text-black sm:text-4xl capitalize">Gallery</h3>
                    </div>
                    <div className="max-w-7xl mt-5 mx-auto w-full overflow-hidden">
                        <Carousel
                            id='carousel'
                            swipe hideArrows={false} autoPlay={true} slideShow={true} loop={true}
                            hideIndicators={true} className={`w-full rounded-xl ${!matches ? 'aspect-video' : 'h-[40rem]'}`} displayMode="default"
                            dataSource={[
                                "/images/narkins_appartment_renamed_files/narkins_appartment_slide_1.png",
                                "/images/narkins_appartment_renamed_files/narkins_appartment_slide_2.png",
                                "/images/narkins_appartment_renamed_files/narkins_appartment_slide_3.png",
                                "/images/narkins_appartment_renamed_files/narkins_appartment_slide_4.png",
                            ].map((i) => ({ image: i }))}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
