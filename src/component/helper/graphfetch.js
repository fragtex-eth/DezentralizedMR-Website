import { useQuery, gql } from "@apollo/client";

export const GET_SURVEY_STATES = gql`
  {
    surveyStates(first: 5) {
      id
      survey
      _participants
      _endTime
      _capital
      stage
    }
  }
`;
