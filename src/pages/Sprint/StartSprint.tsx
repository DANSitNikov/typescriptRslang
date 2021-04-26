import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PresentComponent from '../../components/PresentComponent';
import Sprint from './actuallySprintGame';
import backImage from '../../assets/backgrounds/bg-sprint-game.svg';
import footerActions from '../../actions/footerAction';
import { getWords } from '../../utilities/getData';
import {
  getGameFromTextbookStatus,
  getGameGroupNumber,
  getGamePageNumber,
  getMiniGameLevel,
} from '../../selectors/selectors';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

const StartSprintGame: React.FC = () => {
  const [words, setWords] = useState<Array<Words>>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const level = useSelector(getMiniGameLevel);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const pageNumber = useSelector(getGamePageNumber);
  const groupNumber = useSelector(getGameGroupNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    (
      async () => {
        let page;
        let currentLevel = level;

        if (textbookStatus) {
          page = pageNumber;
          if (groupNumber) currentLevel = groupNumber + 1;
        } else {
          page = Math.floor(Math.random() * 30);
          // currentLevel = level;
        }

        const data = await getWords(currentLevel, page, 10);
        setWords(data.flat().sort(() => Math.random() - 0.5));
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
          gameName="Спринт"
          gameDescription="Мини-игра «Спринт» - это тренировка для повторения заученных слов из вашего словаря."
          gameRules="После запуска игры вы увидите слово и перевод. Вам нужно выбрать, правильно это или неправильно."
          gameOpportunityOne="1. Используйте мышь, чтобы выбрать."
          gameOpportunityTwo="2. Используйте клавиши влево и вправо."
          back={backImage}
          fakeWords={[{ fake: true }]}
        />
      )
      : (
        <Sprint words={words} />
      )
  );
};

export default StartSprintGame;
