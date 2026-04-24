import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard/AgentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Agent */}
        <Route path="/agent" element={<AgentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;    