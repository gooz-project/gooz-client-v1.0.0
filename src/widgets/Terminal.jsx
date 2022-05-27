import Ansi from "ansi-to-react";
import React, { useEffect, useState } from "react";
import Loader from "../templates/Loader";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoPaperPlaneOutline } from "react-icons/io5";
import { api } from "../custom";

import "../styles/Terminal.css";

export default function Terminal({
  idx,
  workspace,
  deleteWidget,
  commandQueue,
  setCommandQueue,
  isAvailable,
  setIsAvailable,
  id,
}) {
  const [command, setCommand] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [nameInput, setNameInput] = useState(null);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [commands, setCommands] = useState([]);
  const [responses, setResponses] = useState([]);
  const [counter, setCounter] = useState(0);

  const array = [];

  useEffect(() => {
    document.getElementsByClassName("terminal-body")[0].onscroll = onScroll;
  }, []);

  useEffect(() => {
    setCommands([]);
    setResponses([]);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [commands, responses]);
  useEffect(() => {
    if (nameInput != null) {
      nameInput.focus();
    }
  }, [isDisabled]);

  useEffect(() => {
    if (isAvailable && commandQueue[0]?.widget === "terminal") {
      for (let index = 1; index < commandQueue.length; index++) {
        array.push(commandQueue[index]);
      }

      setCommandQueue(array);
    }
  }, [isAvailable]);

  useEffect(() => {
    if (
      commandQueue[0]?.widget === "terminal" &&
      isAvailable &&
      commandQueue[0]?.idx === idx
    ) {
      if (workspace.connectionType === "com-port") {
        setIsAvailable(false);
        api({
          method: "post",
          url: "http://localhost:5000/exec",
          data: {
            workspace: workspace.workspaceName,
            comPort: workspace.connectionAddress,
            cmd: commandQueue[0].cmd,
          },
        })
          .then((data) => {
            setResponses([...responses, data.data.output]);
            setIsDisabled(false);
            setIsAvailable(true);
          })
          .catch(() => {
            setIsDisabled(false);
            setIsAvailable(true);
          });
      } else if (workspace.connectionType === "tcp-ip") {
        setIsAvailable(false);
        setTimeout(
          () =>
            api({
              method: "post",
              headers: {
                "Content-Type": "text/plain",
              },
              url: `http://${workspace.connectionAddress}`,
              data: {
                cmd: commandQueue[0].cmd,
              },
            })
              .then((data) => {
                setResponses([...responses, data.data]);
                setIsDisabled(false);
                setIsAvailable(true);
              })
              .catch(() => {
                setIsDisabled(false);
                setIsAvailable(true);
              }),
          200
        );
      }
    }
  }, [commandQueue]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (command === "clear") {
      setCommands([]);
      setResponses([]);
    } else {
      setIsDisabled(true);

      setCommands([...commands, command]);

      setCommandQueue([
        ...commandQueue,
        { widget: "terminal", cmd: command, idx: idx },
      ]);
    }

    setCommand("");
  };

  const onChangeInput = (e) => {
    setCommand(e.target.value);
  };

  const scrollToBottom = () => {
    document.getElementsByClassName("terminal-body")[0].scrollTop =
      document.getElementsByClassName("terminal-list")[0].clientHeight -
      document.getElementsByClassName("terminal-body")[0].clientHeight +
      37;
  };

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop - 362 >= 300) {
      setIsScrollUp(true);
    } else {
      setIsScrollUp(false);
    }
  };

  useEffect(() => {
    if (counter === 0) {
      setCommand("");
    } else {
      setCommand(commands[commands.length - counter]);
    }
  }, [counter]);

  const onKeyDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        break;
      case "ArrowDown":
        e.preventDefault();
        break;
    }
    if (
      e.code === "ArrowUp" &&
      commands[commands.length - counter - 1] != null
    ) {
      setCounter(counter + 1);
    } else if (
      e.code === "ArrowDown" &&
      commands[commands.length - counter] != null
    ) {
      setCounter(counter - 1);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      className="base-container"
    >
      <div className="terminal-body">
        <IoClose
          className="widget-close"
          size={24}
          color="White"
          onClick={deleteWidget}
          style={{ position: "sticky", float: "right", top: "0", right: "0" }}
        />
        <ul className="terminal-list">
          {commands.map((command, idx) => (
            <React.Fragment key={idx}>
              <li className="command-li">
                <span>{">>"}</span>
                <div>{command}</div>
                <span className="loader">
                  {isDisabled && idx === commands.length - 1 && <Loader />}
                </span>
              </li>
              {responses[idx]
                ?.toString()
                .split("\n")
                .map((response, indx) => (
                  <li key={indx}>
                    <Ansi>{response}</Ansi>
                  </li>
                ))}
            </React.Fragment>
          ))}
        </ul>
        <AnimatePresence>
          {isScrollUp && (
            <motion.button
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToBottom}
              className="scroll-button"
            >
              <FaChevronDown size="25px" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <form className="form-terminal" onSubmit={onSubmit}>
        <input
          onKeyDown={onKeyDown}
          className="form-input"
          value={command}
          onChange={onChangeInput}
          ref={(input) => setNameInput(input)}
          autoFocus
          disabled={isDisabled}
        />
        <button
          className="button-send-command"
          type="submit"
          disabled={isDisabled}
        >
          Send
          <motion.span
            style={{ display: "flex", alignItems: "center" }}
            animate={isDisabled ? { x: 30, y: -10 } : { x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoPaperPlaneOutline className="send-icon" size={15} />
          </motion.span>
        </button>
      </form>
    </motion.div>
  );
}
