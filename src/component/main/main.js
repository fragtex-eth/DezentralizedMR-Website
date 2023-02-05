import "./main.css";
import lines from "../../assets/lines.png";
import Info from "../info/info";
import Active from "../active/active";
export default function Main() {
  return (
    <div className="maincontent">
      <div className="linkbar">
        <div className="links">
          <a href="" className="create">
            Create New
          </a>
          <a href="" className="active">
            Show Active
          </a>
        </div>
        <button className="reviewbtn">Review ~0.0001 ETH</button>
      </div>
      <img src={lines} className="linesBackground" alt="" />
      <div className="elblur"></div>
      <Active />
    </div>
  );
}
