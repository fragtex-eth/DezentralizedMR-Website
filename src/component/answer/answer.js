import "./answer.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import cube from "../../assets/cube.png";
import AnswerFinished from "../answerfinshed/answerfinished";
import CompiledContract from "../helper/Factory.json";
import FactoryContractInfo from "../helper/address.json";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getNetwork,
} from "@wagmi/core";

import Survey from "../helper/Survey.json";
const SurveyABI = Survey.abi;

export default function Answer({ questions, setAnswer, address }) {
  const [activeQ, setActiveQ] = useState(0);
  const [finished, setFinised] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [missingtxt, setMissingTxt] = useState(false);

  const allQuestions = questions.map((question) => {
    return (
      <div className="singlequestion">
        <span className="title">{question.name} </span>
        <input type="text" className="questioninput" />
      </div>
    );
  });

  async function SubmitAnswers() {
    console.log(answers);
    try {
      const config = await prepareWriteContract({
        //@ts-ignore
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
      console.log(e);
    }
  }

  async function onNext() {
    if (message != "") {
      setMissingTxt(false);
      if (activeQ < questions.length - 1) {
        setAnswer(answers.push(message));
        setMessage("");
        setActiveQ(activeQ + 1);
      } else {
        setAnswer(answers.push(message));
        console.log(answers);
        //Call
        await SubmitAnswers();
        setAnswer([]);
        setFinised(true);
        setActiveQ(0);
      }
    } else {
      setMissingTxt(true);
    }
  }
  function isFinished() {
    if (finished) {
      setAnswer(false);
    }
  }
  const handleChange = (event) => {
    // 👇 "message" stores input field value
    console.log(event.target.value);
    setMessage(event.target.value);
  };

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
              <input
                type="text"
                className={
                  missingtxt ? "questioninput missing" : "questioninput "
                }
                onChange={(e) => handleChange(e)}
                value={message}
              />
            </div>
            <button className="nextbtn" onClick={() => onNext()}>
              {activeQ < questions.length - 1 ? "Next" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
