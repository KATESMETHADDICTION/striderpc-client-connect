
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "@/pages/Index";
import LiveChatWidget from "@/components/LiveChatWidget";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <LiveChatWidget />
    </Router>
  );
};

export default App;
