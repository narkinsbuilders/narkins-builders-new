// src/components/blog/mdx-components.tsx
import React from 'react'
import Image from 'next/image'
import FAQ from '@/components/features/faq/faq'
import dynamic from 'next/dynamic'
import { ZoomableImage } from '@/components/features/blog/zoomable-image'
import EconomicGauge from '@/components/features/blog/EconomicGauge'
import FDIFlowChart from '@/components/features/blog/FDIFlowChart'
import InvestmentFunnel from '@/components/features/blog/InvestmentFunnel'
import VideoPlayer from '@/components/features/video-player/video-player'
import { getImageAltText } from '@/data/image-alt-texts'
import EChartsLineChart from '@/components/features/blog/EChartsLineChart'
import EChartsColumnChart from '@/components/features/blog/EChartsColumnChart'
import EChartsPieChart from '@/components/features/blog/EChartsPieChart'
import EChartsPolarBarChart from '@/components/features/blog/EChartsPolarBarChart'
import EChartsWaterfallChart from '@/components/features/blog/EChartsWaterfallChart'
import EChartsHeatmapChart from '@/components/features/blog/EChartsHeatmapChart'
import EChartsScatterChart from '@/components/features/blog/EChartsScatterChart'
import EChartsLiquidFillChart from '@/components/features/blog/EChartsLiquidFillChart'
import EChartsPictorialBarChart from '@/components/features/blog/EChartsPictorialBarChart'
import ECharts3DBarChart from '@/components/features/blog/ECharts3DBarChart'
import EChartsCylindricalBarChart from '@/components/features/blog/EChartsCylindricalBarChart'
import EChartsTable from '@/components/features/blog/EChartsTable'
import EChartsProgressBar from '@/components/features/blog/EChartsProgressBar'
import {
 firstTimeBuyerFAQs,
 investmentGuideFAQs,
 twoBedroomFAQs,
 luxuryApartmentsFAQs,
 generalRealEstateFAQs,
 hillCrestFAQs,
 boutiqueResidencyFAQs,
 apartmentSaleFAQs
} from '@/data/faq-data'// Error boundary for chart components
class ChartErrorBoundary extends React.Component<
 { children: React.ReactNode; fallback?: React.ReactNode },
 { hasError: boolean }
