// src/components/blog/mdx-components.tsx
import React from 'react'
import Image from 'next/image'
import FAQ from '@/components/features/faq/faq'
import dynamic from 'next/dynamic'
import { Table, Card, Progress, Statistic, Row, Col, Divider, List } from 'antd'
import { TrophyOutlined, RiseOutlined, DollarOutlined } from '@ant-design/icons'
import { ZoomableImage } from '@/components/features/blog/zoomable-image'
import EconomicGauge from '@/components/features/blog/EconomicGauge'
import FDIFlowChart from '@/components/features/blog/FDIFlowChart'
import InvestmentFunnel from '@/components/features/blog/InvestmentFunnel'
import VideoPlayer from '@/components/features/video-player/video-player'
import {
 firstTimeBuyerFAQs,
 investmentGuideFAQs,
 twoBedroomFAQs,
 luxuryApartmentsFAQs,
 generalRealEstateFAQs,
 hillCrestFAQs,
 boutiqueResidencyFAQs,
 apartmentSaleFAQs
} from '@/data/faq-data'

// Error boundary for chart components
class ChartErrorBoundary extends React.Component<
 { children: React.ReactNode; fallback?: React.ReactNode },
 { hasError: boolean }
> {
 constructor(props: any) {
  super(props);
  this.state = { hasError: false };
 }

 static getDerivedStateFromError() {
  return { hasError: true };
 }

 componentDidCatch(error: any, errorInfo: any) {
  console.error('Chart component error:', error, errorInfo);
 }

 render() {
  if (this.state.hasError) {
   return this.props.fallback || (
    <div className="my-8">
     <Card title="Chart Error" variant="borderless">
      <div className="h-64 flex items-center justify-center text-red-500">
       Unable to load chart. Please try refreshing the page.
      </div>
     </Card>
    </div>
   );
  }

  return this.props.children;
 }
}

// Fallback chart components using Ant Design components only
const FallbackChart = ({ title, data, type }: { title: string, data: any[], type: string }) => (
 <div className="my-8">
  <Card title={title} variant="borderless">
   <div className="space-y-4">
    {data.map((item, index) => {
     const value = item.value || item.price || item.growth || item.demand || 0;
     const label = item.name || item.type || item.area || item.year || item.month || `Item ${index + 1}`;
     const color = item.color || '#1890ff';
     
     return (
      <div key={index} className="flex items-center justify-between">
       <span >{label}</span>
       <div className="flex items-center space-x-2" style={{ width: '60%' }}>
        <Progress 
         percent={Math.min(value, 100)} 
         strokeColor={color}
         showInfo={false}
        />
        <span className="text-sm ">{value}{type === 'percentage' ? '%' : ''}</span>
       </div>
      </div>
     );
    })}
   </div>
  </Card>
 </div>
);

// Safe dynamic imports with comprehensive fallbacks
const Line = dynamic(
 () => import('@ant-design/plots').then(mod => ({ default: mod.Line })).catch(() => ({ 
  default: (props: any) => <FallbackChart {...props} type="line" />
 })), 
 { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
 }
)
const Bar = dynamic(
 () => import('@ant-design/plots').then(mod => ({ default: mod.Bar })).catch(() => ({ 
  default: (props: any) => <FallbackChart {...props} type="bar" />
 })), 
 { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
 }
)
const Pie = dynamic(
 () => import('@ant-design/plots').then(mod => ({ default: mod.Pie })).catch(() => ({ 
  default: (props: any) => <FallbackChart {...props} type="percentage" />
 })), 
 { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
 }
)
const Area = dynamic(
 () => import('@ant-design/plots').then(mod => ({ default: mod.Area })).catch(() => ({ 
  default: (props: any) => <FallbackChart {...props} type="area" />
 })), 
 { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
 }
)
const Column = dynamic(
 () => import('@ant-design/plots').then(mod => ({ default: mod.Column })).catch(() => ({ 
  default: (props: any) => <FallbackChart {...props} type="column" />
 })), 
 { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
 }
)

