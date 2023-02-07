import "./answer.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import cube from "../../assets/cube.png";
import AnswerFinished from "../answerfinshed/answerfinished";

export default function Answer({ questions, setAnswer }) {
  const [activeQ, setActiveQ] = useState(0);
  const [finished, setFinised] = useState(false);

  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">{question.name} </span>
        <input type="text" className="questioninput" />
      </div>
    );
  });

  function onNext() {
    if (activeQ < questions.length - 1) setActiveQ(activeQ + 1);
    else {
      setFinised(true);
      setActiveQ(0);
    }
  }
  function isFinished() {
    if (finished) {
      setAnswer(false);
    }
  }

  return (
    <div className="answersurvey" onClick={() => isFinished()}>
      {finished ? (
        <AnswerFinished />
      ) : (
        <div className="answerscreen">
          <div
            className="leftsection"
            style={{ backgroundImage: `url(${cube})` }}
          >
            <div className="divprog1">
              <progress
                max={questions.length}
                value={activeQ + 1}
                className="progress 1"
              />
            </div>
          </div>
          <div className="rightsection">
            <div className="firstrow">
              <span className="questionnr">
                <span className="currentSelection">{activeQ + 1}</span>/
                {questions.length}
              </span>
              <div className="closeicon" onClick={() => setAnswer(false)}>
                <IconContext.Provider value={{ className: "closeicon" }}>
                  <AiFillCloseCircle />
                </IconContext.Provider>
              </div>
            </div>
            <div className="singleanswer ">
              <span className="answertitel">{questions[activeQ]}</span>
              <input type="text" className="questioninput finali" />
            </div>
            <button className="nextbtn" onClick={() => onNext()}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
