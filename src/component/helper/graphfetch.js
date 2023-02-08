import { useQuery, gql } from "@apollo/client";

export const GET_SURVEY_STATES = gql`
  {
    surveyStates(first: 6, where: { stage: 1 }) {
      id
      survey
      questions
      _name
      _participants
      stage
      _endTime
      _capital
    }
  }
`;

export const GET_REVIEW_SURVEYS = gql`
  {
    surveyStates(first: 5, where: { stage: 2 }) {
      id
      survey
      questions
      _name
      _participants
      stage
      _endTime
      _capital
    }
  }
`;
