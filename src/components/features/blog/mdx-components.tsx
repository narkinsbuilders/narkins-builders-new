// src/components/blog/mdx-components.tsx
import React from 'react'
import Image from 'next/image'
import FAQ from '@/components/features/faq/faq'

// Professional blog styling to match the design
const htmlComponents = {
  // Headers - Large, bold, professional spacing
  h1: (props: any) => <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-12" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-6" {...props} />,
  
  // Paragraphs - Clean spacing
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  
  // Lists - Professional bullet points and spacing
  ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-700 leading-relaxed" {...props} />,
  
  // Professional table design - with strong outer borders
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white border-2 border-gray-400 rounded-lg overflow-hidden" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-blue-100" {...props} />,
  tbody: (props: any) => <tbody className="bg-white" {...props} />,
  th: (props: any) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wide border-b border-r border-gray-300 last:border-r-0" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200 last:border-r-0" {...props} />
  ),
  tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
  
  // Links and emphasis
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800 font-medium" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic text-gray-700" {...props} />,
  
  // Code and quotes
  code: (props: any) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 italic text-gray-700" {...props} />
  ),
  
  // Dividers
  hr: (props: any) => <hr className="my-8 border-gray-300" {...props} />,
  
  // Pass through other elements
  ...Object.fromEntries(
    ['div', 'details', 'summary', 'svg', 'path', 'span'].map(tag => [
      tag, 
      (props: any) => React.createElement(tag, props)
    ])
  )
}

// Your existing custom components
const customComponents = {
  PropertyCard: ({ title, price, location, bedrooms, bathrooms, area, image }: {
    title: string
    price: string
    location: string
    bedrooms: number
    bathrooms: number
    area: string
    image: string
  }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-8 border border-gray-200">
      <Image src={image} alt={title} className="w-full h-48 object-cover" width={400} height={200} />
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-3 text-gray-900">{title}</h3>
        <p className="text-3xl font-bold text-blue-600 mb-3">{price}</p>
        <p className="text-gray-600 mb-4">{location}</p>
        <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
          <span>{bedrooms} Bedrooms</span>
          <span>{bathrooms} Bathrooms</span>
          <span>{area}</span>
        </div>
      </div>
    </div>
  ),
  
  MarketTable: ({ data }: { data: Array<{area: string, avgPrice: string, growth: string}> }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white border-2 border-gray-400 rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wide border-b border-r border-gray-300">Area</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wide border-b border-r border-gray-300">Avg Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wide border-b">YoY Growth</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">{row.area}</td>
              <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">{row.avgPrice}</td>
              <td className="px-6 py-4 text-sm text-green-600 font-medium border-b">{row.growth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  
  CallToAction: ({ title, description, buttonText, buttonLink }: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 my-8">
      <h3 className="text-2xl font-semibold text-blue-900 mb-3">{title}</h3>
      <p className="text-blue-700 mb-6 leading-relaxed">{description}</p>
      <a
        href={buttonLink}
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {buttonText}
      </a>
    </div>
  )
}

// TinaCMS Template Components
const FAQTemplate = (props: any) => {
  const { 
    title, 
    description, 
    source = 'inline', 
    collection, 
    category, 
    tags, 
    limit, 
    searchable = false, 
    items = [] 
  } = props;

  // Convert TinaCMS FAQ items to component format
  const tinaFaqs = items?.map((item: any, index: number) => ({
    id: item.id || `faq-${index}`,
    question: item.question,
    answer: item.answer,
    tags: item.tags || [],
    priority: item.priority || index + 1
  }));

  return (
    <FAQ
      source={source === 'inline' ? 'static' : source}
      collection={collection}
      category={category}
      tags={tags}
      limit={limit}
      title={title}
      description={description}
      pageUrl={typeof window !== 'undefined' ? window.location.href : ''}
      contextType="general"
      searchable={searchable}
      tinaFaqs={source === 'inline' ? tinaFaqs : undefined}
      staticFaqs={source === 'inline' ? tinaFaqs : undefined}
    />
  );
};

// Template components for TinaCMS
const templateComponents = {
  FAQ: FAQTemplate,
};

// Combine all components
const components = {
  ...htmlComponents,
  ...customComponents,
  ...templateComponents
}

export default components