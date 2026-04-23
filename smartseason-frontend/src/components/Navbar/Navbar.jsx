import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>SmartSeason</h2>

      <div>
        <span>{role?.toUpperCase()}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}