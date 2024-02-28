import "./discover.scss";
//TODO: Add variables for common used parameter, border size e.g.
import Card, { CardPlaceHolder } from "../common/card/card.jsx";
import { useQuery } from "@apollo/client";
import { GET_SURVEY_STATES } from "../../services/graphfetch.js";
import { useEffect, useState } from "react";
import { readContracts } from "wagmi";
import Survey from "../../utils/web3/abis/Survey.json";
const SurveyABI = Survey.abi;
//NOTE:Add hidden grid while loading to list and increment loading as well
export default function Discover() {
  const [participants, setParticipants] = useState([]);
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
  return (
    <section className="discover">
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
          <CardPlaceHolder key={index} />
        ))
        : data?.surveyStates.map((survey, index) => (
          <Card
            key={survey.id}
            index={index}
            name={survey._name}
            capital={survey._capital}
            currentParticipants={participants[index]}
            maximumParticipants={survey._participants}
          />
        ))}
    </section>
  );
}
