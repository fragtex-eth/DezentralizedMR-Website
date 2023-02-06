import "./review.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
export default function Review({ onShow }) {
  const questions = [
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

  const answers = [];
  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">
          {question.name}{" "}
          {question.obligatory ? <span className="red">*</span> : ""}
        </span>
        <p className="answer">
          From they fine john he give of rich he. They age and draw mrs like.
          Improving end distrusts may instantly was household applauded
          incommode.
        </p>
      </div>
    );
  });

  return (
    <div className="createsurvey">
      <div className="reviewscreen">
        <div className="closeicon" onClick={onShow}>
          <IconContext.Provider value={{ className: "closeicon" }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </div>
        <div className="question">{allQuestions}</div>
        <span className="questionformat">How would you rate the answer?</span>
        <div className="selection">
          <label>
            <input type="radio" id="poor" name="choice" value="poor" />
            Poor
          </label>

          <label for="fair">
            <input type="radio" id="fair" name="choice" value="fair" />
            Fair
          </label>

          <label for="average">
            <input type="radio" id="average" name="choice" value="average" />
            Average
          </label>

          <label for="good">
            <input type="radio" id="good" name="choice" value="good" />
            Good
          </label>

          <label for="excellent">
            <input
              type="radio"
              id="excellent"
              name="choice"
              value="excellent"
            />
            Excellent
          </label>
        </div>
        <button className="confirmReviewSelection">Confirm</button>
      </div>
    </div>
  );
}
