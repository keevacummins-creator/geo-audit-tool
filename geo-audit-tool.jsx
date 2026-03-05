import { useState } from "react";

export default function GEOAudit() {
  const [status, setStatus] = useState("idle");
  const [debugInfo, setDebugInfo] = useState("");

  const testAPI = async () => {
    setStatus("loading");
    setDebugInfo("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 50,
          messages: [{ role: "user", content: "Say hi" }]
        })
      });

      const text = await res.text();
      setDebugInfo(`HTTP Status: ${res.status}\n\nRaw body:\n${text}`);
      setStatus("done");
    } catch (e) {
      setDebugInfo(`Network/fetch error: ${e.name}: ${e.message}`);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "monospace", background: "#0f172a", minHeight: "100vh", color: "#e2e8f0" }}>
      <h2 style={{ marginBottom: 8, color: "#f8fafc" }}>API Debug Test</h2>
      <p style={{ marginBottom: 20, color: "#64748b", fontSize: 13 }}>Direct call to api.anthropic.com</p>
      <button onClick={testAPI} disabled={status === "loading"} style={{ padding: "10px 20px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontSize: 14 }}>
        {status === "loading" ? "Testing..." : "Test API"}
      </button>
      {debugInfo && (
        <pre style={{ background: "#1e293b", padding: 20, borderRadius: 8, fontSize: 12, whiteSpace: "pre-wrap", wordBreak: "break-all", color: "#94a3b8", lineHeight: 1.6 }}>
          {debugInfo}
        </pre>
      )}
    </div>
  );
}
