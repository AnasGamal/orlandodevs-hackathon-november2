'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Map({ selectedOrder, orders }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markers = useRef({})

  useEffect(() => {
    if (!mapboxgl.supported()) {
      return alert('Your browser does not support Mapbox GL')
    }
    if (!mapboxgl.accessToken) {
      return
    }
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98, 39], // Center of USA
        zoom: 3
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    }

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove())
    markers.current = {}

    // Add markers for all orders
    orders.forEach(order => {
      const el = document.createElement('div')
      el.className = 'w-6 h-6 bg-blue-500 rounded-full border-2 border-white'
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat(order.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <div class="font-bold">ID ${order.id}</div>
                <div>${order.pickupLocation}</div>
              </div>
            `)
        )
        .addTo(map.current)

      markers.current[order.id] = marker
    })

    // If there's a selected order, zoom to it
    if (selectedOrder) {
      map.current.flyTo({
        center: selectedOrder.coordinates,
        zoom: 12,
        duration: 2000
      })
      markers.current[selectedOrder.id].togglePopup()
    }

    return () => {
      if (map.current) {
        Object.values(markers.current).forEach(marker => marker.remove())
      }
    }
  }, [selectedOrder, orders])

  return (
    <div className="relative h-full">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Current location</div>
            <div className="text-gray-500">Route 1-75</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Current speed</div>
            <div className="text-gray-500">76 mph</div>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="h-full" />
    </div>
  )
}