// src/components/blog/mdx-components.tsx
import React from 'react'
import Image from 'next/image'
import FAQ from '@/components/features/faq/faq'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

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
  ),

  PriceChart: ({ data, title }: { data: Array<{year: string, price: number}>, title: string }) => (
    <div className="my-8 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => [`PKR ${value} Lac`, 'Price']} />
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ),

  MarketGrowthChart: ({ data, title }: { data: Array<{area: string, growth: number}>, title: string }) => (
    <div className="my-8 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="area" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value}%`, 'Growth']} />
          <Bar dataKey="growth" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ),

  PropertyTypeDistribution: ({ data, title }: { data: Array<{type: string, value: number, color: string}>, title: string }) => (
    <div className="my-8 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  ),

  TrendAnalysis: ({ data, title }: { data: Array<{month: string, demand: number, supply: number}>, title: string }) => (
    <div className="my-8 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="demand" stackId="1" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
          <Area type="monotone" dataKey="supply" stackId="1" stroke="#10b981" fill="#059669" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// TinaCMS Template Components
const FAQTemplate = (props: any) => {
  const { 
    staticFaqs,
    pageUrl,
    contextType = 'general',
    title = 'Frequently Asked Questions',
    description
  } = props;

  // Import FAQ data directly - this ensures it works in both contexts
  const {
    firstTimeBuyerFAQs,
    investmentGuideFAQs,
    twoBedroomFAQs,
    luxuryApartmentsFAQs,
    generalRealEstateFAQs,
    hillCrestFAQs,
    boutiqueResidencyFAQs,
    apartmentSaleFAQs
  } = require('@/data/faq-data');

  const faqDataMap: any = {
    firstTimeBuyerFAQs,
    investmentGuideFAQs,
    twoBedroomFAQs,
    luxuryApartmentsFAQs,
    generalRealEstateFAQs,
    hillCrestFAQs,
    boutiqueResidencyFAQs,
    apartmentSaleFAQs,
  };

  const faqData = staticFaqs ? faqDataMap[staticFaqs] || [] : [];

  return (
    <FAQ
      staticFaqs={faqData}
      pageUrl={pageUrl || (typeof window !== 'undefined' ? window.location.href : '')}
      contextType={contextType}
      title={title}
      description={description}
    />
  );
};

// Template components for TinaCMS
const templateComponents = {
  FAQ: FAQTemplate,
  CallToAction: customComponents.CallToAction,
  PropertyCard: customComponents.PropertyCard,
  MarketTable: customComponents.MarketTable,
  PriceChart: customComponents.PriceChart,
  MarketGrowthChart: customComponents.MarketGrowthChart,
  PropertyTypeDistribution: customComponents.PropertyTypeDistribution,
  TrendAnalysis: customComponents.TrendAnalysis,
};

// Combine all components
const components = {
  ...htmlComponents,
  ...customComponents,
  ...templateComponents
}

export default components