'use client'
import React, { useState } from 'react';
import { Search, ShoppingCart, Clock, Store } from 'lucide-react';
import OrderMatching from '@/app/components/OrderMatching';

// Updated hardcoded data with prices
const STORES = [
  { id: 1, name: 'Walmart', acceptsSnap: true },
  { id: 2, name: 'Publix', acceptsSnap: false },
  { id: 3, name: 'Other', acceptsSnap: true }
];

const FOOD_CATEGORIES = [
  { 
    id: 1, 
    name: 'Fruits', 
    items: [
      { id: 1, name: 'Apples', price: 0.50, unit: 'each' },
      { id: 2, name: 'Bananas', price: 0.20, unit: 'each' },
      { id: 3, name: 'Oranges', price: 0.75, unit: 'each' },
      { id: 4, name: 'Strawberries', price: 3.99, unit: 'box' }
    ]
  },
  { 
    id: 2, 
    name: 'Vegetables', 
    items: [
      { id: 5, name: 'Carrots', price: 1.99, unit: 'lb' },
      { id: 6, name: 'Broccoli', price: 2.49, unit: 'lb' },
      { id: 7, name: 'Spinach', price: 3.99, unit: 'bag' },
      { id: 8, name: 'Potatoes', price: 0.99, unit: 'lb' }
    ]
  },
  {
    id: 3,
    name: 'Dairy',
    items: [
      { id: 9, name: 'Milk', price: 3.49, unit: 'gallon' },
      { id: 10, name: 'Eggs', price: 4.99, unit: 'dozen' },
      { id: 11, name: 'Cheese', price: 3.99, unit: 'block' },
      { id: 12, name: 'Yogurt', price: 0.99, unit: 'cup' }
    ]
  },
  {
    id: 4,
    name: 'Pantry',
    items: [
      { id: 13, name: 'Bread', price: 2.49, unit: 'loaf' },
      { id: 14, name: 'Rice', price: 4.99, unit: '5lb' },
      { id: 15, name: 'Pasta', price: 1.99, unit: 'box' },
      { id: 16, name: 'Cereal', price: 3.99, unit: 'box' }
    ]
  }
];

const ACTIVE_SHOPPERS = [
  { id: 1, name: "Sarah M.", store: "Walmart", deliveryTime: "2-4 PM" },
  { id: 2, name: "John D.", store: "Publix", deliveryTime: "3-5 PM" },
  { id: 3, name: "Mike R.", store: "Walmart", deliveryTime: "4-6 PM" }
];

export default function OrderFlow() {
  const [step, setStep] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);
  const [cartItems, setCartItems] = useState({});  // Changed to object for quantity tracking
  const [selectedShopper, setSelectedShopper] = useState(null);
  const addItem = (item) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeItem = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const findItemById = (itemId) => {
    for (const category of FOOD_CATEGORIES) {
      const item = category.items.find(item => item.id === itemId);
      if (item) return item;
    }
    return null;
  };

  const calculateTotal = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = findItemById(parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  const renderStoreSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select a Store</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STORES.map(store => (
          <button
            key={store.id}
            className={`p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${
              selectedStore?.id === store.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
            }`}
            onClick={() => setSelectedStore(store)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{store.name}</span>
              {store.acceptsSnap && (
                <span className="text-sm bg-emerald-100 text-emerald-900 px-2 py-1 rounded-md">
                  SNAP Accepted
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderFoodSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select Items</h2>
      <div className="flex gap-4">
        <div className="w-2/3 space-y-4">
          {FOOD_CATEGORIES.map(category => (
            <div key={category.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">{category.name}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map(item => (
                  <button
                    key={item.id}
                    className="flex justify-between items-center text-left px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-900"
                    onClick={() => addItem(item)}
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-600">
                      ${item.price.toFixed(2)}/{item.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3">
          <div className="border rounded-lg p-4 bg-white shadow-sm md:sticky md:top-4">
            <h3 className="font-medium text-gray-900 mb-2">Your Cart</h3>
            {Object.keys(cartItems).length === 0 ? (
              <p className="text-gray-500">No items selected</p>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {Object.entries(cartItems).map(([itemId, quantity]) => {
                    const item = findItemById(parseInt(itemId));
                    return (
                      <li key={itemId} className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-900">{item.name}</span>
                          <div className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} × {quantity}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900">
                            ${(item.price * quantity).toFixed(2)}
                          </span>
                          <button
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            onClick={() => removeItem(parseInt(itemId))}
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderShopperSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select a Shopper</h2>
      <div className="grid grid-cols-1 gap-4">
        {ACTIVE_SHOPPERS.map(shopper => (
          <button
            key={shopper.id}
            className={`p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${
              selectedShopper?.id === shopper.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
            }`}
            onClick={() => setSelectedShopper(shopper)}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">{shopper.name}</span>
                <div className="text-sm text-gray-600">
                  Shopping at {shopper.store}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Delivery: {shopper.deliveryTime}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
        <div>
          <h3 className="font-medium text-gray-900">Store</h3>
          <p className="text-gray-700">{selectedStore.name}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Items</h3>
          <ul className="space-y-2">
            {Object.entries(cartItems).map(([itemId, quantity]) => {
              const item = findItemById(parseInt(itemId));
              return (
                <li key={itemId} className="flex justify-between text-gray-700">
                  <span>{item.name} × {quantity}</span>
                  <span>${(item.price * quantity).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
          <div className="border-t mt-2 pt-2">
            <div className="flex justify-between font-medium text-gray-900">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Shopper</h3>
          <p className="text-gray-700">{selectedShopper.name}</p>
          <p className="text-sm text-gray-600">Delivery: {selectedShopper.deliveryTime}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map(stepNum => (
              <div
                key={stepNum}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
        </div>
      </div>

      {step === 1 && renderStoreSelection()}
      {step === 2 && renderFoodSelection()}
      {step === 3 && renderShopperSelection()}
      {step === 4 && renderConfirmation()}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        {step < 4 && selectedStore && (
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm ml-auto"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </button>
        )}
        {step === 4 && (
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm ml-auto"
            onClick={() => setStep(step + 1)}
          >
            Place Order
          </button>
        )}
        {step === 5 && (
            <OrderMatching
            store={selectedStore}
            items={Object.entries(cartItems).map(([itemId, quantity]) => ({
              ...findItemById(parseInt(itemId)),
              quantity
            }))}
            shopper={selectedShopper}
            onClose={() => setStep(step - 1)}
            orderDetails={{
              subtotal: calculateTotal(),
              items: cartItems
            }}
          />
        )}
      </div>
    </div>
  );
}