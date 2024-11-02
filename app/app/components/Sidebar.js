'use client'
import Logo from '@/app/assets/GroupKart.png'
import Image from 'next/image'

export default function Sidebar() {
  const menuItems = [
    { icon: '⌚', label: 'Dashboard' },
    { icon: '📦', label: 'Freight management' },
    { icon: '🔍', label: 'Tracking orders' },
    { icon: '🚚', label: 'Carriers' },
    { icon: '📋', label: 'Orders history' },
    { icon: '💰', label: 'Billing details' },
    { icon: '⚙️', label: 'Settings' },
  ]

  return (
    <div className="w-64 bg-white p-4 border-r">
      <div className="mb-8">
=        <div className="flex items-center space-x-2">
          <span className="text-2xl">
            <Image src={Logo} alt="GroupKart" className="w-8 h-8" />
          </span>
          <span className="text-xl font-semibold text-green-400">GroupKart</span>
        </div>
      </div>
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer "
          >
            <span>{item.icon}</span>
            <span className="text-gray-700">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}