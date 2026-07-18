import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeather } from "../services/weather";

export default function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeather(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(data);
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg,#2563eb,#60a5fa)",
          color: "white",
          textAlign: "center",
          padding: "70px 20px",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "15px" }}>
          🌍 AI Smart Disaster Assistant
        </h1>

        <p
          style={{
            fontSize: "24px",
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          Helping people stay safe during disasters using Artificial
          Intelligence, Live Maps, Emergency SOS and Real-Time News.
        </p>

        <div style={{ marginTop: "35px" }}>
          <Link
            to="/map"
            style={{
              background: "white",
              color: "#2563eb",
              padding: "14px 28px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              marginRight: "15px",
            }}
          >
            🌍 Explore Map
          </Link>

          <Link
            to="/chat"
            style={{
              background: "#16a34a",
              color: "white",
              padding: "14px 28px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🤖 AI Assistant
          </Link>
        </div>
      </div>

      {/* WEATHER */}
       {weather?.main && (
        <div
          style={{
            width: "380px",
            margin: "30px auto",
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          }}
        >
          <h2>🌤 Current Weather</h2>

          <h1 style={{ fontSize: "45px", color: "#2563eb" }}>
            {Math.round(weather.main.temp)}°C
          </h1>

          <h3>{weather.weather[0].main}</h3>

          <p>📍 {weather.name}</p>

          <p>💧 Humidity : {weather.main.humidity}%</p>

          <p>🌬 Wind : {weather.wind.speed} m/s</p>
        </div>
      )}

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          padding: "20px 40px",
        }}
      >
        {[
          {
            title: "🌍 Active Disasters",
            value: "128+",
          },
          {
            title: "📰 News Today",
            value: "35+",
          },
          {
            title: "🚨 SOS Requests",
            value: "540+",
          },
          {
            title: "🤖 AI Assistance",
            value: "2500+",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,.12)",
            }}
          >
            <h3>{item.title}</h3>

            <h1
              style={{
                color: "#2563eb",
                fontSize: "50px",
              }}
            >
              {item.value}
            </h1>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ padding: "40px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          🚀 Features
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >
          <FeatureCard
            title="🌍 Live Disaster Map"
            desc="View earthquakes, floods and disasters in real time."
            color="#2563eb"
            link="/map"
          />

          <FeatureCard
            title="🤖 AI Emergency Chat"
            desc="Get instant AI guidance during emergencies."
            color="#16a34a"
            link="/chat"
          />

          <FeatureCard
            title="📰 Latest News"
            desc="Stay updated with live disaster news."
            color="#7c3aed"
            link="/news"
          />

          <FeatureCard
            title="🚨 Emergency SOS"
            desc="Find hospitals and emergency contacts nearby."
            color="#dc2626"
            link="/sos"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, color, link }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <h2>{title}</h2>

      <p
        style={{
          color: "#555",
          margin: "15px 0",
        }}
      >
        {desc}
      </p>

      <Link
        to={link}
        style={{
          color: color,
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Open →
      </Link>
    </div>
  );
}