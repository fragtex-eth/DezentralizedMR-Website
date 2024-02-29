import "./createPopUp.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
import { Modal } from "../../common/modal/modal";
import CompiledContract from "../../../utils/web3/abis/Factory.json";
import FactoryContractInfo from "../../../utils/web3/addressFactory.json";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";

const FactoryABI = CompiledContract.abi;
const FactoryContractAddress = FactoryContractInfo.address;

export default function CreatePopUp({ setCreateModalVisible }) {
  //name, participants, endTime, reviewNeeded, capital
  const [input, setInput] = useState([[], [], [], 2500, 10, []]);
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

  async function Create() {
    const UNIXTime = Math.floor(Date.now() / 1000);
    let inputperm = input;
    inputperm[3] = inputperm[3] + UNIXTime;
    setInput(inputperm);
    try {
      const config = await prepareWriteContract({
        //@ts-ignore
        address: FactoryContractAddress,
        abi: FactoryABI,
        functionName: "createSurvey",
        args: input,
        overrides: {
          value: input[5],
        },
      });
      const data = await writeContract(config);
      await waitForTransaction({
        hash: data.hash,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event, idx) => {
    let inputperm = input;
    if (idx < 6) {
      inputperm[0][idx - 1] = event.target.value;
    } else {
      inputperm[idx - 5] = event.target.value;
    }
    setInput(inputperm);
  };

  const allQuestions = questions.map((question, index) => {
    return (
      <div className="create-survey-form-question" key={index}>
        <span className="create-survey-form-question-title">
          {question.name}{" "}
          {question.obligatory ? <span style={{ color: "#f26969" }}>*</span> : (
            ""
          )}
        </span>
        <input
          type="text"
          className="create-survey-form-question-input"
          onChange={(e) => handleChange(e, question.idx)}
        />
      </div>
    );
  });

  return (
    <Modal>
      <div className="create-survey">
        <div className="create-survey-top">
          <h1 className="create-survey-top-title">Create</h1>
          <a onClick={() => setCreateModalVisible(false)}>
            <IconContext.Provider
              value={{ className: "create-survey-top-close-icon" }}
            >
              <AiFillCloseCircle />
            </IconContext.Provider>
          </a>
        </div>
        <div className="create-survey-form">
          {allQuestions}
          {
            //Move the content to all questions
          }
          <div className="create-survey-form-question">
            <span className="create-survey-form-question-title">
              Participants:
            </span>
            <input
              type="number"
              className="create-survey-form-question-input"
              onChange={(e) => handleChange(e, 7)}
            />
          </div>
          <div className="create-survey-form-question">
            <span className="create-survey-form-question-title">Budget:</span>
            <input
              type="number"
              className="create-survey-form-question-input"
              onChange={(e) => handleChange(e, 10)}
            />
          </div>
          <button
            className="create-survey-form-button"
            onClick={(e) => Create()}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
