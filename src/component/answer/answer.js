import "./answer.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState, useCallback } from "react";
import cube from "../../assets/cube.png";
import AnswerFinished from "../answerfinshed/answerfinished";
import Survey from "../helper/Survey.json";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

const SurveyABI = Survey.abi;

export default function Answer({ questions, setAnswer, address }) {
  const [activeQ, setActiveQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [missingTxt, setMissingTxt] = useState(false);

  const SubmitAnswers = useCallback(async () => {
    try {
      const config = await prepareWriteContract({
        address: address,
        abi: SurveyABI,
        functionName: "answerQuestions",
        args: [answers],
      });
      const data = await writeContract(config);
      await waitForTransaction({
        hash: data.hash,
      });
    } catch (e) {
      console.error(e);
    }
  }, [answers, address]);

  const onNext = useCallback(async () => {
    if (message !== "") {
      setMissingTxt(false);
      if (activeQ < questions.length - 1) {
        setAnswers((prevAnswers) => [...prevAnswers, message]);
        setMessage("");
        setActiveQ((prevActiveQ) => prevActiveQ + 1);
      } else {
        setAnswers((prevAnswers) => [...prevAnswers, message]);
        await SubmitAnswers();
        setAnswers([]);
        setFinished(true);
        setActiveQ(0);
      }
    } else {
      setMissingTxt(true);
    }
  }, [activeQ, message, questions.length, SubmitAnswers]);

  const isFinished = useCallback(() => {
    if (finished) {
      setAnswer(false);
    }
  }, [finished, setAnswer]);

  const handleChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  return (
    <div className="answersurvey" onClick={isFinished}>
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
            <div className="singleanswer">
              <span className="answertitel">{questions[activeQ]}</span>
              <input
                type="text"
                className={
                  missingTxt ? "questioninput missing" : "questioninput"
                }
                onChange={handleChange}
                value={message}
              />
            </div>
            <button className="nextbtn" onClick={onNext}>
              {activeQ < questions.length - 1 ? "Next" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
