import "./header.css";
import logo from "../../assets/logo.png";
import CustomConnectButton from "../helper/connectbutton";

export default function Header({ setMainScreen }) {
  return (
    <div className="header">
      <img
        src={logo}
        alt="logo survey"
        className="logo"
        onClick={() => setMainScreen(0)}
      />

      <CustomConnectButton />
    </div>
  );
}
