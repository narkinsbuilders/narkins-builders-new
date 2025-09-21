import React from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center bg-gray-50">Loading chart...</div>
  }
)

interface EChartsLiquidFillChartProps {
  value: number // Percentage value (0-100)
  title: string
  subtitle?: string
  color?: string | string[]
  backgroundColor?: string
  height?: number
  width?: number
  showWave?: boolean
  waveAnimation?: boolean
  animationDuration?: number
  formatter?: (value: number) => string
}

export default function EChartsLiquidFillChart({ 
  value, 
  title,
  subtitle,
  color = '#1890ff',
  backgroundColor = '#f0f0f0',
  height = 300,
  width = 300,
  showWave = true,
  waveAnimation = true,
  animationDuration = 4000,
  formatter
}: EChartsLiquidFillChartProps) {
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

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  const normalizedValue = clampedValue / 100;

  // Create liquid fill effect using custom series
  const option = {
    animationDuration: animationDuration,
    title: {
      text: title,
      subtext: subtitle,
      left: 'center',
      top: '10%',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      },
      subtextStyle: {
        fontSize: 12,
        color: '#6b7280'
      }
    },
    series: [
      {
        type: 'liquidFill',
        data: [normalizedValue],
        color: Array.isArray(color) ? color : [color],
        backgroundStyle: {
          color: backgroundColor
        },
        label: {
          formatter: formatter ? 
            () => formatter(clampedValue) : 
            () => `${clampedValue.toFixed(1)}%`,
          fontSize: 24,
          fontWeight: 'bold',
          color: '#ffffff'
        },
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            borderWidth: 8,
            borderColor: Array.isArray(color) ? color[0] : color,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
          }
        },
        wave: showWave ? {
          length: '80%',
          animation: waveAnimation
        } : {
          length: 0
        },
        radius: '80%',
        center: ['50%', '60%']
      }
    ]
  };

  // Since echarts-liquidfill might not be available, fallback to a gauge
  const fallbackOption = {
    animationDuration: animationDuration,
    title: {
      text: title,
      subtext: subtitle,
      left: 'center',
      top: '5%',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      },
      subtextStyle: {
        fontSize: 12,
        color: '#6b7280'
      }
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        radius: '80%',
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [normalizedValue, Array.isArray(color) ? color[0] : color],
              [1, backgroundColor]
            ]
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        pointer: {
          show: false
        },
        detail: {
          formatter: formatter ? 
            () => formatter(clampedValue) : 
            () => `${clampedValue.toFixed(1)}%`,
          fontSize: 24,
          fontWeight: 'bold',
          color: Array.isArray(color) ? color[0] : color,
          offsetCenter: [0, '10%']
        },
        data: [
          {
            value: clampedValue
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border my-8 p-6">
      <div style={{ height, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: Math.min(width, 400), height }}>
          <ReactECharts 
            option={fallbackOption} 
            style={{ height: `${height}px`, width: '100%' }} 
          />
        </div>
      </div>
    </div>
  )
}