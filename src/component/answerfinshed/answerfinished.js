import "./answerfinished.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import cube from "../../assets/cube.png";

export default function AnswerFinished({ onShow }) {
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
    <div className="answerscreen">
      <div
        className="leftsectionfinished"
        style={{ backgroundImage: `url(${cube})` }}
      ></div>
      <div className="rightsectionfinished finishedsucc">
        <div className="firstrow">
          <div className="checkicon" onClick={onShow}>
            <IconContext.Provider value={{ className: "checkicon" }}>
              <AiFillCheckCircle />
            </IconContext.Provider>
          </div>
          <span className="successtxt">Success</span>
        </div>
        <div className="singleanswer "></div>
      </div>
    </div>
  );
}
