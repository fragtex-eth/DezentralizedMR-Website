import "./review.css";
import { AiFillCloseCircle, AiFillDingtalkSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import Survey from "../helper/Survey.json";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getNetwork,
} from "@wagmi/core";

const SurveyABI = Survey.abi;

export default function Review({ onShow, questionsR, answersR, addressR }) {
  const [review, setReview] = useState();

  async function confirmReview() {
    const config = await prepareWriteContract({
      address: addressR,
      abi: SurveyABI,
      functionName: "reviewAnswers",
      args: [review],
    });
    const send = await writeContract(config);
    onShow();
  }

  const allQuestions = questionsR.map((question, index) => {
    return (
      <div className="singlequestion" key={index}>
        <span className="title">
          {index + 1}. {question}
        </span>
        <p className="answer">{answersR[index]}</p>
      </div>
    );
  });
  const handleChange = (event) => {
    // 👇 "message" stores input field value
    console.log(event.target.value);
    setReview(event.target.value);
  };
  return (
    <div className="createsurvey">
      <div className="reviewscreen">
        <div className="closeicon" onClick={onShow}>
          <IconContext.Provider value={{ className: "closeicon" }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </div>
        <span className="questionformat1">Review answers</span>
        <div className="question">{allQuestions}</div>
        <span className="questionformat">How would you rate the answer?</span>
        <div className="selection">
          <label>
            <input
              type="radio"
              id="poor"
              name="choice"
              value="0"
              onChange={handleChange}
            />
            Poor
          </label>

          <label for="fair">
            <input
              type="radio"
              id="fair"
              name="choice"
              value="1"
              onChange={handleChange}
            />
            Fair
          </label>

          <label for="average">
            <input
              type="radio"
              id="average"
              name="choice"
              value="2"
              onChange={handleChange}
            />
            Average
          </label>

          <label for="good">
            <input
              type="radio"
              id="good"
              name="choice"
              value="3"
              onChange={handleChange}
            />
            Good
          </label>

          <label for="excellent">
            <input
              type="radio"
              id="excellent"
              name="choice"
              value="4"
              onChange={handleChange}
            />
            Excellent
          </label>
        </div>
        <button
          className="confirmReviewSelection"
          onClick={() => confirmReview()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
