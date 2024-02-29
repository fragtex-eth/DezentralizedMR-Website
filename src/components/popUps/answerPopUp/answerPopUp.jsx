import "./answerPopUp.scss";
import { Modal } from "../../common/modal/modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useCallback, useState } from "react";
import cube from "../../../assets/cube.png";
// import AnswerFinished from "../answerfinshed/answerfinished";
import Survey from "../../../utils/web3/abis/Survey.json";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

const SurveyABI = Survey.abi;

export default function AnswerPopUp({
  questions = ["test !uearst", "arst"],
  setAnswer,
  address,
}) {
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
    <Modal>
      {" "}
      <div className="answer-question">
        <div
          className="answer-question-left"
          style={{ backgroundImage: `url(${cube})` }}
        >
          <div className="answer-question-left-outer-progress">
            <progress
              max={questions.length}
              value={activeQ + 1}
              className="answer-question-left-outer-progress-progress"
            />
          </div>
        </div>
        <div className="answer-question-right">
          <div className="answer-question-right-firstrow">
            <span className="answer-question-right-firstrow-question">
              <span className="answer-question-right-firstrow-question-selection">
                {activeQ + 1}
              </span>
              /{questions.length}
            </span>
            <div
              className="answer-question-right-firstrow-close"
              onClick={() => setAnswer(false)}
            >
              <IconContext.Provider
                value={{ className: "answer-question-right-firstrow-close" }}
              >
                <AiFillCloseCircle />
              </IconContext.Provider>
            </div>
          </div>
          <div className="answer-question-right-firstrow-answer">
            <span className="answer-question-right-firstrow-answer-title">
              {questions[activeQ]}
            </span>
            <input
              type="text"
              className={missingTxt
                ? "answer-question-right-firstrow-answer-questioninput missing"
                : "answer-question-right-firstrow-answer-questioninput"}
              onChange={handleChange}
              value={message}
            />
          </div>
          <button className="answer-question-right-btn" onClick={onNext}>
            {activeQ < questions.length - 1 ? "Next" : "Send"}
          </button>
        </div>
      </div>
      )}
    </Modal>
  );
}
