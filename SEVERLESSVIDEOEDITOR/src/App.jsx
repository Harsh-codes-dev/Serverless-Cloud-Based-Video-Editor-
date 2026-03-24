import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Processing from "./pages/Processing";
import GradientBlinds from "./components/ui/gradient-blinds";
import Output from "./pages/Output";

export default function App() {
  return (
    <BrowserRouter>
    {/* 🧠 UI LAYER (does NOT block mouse) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100%",
          overflow: "hidden",
          pointerEvents: "auto",
         
        }}
      >
        {/* Navbar MUST allow clicks */}
        <div style={{ pointerEvents: "auto" }}>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </div>
      {/* 🌌 FULLSCREEN BACKGROUND (captures mouse everywhere) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "auto", // 🔥 REQUIRED for mouse tracking
        }}
      >
        <GradientBlinds
          gradientColors={["#FF9FFC", "#5227FF"]}
          angle={0}
          noise={0.4}
          blindCount={12}
          blindMinWidth={50}

          /* 🎯 Mouse spotlight */
          mouseDampening={0.06}
          spotlightRadius={0.4}
          spotlightSoftness={1}
          spotlightOpacity={1}

          distortAmount={1.2}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      
    </BrowserRouter>
  );
}
