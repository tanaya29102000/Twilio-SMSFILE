import React, { useState } from "react";
import axios from "axios";
import "./SendSMS.css";

const SendSMS = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendSMS = async () => {
    if (!to || !message) {
      setStatus("Both phone number and message are required.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const response = await axios.post("http://localhost:8080/send-sms", {
        to,
        message,
      });
      if (response.status === 200) {
        setStatus("Message sent successfully!");

        setTo("");
        setMessage("");
      } else {
        setStatus("Message failed to send.");
      }
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = () => {
    setStatus("");
  };

  return (
    <div className="container">
      <div className="sms-form">
        <h2>Send SMS</h2>
        <input
          type="text"
          className="input"
          placeholder="Phone Number"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            handleInputChange();
          }}
        />
        <textarea
          rows="4"
          className="textarea"
          placeholder="Your message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleInputChange(); // Clear status on change
          }}
        />
        <button onClick={handleSendSMS} className="button" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {status && (
          <p
            className={`status ${
              status.includes("Error") ? "error" : "success"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SendSMS;
