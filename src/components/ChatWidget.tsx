import React, { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          borderRadius: "50%",
          width: 56,
          height: 56,
          background: "#007bff",
          color: "#fff",
          fontSize: 24,
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chat"
      >
        💬
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 320,
            height: 400,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            zIndex: 999,
          }}
        >
          {/* Replace with your chat UI */}
          <iframe
            src="https://your-live-chat-service.com/embed"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Live Chat"
          />
        </div>
      )}
    </div>
  );
}