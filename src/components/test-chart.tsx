import React from 'react'
import { Card } from 'antd'
import dynamic from 'next/dynamic'

const TestLine = dynamic(
 () => import('@ant-design/plots').then(mod => {
  return { default: mod.Line }
 }).catch(error => {
  console.error('Chart module failed to load:', error)
  return { default: () => <div>Failed to load chart</div> }
 }),
 { 
  ssr: false,
  loading: () => <div>Loading...</div>
 }
)

export default function TestChart() {
 const data = [
  { year: '2021', price: 100 },
  { year: '2022', price: 120 },
  { year: '2023', price: 140 }
 ]

 const config = {
  data,
  xField: 'year',
  yField: 'price',
  color: '#1890ff'
 }

 return (
  <div className="p-4">
   <h2>Test Chart Component</h2>
   <Card title="Test Chart" variant="borderless">
    <TestLine {...config} height={300} />
   </Card>
  </div>
 )
}