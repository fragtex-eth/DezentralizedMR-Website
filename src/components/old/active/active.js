import "./active.css";
import surveybg1 from "../../assets/surveybg1.jpeg";
import surveybg2 from "../../assets/surveybg2.jpg";
import surveybg3 from "../../assets/surveybg3.jpg";
import surveybg4 from "../../assets/surveybg4.jpg";
import surveybg5 from "../../assets/surveybg5.jpg";
import Answer from "../answer/answer";
import { GET_SURVEY_STATES } from "../helper/graphfetch";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Survey from "../helper/Survey.json";
import { readContracts } from "@wagmi/core";

const SurveyABI = Survey.abi;
const bg = [surveybg1, surveybg2, surveybg3, surveybg4, surveybg5];

export default function Active() {
  const [answer, setAnswer] = useState(false);
  const [surveyAddress, setSurveyAddress] = useState("");
  const [participants, setParticipants] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { loading, error, data } = useQuery(GET_SURVEY_STATES);

  useEffect(() => {
    async function getInformation() {
      if (!loading) {
        let participantsTemp = [];
        for (let i = 0; i < data.surveyStates.length; i++) {
          const participantsCount = await readContracts({
            contracts: [
              {
                address: data.surveyStates[i].survey,
                abi: SurveyABI,
                functionName: "getParticipants",
              },
            ],
          });
          participantsTemp[i] = parseInt(participantsCount);
        }
        setParticipants(participantsTemp);
      }
    }

    getInformation();
  }, [data, loading]);

  const participate = (address2, surveyQuestions) => {
    setSurveyAddress(address2);
    setQuestions(surveyQuestions);
    setAnswer(true);
  };

  if (loading) return <div className="centerloading">loading..</div>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="activecontent">
      <div className="surveys">
        {data.surveyStates.map((survey) => (
          <div className="singleelement" key={survey.id}>
            <div
              className="surveypreview"
              style={{
                backgroundImage: `url(${
                  bg[data.surveyStates.indexOf(survey)]
                })`,
              }}
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
                      1e19}{" "}
                    ETH
                  </span>
                </div>
              </div>
            </div>

            <div className="displayinfo">
              <p>{survey._name}</p>
              <p className="participated">
                {" "}
                <span className="highlight">
                  {participants[data.surveyStates.indexOf(survey)]}{" "}
                </span>
                / {survey._participants}
              </p>
            </div>
            <div className="divprog">
              <progress
                max={survey._participants}
                value={participants[data.surveyStates.indexOf(survey)]}
              />
            </div>
          </div>
        ))}
      </div>
      {answer && (
        <Answer
          questions={questions}
          setAnswer={setAnswer}
          address={surveyAddress}
        />
      )}
    </div>
  );
}
