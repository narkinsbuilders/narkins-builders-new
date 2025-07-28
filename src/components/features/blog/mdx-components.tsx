// src/components/blog/mdx-components.tsx
import React from 'react'
import Image from 'next/image'
import FAQ from '@/components/features/faq/faq'
import dynamic from 'next/dynamic'
import { Table, Card, Progress, Statistic, Row, Col, Divider } from 'antd'
import { TrophyOutlined, RiseOutlined, DollarOutlined } from '@ant-design/icons'

// Dynamic imports for Ant Design plots to avoid SSR issues
const Line = dynamic(() => import('@ant-design/plots').then(mod => ({ default: mod.Line })), { ssr: false })
const Bar = dynamic(() => import('@ant-design/plots').then(mod => ({ default: mod.Bar })), { ssr: false })
const Pie = dynamic(() => import('@ant-design/plots').then(mod => ({ default: mod.Pie })), { ssr: false })
const Area = dynamic(() => import('@ant-design/plots').then(mod => ({ default: mod.Area })), { ssr: false })
const Column = dynamic(() => import('@ant-design/plots').then(mod => ({ default: mod.Column })), { ssr: false })

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

  PriceChart: ({ data, title }: { data: Array<{year: string, price: number}>, title: string }) => {
    const config = {
      data,
      xField: 'year',
      yField: 'price',
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
      color: '#1890ff',
      smooth: true,
      tooltip: {
        formatter: (datum: any) => ({
          name: 'Price',
          value: `PKR ${datum.price} Lac`,
        }),
      },
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Line {...config} height={300} />
        </Card>
      </div>
    );
  },

  MarketGrowthChart: ({ data, title }: { data: Array<{area: string, growth: number}>, title: string }) => {
    const config = {
      data,
      xField: 'area',
      yField: 'growth',
      color: '#52c41a',
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
      tooltip: {
        formatter: (datum: any) => ({
          name: 'Growth',
          value: `${datum.growth}%`,
        }),
      },
      label: {
        position: 'top' as const,
        formatter: (datum: any) => `${datum.growth}%`,
      },
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Column {...config} height={300} />
        </Card>
      </div>
    );
  },

  PropertyTypeDistribution: ({ data, title }: { data: Array<{type: string, value: number, color: string}>, title: string }) => {
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name} {percentage}',
      },
      interactions: [
        {
          type: 'pie-legend-active',
        },
        {
          type: 'element-active',
        },
      ],
      color: data.map(item => item.color),
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Pie {...config} height={300} />
        </Card>
      </div>
    );
  },

  TrendAnalysis: ({ data, title }: { data: Array<{month: string, demand: number, supply: number}>, title: string }) => {
    // Transform data for stacked area chart
    const transformedData = data.map(item => ({
      month: item.month,
      demand: item.demand,
      supply: item.supply,
    }));

    const config = {
      data: transformedData,
      xField: 'month',
      yField: 'demand',
      seriesField: 'type',
      color: ['#1890ff', '#52c41a'],
      smooth: true,
      areaStyle: {
        fillOpacity: 0.6,
      },
    };

    // Create separate line chart for demand and supply
    const lineConfig = {
      data: transformedData,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      color: ['#1890ff', '#52c41a'],
      smooth: true,
      point: {
        size: 4,
        shape: 'circle',
      },
    };

    // Transform for multi-line chart
    const multiLineData = data.flatMap(item => [
      { month: item.month, type: 'Demand', value: item.demand },
      { month: item.month, type: 'Supply', value: item.supply },
    ]);

    const multiLineConfig = {
      data: multiLineData,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      color: ['#1890ff', '#52c41a'],
      smooth: true,
      point: {
        size: 4,
        shape: 'circle',
      },
      legend: {
        position: 'top-left' as const,
      },
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Line {...multiLineConfig} height={300} />
        </Card>
      </div>
    );
  },

  PricingTable: ({ data, title }: { data: Array<{category: string, price: number, rent: number, roi: number}>, title: string }) => {
    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (text: string) => <strong>{text}</strong>,
      },
      {
        title: 'Price (Lac)',
        dataIndex: 'price',
        key: 'price',
        render: (value: number) => `PKR ${value}`,
      },
      {
        title: 'Monthly Rent (K)',
        dataIndex: 'rent',
        key: 'rent',
        render: (value: number) => value > 0 ? `PKR ${value}K` : 'N/A',
      },
      {
        title: 'ROI %',
        dataIndex: 'roi',
        key: 'roi',
        render: (value: number) => (
          <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{value}%</span>
        ),
      },
    ];

    const tableData = data.map((item, index) => ({
      key: index,
      ...item,
    }));

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Table 
            columns={columns} 
            dataSource={tableData} 
            pagination={false}
            size="middle"
          />
        </Card>
      </div>
    );
  },

  ComparisonChart: ({ data, title }: { data: Array<{name: string, value1: number, value2: number, label1: string, label2: string}>, title: string }) => {
    const chartData = data.map(item => ({
      category: item.name,
      [item.label1]: item.value1,
      [item.label2]: item.value2,
    }));

    const config = {
      data: chartData,
      xField: 'category',
      yField: ['value1', 'value2'],
      seriesField: 'type',
      isGroup: true,
      legend: {
        position: 'top-left' as const,
      },
      color: ['#1890ff', '#52c41a'],
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
    };

    // Transform data for grouped column chart
    const transformedData = data.flatMap(item => [
      { category: item.name, type: item.label1, value: item.value1 },
      { category: item.name, type: item.label2, value: item.value2 },
    ]);

    const columnConfig = {
      data: transformedData,
      xField: 'category',
      yField: 'value',
      seriesField: 'type',
      isGroup: true,
      color: ['#1890ff', '#52c41a'],
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Column {...columnConfig} height={300} />
        </Card>
      </div>
    );
  },

  PerformanceGauge: ({ value, title, max = 100 }: { value: number, title: string, max?: number }) => {
    const getStatusColor = (val: number) => {
      if (val >= 80) return '#52c41a'; // Green
      if (val >= 60) return '#faad14'; // Yellow
      return '#ff4d4f'; // Red
    };

    return (
      <div className="my-8">
        <Card title={title} bordered={false}>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="Performance Score"
                value={value}
                suffix="/ 100"
                valueStyle={{ 
                  color: getStatusColor(value),
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                prefix={<TrophyOutlined />}
              />
              <Progress
                percent={value}
                strokeColor={getStatusColor(value)}
                trailColor="#f0f0f0"
                strokeWidth={8}
                showInfo={false}
                style={{ marginTop: '16px' }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
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
  PricingTable: customComponents.PricingTable,
  ComparisonChart: customComponents.ComparisonChart,
  PerformanceGauge: customComponents.PerformanceGauge,
};

// Combine all components
const components = {
  ...htmlComponents,
  ...customComponents,
  ...templateComponents
}

export default components