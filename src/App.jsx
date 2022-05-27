import { useState } from "react";
import { read } from "./database";
import RouteList from "./routes/RouteList";
import Navbar from "./components/Navbar";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [workspaces, setWorkspaces] = useState(read());

  const updateWorkspaces = () => setWorkspaces(read());

  return (
    <div className="App">
      <Navbar workspaces={workspaces} setWorkspaces={updateWorkspaces} />
      <RouteList workspaces={workspaces} setWorkspaces={updateWorkspaces} />
      <ToastContainer />
    </div>
  );
}

export default App;
