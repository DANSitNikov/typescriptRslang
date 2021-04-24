import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import savannaSrc from '../../assets/backgrounds/bg-savanna-game.svg';
import sprintSrc from '../../assets/backgrounds/bg-sprint-game.svg';
import gallowsSrc from '../../assets/backgrounds/bg-gallows-game.svg';
import audioSrc from '../../assets/backgrounds/bg-audiocall-game.svg';
import style from './miniGames.module.scss';
import ChooseLevel from './ChooseLevel/ChooseLevel';
import footerActions from '../../actions/footerAction';
import miniGamesActions from '../../actions/mniGameAction';

const MiniGames = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [link, setLink] = useState('none');
  const dispatch = useDispatch();
  const savanna = useRef();
  const sprint = useRef();
  const gallows = useRef();
  const audioCall = useRef();

  useEffect(() => {
    savanna.current.style.backgroundImage = `url('${savannaSrc}')`;
    sprint.current.style.backgroundImage = `url('${sprintSrc}')`;
    gallows.current.style.backgroundImage = `url('${gallowsSrc}')`;
    audioCall.current.style.backgroundImage = `url('${audioSrc}')`;

    const keyDownEvent = (event) => {
      if (event.key === 'Escape') {
        document.body.style.overflow = 'auto';
        setShowPopup(false);
      }
    };
    dispatch(footerActions.toggleShowStatus(true));
    document.addEventListener('keydown', keyDownEvent);
    dispatch(miniGamesActions.setGameFromTextbookStatus(false));
    return () => {
      document.removeEventListener('keydown', keyDownEvent);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={style.miniGames}>
      <div
        className={style.gameWrapper}
        onClick={() => {
          setShowPopup(true);
          setLink('sprint-game');
        }}
      >
        <div ref={sprint} className={style.game}>
          <h4>Спринт</h4>
        </div>
      </div>
      <div
        className={style.gameWrapper}
        onClick={() => {
          setShowPopup(true);
          setLink('audio-game');
        }}
      >
        <div ref={audioCall} className={style.game}>
          <h4>Аудиовызов</h4>
        </div>
      </div>
      <div
        className={style.gameWrapper}
        onClick={() => {
          setShowPopup(true);
          setLink('gallows-game');
        }}
      >
        <div ref={gallows} className={style.game}>
          <h4>Виселица</h4>
        </div>
      </div>
      <div
        className={style.gameWrapper}
        onClick={() => {
          setShowPopup(true);
          setLink('savanna-game');
        }}
      >
        <div ref={savanna} className={style.game}>
          <h4>Саванна</h4>
        </div>
      </div>
      {showPopup
      && <ChooseLevel link={link} setShowPopup={setShowPopup} />}
    </div>
  );
};

export default MiniGames;
