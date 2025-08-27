import React from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
  }
)

interface EChartsPieChartProps {
  data: Array<{
    type?: string
    name?: string
    value: number
    color?: string
  }>
  title: string
  height?: number
  showLegend?: boolean
  showLabel?: boolean
}

export default function EChartsPieChart({ 
  data, 
  title, 
  height = 300,
  showLegend = true,
  showLabel = true
}: EChartsPieChartProps) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title || 'Loading...'}</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          Loading chart...
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded">
          No data available
        </div>
      </div>
    );
  }

  // Default colors if not provided
  const defaultColors = ['#1890ff', '#52c41a', '#faad14', '#f759ab', '#13c2c2', '#eb2f96', '#722ed1', '#fa8c16'];
  
  const chartData = data.map((item, index) => ({
    name: item.type || item.name || `Item ${index + 1}`,
    value: item.value,
    itemStyle: {
      color: item.color || defaultColors[index % defaultColors.length]
    }
  }));

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: showLegend ? {
      top: 'bottom',
      left: 'center',
      data: chartData.map(item => item.name),
      textStyle: {
        color: '#6b7280'
      }
    } : undefined,
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: showLabel ? {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#6b7280'
        } : {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: showLabel ? {
          show: true
        } : {
          show: false
        },
        data: chartData
      }
    ]
  };

  // If there's too much data, show as progress bars instead
  if (data.length > 8) {
    return (
      <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">{item.type || item.name || `Item ${index + 1}`}</span>
              <div className="flex items-center space-x-3 w-3/5">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color || defaultColors[index % defaultColors.length]
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 min-w-[40px] font-medium">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div style={{ height }}>
        <ReactECharts option={option} style={{ height: `${height}px`, width: '100%' }} />
      </div>
    </div>
  )
}