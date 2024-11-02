'use client'
import { useState } from 'react';
import Logo from '@/app/assets/GroupKart.png';
import Image from 'next/image';
import Link from 'next/link';

const UserTypeToggle = ({ isDriver, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span className="text-xl">
        {isDriver ? '🚚' : '👤'}
      </span>
      <span className="text-gray-700">
        {isDriver ? 'Switch to customer' : 'Switch to driver'}
      </span>
    </button>
  );
};

const Sidebar = () => {
  const [isDriver, setIsDriver] = useState(false);

  const handleToggle = () => {
    setIsDriver(prev => !prev);
  };

  const menuItems = [
    { icon: '🚚', label: 'Deliver', role: 'Driver', url: '/deliver' },
    { icon: '🛒', label: 'Order', role: 'Customer', url:'/order' },
    { icon: '📋', label: 'Orders', role: 'All', url:'/' }
  ];

  // Filter menu items based on user type
  const filteredMenuItems = menuItems.filter(item => 
    item.role === 'All' || 
    (isDriver && item.role === 'Driver') || 
    (!isDriver && item.role === 'Customer')
  );

  return (
    <div className="w-64 bg-white p-4 border-r h-screen relative">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">
            <Image src={Logo} alt="GroupKart" className="h-10 w-10" />
          </span>
          <span className="text-xl font-semibold text-green-400">GroupKart</span>
        </div>
      </div>

      <UserTypeToggle isDriver={isDriver} onToggle={handleToggle} />

      <nav className="mt-4">
        {filteredMenuItems.map((item) => (
          <Link href={item.url} key={item.label}>
          <div
            key={item.label}
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <span>{item.icon}</span>
            <span className="text-gray-700">{item.label}</span>
          </div>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Logged in as</span>
          <span className="text-gray-700 font-semibold">Ian Wu</span>
        </div>
        <button className="w-full px-4 py-2 bg-green-400 text-white rounded-3xl mt-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;