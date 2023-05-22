import "./main.css";
import lines from "../../assets/lines.png";
import Info from "../info/info";
import Active from "../active/active";
import { GET_REVIEW_SURVEYS } from "../helper/graphfetch";
import { useQuery } from "@apollo/client";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getNetwork,
} from "@wagmi/core";
import { readContracts } from "@wagmi/core";
//Currently no function if survey is not in review stage
import { getAccount } from "@wagmi/core";

import Survey from "../helper/Survey.json";
const SurveyABI = Survey.abi;

export default function Main({
  mainscreen,
  setMainScreen,
  setCreate,
  setReview,
  setQuestionsR,
  setAnswersR,
  setAddressR,
}) {
  const { loading, error, data } = useQuery(GET_REVIEW_SURVEYS);
  const account = getAccount();
  async function getReview() {
    console.log(data.surveyStates);

    let randomNumb = Math.floor(Math.random() * data.surveyStates.length);
    let addressSurvey = data.surveyStates[randomNumb].survey;
    let questionsAnswered = data.surveyStates[randomNumb].questions;
    let answersgivenbyParticpant = [];
    console.log(addressSurvey);

    const addressParticipant1 = await readContracts({
      contracts: [
        {
          address: addressSurvey,
          abi: SurveyABI,
          functionName: "returnReviewParticipant",
          args: [account.address],
        },
      ],
    });

    const config = await prepareWriteContract({
      address: addressSurvey,
      abi: SurveyABI,
      functionName: "requestReview",
    });
    const data2 = await writeContract(config);
    console.log(account.address);
    const addressParticipant = await readContracts({
      contracts: [
        {
          address: addressSurvey,
          abi: SurveyABI,
          functionName: "returnReviewParticipant",
          args: [account.address],
        },
      ],
    });

    console.log(addressParticipant[0]);

    for (var x = 0; x < 5; x++) {
      const data3 = await readContracts({
        contracts: [
          {
            address: addressSurvey,
            abi: SurveyABI,
            functionName: "viewAnswers",
            args: [addressParticipant[0], x],
          },
        ],
      });
      answersgivenbyParticpant[x] = data3[0];
    }
    console.log(answersgivenbyParticpant);
    console.log(questionsAnswered);
    setAnswersR(answersgivenbyParticpant);
    setAddressR(addressSurvey);
    setQuestionsR(questionsAnswered);

    setReview(true);
  }

  console.log(mainscreen);
  return (
    <div className="maincontent">
      <div className="linkbar">
        <div className="links">
          <p href="" className="create link1" onClick={() => setCreate(true)}>
            Create New
          </p>
          <p href="" className="active link1" onClick={() => setMainScreen(1)}>
            Show Active
          </p>
        </div>
        <button className="reviewbtn" onClick={() => getReview()}>
          Review ~0.0001 ETH
        </button>
      </div>
      <img src={lines} className="linesBackground" alt="" />
      <div className="elblur"></div>
      {mainscreen == 0 ? <Info setMainScreen={setMainScreen}/> : <Active />}
    </div>
  );
}
