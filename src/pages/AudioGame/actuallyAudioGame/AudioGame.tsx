import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ActiveStage from '../activeStage/ActiveStage';
import style from './audioGame.module.scss';
import GameResultWindow from '../../../components/GameResultWindow';
import playAnswerSound from '../../../utilities/audioPlayer';
import ResultProgressBar from '../../../components/ResultPregressBar';
import FullScreenButtons from '../../../components/FullScreenButton';
import backImage from '../../../assets/backgrounds/bg-audiocall-game.svg';
import ControlAnswerVolumeButton from '../../../components/ControlAnswerVolumeButton';
import { Words } from '../../../utilities/checkDeletedAndDifficultWords';

interface Props {
  words: Array<Words>
  fakeWords: Array<Words>
}

const AudioGame: React.FC<Props> = (props) => {
  const { words, fakeWords } = props;
  const [activeStage, setActiveStage] = useState<number>(1);
  const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
  const [correct, setCorrectOrNot] = useState<string>('default');
  const [correctAnswers, setCorrectAnswers] = useState<Array<Words>>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Array<Words>>([]);
  const [value] = useState<number>(5);
  const [fullScreenStatus, setFullScreenStatus] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<boolean>(true);
  const [currentFakeWords] = useState(() => {
    const result = [];
    for (let i = 0; i < 20; i += 1) {
      result.push(
        [fakeWords[i * 4], fakeWords[i * 4 + 1],
          fakeWords[i * 4 + 2], fakeWords[i * 4 + 3]],
      );
    }
    return result;
  });
  const gameWindow = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setFullScreenStatus(false);
      }
    });
    gameWindow.current!.style.background = `url(${backImage})`;
    gameWindow.current!.style.backgroundSize = 'cover';
    gameWindow.current!.style.backgroundPosition = 'bottom';
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
    activeStage !== words.length + 1
      ? (
        <div ref={gameWindow} className={style.wrapper}>
          <h2 className={style.header}>Аудиовызов</h2>
          {
            words && fakeWords && (
              <ActiveStage
                word={words[activeStage - 1]}
                fakeWords={currentFakeWords[activeStage - 1]}
                correct={correct}
                setCorrectOrNot={setCorrectOrNot}
                setCorrectAnswers={setCorrectAnswers}
                setWrongAnswers={setWrongAnswers}
                setNextBtnStatus={setNextBtnStatus}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                soundStatus={soundStatus}
              />
            )
          }
          {
            !nextBtnStatus && (
              <Button
                onClick={() => {
                  setNextBtnStatus(true);
                  setCorrectOrNot('wrong');
                  setWrongAnswers([...wrongAnswers, words[activeStage - 1]]);
                  playAnswerSound(false).play();
                }}
                variant="warning"
                className={style.nextOrUnknown}
              >
                Не знаю
              </Button>
            )
          }
          {
            nextBtnStatus && (
              <Button
                onClick={() => {
                  setActiveStage(activeStage + 1);
                  setNextBtnStatus(false);
                  setCorrectOrNot('default');
                }}
                variant="warning"
                className={style.nextOrUnknown}
              >
                Дальше
              </Button>
            )
          }
          <ResultProgressBar
            correct={correctAnswers.length}
            wrong={wrongAnswers.length}
            value={value}
          />
          <ControlAnswerVolumeButton soundStatus={soundStatus} setSoundStatus={setSoundStatus} />
          <FullScreenButtons
            fullScreenStatus={fullScreenStatus}
            onFullscreenBtnClick={onFullscreenBtnClick}
          />
        </div>
      )
      : (
        <div>
          <GameResultWindow
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />
        </div>
      )
  );
};

export default AudioGame;
