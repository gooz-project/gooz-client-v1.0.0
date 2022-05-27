import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import WorkspacePage from "../pages/WorkspacePage";

export default function RouteList({ workspaces, setWorkspaces }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/workspace/:id"
        element={
          <WorkspacePage
            workspaces={workspaces}
            setWorkspaces={setWorkspaces}
          />
        }
      />
      <Route
        path="/register"
        element={<RegisterPage setWorkspaces={setWorkspaces} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
