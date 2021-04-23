import { TOGGLE_SHOW } from '../actions/footerAction';

const initialState = {
  show: true as boolean,
};

type InitialState = typeof initialState;

const footerReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case TOGGLE_SHOW:
      return {
        ...state,
        show: action.status,
      };
    default:
      return state;
  }
};

export default footerReducer;
