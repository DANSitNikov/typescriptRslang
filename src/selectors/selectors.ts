/* eslint-disable import/prefer-default-export */

import { GlobalState } from '../reducers/rootReducer';
import { Words } from '../utilities/checkDeletedAndDifficultWords';

export const getShowFooterStatus = (state: GlobalState): boolean => state.footer.show;
export const getMiniGameLevel = (state: GlobalState): number | null => state.miniGame.level;
export const getLearnedWords = (state: GlobalState): Array<Words> => state.dictionary.learnedWords;
export const getDeletedWords = (state: GlobalState): Array<Words> => state.dictionary.deletedWords;
export const getDifficultWords = (state: GlobalState): Array<Words> => {
  return state.dictionary.difficultWords;
};
export const getUserId = (state: GlobalState): string | undefined => state.user.currentUser.userId;
export const getGameFromTextbookStatus = (state: GlobalState): boolean => {
  return state.miniGame.fromTextbook;
};
export const getGamePageNumber = (state: GlobalState): number | null => state.miniGame.pageNumber;
export const getGameGroupNumber = (state: GlobalState): number | null => state.miniGame.groupNumber;
export const getGameFromDictStatus = (state: GlobalState): boolean => state.miniGame.fromDictionary;
export const getGameWordsFromDict = (state: GlobalState): Array<Words> | null => {
  return state.miniGame.wordsFromDictionary;
};
export const getGameWordsFromTextbook = (state: GlobalState): Array<Words> | null => {
  return state.miniGame.wordsFromTextbook;
};
export const getType = (state: GlobalState): string => state.dictionary.type;
export const getUserAuth = (state: GlobalState): boolean => state.user.isAuth;
export const getTranslateVisibility = (state: GlobalState): boolean => state.textbook.showTranslate;
export const getButtonsVisibility = (state: GlobalState): boolean => state.textbook.showButtons;
