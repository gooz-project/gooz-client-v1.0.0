import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { read, remove } from "../database";
import { IoAdd, IoClose } from "react-icons/io5";
import "../styles/Navbar.css";

export default function Navbar({ workspaces, setWorkspaces }) {
  const location = useLocation();
  const navigate = useNavigate();

  const id = parseInt(location.pathname.split("/")[2]);

  const handleDelete = (e, idx) => {
    e.preventDefault();

    remove(idx);
    setWorkspaces(workspaces);

    if (read().length === 0 && location.pathname === `/workspace/${idx}`) {
      navigate(`/`);
    } else if (
      location.pathname === `/workspace/${idx}` &&
      read().length === idx
    ) {
      navigate(`/workspace/${idx - 1}`);
    } else if (id > idx) {
      navigate(`/workspace/${id - 1}`);
    }
  };

  const getWorkspacesClass = (idx) => {
    if (location.pathname === `/workspace/${idx}`) {
      return "activeTab";
    }
    return "inactiveTab";
  };

  const getRegisterClass = () => {
    if (location.pathname === `/register`) {
      return "activeRegisterTab";
    }
    return "inactiveRegisterTab";
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <div>
            <span>GOOZ</span> Client
          </div>
        </Link>
      </div>
      <ul className="workspace-list">
        {workspaces &&
          workspaces.map((data, idx) => (
            <li
              key={idx}
              className={getWorkspacesClass(idx)}
              title={data.workspaceName}
            >
              <Link className="list-item-link" to={`/workspace/${idx}`}>
                <ul>
                  <li className="list-item-workspace-name">
                    {data.workspaceName}
                  </li>
                  <li
                    className="list-item-btn-close"
                    onClick={(e) => handleDelete(e, idx)}
                  >
                    <IoClose size={24} color="White" />
                  </li>
                </ul>
              </Link>
            </li>
          ))}
        <li className={getRegisterClass()}>
          <Link className="list-item-register-link" to="/register">
            <IoAdd size={30} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
