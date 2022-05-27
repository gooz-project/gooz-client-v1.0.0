import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import "../styles/Servo.css";
import { api } from "../custom";
import PuffLoader from "react-spinners/PuffLoader";
import { IoClose } from "react-icons/io5";

export default function Servo({
  workspace,
  deleteWidget,
  commandQueue,
  setCommandQueue,
  isAvailable,
  setIsAvailable,
}) {
  const firstRenderRef = useRef(true);
  const [pinName, setPinName] = useState("");
  const [servoState, setServoState] = useState(false);
  const [angle, setAngle] = useState(90);
  const [angleDirectly, setAngleDireclty] = useState("0");
  const [angleChanging, setAngleChanging] = useState("0");
  const [buttonState, setButtonState] = useState(false);

  const array = [];

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "servo") {
      for (let index = 1; index < commandQueue.length; index++) {
        array.push(commandQueue[index]);
      }

      setCommandQueue(array);
    }
  }, [isAvailable]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      setCommandQueue((commandQueue) => [
        ...commandQueue,
        { widget: "servo", cmd: `servo degree ${pinName} ${angle}` },
      ]);
    }
  }, [angle]);

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "servo") {
      if (workspace.connectionType === "com-port") {
        if (commandQueue[0]?.control) {
          setIsAvailable(false);
          api
            .post("http://localhost:5000/exec", {
              workspace: workspace.workspaceName,
              comPort: workspace.connectionAddress,
              cmd: commandQueue[0].cmd,
            })
            .then((data) => {
              if (data.data.output.split(" ")[1] === "is") {
                toast.error(`Servo named "${pinName}" not found`, {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: false,
                });
                setButtonState(false);
              } else {
                setButtonState(false);
                setServoState(true);
              }
              setIsAvailable(true);
            })
            .catch(() => {
              setIsAvailable(true);
              setButtonState(false);
            });
        } else {
          setIsAvailable(false);
          api
            .post("http://localhost:5000/exec", {
              workspace: workspace.workspaceName,
              comPort: workspace.connectionAddress,
              cmd: commandQueue[0].cmd,
            })
            .then((data) => {
              setIsAvailable(true);
              console.log(data);
            })
            .catch(() => {
              setIsAvailable(true);
              setButtonState(false);
            });
        }
      } else if (workspace.connectionType === "tcp-ip") {
        if (commandQueue[0]?.control) {
          setIsAvailable(false);
          api
            .post(
              `http://${workspace.connectionAddress}`,
              {
                cmd: commandQueue[0].cmd,
              },
              { headers: { "Content-Type": "text/plain" } }
            )
            .then((data) => {
              if (data.data.split(" ")[1] === "is") {
                toast.error(`Servo named "${pinName}" not found!`, {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: false,
                });
                setButtonState(false);
              } else {
                setButtonState(false);
                setServoState(true);
              }
              setIsAvailable(true);
            })
            .catch(() => {
              setIsAvailable(true);
              setButtonState(false);
            });
        } else {
          setIsAvailable(false);
          api
            .post(
              `http://${workspace.connectionAddress}`,
              {
                cmd: commandQueue[0].cmd,
              },
              { headers: { "Content-Type": "text/plain" } }
            )
            .then(() => setIsAvailable(true))
            .catch(() => {
              setIsAvailable(true);
              setButtonState(false);
            });
        }
      }
    }
  }, [commandQueue]);

  const handleClick = (e) => {
    e.preventDefault();
    setButtonState(true);
    setCommandQueue([
      ...commandQueue,
      {
        widget: "servo",
        cmd: `servo show name:${pinName}`,
        control: true,
      },
    ]);
  };

  const handleDegreeIncreasing = () => {
    if (parseInt(angle) + parseInt(angleChanging) > 180) {
      setAngle("180");
    } else {
      setAngle((parseInt(angle) + parseInt(angleChanging)).toString());
    }
  };

  const handleDegreeDecreasing = () => {
    if (parseInt(angle) - parseInt(angleChanging) < 0) {
      setAngle("0");
    } else {
      setAngle(parseInt(angle) - parseInt(angleChanging).toString());
    }
  };

  const handleSetAngle = () => {
    if (angleDirectly >= 0 && angleDirectly <= 180) {
      setAngle(angleDirectly);
    }
  };

  return (
    <>
      {servoState ? (
        <div className="servo-control-container">
          <IoClose size={24} className="widget-close" onClick={deleteWidget} />
          <div className="decrease-div">
            <span
              className="decrease-button"
              onClick={handleDegreeDecreasing}
            />
          </div>
          <div className="input-output-div">
            <div className="input-div">
              <div>Amount of Change:</div>
              <input
                type="number"
                name="angle"
                min="0"
                max="180"
                value={angleChanging}
                onChange={(e) => {
                  setAngleChanging(e.target.value);
                }}
              />
            </div>
            <div>{angle}</div>
            <div className="input-div">
              <div>Set Angle Directly:</div>
              <input
                type="number"
                name="angle"
                min="0"
                max="180"
                value={angleDirectly}
                onChange={(e) => {
                  setAngleDireclty(e.target.value);
                }}
              />
              <button onClick={handleSetAngle}>Set</button>
            </div>
          </div>
          <div className="increase-div">
            <span
              className="increase-button"
              onClick={handleDegreeIncreasing}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="servo-container"
        >
          <IoClose size={24} className="widget-close" onClick={deleteWidget} />
          <h2>Enter Servo Pin Name</h2>
          <form className="servo-form">
            <input
              name="pinName"
              type="text"
              placeholder="Pin Name"
              value={pinName}
              onChange={(e) => setPinName(e.target.value)}
            />
            {buttonState ? (
              <button className="waiting-button" disabled>
                <PuffLoader size={25} />
              </button>
            ) : (
              <button className="continue-button" onClick={handleClick}>
                Continue
              </button>
            )}
          </form>
        </motion.div>
      )}
    </>
  );
}
