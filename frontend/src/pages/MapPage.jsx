import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapPage() {
  // User location
  const [position, setPosition] = useState([20.5937, 78.9629]);

  // Earthquake data
  const [earthquakes, setEarthquakes] = useState([]);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  // Fetch latest earthquakes
  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        setEarthquakes(data.features);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        🌍 Live Disaster Map
      </h1>

      <MapContainer
        center={position}
        zoom={5}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        <Marker position={position}>
          <Popup>Your Current Location</Popup>
        </Marker>

        {/* Earthquake Markers */}
        {earthquakes.map((quake) => (
          <CircleMarker
            key={quake.id}
            center={[
              quake.geometry.coordinates[1],
              quake.geometry.coordinates[0],
            ]}
            radius={6}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <strong>{quake.properties.place}</strong>
              <br />
              Magnitude: {quake.properties.mag}
              <br />
              Time:
              <br />
              {new Date(quake.properties.time).toLocaleString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;