const CHANGE_TRANSLATE_VISIBILITY = 'CHANGE_TRANSLATE_VISIBILITY';
const CHANGE_BUTTONS_VISIBILITY = 'CHANGE_BUTTONS_VISIBILITY';

const initialState = {
  showTranslate: true as boolean,
  showButtons: true as boolean,
};

type InitialState = typeof initialState;

interface ChangeButtonsVis {
  type: typeof CHANGE_BUTTONS_VISIBILITY
  payload: boolean
}

interface ChangeTranslateVis {
  type: typeof CHANGE_TRANSLATE_VISIBILITY
  payload: boolean
}

type ActionType = ChangeButtonsVis | ChangeTranslateVis;

const textbookReducer = (state = initialState, action: ActionType): InitialState => {
  switch (action.type) {
    case CHANGE_TRANSLATE_VISIBILITY:
      return {
        ...state,
        showTranslate: action.payload,
      };

    case CHANGE_BUTTONS_VISIBILITY:
      return {
        ...state,
        showButtons: action.payload,
      };
    default:
      return state;
  }
};

export default textbookReducer;

export const changeTranslateVis = (state: boolean): ChangeTranslateVis => ({
  type: CHANGE_TRANSLATE_VISIBILITY,
  payload: state,
});

export const changeButtonsVis = (state: boolean): ChangeButtonsVis => ({
  type: CHANGE_BUTTONS_VISIBILITY,
  payload: state,
});
