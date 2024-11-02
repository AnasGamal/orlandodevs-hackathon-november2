import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Star, Leaf } from 'lucide-react';

const OrderMatching = ({ orderDetails, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [matched, setMatched] = useState(false);
  const [priceDetails, setPriceDetails] = useState(null);

  // Simulate matching progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setMatched(true);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // Simulate price calculation based on distance
  useEffect(() => {
    const calculatePricing = () => {
      const distanceKm = 8.5; // Example distance
      const pricePerKm = 0.30;
      const flatFee = 2.00;
      
      const regularPrice = (distanceKm * pricePerKm + flatFee).toFixed(2);
      const numCustomers = 2;
      const sharedPrice = ((distanceKm * pricePerKm / numCustomers) + flatFee).toFixed(2);
      
      return {
        regular: parseFloat(regularPrice),
        shared: parseFloat(sharedPrice),
        savings: (regularPrice - sharedPrice).toFixed(2),
        distance: distanceKm.toFixed(1),
        numCustomers
      };
    };

    setPriceDetails(calculatePricing());
  }, []);

  const driverInfo = {
    name: "Michael Rodriguez",
    rating: 4.9,
    totalDeliveries: 1248,
    phone: "(555) 123-4567",
    vehicle: "Toyota Camry",
    licensePlate: "ABC 123",
    photo: "/api/placeholder/64/64"
  };

  const orderSummary = {
    subtotal: orderDetails ? orderDetails.subtotal : 50,
    deliveryFee: priceDetails?.shared || 3.00,
    total: orderDetails ? (orderDetails.subtotal + (priceDetails?.shared || 3.00)) : 53.00
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-6 space-y-6">
          {!matched ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900">Finding your delivery driver...</h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b">
                <img
                  src={driverInfo.photo}
                  alt={driverInfo.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{driverInfo.name}</h2>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{driverInfo.rating}</span>
                    <span>•</span>
                    <span>{driverInfo.totalDeliveries} deliveries</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{driverInfo.vehicle} • {driverInfo.licensePlate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{driverInfo.phone}</span>
                </div>
              </div>

              {priceDetails && (
                <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-medium text-emerald-900">Shared Delivery Savings</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Regular delivery fee ({priceDetails.distance} miles)</span>
                      <span>${priceDetails.regular}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shared delivery fee ({priceDetails.numCustomers} customers)</span>
                      <span>${priceDetails.shared}</span>
                    </div>
                    <div className="flex justify-between font-medium text-emerald-700 pt-1 border-t border-emerald-200">
                      <span>Your savings</span>
                      <span>${priceDetails.savings}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee (Shared)</span>
                  <span>${orderSummary.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => window.location.href = '/'}
                >
                  Track Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderMatching;