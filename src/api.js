const API_URL = "http://localhost:8000/metrics"; // Replace with your backend API

export async function fetchMetrics() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch metrics");
    return await response.json();
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return { pods: [] }; // Return empty array on error
  }
}
