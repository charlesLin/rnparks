import * as actions from '../actions/actionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case actions.LOAD_PARKS_SUCCESS:
      return actions.parks;
    default:
      return state;
  }
}