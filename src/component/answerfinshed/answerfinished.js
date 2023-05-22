import "./answerfinished.css";
import { AiFillCheckCircle } from "react-icons/ai";
import cube from "../../assets/cube.png";

export default function AnswerFinished({ onShow }) {
  return (
    <div className="answerscreen">
      <div
        className="leftsectionfinished"
        style={{ backgroundImage: `url(${cube})` }}
      ></div>
      <div className="rightsectionfinished finishedsucc">
        <div className="firstrow">
          <div className="checkicon" onClick={onShow}>
            <AiFillCheckCircle className="checkicon" />
          </div>
          <span className="successtxt">Success</span>
        </div>
        <div className="singleanswer "></div>
      </div>
    </div>
  );
}
