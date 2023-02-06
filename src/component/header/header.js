import "./header.css";
import logo from "../../assets/logo.png";

export default function Header({ setMainScreen }) {
  return (
    <div className="header">
      <img
        src={logo}
        alt="logo survey"
        className="logo"
        onClick={() => setMainScreen(0)}
      />

      <button className="connectbtn">Connect</button>
    </div>
  );
}
