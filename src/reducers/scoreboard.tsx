import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  scoreboard: [],
  loading: false,
  error: undefined,
};

const scoreboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SCOREBOARD_FETCH_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actionTypes.SCOREBOARD_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        scoreboard: action.payload.scoreboard || defaultState.scoreboard,
      };
    case actionTypes.SCOREBOARD_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case actionTypes.SCOREBOARD_UPDATE_REQUEST:
      return { ...state, loading: true, error: undefined };
    case actionTypes.SCOREBOARD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        scoreboard: action.payload.scoreboard || defaultState.scoreboard,
      };
    case actionTypes.SCOREBOARD_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default scoreboardReducer;
