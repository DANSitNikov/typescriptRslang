import { ActionsType } from './rootReducer';
import footerAction from '../actions/footerAction';

const initialState = {
  show: true as boolean,
};

type InitialState = typeof initialState;
type ActionType = ActionsType<typeof footerAction>

const footerReducer = (state = initialState, action: ActionType): InitialState => {
  switch (action.type) {
    case 'TOGGLE_SHOW':
      return {
        ...state,
        show: action.status,
      };
    default:
      return state;
  }
};

export default footerReducer;
