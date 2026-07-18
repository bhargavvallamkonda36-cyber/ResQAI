import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function SOSPage() {

  const [position, setPosition] = useState([20.5937, 78.9629]);

  const [hospitals, setHospitals] = useState([]);
  const [police, setPolice] = useState([]);
  const [fireStations, setFireStations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (location) => {

        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        setPosition([lat, lon]);

        loadNearbyPlaces(lat, lon);

      },

      () => {

        alert("Location permission denied");

        setLoading(false);

      }

    );

  }, []);

  async function loadNearbyPlaces(lat, lon) {

    const query = `
[out:json][timeout:25];

(
node["amenity"="hospital"](around:25000,${lat},${lon});
way["amenity"="hospital"](around:25000,${lat},${lon});
relation["amenity"="hospital"](around:25000,${lat},${lon});

node["amenity"="police"](around:25000,${lat},${lon});
way["amenity"="police"](around:25000,${lat},${lon});
relation["amenity"="police"](around:25000,${lat},${lon});

node["amenity"="fire_station"](around:25000,${lat},${lon});
way["amenity"="fire_station"](around:25000,${lat},${lon});
relation["amenity"="fire_station"](around:25000,${lat},${lon});

);

out center;
`;

    try {

      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      const data = await response.json();

      const hospitalsData = [];
      const policeData = [];
      const fireData = [];

      data.elements.forEach((item) => {

        if (item.tags?.amenity === "hospital") {

          hospitalsData.push(item);

        }

        if (item.tags?.amenity === "police") {

          policeData.push(item);

        }

        if (item.tags?.amenity === "fire_station") {

          fireData.push(item);

        }

      });

      setHospitals(hospitalsData);

      setPolice(policeData);

      setFireStations(fireData);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  const copyLocation = () => {

    navigator.clipboard.writeText(

      `Latitude: ${position[0]}
Longitude: ${position[1]}`

    );

    alert("Location copied successfully!");

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">

        🚨 Emergency SOS

      </h1>
            {/* Emergency Numbers */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <a
          href="tel:108"
          style={{
            background: "#ef4444",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <h2>🚑 Ambulance</h2>
          <h1>108</h1>
        </a>

        <a
          href="tel:100"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <h2>👮 Police</h2>
          <h1>100</h1>
        </a>

        <a
          href="tel:101"
          style={{
            background: "#f97316",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <h2>🚒 Fire</h2>
          <h1>101</h1>
        </a>

        <a
          href="tel:112"
          style={{
            background: "#16a34a",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <h2>☎ Emergency</h2>
          <h1>112</h1>
        </a>
      </div>

      <h2 style={{ marginBottom: "15px" }}>
        📍 Your Current Location
      </h2>

      <MapContainer
        center={position}
        zoom={14}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            You are here
          </Popup>
        </Marker>
      </MapContainer>

      {loading ? (
        <h2>Loading nearby places...</h2>
      ) : (
        <>
          <h2>🏥 Nearby Hospitals</h2>

          {hospitals.length === 0 ? (
            <p>No hospitals found.</p>
          ) : (
            hospitals.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.tags?.name || "Hospital"}</h3>

                <p>
                  Latitude :
                  {item.lat || item.center?.lat}
                </p>

                <p>
                  Longitude :
                  {item.lon || item.center?.lon}
                </p>
              </div>
            ))
          )}

          <br />

          <h2>👮 Nearby Police Stations</h2>

          {police.length === 0 ? (
            <p>No police stations found.</p>
          ) : (
            police.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.tags?.name || "Police Station"}</h3>
              </div>
            ))
          )}

          <br />

          <h2>🚒 Nearby Fire Stations</h2>

          {fireStations.length === 0 ? (
            <p>No fire stations found.</p>
          ) : (
            fireStations.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.tags?.name || "Fire Station"}</h3>
              </div>
            ))
          )}
                    <br />

          <button
            onClick={copyLocation}
            style={{
              width: "100%",
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "20px",
              fontSize: "22px",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: "pointer",
              marginTop: "30px",
            }}
          >
            🚨 SEND SOS
          </button>

          <p
            style={{
              marginTop: "15px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Your current GPS coordinates will be copied to the clipboard.
            You can share them with emergency services or family.
          </p>
        </>
      )}

    </div>
  );
}
