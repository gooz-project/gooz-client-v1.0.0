import React, { useState } from "react";
import "../styles/Sidebar.css";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { MdPlayArrow, MdOutlineWidgets, MdOutlineInfo } from "react-icons/md";

export default function Sidebar({
  workspace,
  addWidget,
  modalState,
  setModalState,
}) {
  const [state, setState] = useState(-1);

  const setMenuState = (index) => {
    if (state === index) {
      setState(-1);
    } else {
      setState(index);
    }
  };

  const setMenuClass = (index) => {
    if (state === index) {
      return "list-item-menu-active";
    }
    return "list-item-menu-inactive";
  };

  return (
    <div>
      <ul className="list-menu">
        <li className={setMenuClass(0)} onClick={() => setMenuState(0)}>
          <div className="div-list-item-menu">
            <MdOutlineInfo size={25} style={{ minWidth: "25px" }} />
            <h4 style={{ marginLeft: "5px", height: "25px", width: "100%" }}>
              Card's Info
            </h4>
            {state === 0 ? (
              <motion.span
                style={{ height: "25px", minWidth: "25px" }}
                animate={{ rotate: 90, textAnchor: "middle" }}
              >
                <MdPlayArrow size={25} />
              </motion.span>
            ) : (
              <motion.span
                style={{ height: "25px", minWidth: "25px" }}
                animate={{ rotate: 0, textAnchor: "middle" }}
              >
                <MdPlayArrow size={25} />
              </motion.span>
            )}
          </div>
        </li>
        {state === 0 && (
          <motion.ul
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="list-card-info"
          >
            <li>Workspace Name: {workspace.workspaceName}</li>
            <li>Card Name: {workspace.cardName}</li>
            <li>Card Type: {workspace.cardType}</li>
            <li>Connection Type: {workspace.connectionType}</li>
            <li>Connection Address: {workspace.connectionAddress}</li>
          </motion.ul>
        )}
        <li className={setMenuClass(1)} onClick={() => setMenuState(1)}>
          <div className="div-list-item-menu">
            <MdOutlineWidgets size={25} style={{ minWidth: "25px" }} />
            <h4 style={{ marginLeft: "5px", height: "25px", width: "100%" }}>
              Widgets
            </h4>
            {state === 1 ? (
              <motion.span
                style={{ height: "25px", minWidth: "25px" }}
                animate={{ rotate: 90, textAnchor: "middle" }}
              >
                <MdPlayArrow size={25} />
              </motion.span>
            ) : (
              <motion.span
                style={{ height: "25px", minWidth: "25px" }}
                animate={{ rotate: 0, textAnchor: "middle" }}
              >
                <MdPlayArrow size={25} />
              </motion.span>
            )}
          </div>
        </li>
        {state === 1 && (
          <ul className="list-widgets">
            <motion.li
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => addWidget("terminal")}
            >
              Terminal
            </motion.li>
            <motion.li
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (modalState) {
                  setModalState(false);
                } else {
                  setModalState(true);
                }
              }}
            >
              LineChart
            </motion.li>
            {modalState ? (
              <Modal addWidget={addWidget} setModalState={setModalState} />
            ) : (
              <></>
            )}
            <motion.li
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => addWidget("servo")}
            >
              Servo
            </motion.li>
            <motion.li
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => addWidget("mqtt")}
            >
              MQTT
            </motion.li>
          </ul>
        )}
      </ul>
    </div>
  );
}
