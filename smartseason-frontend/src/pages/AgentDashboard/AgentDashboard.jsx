import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgentDashboard.css";
import Navbar from "../../components/Navbar/Navbar";

export default function AgentDashboard() {
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  // 📡 Fetch only agent fields
  const fetchFields = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://smartseason-monitoring-system-1.onrender.com/api/fields", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFields(data);
    } catch (err) {
      console.error("Error fetching fields:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchFields();
    }
  }, []);

  //  Update field stage
  const updateStage = async (id, stage) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`https://smartseason-monitoring-system-1.onrender.com/api/fields/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stage }),
      });

      // refresh data
      fetchFields();
    } catch (err) {
      console.error("Error updating field:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="agent-container">
        <h1>Agent Dashboard</h1>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Crop</th>
                <th>Stage</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {fields.length === 0 ? (
                <tr>
                  <td colSpan="4">No fields assigned</td>
                </tr>
              ) : (
                fields.map((field) => (
                  <tr key={field.id}>
                    <td>{field.name}</td>
                    <td>{field.cropType}</td>
                    <td>{field.stage}</td>

                    <td>
                      <select
                        value={field.stage}
                        onChange={(e) =>
                          updateStage(field.id, e.target.value)
                        }
                      >
                        <option>Planted</option>
                        <option>Growing</option>
                        <option>Ready</option>
                        <option>Harvested</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}