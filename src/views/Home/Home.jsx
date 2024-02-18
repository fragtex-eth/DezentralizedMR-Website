import "./main.css";
import lines from "../../assets/lines.png";
import Info from "../info/info";
import Active from "../active/active";

export default function Main() {
  return (
    <main className="main">
      <div className="main-linkbar">
        <div className="main-linkbar-links">
          <a href="" className="main-linkbar-links-create" onClick{() => console.log("create")}>
            Create New
          </a>
          <a href="" className="main-linkbar-links-active" onClick={() => console.log("active")}>
            Show Active
          </a>
        </div>
        <button className="main-linkar-requestReviewBtn" onClick={getReview}>
          Review ~0.0001 ETH
        </button>
      </div>
      <img src={lines} className="main-linesBg" alt="Lines background" />
      <div className="elblur"></div>
      {mainscreen === 0 ? <Info setMainScreen={setMainScreen} /> : <Active />}
    </main>
  );
}
