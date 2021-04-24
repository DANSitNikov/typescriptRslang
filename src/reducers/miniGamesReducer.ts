import miniGamesActions from '../actions/mniGameAction';
import { Words } from '../utilities/checkDeletedAndDifficultWords';
import { ActionsType } from './rootReducer';

const initialState = {
  level: null as null | number,
  fromTextbook: false as boolean,
  wordsFromTextbook: null as null | Array<Words>,
  pageNumber: null as number | null,
  groupNumber: null as null | number,
  wordsFromDictionary: null as null | Array<Words>,
  fromDictionary: false as boolean,
};

type InitialState = typeof initialState;
type ActionType = ActionsType<typeof miniGamesActions>;

const miniGameReducer = (state = initialState, action: ActionType): InitialState => {
  switch (action.type) {
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.level,
      };
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.page,
      };
    case 'SET_GROUP_NUMBER':
      return {
        ...state,
        groupNumber: action.group,
      };
    case 'SET_GAME_FROM_TEXTBOOK':
      return {
        ...state,
        fromTextbook: action.status,
      };
    case 'SET_WORDS_FROM_DICTIONARY':
      return {
        ...state,
        wordsFromDictionary: [...action.array],
      };
    case 'SET_GAME_FROM_DICTIONARY':
      return {
        ...state,
        fromDictionary: action.status,
      };
    case 'SET_WORDS_FROM_TEXTBOOK':
      return {
        ...state,
        wordsFromTextbook: [...action.array],
      };
    default:
      return state;
  }
};

export default miniGameReducer;
