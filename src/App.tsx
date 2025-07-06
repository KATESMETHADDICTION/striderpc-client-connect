import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveChatWidget from "./components/LiveChatWidget";
import StaffDashboard from "./pages/StaffDashboard";
import Legal from "./pages/Legal";
// ...other imports

function App() {
  return (
    <BrowserRouter>
      <LiveChatWidget />
      <Routes>
        {/* ...other routes */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
