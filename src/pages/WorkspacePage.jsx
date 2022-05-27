import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import Terminal from "../widgets/Terminal";
import { registerWidget, removeWidget } from "../database";
import Pagination from "../components/Pagination";
import Temperature from "../widgets/Temperature";
import Adc from "../widgets/Adc";
import Servo from "../widgets/Servo";
import Mqtt from "../widgets/Mqtt";
import { motion } from "framer-motion";

import "../styles/WorkspacePage.css";

export default function WorkspacePage({ workspaces, setWorkspaces }) {
  const { id } = useParams();
  const workspace = workspaces[id];
  const [page, setPage] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [commandQueue, setCommandQueue] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const firstWidgetIndex = page * 4;
  const lastWidgetIndex = page * 4 + 3;

  const currentWidgets = workspace?.widgets.slice(
    firstWidgetIndex,
    lastWidgetIndex + 1
  );

  useEffect(() => {
    setPage(Math.ceil(workspace?.widgets.length / 4) - 1);
  }, [id, workspace?.widgets.length]);

  const addWidget = (widgetName) => {
    registerWidget(workspace, id, widgetName);
    setWorkspaces();
  };

  const deleteWidget = (idx) => {
    removeWidget(workspace, id, idx);
    setWorkspaces();
  };

  return workspace ? (
    <div className="container">
      <div className="sidebar">
        <Sidebar
          workspace={workspace}
          addWidget={addWidget}
          modalState={modalState}
          setModalState={setModalState}
        />
      </div>
      <div className="container-main">
        <div className="container-widgets">
          <div key={page} className="grid-widgets">
            {currentWidgets.map((widget, idx) => {
              switch (widget) {
                case "terminal":
                  return (
                    <Terminal
                      key={idx}
                      idx={idx}
                      workspace={workspace}
                      deleteWidget={() => deleteWidget(firstWidgetIndex + idx)}
                      commandQueue={commandQueue}
                      setCommandQueue={setCommandQueue}
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                      id={id}
                    />
                  );
                case "temperature":
                  return (
                    <Temperature
                      key={idx}
                      workspace={workspace}
                      deleteWidget={() => deleteWidget(firstWidgetIndex + idx)}
                      commandQueue={commandQueue}
                      setCommandQueue={setCommandQueue}
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                    />
                  );
                case "adc":
                  return (
                    <Adc
                      key={idx}
                      workspace={workspace}
                      deleteWidget={() => deleteWidget(firstWidgetIndex + idx)}
                      commandQueue={commandQueue}
                      setCommandQueue={setCommandQueue}
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                    />
                  );
                case "servo":
                  return (
                    <Servo
                      key={idx}
                      workspace={workspace}
                      deleteWidget={() => deleteWidget(firstWidgetIndex + idx)}
                      commandQueue={commandQueue}
                      setCommandQueue={setCommandQueue}
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                    />
                  );
                case "mqtt":
                  return (
                    <Mqtt
                      key={idx}
                      deleteWidget={() => deleteWidget(firstWidgetIndex + idx)}
                    />
                  );
                default:
                  return <></>;
              }
            })}
          </div>
        </div>
        <Pagination workspace={workspace} page={page} setPage={setPage} />
      </div>
    </div>
  ) : (
    <h1>Workspace does not exists</h1>
  );
}
