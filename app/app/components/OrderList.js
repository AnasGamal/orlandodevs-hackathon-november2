'use client'

export default function OrderList({ orders, onSelectOrder, selectedOrder }) {
  return (
    <div className=" p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Active orders ({orders.length})</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 border rounded-lg text-gray-500">Filters</button>
        </div>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`border p-4 bg-white rounded-lg hover:bg-gray-50 cursor-pointer ${
              selectedOrder?.id === order.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onSelectOrder(order)}
          >
            <div className="flex justify-between">
              <div>
                <span className="font-medium text-gray-500">ID {order.id}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  order.status === 'in-transit' ? 'bg-green-100 text-green-800' :
                  order.status === 'no-connection' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mt-2 text-gray-600">
              <div>{order.pickupDate} • {order.pickupLocation}</div>
              <div>{order.deliveryDate} • {order.deliveryLocation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
