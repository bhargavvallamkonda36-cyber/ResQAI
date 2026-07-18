import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import SOSPage from "./pages/SOSPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/sos" element={<SOSPage />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;