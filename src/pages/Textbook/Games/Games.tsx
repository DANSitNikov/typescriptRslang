import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import savannaSrc from '../../../assets/backgrounds/bg-savanna-game.svg';
import sprintSrc from '../../../assets/backgrounds/bg-sprint-game.svg';
import gallowsSrc from '../../../assets/backgrounds/bg-gallows-game.svg';
import audioSrc from '../../../assets/backgrounds/bg-audiocall-game.svg';
import style from './games.module.scss';
import { getGameWordsFromDict, getGameWordsFromTextbook } from '../../../selectors/selectors';
/* eslint-disable no-nested-ternary */

interface Props {
  type: string
}

const Games: React.FC<Props> = (props) => {
  const { type } = props;
  const savanna = useRef<HTMLDivElement | null>(null);
  const sprint = useRef<HTMLDivElement | null>(null);
  const gallows = useRef<HTMLDivElement | null>(null);
  const audioCall = useRef<HTMLDivElement | null>(null);
  const wordsFromDictionary = useSelector(getGameWordsFromDict);
  const wordsFromTextbook = useSelector(getGameWordsFromTextbook);

  useEffect(() => {
    if (savanna.current) {
      if (savanna.current) savanna.current.style.backgroundImage = `url('${savannaSrc}')`;
      if (sprint.current) sprint.current.style.backgroundImage = `url('${sprintSrc}')`;
      if (gallows.current) gallows.current.style.backgroundImage = `url('${gallowsSrc}')`;
      if (audioCall.current) audioCall.current.style.backgroundImage = `url('${audioSrc}')`;
    }
  }, [wordsFromTextbook, wordsFromDictionary]);

  return (
    wordsFromTextbook && wordsFromTextbook.length && type === 'textbook'
      ? (
        <div className={style.miniGames}>
          <Link
            className={style.gameWrapper}
            to="/sprint-game"
          >
            <div ref={sprint} className={style.game}>
              <h4>Спринт</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/audio-game"
          >
            <div ref={audioCall} className={style.game}>
              <h4>Аудиовызов</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/gallows-game"
          >
            <div ref={gallows} className={style.game}>
              <h4>Виселица</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/savanna-game"
          >
            <div ref={savanna} className={style.game}>
              <h4>Саванна</h4>
            </div>
          </Link>
        </div>
      )
      : wordsFromDictionary && wordsFromDictionary.length && (type === 'deletedWord' || type === 'hardWord') ? (
        <div className={style.miniGames}>
          <Link
            className={style.gameWrapper}
            to="/sprint-game"
          >
            <div ref={sprint} className={style.game}>
              <h4>Спринт</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/audio-game"
          >
            <div ref={audioCall} className={style.game}>
              <h4>Аудиовызов</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/gallows-game"
          >
            <div ref={gallows} className={style.game}>
              <h4>Виселица</h4>
            </div>
          </Link>
          <Link
            className={style.gameWrapper}
            to="/savanna-game"
          >
            <div ref={savanna} className={style.game}>
              <h4>Саванна</h4>
            </div>
          </Link>
        </div>
      )
        : (
          <></>
        )
  );
};

export default Games;
