import React, { SetStateAction } from 'react';
import { Words } from '../utilities/checkDeletedAndDifficultWords';

export interface CommonProp {
  topic: number
  words: Array<Words>
  type: string,
  difficultWords: Array<Words> | Array<Record<string, never>>
  setPageNumber: React.Dispatch<SetStateAction<number>>
}

interface Props {
  pageNumber: number
}

export interface ReturnComponent {
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
