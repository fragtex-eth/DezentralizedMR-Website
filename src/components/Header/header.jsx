import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import CustomConnectButton from "./connectButton";
import "./header.scss";
export default function Header({ setCreateModalVisible }) {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="top-row">
          <img
            src={Logo}
            alt="logo survey"
            className="top-row-logo"
            onClick={() => navigate("/")}
          />
          <CustomConnectButton />
        </div>
        <div className="bottom-row">
          <a
            href=""
            className="bottom-row-link-btn"
            onClick={() => navigate("/discover")}
          >
            Discover
          </a>
          <a
            className="bottom-row-link-btn"
            onClick={() => setCreateModalVisible(true)}
          >
            Create Survey
          </a>
          <button
            className="bottom-row-review-btn"
            onClick={() => console.log("requestreview")}
            disabled="true"
          >
            Review
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
