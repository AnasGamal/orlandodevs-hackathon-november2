'use client'

export default function DriverInfo({ driver }) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h3 className="text-lg text-gray-700 font-semibold">{driver.name}</h3>
          <p className="text-gray-500">{driver.role}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-3xl">
            Call
          </button>
          <button className="px-4 py-2 border rounded-3xl text-gray-500">
            Chat
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <div className="text-sm text-gray-600">Experience</div>
          <div className="text-gray-400">{driver.experience}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">License</div>
          <div className="text-gray-400">{driver.licenseType}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">ID number</div>
          <div className="text-gray-400">{driver.idNumber}</div>
        </div>
      </div>
    </div>
  )
}