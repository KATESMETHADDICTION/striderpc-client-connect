import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveChatWidget from "./components/LiveChatWidget";
import StaffDashboard from "./pages/StaffDashboard";
import Legal from "./pages/Legal";
import Index from "./pages/Index"; // <-- Import your homepage

function App() {
  return (
    <BrowserRouter>
      <LiveChatWidget />
      <Routes>
        <Route path="/" element={<Index />} /> {/* Home route */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
