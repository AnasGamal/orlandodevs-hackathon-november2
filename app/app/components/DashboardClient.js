'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from './Sidebar'
import OrderList from './OrderList'
import DriverInfo from './DriverInfo'

// Dynamically import the map component with no SSR
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      Loading map...
    </div>
  ),
})

const sampleOrders = [
  {
    id: '816495',
    type: 'Food',
    status: 'in-transit',
    pickupDate: '23 Apr',
    pickupLocation: '821 Jadloc Parkway, Calumet City, IL',
    deliveryDate: '25 Apr',
    deliveryLocation: '982 Cemij View',
    coordinates: [-87.5294, 41.6156] // Example coordinates for Calumet City
  },
  {
    id: '816403',
    type: 'Groupage cargo',
    status: 'no-connection',
    pickupDate: '23 Apr',
    pickupLocation: '1640 Dijulu Pass, San Francisco, CA',
    deliveryDate: '25 Apr',
    deliveryLocation: '1266 Pebef Highway, Colma, CA',
    coordinates: [-122.4194, 37.7749] // Example coordinates for San Francisco
  }
]

const sampleDriver = {
  name: 'Philip Osborne',
  role: 'Driver',
  experience: '12 years',
  licenseType: 'CDL',
  idNumber: '2415-63-7867',
  licenseClass: 'A, D',
  insuranceNumber: '987-34-2415'
}

export default function DashboardClient() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-3rem)]">
          <OrderList 
            orders={sampleOrders} 
            onSelectOrder={setSelectedOrder}
            selectedOrder={selectedOrder}
          />
          <div className="space-y-6">
            <div className="h-2/3 rounded-lg overflow-hidden">
              <Map selectedOrder={selectedOrder} orders={sampleOrders} />
            </div>
            <DriverInfo driver={sampleDriver} />
          </div>
        </div>
      </div>
    </div>
  )
}