// Professional blog styling to match the design
const htmlComponents = {
 // Headers - Large, bold, professional spacing with mobile optimization
 h1: (props: any) => <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-6 sm:mb-8 mt-8 sm:mt-12 leading-tight" {...props} />,
 h2: (props: any) => <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-4 sm:mb-6 mt-8 sm:mt-10 leading-tight" {...props} />,
 h3: (props: any) => <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8 leading-tight" {...props} />,
 h4: (props: any) => <h4 className="text-base sm:text-lg lg:text-xl text-gray-800 mb-2 sm:mb-3 mt-4 sm:mt-6 leading-tight" {...props} />,
 
 // Paragraphs - Clean spacing with mobile optimization
 p: (props: any) => <p className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8 mb-4 sm:mb-6" {...props} />,
 
 // Lists - Professional bullet points and spacing with mobile optimization
 ul: (props: any) => <ul className="list-disc list-outside ml-4 sm:ml-6 mb-6 sm:mb-8 space-y-2 sm:space-y-3" {...props} />,
 ol: (props: any) => <ol className="list-decimal list-outside ml-4 sm:ml-6 mb-6 sm:mb-8 space-y-2 sm:space-y-3" {...props} />,
 li: (props: any) => <li className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8 pl-1 sm:pl-2" {...props} />,
 
 // Professional table design - with strong outer borders
 table: (props: any) => (
  <div className="overflow-x-auto my-8">
   <table className="min-w-full bg-white border-2 border-gray-400 rounded-lg overflow-hidden" {...props} />
  </div>
 ),
 thead: (props: any) => <thead className="bg-blue-100" {...props} />,
 tbody: (props: any) => <tbody className="bg-white" {...props} />,
 th: (props: any) => (
  <th className="px-6 py-4 text-left text-sm text-blue-800 uppercase tracking-wide border-b border-r border-gray-300 last:border-r-0" {...props} />
 ),
 td: (props: any) => (
  <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200 last:border-r-0" {...props} />
 ),
 tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
 
 // Images - Enhanced with zoom functionality
 img: (props: any) => (
  <ZoomableImage
   src={props.src}
   alt={props.alt || ''}
   width={800}
   height={600}
   className="my-8"
   caption={props.title}
  />
 ),
 
 // Links and emphasis
 a: (props: any) => <a className="text-blue-600 hover:text-blue-800 " {...props} />,
 strong: (props: any) => <span className="font-bold text-gray-900" {...props} />,
 em: (props: any) => <em className="italic text-gray-700" {...props} />,
 
 // Code and quotes
 code: (props: any) => <code {...props} />,
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
    <h3 className=" text-xl mb-3 text-gray-900">{title}</h3>
    <p className="text-3xl text-blue-600 mb-3">{price}</p>
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
      <th className="px-6 py-4 text-left text-sm text-blue-800 uppercase tracking-wide border-b border-r border-gray-300">Area</th>
      <th className="px-6 py-4 text-left text-sm text-blue-800 uppercase tracking-wide border-b border-r border-gray-300">Avg Price</th>
      <th className="px-6 py-4 text-left text-sm text-blue-800 uppercase tracking-wide border-b">YoY Growth</th>
     </tr>
    </thead>
    <tbody className="bg-white">
     {data.map((row, index) => (
      <tr key={index} className="hover:bg-gray-50">
       <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">{row.area}</td>
       <td className="px-6 py-4 text-sm text-gray-900 border-b border-r border-gray-200">{row.avgPrice}</td>
       <td className="px-6 py-4 text-sm text-green-600 border-b">{row.growth}</td>
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
   <h3 className="text-2xl text-blue-900 mb-3">{title}</h3>
   <p className="text-blue-700 mb-6 leading-relaxed">{description}</p>
   <a
    href={buttonLink}
    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors "
   >
    {buttonText}
   </a>
  </div>
 ),

 PriceChart: ({ data, title }: { data: Array<{year: string, price: number}>, title: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
     </Card>
    </div>
   );
  }

  try {
   if (!data || data.length === 0) {
    return (
     <div className="my-8">
      <Card title={title} variant="borderless">
       <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
      </Card>
     </div>
    );
   }

   const config = {
    data,
    xField: 'year',
    yField: 'price',
    color: '#1890ff',
    smooth: true,
   };

   return (
    <ChartErrorBoundary>
     <div className="my-8">
      <Card title={title} variant="borderless">
       <Line {...config} height={300} />
      </Card>
     </div>
    </ChartErrorBoundary>
   );
  } catch (error) {
   console.error('PriceChart error:', error);
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-red-500">Chart failed to load</div>
     </Card>
    </div>
   );
  }
 },

 MarketGrowthChart: ({ data, title }: { data: Array<{area: string, growth: number}>, title: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
     </Card>
    </div>
   );
  }

  try {
   if (!data || data.length === 0) {
    return (
     <div className="my-8">
      <Card title={title} variant="borderless">
       <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
      </Card>
     </div>
    );
   }

   const config = {
    data,
    xField: 'area',
    yField: 'growth',
    color: '#52c41a',
   };

   return (
    <ChartErrorBoundary>
     <div className="my-8">
      <Card title={title} variant="borderless">
       <Column {...config} height={300} />
      </Card>
     </div>
    </ChartErrorBoundary>
   );
  } catch (error) {
   console.error('MarketGrowthChart error:', error);
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-red-500">Chart failed to load</div>
     </Card>
    </div>
   );
  }
 },

 PropertyTypeDistribution: ({ data, title }: { data: Array<{type: string, value: number, color: string}>, title: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
     </Card>
    </div>
   );
  }

  if (!data || data.length === 0) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
     </Card>
    </div>
   );
  }

  // Use Progress bars as the primary display method to avoid dynamic import issues
  return (
   <div className="my-8">
    <Card title={title} variant="borderless">
     <div className="space-y-4">
      {data.map((item, index) => (
       <div key={index} className="flex items-center justify-between">
        <span className=" text-gray-900">{item.type}</span>
        <div className="flex items-center space-x-3" style={{ width: '60%' }}>
         <Progress 
          percent={item.value} 
          strokeColor={item.color}
          showInfo={false}
          strokeWidth={8}
         />
         <span className="text-sm text-gray-700 min-w-[40px]">{item.value}%</span>
        </div>
       </div>
      ))}
     </div>
    </Card>
   </div>
  );
 },

 TrendAnalysis: ({ data, title }: { data: Array<{month: string, demand: number, supply: number}>, title: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
     </Card>
    </div>
   );
  }

  if (!data || data.length === 0) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
     </Card>
    </div>
   );
  }

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
   <ChartErrorBoundary>
    <div className="my-8">
     <Card title={title} variant="borderless">
      <Line {...multiLineConfig} height={300} />
     </Card>
    </div>
   </ChartErrorBoundary>
  );
 },

 PricingTable: ({ data, title }: { data: Array<{category: string, price: number, rent: number, roi: number}>, title: string }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading table...</div>
     </Card>
    </div>
   );
  }

  if (!data || data.length === 0) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
     </Card>
    </div>
   );
  }

  const columns = [
   {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text: string) => text,
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
    <Card title={title} variant="borderless">
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
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
   setIsClient(true);
  }, []);

  if (!isClient) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
     </Card>
    </div>
   );
  }

  if (!data || data.length === 0) {
   return (
    <div className="my-8">
     <Card title={title} variant="borderless">
      <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
     </Card>
    </div>
   );
  }

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
   <ChartErrorBoundary>
    <div className="my-8">
     <Card title={title} variant="borderless">
      <Column {...columnConfig} height={300} />
     </Card>
    </div>
   </ChartErrorBoundary>
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
    <Card title={title} variant="borderless">
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
 },

 ImageGrid: ({ images }: { images: Array<{src: string, alt: string, title: string, description: string}> }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
    {images.map((img, index) => (
      <div key={index} className="space-y-2 sm:space-y-3">
        <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg">
          <Image
            src={img.src}
            alt={img.alt}
            width={800}
            height={600}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        </div>
        <div className="text-center px-2 sm:px-0">
          <h4 className="text-gray-900 font-semibold text-xs sm:text-sm mb-1">{img.title}</h4>
          <p className="text-gray-600 text-xs leading-relaxed">{img.description}</p>
        </div>
      </div>
    ))}
  </div>
 ),

 EconomicGauge: (props: any) => <EconomicGauge {...props} />,
 FDIFlowChart: (props: any) => <FDIFlowChart {...props} />,
 InvestmentFunnel: (props: any) => <InvestmentFunnel {...props} />,
 VideoPlayer: (props: any) => <VideoPlayer {...props} />
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

 // FAQ data map using ES6 imports (TinaCMS-compatible)
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
 EconomicGauge: customComponents.EconomicGauge,
 FDIFlowChart: customComponents.FDIFlowChart,
 InvestmentFunnel: customComponents.InvestmentFunnel,
 VideoPlayer: customComponents.VideoPlayer,
 ImageGrid: customComponents.ImageGrid,
};

// Combine all components
const components = {
 ...htmlComponents,
 ...customComponents,
 ...templateComponents
}

// All components are properly exported

export default components