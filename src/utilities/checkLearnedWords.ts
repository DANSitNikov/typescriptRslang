import { Words } from './checkDeletedAndDifficultWords';

function checkLearnedWords(learnedWords: Array<Words>, resultWords: Array<Words>) {
  const result = [];

  if (learnedWords.length === 0) return resultWords;

  for (let i = 0; i < resultWords.length; i += 1) {
    let check = true;
    for (let j = 0; j < learnedWords.length; j += 1) {
      if (learnedWords[j].word === resultWords[i].word) {
        check = false;
        j = learnedWords.length;
      }
    }
    if (check) result.push(resultWords[i]);
  }

  return result;
}

export default checkLearnedWords;
