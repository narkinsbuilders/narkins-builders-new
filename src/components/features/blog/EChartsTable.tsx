import React from 'react'

interface Column {
  title: string
  dataIndex: string
  key: string
  render?: (value: any, record: any, index: number) => React.ReactNode
}

interface EChartsTableProps {
  columns: Column[]
  dataSource: any[]
  title: string
  pagination?: boolean
  size?: 'small' | 'middle' | 'large'
}

export default function EChartsTable({ 
  columns, 
  dataSource, 
  title,
  pagination = false,
  size = 'middle'
}: EChartsTableProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'text-xs px-3 py-2'
      case 'large': return 'text-base px-6 py-4'
      default: return 'text-sm px-4 py-3'
    }
  };

  if (!dataSource || dataSource.length === 0) {
    return (
      <div className="my-8 overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-neutral-800 to-black px-2 py-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-8">
          <div className="flex h-32 items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-lg font-medium">No data available</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-800 to-black px-2 py-6">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left font-semibold text-gray-800 border-r border-gray-200 last:border-r-0 ${getSizeClasses()}`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataSource.map((record, index) => (
              <tr
                key={index}
                className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-neutral-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`text-gray-700 border-r border-gray-100 last:border-r-0 ${getSizeClasses()}`}
                  >
                    {column.render 
                      ? column.render(record[column.dataIndex], record, index)
                      : record[column.dataIndex]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      {pagination && dataSource.length > 10 && (
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600 font-medium">
              Showing <span className="font-bold text-gray-900">{dataSource.length}</span> items
            </p>
          </div>
        </div>
      )}
    </div>
  )
}