import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import AudioGame from './actuallyAudioGame/AudioGame';
import style from './actuallyAudioGame/audioGame.module.scss';
import getWords from '../../commonFunctions/getData';

const StartAudioGame = () => {
  const [words, setWords] = useState(null);
  const [fakeWords, setFakeWords] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch('https://newrslangapi.herokuapp.com/words')
      .then((response) => response.json())
      .then((response) => setWords(response));

    setFakeWords(getWords());
  }, []);

  return (
    !startGame
      ? (
        <div className={style.wrapper}>
          <h2 className={style.header}>АУДИОВЫЗОВ</h2>
          <h4>Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода.</h4>
          <p>
            Вы слышите слово и видите 5 вариантов перевода.
            Выбрать правильный ответ можно двумя способами:
          </p>
          <p>1. Кликните по нему мышью;</p>
          <p>2. Используйте клавиши 1, 2, 3, 4, 5.</p>
          {
      (words && fakeWords
        ? <Button onClick={() => setStartGame(true)} variant="primary">Начать игру</Button>
        : (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        ))
    }
        </div>
      )
      : (
        <AudioGame words={words} fakeWords={fakeWords} />
      )
  );
};

export default StartAudioGame;
