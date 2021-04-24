import { Words } from '../utilities/checkDeletedAndDifficultWords';

const dictionaryActions = {
  addNewLearnedWords: (words: Array<Words>) => ({
    type: 'ADD_TO_LEARNED_WORDS',
    words,
  } as const),
  addNewHardWord: (word: Words) => ({
    type: 'ADD_TO_HARD_WORDS',
    word,
  } as const),
  addNewRemovedWord: (word: Words) => ({
    type: 'ADD_TO_REMOVED_WORDS',
    word,
  } as const),
  deleteFromHardWords: (array: Array<Words>) => ({
    type: 'DELETE_FROM_HARD_WORDS',
    array,
  } as const),
  deleteFromRemovedWords: (array: Array<Words>) => ({
    type: 'DELETE_FROM_REMOVED_WORDS',
    array,
  } as const),
  setLearnedWords: (array: Array<Words>) => ({
    type: 'SET_TO_LEARNED_WORDS',
    array,
  } as const),
  setHardWords: (array: Array<Words>) => ({
    type: 'SET_TO_HARD_WORDS',
    array,
  } as const),
  setRemoveWords: (array: Array<Words>) => ({
    type: 'SET_TO_REMOVE_WORDS',
    array,
  } as const),
  setType: (meaning: string) => ({
    type: 'SET_TYPE',
    meaning,
  } as const),
};

export default dictionaryActions;
