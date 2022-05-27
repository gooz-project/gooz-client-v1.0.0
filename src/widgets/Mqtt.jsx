import React, { useEffect, useState } from "react";
import Connection from "./mqtt/Connection";
import Subscriber from "./mqtt/Subscriber";
import Publisher from "./mqtt/Publisher";
import mqtt from "mqtt/dist/mqtt";
import Receiver from "./mqtt/Receiver";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

import "../styles/Mqtt.css";

export default function Mqtt({ deleteWidget }) {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSubed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [mqttTabState, setMqttTabState] = useState(0);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setMessages((message) => [...message, payload]);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("Connect");
      });
    }
  };

  const mqttPublish = (values) => {
    if (client) {
      client.publish(
        values.topic,
        values.payload,
        { qos: parseInt(values.qos) },
        (error) => {
          if (error) {
            console.log("Publish error: ", error);
          }
        }
      );
    }
  };

  const mqttSub = (values) => {
    if (client) {
      client.subscribe(values.topic, { qos: parseInt(values.qos) }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSubed(true);
      });
    }
  };

  const mqttUnSub = (values) => {
    if (client) {
      client.unsubscribe(values.topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSubed(false);
      });
    }
  };

  function getMqttTabClass(idx) {
    if (mqttTabState === idx) {
      return "activeMqttTab";
    }
    return "inactiveMqttTab";
  }

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      className="mqtt-container"
    >
      <IoClose size={24} className="widget-close" onClick={deleteWidget} />
      <ul className="mqtt-tab-list">
        <li className={getMqttTabClass(0)} onClick={() => setMqttTabState(0)}>
          Connection
        </li>
        <li className={getMqttTabClass(1)} onClick={() => setMqttTabState(1)}>
          Subscriber
        </li>
        <li className={getMqttTabClass(2)} onClick={() => setMqttTabState(2)}>
          Publisher
        </li>
        <li className={getMqttTabClass(3)} onClick={() => setMqttTabState(3)}>
          Receiver
        </li>
      </ul>
      <div className="mqtt-body">
        {
          {
            0: (
              <Connection
                connectStatus={connectStatus}
                connect={mqttConnect}
                disconnect={mqttDisconnect}
                connectBtn={connectStatus}
              />
            ),
            1: <Subscriber sub={mqttSub} unSub={mqttUnSub} isSubed={isSubed} />,
            2: <Publisher publish={mqttPublish} />,
            3: <Receiver messages={messages} />,
          }[mqttTabState]
        }
      </div>
    </motion.div>
  );
}
