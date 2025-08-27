import React from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(
  () => import('echarts-for-react'),
  { 
    ssr: false,
    loading: () => <div>Loading gauge...</div>
  }
)

interface EconomicGaugeProps {
  value: number | string
  title: string
  subtitle?: string
}

export default function EconomicGauge({ value, title, subtitle }: EconomicGaugeProps) {
  // Safe value parsing with comprehensive validation
  const parseValue = (val: number | string | undefined): number => {
    if (typeof val === 'number' && !isNaN(val)) return Math.max(0, Math.min(100, val));
    if (typeof val === 'string') {
      const parsed = parseFloat(val);
      return !isNaN(parsed) ? Math.max(0, Math.min(100, parsed)) : 0;
    }
    return 0;
  };
  
  const gaugeValue = parseValue(value);
  const percentValue = gaugeValue / 100;
  
  // Ensure percent is valid (0-1 range)
  const safePercent = Math.max(0, Math.min(1, percentValue));
  
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 100,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.33, '#F4664A'],
              [0.66, '#FAAD14'],
              [1, '#30BF78']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 12,
          distance: -60,
          formatter: function (value: number) {
            if (value === 33) return 'Crisis';
            if (value === 66) return 'Recovery';
            if (value === 100) return 'Growth';
            return value.toString();
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 16,
          color: '#464646'
        },
        detail: {
          fontSize: 36,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value).toString();
          },
          color: 'inherit'
        },
        data: [
          {
            value: gaugeValue,
            name: 'Score'
          }
        ]
      }
    ]
  }

  // Add client-side check
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-sm border mb-6 p-5">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title || 'Loading...'}</h3>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          Loading gauge...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6 p-5">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title || 'Economic Gauge'}</h3>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div style={{ height: 300 }}>
        <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
      </div>
      <div className="text-center mt-4">
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Crisis (0-33)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>Recovery (34-66)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Growth (67-100)</span>
          </div>
        </div>
      </div>
    </div>
  )
}