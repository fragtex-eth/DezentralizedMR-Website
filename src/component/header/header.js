import "./header.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo survey" className="logo" />

      <button className="connectbtn">Connect</button>
    </div>
  );
}
