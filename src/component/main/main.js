import "./main.css";
import lines from "../../assets/lines.png";
import Info from "../info/info";
import Active from "../active/active";

export default function Main({
  mainscreen,
  setMainScreen,
  setCreate,
  setReview,
}) {
  console.log(mainscreen);
  return (
    <div className="maincontent">
      <div className="linkbar">
        <div className="links">
          <p href="" className="create link1" onClick={() => setCreate(true)}>
            Create New
          </p>
          <p href="" className="active link1" onClick={() => setMainScreen(1)}>
            Show Active
          </p>
        </div>
        <button className="reviewbtn" onClick={() => setReview(true)}>
          Review ~0.0001 ETH
        </button>
      </div>
      <img src={lines} className="linesBackground" alt="" />
      <div className="elblur"></div>
      {mainscreen == 0 ? <Info /> : <Active />}
    </div>
  );
}
