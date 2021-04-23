import { Howl } from 'howler';

const correct = require('../assets/sounds/correct-answer.mp3');
const wrong = require('../assets/sounds/wrong-answer.mp3');

const playAnswerSound = (status: boolean) => {
  if (status) {
    return new Howl({
      src: correct.default,
    });
  }

  return new Howl({
    src: wrong.default,
  });
};

export default playAnswerSound;
