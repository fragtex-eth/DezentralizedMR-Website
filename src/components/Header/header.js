import "./header.css";
import logo from "../../assets/logo.png";
import CustomConnectButton from "./connectButton";
export default function Header() {
  return (
    <header>
      <img
        src={logo}
        alt="logo survey"
        className="logo"
        onClick={() => console.log("main screen")}
      />
      <CustomConnectButton />
    </header>
  );
}
