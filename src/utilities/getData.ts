import { Words } from './checkDeletedAndDifficultWords';

export const getFakeWords = (
  level: number| null, page: number | null, count: number,
): Promise<Array<Words>> => {
  const numbers: Array<number> = [];
  let wordsLevel;

  if (level !== 6) {
    wordsLevel = level! + 1;
  } else {
    wordsLevel = level - 1;
  }

  for (let i = 0; i < count; i += 1) {
    const number = Math.floor(Math.random() * 30);
    if (number === page || numbers.includes(number)) {
      i -= 1;
    } else {
      numbers.push(number);
    }
  }

  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${wordsLevel - 1}&page=${numbers[i]}`)
        .then((response) => response.json()),
    );
  }

  return Promise.all([...promises]);
};

export const getWords = (
  level: number | null, page: number | null, count: number,
): Promise<Array<Words>> => {
  const promises = [];
  const numbers: Array<number> = [];
  console.log(level, 'evel');

  if (count !== 1) {
    for (let i = 0; i < count; i += 1) {
      const number = Math.floor(Math.random() * 30);
      if (numbers.includes(number)) {
        i -= 1;
      } else {
        numbers.push(number);
      }
    }

    for (let i = 0; i < count; i += 1) {
      promises.push(
        fetch(`https://newrslangapi.herokuapp.com/words/?group=${level! - 1}&page=${numbers[i]}`)
          .then((response) => response.json()),
      );
    }
  } else {
    return Promise.all([
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${level! - 1}&page=${page}`)
        .then((response) => response.json()),
    ]);
  }

  return Promise.all([...promises]);
};
