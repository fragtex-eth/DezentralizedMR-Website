import "./create.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
export default function Create({ onShow }) {
  //name, participants, endTime, reviewNeeded, capital
  const [input, setInput] = useState([[], [], [], [2592000], [10], []]);
  const questions = [
    {
      idx: 6,
      name: "Enter survey name:",
      obligatory: true,
    },

    {
      idx: 1,
      name: "Question 1",
      obligatory: true,
    },
    {
      idx: 2,
      name: "Question 2",
      obligatory: true,
    },
    {
      idx: 3,
      name: "Question 3",
      obligatory: true,
    },
    {
      idx: 4,
      name: "Question 4",
      obligatory: true,
    },
    {
      idx: 5,
      name: "Question 5",
      obligatory: true,
    },
  ];

  const handleChange = (event, idx) => {
    let inputperm = input;
    if (idx < 6) {
      inputperm[0][idx - 1] = event.target.value;
    } else {
      inputperm[idx - 5] = event.target.value;
    }
    setInput(inputperm);
    console.log(input);
  };

  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">
          {question.name}{" "}
          {question.obligatory ? <span className="red">*</span> : ""}
        </span>
        <input
          type="text"
          className="questioninput"
          onChange={(e) => handleChange(e, question.idx)}
        />
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
            <span className="title adjustt">Participants:</span>
            <input
              type="number"
              className="questioninput finali"
              onChange={(e) => handleChange(e, 7)}
            />
          </div>
          <div className="singlequestion sqadj">
            <span className="title adjustt">Budget:</span>
            <input
              type="number"
              className="questioninput finali"
              onChange={(e) => handleChange(e, 10)}
            />
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
