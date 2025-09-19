import React from 'react'

export default function AvisSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
    </div>
  )
}
