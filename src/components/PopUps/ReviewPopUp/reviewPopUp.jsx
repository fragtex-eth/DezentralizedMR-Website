import "./review.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import Survey from "../helper/Survey.json";
import { prepareWriteContract, writeContract } from "@wagmi/core";

const SurveyABI = Survey.abi;
const reviewOptions = ["Poor", "Fair", "Average", "Good", "Excellent"];

export default function Review({ onShow, questionsR, answersR, addressR }) {
  const [review, setReview] = useState();

  async function confirmReview() {
    if (review === undefined) {
      alert("Please select a review option.");
      return;
    }
    const config = await prepareWriteContract({
      address: addressR,
      abi: SurveyABI,
      functionName: "reviewAnswers",
      args: [review],
    });
    await writeContract(config);
    onShow();
  }

  const handleChange = (event) => {
    setReview(parseInt(event.target.value));
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
        <div className="question">
          {questionsR.map((question, index) => (
            <div className="singlequestion" key={index}>
              <span className="title">
                {index + 1}. {question}
              </span>
              <p className="answer">{answersR[index]}</p>
            </div>
          ))}
        </div>
        <span className="questionformat">How would you rate the answer?</span>
        <div className="selection">
          {reviewOptions.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="choice"
                value={index}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
        <button className="confirmReviewSelection" onClick={confirmReview}>
          Confirm
        </button>
      </div>
    </div>
  );
}
