import Navigation from "@/components/navigation/navigation";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Footer from "@/components/footer/footer";
import { Lightbox } from "@/components/lightbox/lightbox";
import Link from "next/link";
import Head from "next/head";
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

const categories = ['Palm Residency', 'AL Arz Terrace', 'AL Arz Homes', 'Classic Homes'];
const maps = [
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4969.01853943289!2d67.03531127649141!3d24.840302377942507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dd1d40d2655%3A0x966d0cdb327565c0!2sPearl%20Apartment!5e1!3m2!1sen!2s!4v1714414122232!5m2!1sen!2s',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4967.554989137014!2d67.03420337649223!3d24.876732177918772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5c5fea0781%3A0x49dd2ea8b9422ee6!2sAl-Arz%20Terrace!5e1!3m2!1sen!2s!4v1714414177304!5m2!1sen!2s',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4967.446745804674!2d67.05358048911405!3d24.879424520977317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0057261ced%3A0x94c02ee6dcf3d3c8!2sAl%20Arz%20Homes!5e1!3m2!1sen!2s!4v1714414221044!5m2!1sen!2s',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4965.124852519145!2d67.03464437649365!3d24.937111577879445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f86e9eb2f4d%3A0x137af69775b7af4c!2sClassic%20Homes!5e1!3m2!1sen!2s!4v1714414259043!5m2!1sen!2s'
]
const cards = [
    [
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0116-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0107-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0108-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0109-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0111-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0112-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0114-1.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0115-1.jpg"
    ], [
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0118.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0119.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0120.jpg",
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0121.jpg"
    ], ['https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0123.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0124.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0125.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0126.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0127.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0129.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0130.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0131.jpg',
        'https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0132.jpg'
    ], [
        "https://admin.narkinsbuilders.com/wp-content/uploads/2024/04/DJI_0137.jpg"
    ]
];

export default function NarkinsBoutiqueResidency() {
    const [lightbox, setLightbox] = useState({
        open: false, image: ''
    });
    const openLightbox = ({ image }: { image: string }) => {
        setLightbox({ ...lightbox, open: true, image });
    }
    // const [query, setQuery] = useState('')
    // const matches = useMediaQuery('(min-width: 768px)');
    return (
        <main>
            <Head>
                <title>Completed Projects</title>
            </Head>
            <Navigation />
            <Lightbox {...lightbox} onClose={() => setLightbox({ ...lightbox, open: false, image: '' })} />
            <div className="bg-white pt-[10vh]">
                <div className="relative isolate h-[40vh] overflow-hidden py-20 pt-10 sm:py-[28px]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto lg:mx-0">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-4xl">{`Completed Projects`}</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-800">
                                Our journey began three decades ago, and since then, we have embarked on numerous remarkable ventures that stand as a testament to our dedication and expertise. Our recent projects have left an indelible mark on Karachi’s skyline.
                            </p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl hidden lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
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
                <section className="bg-white">
                    //<div className="mx-auto max-w-7xl py-[5rem] lg:px-8">
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 gap-2 px-6 my-5 mb-5 border-b-neutral-900 rounded-xl p-1">
                                {categories.map(category => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-black text-white shadow'
                                                    : 'text-black hover:bg-white/[0.12] hover:text-neutral-900'
                                            )
                                        }>
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                {cards.map((items, idx) => (
                                    <Tab.Panel key={idx}>
                                        <div className="grid mt-[1rem] overflow-hidden grid-cols-1 md:lg:grid-cols-3 gap-y-[2.5rem]">
                                            {items.map((item, index) => (
                                                <div key={index} onClick={() => openLightbox({ image: item })} className="hover:filter group block rounded-xl overflow-hidden hover:scale-[1.025] -hover:bg-neutral-900 hover:brightness-[110%] px-6 duration-[.5s] transition hover:duration-[.5s]">
                                                    <div
                                                        className={classNames(
                                                            'bg-neutral-900 p-3- rounded-lg group relative',
                                                            'ring-white/60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2'
                                                        )}>
                                                        <img src={item} alt="" className="w-full rounded h-auto" loading={index === 0 ? "eager" : "lazy"} />
                                                        <div className="duration-[.5s] transition group-hover:duration-[.5s] invisible group-hover:visible left-[85%] top-[80%] absolute">
                                                            <MagnifyingGlassCircleIcon width={'3rem'} height={'3rem'} color="white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-6 mt-[2.5rem]">
                                            <iframe src={maps[idx]} className="border rounded-xl my-5 mt-[1rem]" height="300" style={{ width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}