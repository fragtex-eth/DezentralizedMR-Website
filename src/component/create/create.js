import "./create.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
export default function Create({ onShow }) {
  const questions = [
    {
      name: "Enter survey name:",
      obligatory: false,
    },
    {
      name: "Link to your company:",
      obligatory: false,
    },
    {
      name: "Question 1",
      obligatory: true,
    },
    {
      name: "Question 2",
      obligatory: true,
    },
    {
      name: "Question 3",
      obligatory: true,
    },
    {
      name: "Question 4",
      obligatory: true,
    },
    {
      name: "Question 5",
      obligatory: true,
    },
  ];

  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">
          {question.name}{" "}
          {question.obligatory ? <span className="red">*</span> : ""}
        </span>
        <input type="text" className="questioninput" />
      </div>
    );
  });

  return (
    <div className="createsurvey">
      <div className="creationscreen">
        <div className="closeicon" onClick={onShow}>
          <IconContext.Provider value={{ className: "closeicon" }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </div>
        <div className="question">
          {allQuestions}
          <div className="singlequestion sqadj">
            <span className="title adjustt">Persons:</span>
            <input type="text" className="questioninput finali" />
          </div>
          <div className="singlequestion sqadj">
            <span className="title adjustt">Budget:</span>
            <input type="text" className="questioninput finali" />
          </div>
          <div className="singlequestion sqadj">
            <span className="title adjustt btntxt">btn</span>
            <button className="questioninput qb">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
