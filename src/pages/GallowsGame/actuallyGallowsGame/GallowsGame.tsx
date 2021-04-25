import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../../AudioGame/actuallyAudioGame/audioGame.module.scss';
import ActiveStageGallows from '../activeStage/ActiveStageGallows';
import ResultProgressBar from '../../../components/ResultPregressBar';
import GameResultWindow from '../../../components/GameResultWindow';
import FullScreenButtons from '../../../components/FullScreenButton/FullScreenButtons';
import backImage from '../../../assets/backgrounds/bg-gallows-game.svg';
import ControlAnswerVolumeButton from '../../../components/ControlAnswerVolumeButton';
import { Words } from '../../../utilities/checkDeletedAndDifficultWords';

interface Props {
  words: Array<Words>
}

const GallowsGame: React.FC<Props> = (props) => {
  const { words } = props;
  const [activeStage, setActiveStage] = useState(1);
  const [nextBtnStatus, setNextBtnStatus] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState<Array<Words>>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Array<Words>>([]);
  const [newGame, setNewGame] = useState(true);
  const [value] = useState(20);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);
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
          <h2 className={style.header}>Виселица</h2>
          {
            words && (
              <ActiveStageGallows
                word={words[activeStage - 1]}
                setCorrectAnswers={setCorrectAnswers}
                setWrongAnswers={setWrongAnswers}
                setNextBtnStatus={setNextBtnStatus}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                newGame={newGame}
                setNewGame={setNewGame}
                setActiveStage={setActiveStage}
                activeStage={activeStage}
                soundStatus={soundStatus}
              />
            )
          }
          <Button
            onClick={() => {
              setActiveStage(activeStage + 1);
              setNextBtnStatus(true);
              setNewGame(true);
            }}
            variant="warning"
            disabled={nextBtnStatus}
          >
            Дальше
          </Button>
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

export default GallowsGame;
