import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const mdxComponents = {
  // Property card component
  PropertyCard: ({ title, price, location, image, features, link }: {
    title: string
    price: string
    location: string
    image: string
    features: string[]
    link: string
  }) => (
    <Card className="p-6 my-8 border rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Image 
            src={image} 
            alt={title}
            width={300}
            height={200}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="lg:w-2/3">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-2xl font-bold text-green-600 mb-2">{price}</p>
          <p className="text-gray-600 mb-4">{location}</p>
          <ul className="space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-700">✓ {feature}</li>
            ))}
          </ul>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href={link}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  ),

  // Call to action component
  CallToAction: ({ title = "Ready to Invest?", buttonText = "Contact Us", link = "/contact" }: {
    title?: string
    buttonText?: string
    link?: string
  }) => (
    <Card className="bg-neutral-50 p-8 my-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">
        Schedule a consultation with our property experts.
      </p>
      <Button asChild className="bg-black text-white hover:bg-gray-800">
        <Link href={link}>{buttonText}</Link>
      </Button>
    </Card>
  ),

  // Market comparison table
  MarketTable: ({ data, title }: { data: any; title?: string }) => (
    <Card className="my-8 overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {data.headers.map((header: string, index: number) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row: any[], rowIndex: number) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
