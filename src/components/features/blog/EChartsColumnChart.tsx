import React from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
  }
)

interface EChartsColumnChartProps {
  data: Array<{
    area?: string
    category?: string
    name?: string
    growth?: number
    value?: number
    value1?: number
    value2?: number
    type?: string
    label1?: string
    label2?: string
  }>
  title: string
  xField: string
  yField: string | string[]
  seriesField?: string
  isGroup?: boolean
  color?: string | string[]
  height?: number
}

export default function EChartsColumnChart({ 
  data, 
  title, 
  xField, 
  yField, 
  seriesField,
  isGroup = false,
  color = '#1890ff', 
  height = 300 
}: EChartsColumnChartProps) {
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

  let option;
  
  if (isGroup && seriesField) {
    // Grouped column chart
    const series = Array.from(new Set(data.map(item => item[seriesField as keyof typeof item]))).map((seriesName, index) => {
      const seriesData = data
        .filter(item => item[seriesField as keyof typeof item] === seriesName)
        .map(item => item[yField as keyof typeof item]);
      
      return {
        name: seriesName,
        type: 'bar',
        data: seriesData,
        itemStyle: {
          color: Array.isArray(color) ? color[index % color.length] : (index === 0 ? '#1890ff' : '#52c41a'),
          borderRadius: [4, 4, 0, 0]
        }
      };
    });

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: series.map(s => s.name),
        top: 10
      },
      xAxis: {
        type: 'category',
        data: Array.from(new Set(data.map(item => item[xField as keyof typeof item]))),
        axisLine: {
          lineStyle: { color: '#e5e7eb' }
        },
        axisLabel: {
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: { color: '#e5e7eb' }
        },
        axisLabel: {
          color: '#6b7280'
        },
        splitLine: {
          lineStyle: { color: '#f3f4f6' }
        }
      },
      series
    };
  } else {
    // Single series column chart
    const chartData = data.map(item => ({
      name: item[xField as keyof typeof item],
      value: item[yField as keyof typeof item]
    }));
    
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item[xField as keyof typeof item]),
        axisLine: {
          lineStyle: { color: '#e5e7eb' }
        },
        axisLabel: {
          color: '#6b7280',
          rotate: data.length > 6 ? 45 : 0
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: { color: '#e5e7eb' }
        },
        axisLabel: {
          color: '#6b7280'
        },
        splitLine: {
          lineStyle: { color: '#f3f4f6' }
        }
      },
      series: [{
        type: 'bar',
        data: chartData,
        itemStyle: {
          color: Array.isArray(color) ? color[0] : color,
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: Array.isArray(color) ? color[0] : color,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
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