> {
 constructor(props: any) {
  super(props);
  this.state = { hasError: false };
 } static getDerivedStateFromError() {
  return { hasError: true };
 } componentDidCatch(error: any, errorInfo: any) {
  console.error('Chart component error:', error, errorInfo);
 } render() {
  if (this.state.hasError) {
   return this.props.fallback || (
    <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
     <h3 className="text-xl font-bold text-gray-800 mb-4">Chart Error</h3>
     <div className="h-64 flex items-center justify-center text-red-500 bg-red-50 rounded">
      Unable to load chart. Please try refreshing the page.
     </div>
    </div>
   );
  }  return this.props.children;
 }
}// Fallback chart components using ECharts
const FallbackChart = ({ title, data, type }: { title: string, data: any[], type: string }) => (
 <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
  <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
  <div className="space-y-4">
   {data.map((item, index) => {
    const value = item.value || item.price || item.growth || item.demand || 0;
    const label = item.name || item.type || item.area || item.year || item.month || `Item ${index + 1}`;
    const color = item.color || '#1890ff';
    
    return (
     <div key={index} className="flex items-center justify-between">
      <span className="font-medium text-gray-900">{label}</span>
      <div className="flex items-center space-x-2 w-3/5">
       <EChartsProgressBar 
        percent={Math.min(value, 100)} 
        strokeColor={color}
        showInfo={false}
       />
       <span className="text-sm text-gray-700 min-w-[40px]">{value}{type === 'percentage' ? '%' : ''}</span>
      </div>
     </div>
    );
   })}
  </div>
 </div>
);// ECharts components are now imported directly above// Professional blog styling to match the design
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
 
 // Modern responsive table design
 table: (props: any) => (
  <div className="overflow-x-auto my-6 sm:my-8 rounded-lg border border-gray-200 shadow-sm">
   <table className="min-w-full bg-white" {...props} />
  </div>
 ),
 thead: (props: any) => <thead className="bg-gray-50 border-b border-gray-200" {...props} />,
 tbody: (props: any) => <tbody className="divide-y divide-gray-200" {...props} />,
 th: (props: any) => (
  <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-900 tracking-wider" {...props} />
 ),
 td: (props: any) => (
  <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-gray-900 whitespace-nowrap" {...props} />
 ),
 tr: (props: any) => <tr className="hover:bg-gray-50 transition-colors" {...props} />,
 
 // Images - Enhanced with zoom functionality
 img: (props: any) => {
  const filename = props.src?.split('/').pop() || '';
  const altText = props.alt || getImageAltText(filename, `Image: ${props.title || filename.replace(/\.(webp|jpg|jpeg|png)$/, '').replace(/-/g, ' ')}`);
  
  return (
   <ZoomableImage
    src={props.src}
    alt={altText}
    width={800}
    height={600}
    className="my-8"
    caption={props.title}
   />
  );
 },
 
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
}// Your existing custom components
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
 ), PriceChart: ({ data, title }: { data: Array<{year: string, price: number}>, title: string }) => (
  <EChartsLineChart 
    data={data} 
    title={title}
    xField="year"
    yField="price"
    color="#1890ff"
    smooth={true}
    showEndLabels={true}
    animationDuration={4000}
    showSymbol={false}
    isArea={true}
    gradientColors={['#1890ff', 'rgba(24, 144, 255, 0.1)']}
    opacity={0.7}
  />
), PropertyTypeDistribution: ({ data, title }: { data: Array<{type: string, value: number, color: string}>, title: string }) => (
  <EChartsPieChart 
    data={data} 
    title={title}
    showLegend={true}
    showLabel={true}
  />
), TrendAnalysis: ({ data, title }: { data: Array<{month: string, demand: number, supply: number}>, title: string }) => {
  // Transform for multi-line chart
  const multiLineData = data.flatMap(item => [
   { month: item.month, type: 'Demand', value: item.demand },
   { month: item.month, type: 'Supply', value: item.supply },
  ]);  return (
   <EChartsLineChart 
    data={multiLineData} 
    title={title}
    xField="month"
    yField="value"
    seriesField="type"
    color={['#1890ff', '#52c41a']}
    smooth={true}
    enableDataset={true}
    showEndLabels={true}
    animationDuration={4000}
    showSymbol={false}
    isArea={true}
    gradientColors={['rgba(24, 144, 255, 0.6)', 'rgba(24, 144, 255, 0.05)', 'rgba(82, 196, 26, 0.6)', 'rgba(82, 196, 26, 0.05)']}
    opacity={0.8}
    enableBrush={true}
   />
  );
 }, PricingTable: ({ data, title }: { data: Array<{category: string, price: number | string, rent: number | string, roi: number | string}>, title: string }) => {
  // Determine if this is disaster/rainfall data based on title
  const isDisasterData = title.toLowerCase().includes('rainfall') || 
                        title.toLowerCase().includes('casualties') || 
                        title.toLowerCase().includes('clearance');
  
  // Determine if this is utility cost data based on title
  const isUtilityData = title.toLowerCase().includes('utility') || 
                        title.toLowerCase().includes('cost comparison');  const columns = [
   {
    title: isDisasterData ? 'Area' : (isUtilityData ? 'Property Type' : 'Category'),
    dataIndex: 'category',
    key: 'category',
    render: (text: string) => text,
   },
   {
    title: isDisasterData ? 'Rainfall (mm)' : (isUtilityData ? 'Base Cost (PKR K)' : 'Price (Lac)'),
    dataIndex: 'price',
    key: 'price',
    render: (value: number | string) => {
     if (isDisasterData) return value;
     if (isUtilityData) return typeof value === 'number' ? `PKR ${value}K` : value;
     return typeof value === 'number' ? `PKR ${value}` : value;
    },
   },
   {
    title: isDisasterData ? 'Clearance Time' : (isUtilityData ? 'Monthly Savings (PKR K)' : 'Monthly Rent (K)'),
    dataIndex: 'rent',
    key: 'rent',
    render: (value: number | string) => {
     if (isDisasterData) return value;
     if (isUtilityData) return typeof value === 'number' ? `PKR ${value}K` : value;
     return (typeof value === 'number' && value > 0) ? `PKR ${value}K` : 'N/A';
    },
   },
   {
    title: isDisasterData ? 'Casualties/Impact' : (isUtilityData ? 'System Type' : 'ROI %'),
    dataIndex: 'roi',
    key: 'roi',
    render: (value: number | string) => {
     if (isDisasterData) {
      const isGood = value.toString().toLowerCase().includes('zero') || 
                     value.toString().toLowerCase().includes('none');
      return (
       <span className={`font-bold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
        {value}
       </span>
      );
     }
     if (isUtilityData) return <span className="text-blue-600 font-medium">{value}</span>;
     return (
      <span className="text-green-600 font-bold">{value}%</span>
     );
    },
   },
  ];  const tableData = data.map((item, index) => ({
   key: index,
   ...item,
  }));  return (
   <EChartsTable 
    columns={columns} 
    dataSource={tableData} 
    title={title}
    pagination={false}
    size="middle"
   />
  );
 }, PolarBarChart: ({ data, title }: { data: Array<{category: string, value: number}>, title: string }) => (
  <EChartsPolarBarChart 
   data={data} 
   title={title}
   color={['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2', '#eb2f96']}
   showLabels={true}
   animationDuration={4000}
   height={400}
  />
 ), RadialChart: ({ data, title }: { data: Array<{category: string, value: number}>, title: string }) => (
  <EChartsPolarBarChart 
   data={data} 
   title={title}
   color="#1890ff"
   showLabels={true}
   labelPosition="end"
   startAngle={90}
   animationDuration={4000}
   height={400}
  />
 ), RacingBarChart: ({ raceData, title }: { raceData: Array<Array<[string, number]>>, title: string }) => (
  <EChartsColumnChart 
   data={[]}
   title={title}
   xField="name"
   yField="value"
   isRacing={true}
   raceData={raceData}
   updateInterval={2000}
   showValueLabels={true}
   isHorizontal={true}
   maxItems={10}
   animationDuration={500}
   color={['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2', '#eb2f96', '#f5222d', '#52c41a', '#1890ff', '#722ed1']}
   height={500}
  />
 ), TimelineChart: ({ raceData, title }: { raceData: Array<Array<[string, number]>>, title: string }) => (
  <EChartsColumnChart 
   data={[]}
   title={title}
   xField="name"
   yField="value"
   isRacing={true}
   raceData={raceData}
   updateInterval={3000}
   showValueLabels={true}
   isHorizontal={false}
   maxItems={8}
   animationDuration={800}
   color={['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2', '#eb2f96']}
   height={400}
  />
 ), WaterfallChart: ({ data, title, subtitle }: { 
   data: Array<{name: string, value: number, isTotal?: boolean, color?: string}>, 
   title: string,
   subtitle?: string 
 }) => (
  <EChartsWaterfallChart 
   data={data} 
   title={title}
   subtitle={subtitle}
   showLabels={true}
   positiveColor="#52c41a"
   negativeColor="#ff4d4f"
   totalColor="#1890ff"
   animationDuration={4000}
   height={450}
  />
 ), FinancialBreakdown: ({ data, title }: { 
   data: Array<{name: string, value: number, isTotal?: boolean}>, 
   title: string 
 }) => (
  <EChartsWaterfallChart 
   data={data} 
   title={title}
   subtitle="Financial Analysis"
   showLabels={true}
   positiveColor="#1890ff"
   negativeColor="#fa8c16"
   totalColor="#722ed1"
   animationDuration={3500}
   height={400}
  />
 ), CostAnalysis: ({ data, title }: { 
   data: Array<{name: string, value: number, isTotal?: boolean}>, 
   title: string 
 }) => (
  <EChartsWaterfallChart 
   data={data} 
   title={title}
   subtitle="Cost Breakdown Analysis"
   showLabels={true}
   positiveColor="#52c41a"
   negativeColor="#ff4d4f"
   totalColor="#13c2c2"
   animationDuration={4000}
   height={420}
  />
 ), HeatmapChart: ({ data, title, xAxisData, yAxisData }: { 
   data: Array<[number, number, number]> | Array<{x: string | number, y: string | number, value: number}>, 
   title: string,
   xAxisData?: string[],
   yAxisData?: string[]
 }) => (
  <EChartsHeatmapChart 
   data={data} 
   title={title}
   xAxisData={xAxisData}
   yAxisData={yAxisData}
   colorRange={['#f0f9ff', '#1890ff']}
   showLabels={false}
   animationDuration={3500}
   height={450}
  />
 ), PropertyDensityMap: ({ data, title }: { 
   data: Array<{x: string, y: string, value: number}>, 
   title: string 
 }) => (
  <EChartsHeatmapChart 
   data={data} 
   title={title}
   colorRange={['#fff5f5', '#e53e3e']}
   showLabels={true}
   animationDuration={4000}
   height={400}
   visualMapPosition="right"
  />
 ), ScatterPlot: ({ data, title, xAxisLabel, yAxisLabel }: { 
   data: Array<{x: number, y: number, size?: number, category?: string, name?: string}>, 
   title: string,
   xAxisLabel?: string,
   yAxisLabel?: string
 }) => (
  <EChartsScatterChart 
   data={data} 
   title={title}
   xAxisLabel={xAxisLabel || 'X Axis'}
   yAxisLabel={yAxisLabel || 'Y Axis'}
   color={['#1890ff', '#52c41a', '#fa8c16', '#722ed1']}
   enableBrush={true}
   enableZoom={true}
   showSymbolSize={true}
   animationDuration={3000}
   height={500}
  />
 ), PropertyScatter: ({ data, title }: { 
   data: Array<{x: number, y: number, size?: number, category?: string, name?: string}>, 
   title: string 
 }) => (
  <EChartsScatterChart 
   data={data} 
   title={title}
   xAxisLabel="Property Size (sq ft)"
   yAxisLabel="Price (PKR Lac)"
   color="#1890ff"
   enableBrush={true}
   enableZoom={true}
   showSymbolSize={true}
   seriesField="category"
   animationDuration={3500}
   height={450}
  />
 ), LiquidGauge: ({ value, title, subtitle }: { 
   value: number, 
   title: string,
   subtitle?: string
 }) => (
  <EChartsLiquidFillChart 
   value={value} 
   title={title}
   subtitle={subtitle}
   color={['#1890ff', '#40a9ff']}
   backgroundColor="#f0f0f0"
   showWave={true}
   waveAnimation={true}
   animationDuration={5000}
   height={350}
  />
 ), OccupancyGauge: ({ value, title }: { 
   value: number, 
   title: string 
 }) => (
  <EChartsLiquidFillChart 
   value={value} 
   title={title}
   subtitle="Occupancy Rate"
   color={['#52c41a', '#95de64']}
   backgroundColor="#f6ffed"
   showWave={true}
   waveAnimation={true}
   animationDuration={4000}
   height={300}
  />
 ), SalesTarget: ({ value, title }: { 
   value: number, 
   title: string 
 }) => (
  <EChartsLiquidFillChart 
   value={value} 
   title={title}
   subtitle="Target Achievement"
   color={['#fa8c16', '#ffc069']}
   backgroundColor="#fff7e6"
   showWave={true}
   waveAnimation={true}
   animationDuration={4500}
   height={320}
  />
 ),
 EconomicGauge: (props: any) => <EconomicGauge {...props} />,
 FDIFlowChart: (props: any) => <FDIFlowChart {...props} />,
 InvestmentFunnel: (props: any) => <InvestmentFunnel {...props} />,
 VideoPlayer: (props: any) => (
   <div className="-mx-6 lg:-mx-8 my-8">
     <div className="px-4 bg-neutral-50 relative md:xl:px-0 w-full h-auto max-w-7xl z-index-0 bg-transparent mx-auto rounded-xl overflow-hidden md:lg:rounded-none">
       <VideoPlayer {...props} />
     </div>
   </div>
 )
}// TinaCMS Template Components
const FAQTemplate = (props: any) => {
 const { 
  staticFaqs,
  pageUrl,
  contextType = 'general',
  title = 'Frequently Asked Questions',
  description
 } = props; // FAQ data map using ES6 imports (TinaCMS-compatible)
 const faqDataMap: any = {
  firstTimeBuyerFAQs,
  investmentGuideFAQs,
  twoBedroomFAQs,
  luxuryApartmentsFAQs,
  generalRealEstateFAQs,
  hillCrestFAQs,
  boutiqueResidencyFAQs,
  apartmentSaleFAQs,
 }; const faqData = staticFaqs ? faqDataMap[staticFaqs] || [] : []; return (
  <FAQ
   staticFaqs={faqData}
   pageUrl={pageUrl || (typeof window !== 'undefined' ? window.location.href : '')}
   contextType={contextType}
   title={title}
   description={description}
  />
 );
};// Template components for TinaCMS
const templateComponents = {
 FAQ: FAQTemplate,
 CallToAction: customComponents.CallToAction,
 PropertyCard: customComponents.PropertyCard,
 MarketTable: customComponents.MarketTable,
 PriceChart: customComponents.PriceChart,
 PropertyTypeDistribution: customComponents.PropertyTypeDistribution,
 TrendAnalysis: customComponents.TrendAnalysis,
 PricingTable: customComponents.PricingTable,
 PolarBarChart: customComponents.PolarBarChart,
 RadialChart: customComponents.RadialChart,
 RacingBarChart: customComponents.RacingBarChart,
 TimelineChart: customComponents.TimelineChart,
 WaterfallChart: customComponents.WaterfallChart,
 FinancialBreakdown: customComponents.FinancialBreakdown,
 CostAnalysis: customComponents.CostAnalysis,
 HeatmapChart: customComponents.HeatmapChart,
 PropertyDensityMap: customComponents.PropertyDensityMap,
 ScatterPlot: customComponents.ScatterPlot,
 PropertyScatter: customComponents.PropertyScatter,
 LiquidGauge: customComponents.LiquidGauge,
 OccupancyGauge: customComponents.OccupancyGauge,
 SalesTarget: customComponents.SalesTarget,
 EconomicGauge: customComponents.EconomicGauge,
 FDIFlowChart: customComponents.FDIFlowChart,
 InvestmentFunnel: customComponents.InvestmentFunnel,
 VideoPlayer: customComponents.VideoPlayer,
 // Direct enhanced chart components
 EChartsLineChart,
 EChartsColumnChart,
 EChartsPieChart,
 EChartsPolarBarChart,
 EChartsWaterfallChart,
 EChartsHeatmapChart,
 EChartsScatterChart,
 EChartsLiquidFillChart,
 EChartsPictorialBarChart,
 ECharts3DBarChart,
 EChartsCylindricalBarChart,
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
};

// Combine all components
const components = {
 ...htmlComponents,
 ...customComponents,
 ...templateComponents
}

// All components are properly exported
export default components