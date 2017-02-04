
// Required libraries
import Immutable from 'immutable';
import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const SET_PROBLEMS = 'SET_PROBLEMS';

/* ------------   ACTION CREATORS     ------------------ */
export const setProblems = problems => ({
  type: SET_PROBLEMS,
  problems
});

/* ------------       REDUCER     ------------------ */
const initialProblemData = Immutable.fromJS(
  []
);

export default function reducer (problemData = initialProblemData, action) {
  let newProblemData;
  switch (action.type) {
    case SET_PROBLEMS:
      newProblemData = Immutable.fromJS(action.problems);
      break;

    default: return problemData;

  }

  return newProblemData;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchProblems = interviewID => {
  console.log('+++ In fetch problems', interviewID)
  return dispatch => {
    return axios.get(`/api/interviews/${interviewID}/problems`)
    .then(response => {
      console.log('+++ API response', response.data);
      return dispatch(setProblems(response.data));
    })
    .catch(console.error);
  };
};
