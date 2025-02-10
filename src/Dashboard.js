import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchMetrics } from "./api";

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const CPU_LIMIT = 500; // CPU threshold in millicores
  const MEMORY_LIMIT = 512; // Memory threshold in MiB

  useEffect(() => {
    const updateMetrics = async () => {
      const data = await fetchMetrics();

      const formattedData = data.pods.map((pod) => ({
        name: pod.name,
        cpu: parseInt(pod.cpu.replace("m", "")) || 0,
        memory: parseInt(pod.memory.replace("Mi", "")) || 0,
        status: pod.status,
        restarts: pod.restarts,
        cpuExceeded: parseInt(pod.cpu.replace("m", "")) > CPU_LIMIT,
        memoryExceeded: parseInt(pod.memory.replace("Mi", "")) > MEMORY_LIMIT,
        unhealthy: pod.unhealthy,
        slow: pod.slow,
      }));

      setMetrics(formattedData);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "26px", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
        🚀 OpenShift Pod Resource Usage
      </h2>

      {/* ⚠️ Alert Box */}
      {metrics.some(pod => pod.cpuExceeded || pod.memoryExceeded) && (
        <div style={{
          background: "#ff4d4d",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "15px",
          fontSize: "16px",
          fontWeight: "bold",
        }}>
          ⚠️ WARNING: Some pods are exceeding resource limits!
        </div>
      )}

      {/* 📝 Styled Table */}
      <table style={{
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "20px",
}}>
  <thead>
    <tr style={{ backgroundColor: "#003f7f", color: "white", textAlign: "left" }}>
      <th style={{ padding: "12px" }}>Pod Name</th>
      <th style={{ padding: "12px" }}>CPU (millicores)</th>
      <th style={{ padding: "12px" }}>Memory (MiB)</th>
      <th style={{ padding: "12px" }}>Status</th>
      <th style={{ padding: "12px" }}>Restarts</th>
    </tr>
  </thead>
  <tbody>
    {metrics.map((pod, index) => (
      <tr key={pod.name} style={{
        backgroundColor: index % 2 === 0 ? "#f0f8ff" : "#e6f3ff", // Alternating light blue shades
        transition: "background 0.3s",
      }}>
        <td style={{ padding: "12px", fontWeight: "bold",color:"#2c3e50" }}>{pod.name}</td>
        <td style={{
          padding: "12px",
          background: pod.cpuExceeded ? "#ffd2d2" : "#ffffff", // Soft red for exceeded
          color: pod.cpuExceeded ? "#700000" : "#333333", // Darker red text
          fontWeight: pod.cpuExceeded ? "bold" : "normal",
        }}>
          {pod.cpu} m {pod.cpuExceeded && "⚠️"}
        </td>
        <td style={{
          padding: "12px",
          background: pod.memoryExceeded ? "#ffd2d2" : "#ffffff", // Soft red for exceeded
          color: pod.memoryExceeded ? "#700000" : "#333333", // Darker red text
          fontWeight: pod.memoryExceeded ? "bold" : "normal",
        }}>
          {pod.memory} MiB {pod.memoryExceeded && "⚠️"}
        </td>
        <td style={{
          padding: "12px",
          backgroundColor: pod.unhealthy ? "#f8d7da" : pod.slow ? "#fff3cd" : "#ffffff", // Light red/yellow shades
          color: pod.unhealthy ? "#721c24" : pod.slow ? "#856404" : "#333333", // Matching text colors
          fontWeight: "bold",
        }}>
          {pod.status} {pod.unhealthy ? "❌" : pod.slow ? "🐢" : ""}
        </td>
        <td style={{
          padding: "12px",
          backgroundColor: pod.restarts > 2 ? "#fff3cd" : "#ffffff", // Light yellow for warnings
          color: "#333333",
          fontWeight: "bold",
        }}>
          {pod.restarts} {pod.restarts > 2 ? "🔄" : ""}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* 📊 Bar Chart */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
      }}>
        <h3 style={{ color: "#333", marginBottom: "10px" }}>📊 Resource Consumption</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={metrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: "12px" }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cpu" fill="#8884d8" name="CPU (millicores)" />
            <Bar dataKey="memory" fill="#82ca9d" name="Memory (MiB)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
