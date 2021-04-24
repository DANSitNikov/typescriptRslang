import { combineReducers } from 'redux';
import userReducer from './userReducer';
import footerReducer from './footerReducer';
import miniGameReducer from './miniGamesReducer';
import dictionaryReducer from './dictionaryReducer';
import textbookReducer from './textbookReducer';

const rootReducer = combineReducers({
  footer: footerReducer,
  miniGame: miniGameReducer,
  dictionary: dictionaryReducer,
  user: userReducer,
  textbook: textbookReducer,
});

type RootReducer = typeof rootReducer;
export type GlobalState = ReturnType<RootReducer>;

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type ActionsType<
  T extends {[key: string]: (...args: any[]) => any}
  > = ReturnType<PropertiesType<T>>;

export default rootReducer;
