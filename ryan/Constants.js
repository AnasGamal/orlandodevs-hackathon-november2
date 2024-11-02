mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsbG1laWFud3UiLCJhIjoiY20zMGMzcHZ4MGw0NDJtcHhxbHpxeTN1YyJ9.9nfo3E3HlUVaCDrJHL_XJw'; // Replace with your Mapbox access token

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40], // Initial center; can be any location for now
    zoom: 9
});

// Grocery store coordinates (destination)
const groceryStoreCoordinates = [-73.985664, 40.748514]; // Replace with actual coordinates

// Add a marker for the grocery store location
new mapboxgl.Marker()
    .setLngLat(groceryStoreCoordinates)
    .setPopup(new mapboxgl.Popup().setText("Assigned Grocery Store"))
    .addTo(map);

// Function to start navigation
function startNavigation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const driverCoordinates = [
                    position.coords.longitude,
                    position.coords.latitude
                ];

                // Initialize the Mapbox Directions control
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving',
                    controls: {
                        inputs: false,           // Hide input fields
                        instructions: true       // Show turn-by-turn instructions
                    }
                });

                // Add Directions control to the map
                map.addControl(directions, 'top-left');

                // Set the origin and destination for navigation
                directions.setOrigin(driverCoordinates);           // Driver's location
                directions.setDestination(groceryStoreCoordinates); // Grocery store location

                // Fit map to show both points
                map.fitBounds([driverCoordinates, groceryStoreCoordinates], {
                    padding: 50
                });
            },
            (error) => {
                alert("Unable to retrieve location: " + error.message);
            },
            { enableHighAccuracy: true }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Decline order function (for demonstration)
function declineOrder() {
    alert("Order Declined");
}
