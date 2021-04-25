import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GallowsGame from './actuallyGallowsGame/GallowsGame';
import PresentComponent from '../../components/PresentComponent';
import backImage from '../../assets/backgrounds/bg-gallows-game.svg';
import footerActions from '../../actions/footerAction';
import {
  getGameFromDictStatus,
  getGameFromTextbookStatus,
  getGameWordsFromDict,
  getGameWordsFromTextbook,
  getMiniGameLevel,
} from '../../selectors/selectors';
import { getWords } from '../../utilities/getData';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

const StartGallowsGame: React.FC = () => {
  const [words, setWords] = useState<Array<Words>>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const dictionaryStatus = useSelector(getGameFromDictStatus);
  const wordsFromDictionary = useSelector(getGameWordsFromDict);
  const wordsFromTextbook = useSelector(getGameWordsFromTextbook);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let page;
      let currentLevel;
      let data;
      if (textbookStatus) {
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

      const localData = data!.flat();
      const sliceData: Array<Words> = [];
      for (let i = 0; i < localData.length; i += 1) {
        const word = localData[Math.floor(Math.random() * localData.length)];
        if (!sliceData.includes(word)) {
          sliceData.push(word);
        } else {
          i -= 1;
        }
      }
      setWords(sliceData.sort(() => Math.random() - 0.5));
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
          gameName="Виселица"
          gameDescription="Мини-игра «Виселица» - это тренировка, которая помогает запоминать правильное написание слов."
          gameRules="Вы видите картинку. Вам предстоит выбрать все буквы, которые используются в этом слове. Это можно сделать с помощью:"
          gameOpportunityOne="1. Кликайте по буквам;"
          gameOpportunityTwo="2. Используйте буквы на клавиатуре."
          back={backImage}
          fakeWords={[{ fake: true }]}
        />
      )
      : (
        <GallowsGame words={words} />
      )
  );
};

export default StartGallowsGame;
