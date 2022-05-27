import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Adc.css";
import LineChart from "../templates/charts/LineChart";
import { motion } from "framer-motion";
import { api } from "../custom";
import { PuffLoader } from "react-spinners";
import { IoClose } from "react-icons/io5";

export default function Adc({
  workspace,
  deleteWidget,
  commandQueue,
  setCommandQueue,
  isAvailable,
  setIsAvailable,
}) {
  const [pinName, setPinName] = useState("");
  const [adcState, setAdcState] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [adc, setAdc] = useState({
    labels: [],
    datasets: [
      {
        label: "ADC",
        data: [],
        borderColor: "rgb(0,0,255)",
        backgroundColor: "rgba(0,0,255, 0.5)",
      },
    ],
  });

  const array = [];

  const getData = () => {
    setCommandQueue((commandQueue) => [
      ...commandQueue,
      { widget: "adc", cmd: `pin adc read ${pinName} -n` },
    ]);
  };

  useEffect(() => {
    if (adcState) {
      var intervalId = setInterval(getData, 10000);

      getData();
      return () => {
        clearInterval(intervalId);
        setIsAvailable(true);
        setAdc([]);
      };
    }
  }, [adcState]);

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "adc") {
      for (let index = 1; index < commandQueue.length; index++) {
        array.push(commandQueue[index]);
      }

      setCommandQueue(array);
    }
  }, [isAvailable]);

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "adc") {
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
                toast.error(`Adc pin named "${pinName}" not found`, {
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
                setAdcState(true);
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
              var myDate = new Date();
              const time =
                myDate.getHours().toString() +
                "." +
                myDate.getMinutes().toString() +
                "." +
                myDate.getSeconds().toString();

              setAdc({
                labels: [...adc.labels, time],
                datasets: [
                  {
                    label: "ADC",
                    data: [...adc.datasets[0].data, data.data.output],
                    borderColor: "rgb(0,0,255)",
                    backgroundColor: "rgba(0,0,255, 0.5)",
                  },
                ],
              });
              setIsAvailable(true);
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
                toast.error(`Adc pin named "${pinName}" is not found!`, {
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
                setAdcState(true);
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
            .then((data) => {
              var myDate = new Date();
              const time =
                myDate.getHours().toString() +
                "." +
                myDate.getMinutes().toString() +
                "." +
                myDate.getSeconds().toString();

              console.log(data);


              setAdc({
                labels: [...adc.labels, time],
                datasets: [
                  {
                    ...adc.datasets[0],
                    data: [...adc.datasets[0].data, data.data],
                  },
                ],
              });
              setIsAvailable(true);
            })
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
      { widget: "adc", cmd: `pin adc show name:${pinName}`, control: true },
    ]);
  };

  return (
    <>
      {adcState ? (
        <LineChart data={adc} deleteWidget={deleteWidget} />
      ) : (
        <motion.div
          className="adc-container"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
        >
          <IoClose size={24} className="widget-close" onClick={deleteWidget} />
          <h2>Enter ADC Pin Name</h2>
          <form className="adc-form">
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
