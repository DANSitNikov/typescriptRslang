import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameSavanna from './actuallyGameSavanna/GameSavanna';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-savanna-game.svg';
import footerActions from '../../actions/footerAction';
import { getFakeWords, getWords } from '../../utilities/getData';
import {
  getGameFromDictStatus,
  getGameFromTextbookStatus,
  getGameGroupNumber,
  getGamePageNumber, getGameWordsFromDict, getGameWordsFromTextbook,
  getMiniGameLevel,
} from '../../selectors/selectors';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

const GameSavannaContainer: React.FC = () => {
  const [words, setWords] = useState<Array<Words>>([]);
  const [fakeWords, setFakeWords] = useState<Array<Words>>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const pageNumber = useSelector(getGamePageNumber);
  const groupNumber = useSelector(getGameGroupNumber);
  const dictionaryStatus = useSelector(getGameFromDictStatus);
  const wordsFromDictionary = useSelector(getGameWordsFromDict);
  const wordsFromTextbook = useSelector(getGameWordsFromTextbook);
  const dispatch = useDispatch();

  useEffect(() => {
    (
      async () => {
        let page;
        let currentLevel;
        let data;
        if (textbookStatus) {
          page = pageNumber;
          if (groupNumber) currentLevel = groupNumber! + 1;
          if (dictionaryStatus) {
            data = wordsFromDictionary;
          } else {
            data = wordsFromTextbook;
          }
        } else {
          page = Math.floor(Math.random() * 30);
          currentLevel = level;
          data = await getWords(currentLevel, page, 1);
        }

        setWords(data!.flat().sort(() => Math.random() - 0.5));
        const fake = await getFakeWords(currentLevel, page, 3);
        setFakeWords(fake.flat().sort(() => Math.random() - 0.5));
        dispatch(footerActions.toggleShowStatus(false));
      }
    )();
  }, []);

  return (
    isGameStarted
      ? <GameSavanna words={words} fakeWords={fakeWords} />
      : (
        <PresentComponent
          setStartGame={setIsGameStarted}
          words={words}
          fakeWords={fakeWords}
          gameName="Саванна"
          gameDescription="Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию."
          gameRules="После запуска игры вы увидите падающее слово на английском и четыре варианта перевода. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4."
          back={backImage}
        />
      )
  );
};

export default GameSavannaContainer;
