import React, { useState, useRef, useEffect } from "react";

// Helper for generating AES key and encrypting/decrypting with it
async function generateKey() {
  return window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}
async function exportKey(key: CryptoKey) {
  const raw = await window.crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(raw)));
}
async function importKey(base64: string) {
  const bin = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return window.crypto.subtle.importKey("raw", bin, "AES-GCM", true, ["encrypt", "decrypt"]);
}
async function encrypt(key: CryptoKey, text: string) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder().encode(text);
  const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc);
  const ivStr = btoa(String.fromCharCode(...iv));
  const dataStr = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
  return ivStr + ":" + dataStr;
}
async function decrypt(key: CryptoKey, data: string) {
  const [ivStr, dataStr] = data.split(":");
  const iv = Uint8Array.from(atob(ivStr), c => c.charCodeAt(0));
  const ciphertext = Uint8Array.from(atob(dataStr), c => c.charCodeAt(0));
  const plain = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new TextDecoder().decode(plain);
}

type Message = { text: string; self: boolean };

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [sharedKey, setSharedKey] = useState("");
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Setup on open
  useEffect(() => {
    if (!open) return;
    (async () => {
      // Generate session and key
      const id = Math.random().toString(36).slice(2, 10);
      setSessionId(id);
      const key = await generateKey();
      setCryptoKey(key);
      const exported = await exportKey(key);
      setSharedKey(exported);

      // Connect websocket
      ws.current = new WebSocket(`ws://localhost:8000/ws/customer/${id}/${exported}`);
      ws.current.onmessage = async (event) => {
        if (!cryptoKey) return;
        const decrypted = await decrypt(key, event.data);
        setMessages((prev) => [...prev, { text: decrypted, self: false }]);
      };
      ws.current.onclose = () => {
        setMessages((prev) => [...prev, { text: "[Chat closed]", self: false }]);
      };
    })();

    return () => {
      ws.current?.close();
      ws.current = null;
    };
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    if (chatBodyRef.current)
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages, open]);

  const send = async () => {
    if (input.trim() && ws.current && ws.current.readyState === WebSocket.OPEN && cryptoKey) {
      const encrypted = await encrypt(cryptoKey, input);
      ws.current.send(encrypted);
      setMessages((prev) => [...prev, { text: input, self: true }]);
      setInput("");
    }
  };

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
          zIndex: 1000,
        }}
        onClick={() => setOpen((p) => !p)}
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
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#007bff",
              color: "#fff",
              padding: 12,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              fontWeight: "bold",
            }}
          >
            Live Chat
            <button
              onClick={() => setOpen(false)}
              style={{
                float: "right",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.2em",
                cursor: "pointer",
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div
            ref={chatBodyRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              background: "#f9f9f9",
              fontSize: 14,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.self ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: msg.self ? "#daf1ff" : "#eee",
                    borderRadius: 12,
                    padding: "6px 12px",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #eee", padding: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
                marginRight: 8,
                fontSize: 14,
              }}
              placeholder="Type your message..."
            />
            <button
              onClick={send}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
              }}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
          <div style={{padding: 8, fontSize: 12, color: '#888', borderTop: '1px solid #eee'}}>
            <div>Session ID: <b>{sessionId}</b></div>
            <div>Shared Key: <b>{sharedKey}</b></div>
            <div>Give these to support if you need help!</div>
          </div>
        </div>
      )}
    </div>
  );
}