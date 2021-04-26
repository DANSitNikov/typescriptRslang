import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioGame from './actuallyAudioGame/AudioGame';
import { getFakeWords, getWords } from '../../utilities/getData';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-audiocall-game.svg';
import footerActions from '../../actions/footerAction';
import {
  getGameFromDictStatus,
  getGameFromTextbookStatus,
  getGameGroupNumber,
  getGamePageNumber, getGameWordsFromDict, getGameWordsFromTextbook,
  getMiniGameLevel,
} from '../../selectors/selectors';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

const StartAudioGame: React.FC = () => {
  const [words, setWords] = useState<Array<Words>>([]);
  const [fakeWords, setFakeWords] = useState<Array<Words>>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const pageNumber = useSelector(getGamePageNumber);
  const groupNumber = useSelector(getGameGroupNumber);
  const dictionaryStatus = useSelector(getGameFromDictStatus);
  const wordsFromDictionary = useSelector(getGameWordsFromDict);
  const wordsFromTextbook = useSelector(getGameWordsFromTextbook);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(footerActions.toggleShowStatus(false));
  }, []);

  useEffect(() => {
    (
      async () => {
        let page;
        let currentLevel = level;
        let data;
        if (textbookStatus) {
          page = pageNumber;
          if (groupNumber) currentLevel = groupNumber + 1;
          if (dictionaryStatus) {
            data = wordsFromDictionary;
          } else {
            data = wordsFromTextbook;
          }
        } else {
          page = Math.floor(Math.random() * 30);
          data = await getWords(currentLevel, page, 1);
        }

        setWords(data!.flat().sort(() => Math.random() - 0.5));
        const fake = await getFakeWords(currentLevel, page, 4);
        setFakeWords(fake.flat().sort(() => Math.random() - 0.5));
        dispatch(footerActions.toggleShowStatus(false));
      }
    )();
  }, []);

  return (
    !startGame
      ? (
        <PresentComponent
          setStartGame={setStartGame}
          words={words}
          gameName="Аудиовызов"
          gameDescription="Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода."
          gameRules="Вы слышите слово и видите 5 вариантов перевода. Выбрать правильный ответ можно двумя способами:"
          gameOpportunityOne="1. Кликните по нему мышью;"
          gameOpportunityTwo="2. Используйте клавиши 1, 2, 3, 4, 5."
          back={backImage}
          fakeWords={fakeWords}
        />
      )
      : (
        <AudioGame
          words={words}
          fakeWords={fakeWords}
        />
      )
  );
};

export default StartAudioGame;
