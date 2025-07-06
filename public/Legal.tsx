import React from "react";

export default function Legal() {
  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <h1>Legal Notice</h1>
      <p>
        This website and its live chat system are operated by [Your Company Name].
        By using this service, you agree to our Terms of Service and Privacy Policy.
      </p>
      <h2>Disclaimer</h2>
      <p>
        Our support staff will never ask for credit card details, passwords, or sensitive personal information.
        All chat messages are end-to-end encrypted for your security.
        For legal requests, contact us at: legal@[yourcompany].com
      </p>
      <h2>Privacy Policy</h2>
      <p>
        We store encrypted chat transcripts for quality and training. 
        We do not sell or share your data.
        See our full privacy statement at /privacy.
      </p>
    </div>
  );
}