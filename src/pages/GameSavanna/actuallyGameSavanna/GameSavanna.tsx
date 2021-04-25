import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import style from './GameSavanna.module.scss';
import GameResultWindow from '../../../components/GameResultWindow';
import playAnswerSound from '../../../utilities/audioPlayer';
import ResultProgressBar from '../../../components/ResultPregressBar';
import FullScreenButtons from '../../../components/FullScreenButton/FullScreenButtons';
import ControlAnswerVolumeButton from '../../../components/ControlAnswerVolumeButton';
import HealthBar from '../../../components/HealthBar';
import { Words } from '../../../utilities/checkDeletedAndDifficultWords';

interface Props {
  words: Array<Words>
  fakeWords: Array<Words>
}

const GameSavanna: React.FC<Props> = (props) => {
  const { words, fakeWords } = props;
  const [wordCounter, setWordCounter] = useState<number>(0);
  const [backgroundPosition, setBackgroundPosition] = useState<number>(100);
  const [currentWord, setCurrentWord] = useState<Words>(words[wordCounter]);
  const [currentWordAnswers, setCurrentWordAnswers] = useState<Array<Words>>([]);
  const [health, setHealth] = useState<Array<number>>([1, 2, 3, 4, 5]);
  const [answerBtnsState, setAnswerBtnsState] = useState<boolean>(true);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<Array<Words>>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Array<Words>>([]);
  const [fullScreenStatus, setFullScreenStatus] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<boolean>(true);
  const [value] = useState(5);
  const failTimerRef = useRef<any | null>(null);
  const currentWordRef = useRef<HTMLDivElement | null>(null);
  const gameWindow = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLHeadingElement | null>(null);
  const headerOpacityTimerRef = useRef<any | null>(null);

  const chooseWordsForAnswers = () => {
    const answers = [currentWord];
    answers.push(fakeWords[wordCounter * 3]);
    answers.push(fakeWords[wordCounter * 3 + 1]);
    answers.push(fakeWords[wordCounter * 3 + 2]);
    setCurrentWordAnswers(answers.sort(() => Math.random() - 0.5));
  };

  const isGameOver = () => {
    if (health.length === 0 || wordCounter >= words.length) {
      setIsGameFinished(true);
      clearTimeout(failTimerRef.current);
    }
  };

  useEffect(() => {
    words.sort(() => Math.random() - 0.5);
    return () => {
      clearTimeout(failTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isGameFinished) {
      return;
    }
    chooseWordsForAnswers();
    setTimeout(() => {
      currentWordRef.current!.className = `${style.game_current_word} ${style.game_current_word_active}`;
      setAnswerBtnsState(true);
    }, 100);
  }, [currentWord]);

  const onCorrectAnswerClick = () => {
    setCorrectAnswers([...correctAnswers, currentWord]);
    if (backgroundPosition !== 0) {
      if (backgroundPosition - 100 / words.length < 0) {
        setBackgroundPosition(0);
      } else {
        setBackgroundPosition(backgroundPosition - 100 / words.length);
      }
    }
  };

  const onAnswerClickHandler = (word: Words) => {
    if (!answerBtnsState) {
      return;
    }

    if (word.wordTranslate === currentWord.wordTranslate) {
      if (wordCounter < words.length) {
        currentWordRef.current!.className = `${style.game_current_word}`;
        setWordCounter(wordCounter + 1);
        onCorrectAnswerClick();
        if (soundStatus) playAnswerSound(true).play();
      } else {
        setIsGameFinished(true);
        clearTimeout(failTimerRef.current);
      }
    } else {
      setHealth(health.slice(0, -1));
      currentWordRef.current!.className = `${style.game_current_word}`;
      setWordCounter(wordCounter + 1);
      if (soundStatus) playAnswerSound(false).play();
      setWrongAnswers([...wrongAnswers, currentWord]);
    }
  };

  useEffect(() => {
    isGameOver();
    if (isGameFinished) {
      return;
    }
    setCurrentWord(words[wordCounter]);
  }, [wordCounter, isGameFinished]);

  useEffect(() => {
    if (isGameFinished) {
      return;
    }

    header.current!.style.opacity = '0.2';
    if (headerOpacityTimerRef.current) {
      headerOpacityTimerRef.current = setTimeout(() => {
        header.current!.style.opacity = '1';
      }, 1700);
    }

    failTimerRef.current = setTimeout(() => {
      currentWordRef.current!.className = `${style.game_current_word} ${style.game_current_word_fail}`;
      setHealth(health.slice(0, -1));
      if (soundStatus) playAnswerSound(false).play();
      setAnswerBtnsState(false);
      setWrongAnswers([...wrongAnswers, currentWord]);
      setTimeout(() => {
        currentWordRef.current!.className = `${style.game_current_word}`;
        setWordCounter(wordCounter + 1);
      }, 500);
    }, 4200);

    return () => {
      clearTimeout(failTimerRef.current);
      clearTimeout(headerOpacityTimerRef.current);
    };
  }, [currentWord]);

  useEffect(() => {
    if (!isGameFinished) {
      const keyDownHandler = (event: KeyboardEvent) => {
        switch (event.key) {
          case '1':
            onAnswerClickHandler(currentWordAnswers[0]);
            break;
          case '2':
            onAnswerClickHandler(currentWordAnswers[1]);
            break;
          case '3':
            onAnswerClickHandler(currentWordAnswers[2]);
            break;
          case '4':
            onAnswerClickHandler(currentWordAnswers[3]);
            break;
          default:
        }
        // clearTimeout(failTimerRef.current);
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => document.removeEventListener('keydown', keyDownHandler);
    }
  });

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreenStatus(false);
      }
    });
  }, []);

  const onFullscreenBtnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreenStatus(false);
    } else {
      gameWindow.current!.requestFullscreen().catch((e) => console.log(e));
      setFullScreenStatus(true);
    }
  };

  return (
    isGameFinished
      ? (
        <GameResultWindow
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
      )
      : (
        <div ref={gameWindow} className={`${style.game} ${style.game_savanna} game`} style={{ backgroundPositionY: `${backgroundPosition}%` }}>
          <ControlAnswerVolumeButton soundStatus={soundStatus} setSoundStatus={setSoundStatus} />

          <HealthBar lives={health.length} />

          <FullScreenButtons
            fullScreenStatus={fullScreenStatus}
            onFullscreenBtnClick={onFullscreenBtnClick}
          />

          <div
            ref={currentWordRef}
            className={style.game_current_word}
          >
            {currentWord.word}
          </div>

          <div className={style.contentBody}>
            <h2 ref={header} className={style.header}>Саванна</h2>
            <div className={style.game_finish_line} />
            <div className={style.buttonsWrapper}>
              <div className={style.game_answers_block}>
                {currentWordAnswers.length > 0
                  ? (currentWordAnswers.map((item, i) => (
                    <Button
                      key={item.wordTranslate}
                      className={style
                        .game_btn}
                      onClick={() => onAnswerClickHandler(item)}
                      variant="outline-light"
                    >
                      {i + 1}
                      .
                      {item.wordTranslate}
                    </Button>
                  )))
                  : null}
              </div>
              <ResultProgressBar
                correct={correctAnswers.length}
                wrong={wrongAnswers.length}
                value={value}
              />
            </div>
          </div>
        </div>
      )
  );
};

export default GameSavanna;
