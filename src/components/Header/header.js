import logo from "../../assets/logo.png";
import CustomConnectButton from "./connectButton";
export default function Header() {
  return (
    <header>
      <div className="top-row">
        <img
          src={logo}
          alt="logo survey"
          className="top-row-logo"
          onClick={() => console.log("main screen")}
        />
        <CustomConnectButton />
      </div>
      <div className="bottom-row">
        <button
          href="bottom-row-create-btn"
          className=""
          onClick={() => console.log("create")}
        >
          Create New
        </button>
        <button
          href=""
          className="main-linkbar-links-active"
          onClick={() => console.log("active")}
        >
          Show Active
        </button>
        <button
          className="main-linkar-requestReviewBtn"
          onClick={() => console.log("requestreview")}
        >
          Review ~0.0001 ETH
        </button>
      </div>
    </header>
  );
}
