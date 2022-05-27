import React, { useState, useEffect } from "react";
import LineChart from "../templates/charts/LineChart";
import "../styles/LineChart.css";
import { api } from "../custom";

export default function Temperature({
  workspace,
  deleteWidget,
  commandQueue,
  setCommandQueue,
  isAvailable,
  setIsAvailable,
}) {
  const [temperature, setTemperature] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature(°C)",
        data: [],
        borderColor: "rgb(255,0,0)",
        backgroundColor: "rgba(255,0,0, 0.5)",
      },
    ],
  });

  const array = [];

  const getData = () => {
    setCommandQueue((commandQueue) => [
      ...commandQueue,
      { widget: "temperature", cmd: "cpu_temp -n" },
    ]);
  };

  useEffect(() => {
    var intervalId = setInterval(getData, 10000);

    getData();
    return () => {
      clearInterval(intervalId);
      setIsAvailable(true);
      setTemperature({
        labels: [],
        datasets: [
          {
            label: "Temperature(°C)",
            data: [],
            borderColor: "rgb(255,0,0)",
            backgroundColor: "rgba(255,0,0, 0.5)",
          },
        ],
      });
    };
  }, []);

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "temperature") {
      for (let index = 1; index < commandQueue.length; index++) {
        array.push(commandQueue[index]);
      }

      setCommandQueue(array);
    }
  }, [isAvailable]);

  useEffect(() => {
    if (commandQueue[0]?.widget === "temperature" && isAvailable) {
      if (workspace.connectionType === "com-port") {
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

            console.log(data)

            setTemperature({
              labels: [...temperature.labels, time],
              datasets: [
                {
                  ...temperature.datasets[0],
                  data: [...temperature.datasets[0].data, data.data.output],
                },
              ],
            });
            setIsAvailable(true);
          })
          .catch((err) => console.log(err));
      } else if (workspace.connectionType === "tcp-ip") {
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


            setTemperature({
              labels: [...temperature.labels, time],
              datasets: [
                {
                  ...temperature.datasets[0],
                  data: [...temperature.datasets[0].data, data.data],
                },
              ],
            });
            setIsAvailable(true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [commandQueue]);

  return (
    <>
      <LineChart data={temperature} deleteWidget={deleteWidget} />
    </>
  );
}
