import React from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
  }
)

interface EChartsPolarBarChartProps {
  data: Array<{category: string, value: number}>
  title: string
  color?: string | string[]
  height?: number
  innerRadius?: number | string
  outerRadius?: number | string
  startAngle?: number
  maxValue?: number
  showLabels?: boolean
  labelPosition?: 'start' | 'middle' | 'end'
  animationDuration?: number
}

export default function EChartsPolarBarChart({ 
  data, 
  title, 
  color = '#1890ff',
  height = 400,
  innerRadius = 30,
  outerRadius = '80%',
  startAngle = 75,
  maxValue,
  showLabels = true,
  labelPosition = 'middle',
  animationDuration = 3000
}: EChartsPolarBarChartProps) {
  // Early return for data validation before hooks
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

  // Extract categories and values
  const categories = data.map(item => item.category);
  const values = data.map(item => item.value);
  const calculatedMaxValue = maxValue || Math.max(...values) * 1.1;

  // Generate colors for each bar
  const getBarColors = () => {
    if (Array.isArray(color)) {
      return values.map((_, index) => color[index % color.length]);
    }
    return color;
  };

  const option = {
    animationDuration: animationDuration,
    title: {
      show: false
    },
    polar: {
      radius: [innerRadius, outerRadius]
    },
    angleAxis: {
      max: calculatedMaxValue,
      startAngle: startAngle,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f0f0f0',
          width: 1,
          type: 'solid'
        }
      }
    },
    radiusAxis: {
      type: 'category',
      data: categories,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        color: '#6b7280',
        fontSize: 12,
        margin: 8
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        return `${params.name}: ${params.value}`;
      }
    },
    series: {
      type: 'bar',
      data: values.map((value, index) => ({
        value: value,
        itemStyle: {
          color: Array.isArray(color) ? color[index % color.length] : color
        }
      })),
      coordinateSystem: 'polar',
      label: showLabels ? {
        show: true,
        position: labelPosition,
        formatter: '{c}',
        color: '#374151',
        fontSize: 11,
        fontWeight: 'bold'
      } : {
        show: false
      },
      barWidth: '60%',
      roundCap: true
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div style={{ height }}>
        <ReactECharts option={option} style={{ height: `${height}px`, width: '100%' }} />
      </div>
    </div>
  )
}