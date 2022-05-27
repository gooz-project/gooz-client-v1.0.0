import { useState } from "react";
import "../styles/Modal.css";

function Modal({ addWidget, setModalState }) {
  const [widgetType, setWidgetType] = useState("");

  return (
    <div className="modal-background">
      <div className="modal-container">
        <form className="modal-form">
          <select
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.selectedOptions[0].value)}
          >
            <option value="" disabled>
              {" "}
              Chart Type{" "}
            </option>
            <option value="temperature">Temperature</option>
            <option value="adc">ADC</option>
          </select>
        </form>
        <div className="footer">
          <button onClick={() => setModalState(false)} id="cancelBtn">
            Cancel
          </button>
          <button
            onClick={() => {
              widgetType && addWidget(widgetType);
              widgetType && setModalState(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
