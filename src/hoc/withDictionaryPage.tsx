import React from 'react';
import { Words } from '../utilities/checkDeletedAndDifficultWords';

interface CommonProp {
  topic: number
  words: Array<Words>
  type: string,
  difficultWords: Array<Words>
  setPageNumber: () => void
}

interface Props {
  pageNumber: number
}

interface ReturnComponent {
  length: number
}

const withDictionaryPage = (Component: React.ComponentType<ReturnComponent & CommonProp>) => {
  function DictionaryPage(props: Props & CommonProp): JSX.Element {
    const {
      topic, words, type, difficultWords,
      pageNumber, setPageNumber,
    } = props;

    const wordsToShow = [...words].filter((word) => word.group === (topic - 1));
    let wordsToShowSlice;
    if (type === 'learnedWords') {
      wordsToShowSlice = words.slice((pageNumber - 1) * 20, pageNumber * 20);
    } else {
      wordsToShowSlice = wordsToShow.slice((pageNumber - 1) * 20, pageNumber * 20);
    }

    const length: number = type === 'learnedWords' ? words.length : wordsToShow.length;

    return (
      <Component
        words={wordsToShowSlice}
        type={type}
        difficultWords={difficultWords}
        setPageNumber={setPageNumber}
        length={length}
        topic={topic}
      />
    );
  }

  return DictionaryPage;
};

export default withDictionaryPage;
