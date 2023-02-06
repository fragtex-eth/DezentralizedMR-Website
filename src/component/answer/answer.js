import "./answer.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import cube from "../../assets/cube.png";

export default function Answer({ onShow }) {
  const questions = [
    {
      name: "Question 1",
    },
    {
      name: "Question 2",
    },
    {
      name: "Question 3",
    },
    {
      name: "Question 4",
    },
    {
      name: "Question 5",
    },
  ];

  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">{question.name} </span>
        <input type="text" className="questioninput" />
      </div>
    );
  });

  return (
    <div className="answersurvey">
      <div className="answerscreen">
        <div
          className="leftsection"
          style={{ backgroundImage: `url(${cube})` }}
        >
          <div className="divprog1">
            <progress max="100" value="20" className="progress 1" />
          </div>
        </div>
        <div className="rightsection">
          <div className="firstrow">
            <span className="questionnr">
              <span className="currentSelection">1</span>/2
            </span>
            <div className="closeicon" onClick={onShow}>
              <IconContext.Provider value={{ className: "closeicon" }}>
                <AiFillCloseCircle />
              </IconContext.Provider>
            </div>
          </div>
          <div className="singleanswer ">
            <span className="answertitel">
              1. Fermentum id vulputate porttitor?
            </span>
            <input type="text" className="questioninput finali" />
          </div>
          <button className="nextbtn">Next</button>
        </div>
      </div>
    </div>
  );
}
