import React, {
  MouseEventHandler,
  Ref, RefObject, useEffect, useRef, useState,
} from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './Keyboard.module.scss';
import playAnswerSound from '../../../utilities/audioPlayer';

interface Props {
  mistakesCounter: number,
  word: string,
  setMistakesCounter: (num: number) => void
  setCheckedLetters: (arr: Array<number>) => void
  checkedLetters: Array<number>
  newGame: boolean
  setNewGame: (bool: boolean) => void
  setNextBtnStatus: (bool: boolean) => void
  setActiveStage: (num: number) => void
  activeStage: number
  soundStatus: boolean
}

const Keyboard: React.FC<Props> = (props) => {
  const {
    mistakesCounter, word, setMistakesCounter,
    setCheckedLetters, checkedLetters, newGame,
    setNewGame, setNextBtnStatus, setActiveStage,
    activeStage, soundStatus,
  } = props;
  const [disabledButtons, setDisabledButtons] = useState<Array<string>>([]);
  const buttonsRefs = useRef<Array<RefObject<HTMLButtonElement | null>>>([]);
  const letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ];

  buttonsRefs.current = letters.map(() => React.createRef());

  const checkLetter = (event: React.MouseEvent<HTMLInputElement>): void => {
    const target = event.target! as HTMLButtonElement;
    const letter = target.innerHTML;
    target.disabled = true;
    setDisabledButtons([...disabledButtons, target.innerText]);

    if (word.toLowerCase().includes(letter)) {
      const addToCheck = [];
      for (let i = 0; i < word.length; i += 1) {
        if (word[i].toLowerCase() === letter) {
          addToCheck.push(i);
        }
      }
      if (soundStatus) playAnswerSound(true).play();
      setCheckedLetters([...checkedLetters, ...addToCheck]);
    } else {
      if (soundStatus) playAnswerSound(false).play();
      if (mistakesCounter === 6) {
        setMistakesCounter(mistakesCounter);
      } else {
        setMistakesCounter(mistakesCounter + 1);
      }
    }
  };

  useEffect(() => {
    let disableKey = false;

    const keyDownHandler = (event: KeyboardEvent) => {
      if (letters.some((el) => el === event.key)) {
        disableKey = !!disabledButtons.join('').toLowerCase().match(event.key);

        for (let i = 0; i < buttonsRefs.current.length; i += 1) {
          if (buttonsRefs.current[i]!.current!.innerText.toLowerCase() === event.key) {
            buttonsRefs.current[i]!.current!.disabled = true;
            break;
          }
        }

        if (!disableKey) {
          if (word.toLowerCase().includes(event.key.toLowerCase())) {
            const addToCheck = [];
            for (let i = 0; i < word.length; i += 1) {
              if (word[i].toLowerCase() === event.key.toLowerCase()) {
                addToCheck.push(i);
              }
            }
            if (soundStatus) playAnswerSound(true).play();
            setCheckedLetters([...checkedLetters, ...addToCheck]);
          } else {
            if (soundStatus) playAnswerSound(false).play();
            if (mistakesCounter === 6) {
              setMistakesCounter(mistakesCounter);
            } else {
              setMistakesCounter(mistakesCounter + 1);
            }
          }
          setDisabledButtons([...disabledButtons, event.key]);
        }
      } else if (event.key === 'Enter') {
        if (!newGame) {
          setActiveStage(activeStage + 1);
          setNextBtnStatus(true);
          setNewGame(true);
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  useEffect(() => {
    if (!newGame) {
      setDisabledButtons(letters);
    } else {
      setDisabledButtons([]);
    }
  }, [newGame]);

  return (
    <div className={style.keyboardWrapper}>
      <div className={style.keyboard}>
        {letters.map((letter, i) => (
          <Button
            ref={buttonsRefs.current[i] as Ref<HTMLButtonElement> | null}
            key={letter}
            className={style.keyboard_button}
            onClick={checkLetter}
            disabled={!newGame}
            variant="info"
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
