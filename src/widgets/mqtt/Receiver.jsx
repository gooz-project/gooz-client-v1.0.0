import React from "react";

import "../../styles/Receiver.css";

const Receiver = ({ messages }) => {
  return (
    <>
      <div className="receiver-container">
        <div className="receiver-container-header">
          <h2>Receiver</h2>
        </div>
        <div className="receiver-container-body">
          <ul>
            {messages.map((message, idx) => (
              <li key={idx}>{message.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Receiver;
