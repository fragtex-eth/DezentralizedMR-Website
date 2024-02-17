import "./main.css";
import lines from "../../assets/lines.png";
import Info from "../info/info";
import Active from "../active/active";
import { GET_REVIEW_SURVEYS } from "../helper/graphfetch";
import { useQuery } from "@apollo/client";
import {
  prepareWriteContract,
  writeContract,
  readContracts,
  getAccount,
} from "@wagmi/core";

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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const account = getAccount();

  async function getReview() {
    if (!data.surveyStates.length) {
      console.log("No survey states");
      return;
    }

    const randomNumb = Math.floor(Math.random() * data.surveyStates.length);
    const { survey: addressSurvey, questions: questionsAnswered } =
      data.surveyStates[randomNumb];
    const answersgivenbyParticpant = [];

    const requestReviewContract = await prepareWriteContract({
      address: addressSurvey,
      abi: SurveyABI,
      functionName: "requestReview",
    });
    await writeContract(requestReviewContract);

    const [addressParticipant] = await readContracts({
      contracts: [
        {
          address: addressSurvey,
          abi: SurveyABI,
          functionName: "returnReviewParticipant",
          args: [account.address],
        },
      ],
    });

    for (let x = 0; x < 5; x++) {
      const [answer] = await readContracts({
        contracts: [
          {
            address: addressSurvey,
            abi: SurveyABI,
            functionName: "viewAnswers",
            args: [addressParticipant, x],
          },
        ],
      });
      answersgivenbyParticpant.push(answer);
    }

    setAnswersR(answersgivenbyParticpant);
    setAddressR(addressSurvey);
    setQuestionsR(questionsAnswered);

    setReview(true);
  }

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
        <button className="reviewbtn" onClick={getReview}>
          Review ~0.0001 ETH
        </button>
      </div>
      <img src={lines} className="linesBackground" alt="Background" />
      <div className="elblur"></div>
      {mainscreen === 0 ? <Info setMainScreen={setMainScreen} /> : <Active />}
    </div>
  );
}
