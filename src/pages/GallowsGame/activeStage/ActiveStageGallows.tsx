import React, { useEffect, useState } from 'react';
import hangmanOne from '../../../assets/images/hangman/Hangman-0.png';
import hangmanTwo from '../../../assets/images/hangman/Hangman-1.png';
import hangmanThree from '../../../assets/images/hangman/Hangman-2.png';
import hangmanFour from '../../../assets/images/hangman/Hangman-3.png';
import hangmanFive from '../../../assets/images/hangman/Hangman-4.png';
import hangmanSix from '../../../assets/images/hangman/Hangman-5.png';
import hangmanSeven from '../../../assets/images/hangman/Hangman-6.png';
import Keyboard from '../Keyboard';
import Answers from '../activeStageAnswers/Answers';
import style from './activeStage.module.scss';
import { Words } from '../../../utilities/checkDeletedAndDifficultWords';

interface Props {
  word: Words,
  setNextBtnStatus: (bool: boolean) => void
  newGame: boolean
  setNewGame: (bool: boolean) => void
  setCorrectAnswers: (arr: Array<Words>) => void
  setWrongAnswers: (arr: Array<Words>) => void
  correctAnswers: Array<Words>
  wrongAnswers: Array<Words>
  activeStage: number
  setActiveStage: (num: number) => void
  soundStatus: boolean
}

const ActiveStageGallows: React.FC<Props> = React.memo((props) => {
  const {
    word, setNextBtnStatus, newGame,
    setNewGame, setCorrectAnswers, setWrongAnswers,
    correctAnswers, wrongAnswers, setActiveStage, activeStage,
    soundStatus,
  } = props;
  const [maxMistakes] = useState<number>(7);
  const [mistakesCounter, setMistakesCounter] = useState<number>(0);
  const [checkedLetters, setCheckedLetters] = useState<Array<number>>([]);
  const [wrong, setWrong] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  const images = [
    hangmanOne, hangmanTwo, hangmanThree,
    hangmanFour, hangmanFive, hangmanSix,
    hangmanSeven,
  ];

  useEffect(() => {
    if (checkedLetters.length === word.word.length) {
      setNextBtnStatus(false);
      setNewGame(false);
      setCorrect(true);
      setCorrectAnswers([...correctAnswers, word]);
    }
  }, [checkedLetters]);

  useEffect(() => {
    if (newGame === true) {
      setCheckedLetters([]);
      setCorrect(false);
      setWrong(false);
      setMistakesCounter(0);
    }
  }, [newGame]);

  useEffect(() => {
    if ((maxMistakes - 1) === mistakesCounter) {
      setNextBtnStatus(false);
      setNewGame(false);
      setWrong(true);
      setWrongAnswers([...wrongAnswers, word]);
    }
  }, [mistakesCounter]);

  return (
    <div className={style.wrapper}>
      <div>
        <div className={style.images}>
          <div className={style.guess}>
            <img className={style.imageGuess} src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="" />
            <div className={style.wordToGuess}>
              <p>{word.wordTranslate}</p>
            </div>
          </div>
          <img className={style.gallows} src={images[mistakesCounter]} alt="hangman" />
        </div>
        <div className={style.mistakes}>
          <span>
            max mistakes:
            {maxMistakes - 1}
          </span>
          <span>
            mistakes:
            {mistakesCounter}
          </span>
        </div>
        <Answers
          word={word.word}
          checkedLetters={checkedLetters}
          correct={correct}
          wrong={wrong}
        />
        <Keyboard
          mistakesCounter={mistakesCounter}
          word={word.word}
          setMistakesCounter={setMistakesCounter}
          setCheckedLetters={setCheckedLetters}
          checkedLetters={checkedLetters}
          newGame={newGame}
          setNextBtnStatus={setNextBtnStatus}
          setNewGame={setNewGame}
          setActiveStage={setActiveStage}
          activeStage={activeStage}
          soundStatus={soundStatus}
        />
      </div>
    </div>
  );
});

export default ActiveStageGallows;
