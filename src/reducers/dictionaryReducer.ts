import { Words } from '../utilities/checkDeletedAndDifficultWords';
import { ActionsType } from './rootReducer';
import dictionaryAction from '../actions/dictionaryAction';

const initialState = {
  difficultWords: [] as Array<Words>,
  deletedWords: [] as Array<Words>,
  learnedWords: [] as Array<Words>,
  type: 'unknown' as string,
};

type InitialState = typeof initialState;
type ActionType = ActionsType<typeof dictionaryAction>

const dictionaryReducer = (state = initialState, action: ActionType): InitialState => {
  switch (action.type) {
    case 'SET_TO_LEARNED_WORDS':
      return {
        ...state,
        learnedWords: [...action.array],
      };
    case 'SET_TO_HARD_WORDS':
      return {
        ...state,
        difficultWords: [...action.array],
      };
    case 'SET_TO_REMOVE_WORDS':
      return {
        ...state,
        deletedWords: [...action.array],
      };
    case 'ADD_TO_LEARNED_WORDS':
      return {
        ...state,
        learnedWords: [...state.learnedWords, ...action.words],
      };
    case 'ADD_TO_HARD_WORDS':
      return {
        ...state,
        difficultWords: [...state.difficultWords, action.word],
      };
    case 'ADD_TO_REMOVED_WORDS':
      return {
        ...state,
        deletedWords: [...state.deletedWords, action.word],
      };
    case 'DELETE_FROM_HARD_WORDS':
      return {
        ...state,
        difficultWords: [...action.array],
      };
    case 'DELETE_FROM_REMOVED_WORDS':
      return {
        ...state,
        deletedWords: [...action.array],
      };
    case 'SET_TYPE':
      return {
        ...state,
        type: action.meaning,
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
