import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import style from './DictionaryPageComponent.module.scss';
import TextbookWordComponent from '../../TextbookWordComponent';
import checkDifficultWords from '../../../../utilities/checkDeletedAndDifficultWords';
import Pagination from '../../../../components/Pagination';
import miniGamesActions from '../../../../actions/mniGameAction';
import dictionaryActions from '../../../../actions/dictionaryAction';

const DictionaryPageComponent = (props) => {
  const {
    type, words, difficultWords, setPageNumber, length, topic,
  } = props;
  const dispatch = useDispatch();
  const [isThereWords, setIsThereWords] = useState(true);

  useEffect(() => {
    dispatch(miniGamesActions.setGameFromDictionaryStatus(true));
  }, []);

  useEffect(() => {
    dispatch(miniGamesActions.setWordsFromDictionary(words));
    dispatch(miniGamesActions.setGameGroup(topic - 1));
    dispatch(dictionaryActions.setType(type));
    if (words.length === 0) {
      setIsThereWords(false);
    } else {
      setIsThereWords(true);
    }
  }, [words]);

  return (
    <div className={style.page_component}>
      {
        words.map((word) => (
          <div key={word.id}>
            <TextbookWordComponent
              word={word}
              type={type}
              difficult={type === 'deletedWord' ? true : checkDifficultWords(difficultWords, word)}
            />
            <hr />
          </div>
        ))
      }
      {
        !isThereWords
        && (
          <div className={style.noWords}>
            <h4>Слов нет!</h4>
          </div>
        )
      }
      <Pagination setPageNumber={setPageNumber} length={length} />
    </div>
  );
};

DictionaryPageComponent.propTypes = {
  type: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  difficultWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPageNumber: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  topic: PropTypes.number.isRequired,
};

export default DictionaryPageComponent;
