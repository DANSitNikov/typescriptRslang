import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';
import style from './activeStage.module.scss';
import playAnswerSound from '../../../utilities/audioPlayer';
import { Words } from '../../../utilities/checkDeletedAndDifficultWords';

interface Props {
  word: Words
  fakeWords: Array<Words>
  correct: string
  setCorrectOrNot: (str: string) => void
  setNextBtnStatus: (bool: boolean) => void
  setCorrectAnswers: (arr: Array<Words>) => void
  setWrongAnswers: (arr: Array<Words>) => void
  wrongAnswers: Array<Words>
  correctAnswers: Array<Words>
  setActiveStage: (num: number) => void
  activeStage: number
  soundStatus: boolean
}

const ActiveStage: React.FC<Props> = React.memo((props) => {
  const {
    word, fakeWords, correct, setCorrectOrNot,
    setNextBtnStatus, setCorrectAnswers, setWrongAnswers,
    wrongAnswers, correctAnswers, setActiveStage,
    activeStage, soundStatus,
  } = props;
  const [randomNumber, setRandomNumber] = useState<number>();
  const textEx = useRef<HTMLParagraphElement | null>(null);
  const correctAnswerRef = useRef<HTMLButtonElement | null>(null);
  const wordSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audio}`,
  });
  const wordExampleSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioExample}`,
  });

  useEffect(() => {
    const random = Math.floor(Math.random() * 5);
    setRandomNumber(random);
    fakeWords.splice(random, 0, word);
    wordSound.play();
  }, [word]);

  useEffect(() => {
    if (correct !== 'default') {
      if (textEx.current) textEx.current.innerHTML = word.textExample;
    }
  }, [correct]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (correct === 'right' || correct === 'wrong') {
        if (event.key === 'Enter') {
          setActiveStage(activeStage + 1);
          setNextBtnStatus(false);
          setCorrectOrNot('default');
        }
      } else if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5') {
        if ((Number(event.key) - 1) === randomNumber) {
          setCorrectOrNot('right');
          setNextBtnStatus(true);
          setCorrectAnswers([...correctAnswers, word]);
          if (soundStatus) playAnswerSound(true).play();
        } else {
          setCorrectOrNot('wrong');
          setNextBtnStatus(true);
          setWrongAnswers([...wrongAnswers, word]);
          if (soundStatus) playAnswerSound(false).play();
        }
      } else if (event.key === 'Enter') {
        setCorrectOrNot('wrong');
        setNextBtnStatus(true);
        setWrongAnswers([...wrongAnswers, word]);
        if (soundStatus) playAnswerSound(false).play();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  const renderButtons = fakeWords.map((el, i) => {
    if (el.word === word.word) {
      return (
        <Button
          key={word.word}
          ref={correctAnswerRef}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          className={(correct !== 'default' ? style.rightAnswer : null)}
          onClick={() => {
            setCorrectOrNot('right');
            setNextBtnStatus(true);
            setCorrectAnswers([...correctAnswers, word]);
            if (soundStatus) playAnswerSound(true).play();
          }}
          variant="outline-light"
          disabled={(correct !== 'default')}
        >
          {i + 1}
          .
          {word.wordTranslate}
        </Button>
      );
    }
    return (
      <Button
        key={fakeWords[i].word}
        onClick={() => {
          setCorrectOrNot('wrong');
          setNextBtnStatus(true);
          setWrongAnswers([...wrongAnswers, word]);
          if (soundStatus) playAnswerSound(false).play();
        }}
        variant="outline-light"
        disabled={(correct !== 'default')}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        className={(correct !== 'default' ? style.wrongAnswer : null)}
      >
        {i + 1}
        .
        {fakeWords[i].wordTranslate}
      </Button>
    );
  });

  return (
    <div>
      {correct === 'default' && (
        <div className={style.soundIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            fill="white"
            className="bi bi-volume-up-fill"
            viewBox="0 0 16 16"
            onClick={() => {
              wordSound.play();
            }}
          >
            <path
              d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
            />
            <path
              d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
            />
            <path
              d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
            />
          </svg>
        </div>
      )}
      {
        (correct === 'right' || correct === 'wrong') && (
          <div>
            <img className={style.image} src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="" />
            <div className={style.wordSoundWrapper}>
              <div className={style.soundIconSmall}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    wordSound.play();
                  }}
                >
                  <path
                    d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                  />
                  <path
                    d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                  />
                  <path
                    d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                </svg>
              </div>
              <p>{word.word}</p>
              <p>{word.transcription}</p>
            </div>
            <div className={style.textSoundWrapper}>
              <div className={style.soundIconSmall}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    wordExampleSound.play();
                  }}
                >
                  <path
                    d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                  />
                  <path
                    d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                  />
                  <path
                    d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                  />
                </svg>
              </div>
              <p className={style.textExample} ref={textEx}>no</p>
            </div>
          </div>
        )
      }
      <div className={style.chooseAnswer}>
        {renderButtons}
      </div>
    </div>
  );
});

export default ActiveStage;
