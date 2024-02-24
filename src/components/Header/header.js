import Logo from "../../assets/logo.png";
import CustomConnectButton from "./connectButton";
import "./header.scss";
export default function Header() {
  return (
    <header>
      <div className="top-row">
        <img
          src={Logo}
          alt="logo survey"
          className="top-row-logo"
          onClick={() => console.log("main screen")}
        />
        <CustomConnectButton />
      </div>
      <div className="bottom-row">
        <a
          className="bottom-row-link-btn"
          onClick={() => console.log("create")}
        >
          Create New
        </a>
        <a
          href=""
          className="bottom-row-link-btn"
          onClick={() => console.log("active")}
        >
          Show Active
        </a>
        <button
          className="bottom-row-review-btn"
          onClick={() => console.log("requestreview")}
        >
          Review ~0.0001 ETH
        </button>
      </div>
    </header>
  );
}
