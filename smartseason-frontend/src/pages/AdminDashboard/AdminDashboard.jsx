import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";

export default function AdminDashboard() {
  const [fields, setFields] = useState([]);
  const [agents, setAgents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    cropType: "",
    plantingDate: "",
    assigned_agent_id: "",
  });

  const navigate = useNavigate();

  //  Fetch fields
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

  //  Fetch agents for dropdown
  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/agents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchFields();
      fetchAgents();
    }
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Create field
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost" + ":5000/api/fields", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to create field");
        return;
      }

      alert("Field created successfully!");

      // reset form
      setForm({
        name: "",
        cropType: "",
        plantingDate: "",
        assigned_agent_id: "",
      });

      fetchFields(); // refresh table
    } catch (err) {
      console.error("Error creating field:", err);
    }
  };

  //  Stats
  const total = fields.length;
  const active = fields.filter((f) => f.stage === "Growing").length;
  const atRisk = fields.filter((f) => f.stage === "Planted").length;

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        {/*  STATS */}
        <div className="summary-grid">
          <div className="card">Total Fields: {total}</div>
          <div className="card">Active: {active}</div>
          <div className="card">At Risk: {atRisk}</div>
        </div>

        {/*  CREATE FIELD FORM */}
        <div className="card">
          <h2>Create Field</h2>

          <form onSubmit={handleSubmit} className="form-grid">
            <input
              name="name"
              placeholder="Field Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="cropType"
              placeholder="Crop Type"
              value={form.cropType}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="plantingDate"
              value={form.plantingDate}
              onChange={handleChange}
              required
            />

            <select
              name="assigned_agent_id"
              value={form.assigned_agent_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <button type="submit">Create Field</button>
          </form>
        </div>

        {/* 📋 TABLE */}
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Crop</th>
                <th>Stage</th>
                <th>Planting Date</th>
              </tr>
            </thead>

            <tbody>
              {fields.length === 0 ? (
                <tr>
                  <td colSpan="4">No fields found</td>
                </tr>
              ) : (
                fields.map((field) => (
                  <tr key={field.id}>
                    <td>{field.name}</td>
                    <td>{field.cropType}</td>
                    <td>{field.stage}</td>
                    <td>{field.plantingDate}</td>
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