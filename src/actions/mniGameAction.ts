import { Words } from '../utilities/checkDeletedAndDifficultWords';

type NumberOrNull = null | number;

const miniGamesActions = {
  setGameLevel: (level: NumberOrNull) => ({
    type: 'SET_LEVEL',
    level,
  } as const),
  setGamePage: (page: NumberOrNull) => ({
    type: 'SET_PAGE_NUMBER',
    page,
  } as const),
  setGameGroup: (group: NumberOrNull) => ({
    type: 'SET_GROUP_NUMBER',
    group,
  } as const),
  setGameFromTextbookStatus: (status: boolean) => ({
    type: 'SET_GAME_FROM_TEXTBOOK',
    status,
  } as const),
  setGameFromDictionaryStatus: (status: boolean) => ({
    type: 'SET_GAME_FROM_DICTIONARY',
    status,
  } as const),
  setWordsFromDictionary: (array: Array<Words>) => ({
    type: 'SET_WORDS_FROM_DICTIONARY',
    array,
  } as const),
  setWordsFromTextbook: (array: Array<Words>) => ({
    type: 'SET_WORDS_FROM_TEXTBOOK',
    array,
  } as const),
};

export default miniGamesActions;
