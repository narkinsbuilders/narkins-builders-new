import Footer from '@/components/footer/footer';
import Navigation from '@/components/navigation/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Blog() {
    const router = useRouter();
    const [response, setState] = useState<Post | null>(null);
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    useEffect(() => {
        fetch('https://admin.narkinsbuilders.com/wp-json/wp/v2/posts/' + router.query.blog).then(res => res.json()).then(setState);
    }, [router.isReady]);
    return (
        <>
            <Navigation />
            <div className="bg-white min-h-screen py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <iframe src={`https://admin.narkinsbuilders.com/${response?.link}`} style={{
                        width: '100%',
                        height: '200vh'
                    }}/>
                    {/* <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{response?.title.rendered}</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            {JSON.stringify(response)}
                        </p>
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: response?.content.rendered ?? '' }} />
                    </div> */}
                </div>
            </div>
           <Footer map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.887654842134!2d67.31088117394069!3d25.003933139504262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0d0e2f0313%3A0x82f9da3499b223b1!2sHill%20Crest%20Residency!5e0!3m2!1sen!2s!4v1751481865917!5m2!1sen!2s" />
        </>
    );
}

export interface Post {
    id: number;
    date: string;
    date_gmt: string;
    guid: RenderedObject;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: RenderedObject;
    content: RenderedContent;
    excerpt: RenderedContent;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: MetaData;
    categories: number[];
    tags: number[];
    _links: Links;
}

export interface RenderedObject {
    rendered: string;
}

export interface RenderedContent {
    rendered: string;
    protected: boolean;
}

export interface MetaData {
    _eb_attr: string;
    footnotes: string;
}

export interface Links {
    self: LinkObject[];
    collection: LinkObject[];
    about: LinkObject[];
    author: LinkObject[];
    replies: LinkObject[];
    "version-history": LinkObject[];
    "wp:attachment": LinkObject[];
    "wp:term": LinkObject[];
    curies: CuriesObject[];
}

export interface LinkObject {
    href: string;
    embeddable?: boolean;
    taxonomy?: string;
}

export interface CuriesObject {
    name: string;
    href: string;
    templated: boolean;
}

