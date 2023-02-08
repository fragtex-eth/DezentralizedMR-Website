import "./active.css";
import surveybg1 from "../../assets/surveybg1.jpeg";
import surveybg2 from "../../assets/surveybg2.jpg";
import surveybg3 from "../../assets/surveybg3.jpg";
import surveybg4 from "../../assets/surveybg4.jpg";
import surveybg5 from "../../assets/surveybg5.jpg";
import Answer from "../answer/answer";
import { GET_SURVEY_STATES } from "../helper/graphfetch";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import Survey from "../helper/Survey.json";
import { readContracts } from "@wagmi/core";

const SurveyABI = Survey.abi;

export default function Active() {
  const bg = [surveybg1, surveybg2, surveybg3, surveybg4, surveybg5];
  const [answer, setAnswer] = useState(false);
  const [address3, setAddress] = useState("");
  const [participants, setParticipants] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { loading, error, data } = useQuery(GET_SURVEY_STATES);

  async function getInformation() {
    if (!loading) {
      let participantstemp = [];
      for (var x = 0; x < data.surveyStates.length; x++) {
        const data2 = await readContracts({
          contracts: [
            {
              address: data.surveyStates[x].survey,
              abi: SurveyABI,
              functionName: "getParticipants",
            },
          ],
        });
        participantstemp[x] = parseInt(data2);
      }
      setParticipants(participantstemp);
      console.log(participants);
    }
  }

  async function participate(address2, questions) {
    setAddress(address2);
    setQuestions(questions);
    setAnswer(true);
  }
  useEffect(() => {
    if (!loading) {
      getInformation();
    }
  }, [data]);

  const allSurveys = loading ? (
    <div className="centerloading">loading..</div>
  ) : (
    data.surveyStates.map((survey, index) => {
      console.log(survey);
      return (
        <div className="singleelement" id={survey.id}>
          <div
            className="surveypreview"
            style={{ backgroundImage: `url(${bg[index]})` }}
          >
            <div className="filter">
              <div className="belowimg">
                <button
                  className="btnparticipate"
                  onClick={() => participate(survey.survey, survey.questions)}
                >
                  Participate
                </button>
                <span className="approxpayout">
                  ~
                  {parseInt(survey._capital) /
                    parseInt(survey._participants) /
                    10000000000000000000}{" "}
                  ETH
                </span>
              </div>
            </div>
          </div>

          <div className="displayinfo">
            <p>{survey._name}</p>
            <p className="participated">
              {" "}
              <span className="highlight">{participants[index]} </span>/{" "}
              {survey._participants}
            </p>
          </div>
          <div className="divprog">
            <progress max={survey._participants} value={participants[index]} />
          </div>
        </div>
      );
    })
  );

  return (
    <div className="activecontent">
      <div className="surveys">{allSurveys}</div>
      {answer ? (
        <Answer
          questions={questions}
          setAnswer={setAnswer}
          address={address3}
        />
      ) : (
        ""
      )}
    </div>
  );
}
