import { Howl } from 'howler';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import correct from '../assets/sounds/correct-answer.mp3';
// @ts-ignore
import wrong from '../assets/sounds/wrong-answer.mp3';

const playAnswerSound = (status: boolean) => {
  if (status) {
    return new Howl({
      src: correct,
    });
  }

  return new Howl({
    src: wrong,
  });
};

export default playAnswerSound;
