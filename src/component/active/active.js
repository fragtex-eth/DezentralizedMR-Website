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
  const [names, setNames] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { loading, error, data } = useQuery(GET_SURVEY_STATES);

  async function getInformation() {
    if (!loading) {
      for (var x = 0; x < data.surveyStates.length; x++) {
        const data2 = await readContracts({
          contracts: [
            {
              address: data.surveyStates[x].survey,
              abi: SurveyABI,
              functionName: "name",
            },
          ],
        });
        let nameTemp = names;
        nameTemp.push(data2);
        setNames(nameTemp);
      }
    }
  }

  const activeSurveys = [
    {
      id: "1",
      address: "0xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 1",
      maxparticipants: "12",
      logo: "",
      image: surveybg1,
    },
    {
      id: "2",
      address: "1xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 2",
      maxparticipants: "14",
      logo: "",
      image: surveybg2,
    },
    {
      id: "3",
      address: "2xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 3",
      maxparticipants: "100",
      logo: "",
      image: surveybg3,
    },
    {
      id: "4",
      address: "3xad4cb06582d71158c2b7bccdcd30d77997b220bd",
      name: "Survey 3",
      maxparticipants: "100",
      logo: "",
      image: surveybg4,
    },
  ];
  useEffect(() => {
    getInformation();
  }, [loading]);

  async function participate(address2) {
    setAddress(address2);
    let newQuestions = [];
    let data3;
    for (let x = 0; x < 5; x++) {
      data3 = await readContracts({
        contracts: [
          {
            address: address2,
            abi: SurveyABI,
            functionName: "questions",
            args: [x],
          },
        ],
      });
      newQuestions.push(data3[0]);
    }
    setQuestions(newQuestions);
    setAnswer(true);
  }

  const allSurveys = loading
    ? "loading"
    : data.surveyStates.map((survey, index) => {
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
                    onClick={() => participate(survey.survey)}
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
              <p>{loading ? "loading" : names[index]}</p>
              <p className="participated">
                {" "}
                <span className="highlight">0 </span>/ {survey._participants}
              </p>
            </div>
            <div className="divprog">
              <progress max={survey._participants} value={0} />
            </div>
          </div>
        );
      });

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
