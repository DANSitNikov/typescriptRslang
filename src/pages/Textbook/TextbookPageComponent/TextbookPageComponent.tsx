import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as querystring from 'querystring';
import style from './TextbookPageComponent.module.scss';
import TextbookWordComponent from '../TextbookWordComponent';
import checkDifficultWords, { Words } from '../../../utilities/checkDeletedAndDifficultWords';
import { getDeletedWords, getDifficultWords, getUserAuth } from '../../../selectors/selectors';
import Pagination from '../../../components/Pagination/Pagination';
import Games from '../Games/Games';
import miniGamesActions from '../../../actions/mniGameAction';
import Preloader from '../../../components/Preloader/Preloader';

interface Props {
  groupNumber: number
}

const TextbookPageComponent: React.FC<Props> = (props) => {
  const dataProps = props;
  const [wordsData, setWordData] = useState<Array<Words>>();
  const deletedWords = useSelector(getDeletedWords);
  const difficultWords = useSelector(getDifficultWords);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isThereWords, setIsThereWords] = useState<boolean>(true);
  const [type] = useState<string>('textbook');
  const isAuth = useSelector(getUserAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(miniGamesActions.setGamePage(pageNumber - 1));
    dispatch(miniGamesActions.setGameGroup(dataProps.groupNumber));
    dispatch(miniGamesActions.setGameFromDictionaryStatus(false));
    try {
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${dataProps.groupNumber}&page=${pageNumber - 1}`)
        .then((response) => response.json())
        .then((response) => setWordData(response));
    } catch (e) {
      throw new Error(e);
    }
  }, [pageNumber]);

  useEffect(() => {
    const parsed = querystring.parse(history.location.search.substr(1));
    if (parsed.pageNumber) setPageNumber(Number(parsed.pageNumber));
  }, []);

  useEffect(() => {
    history.push({
      pathname: `/textbook/${dataProps.groupNumber + 1}`,
      search: `pageNumber=${pageNumber}`,
    });
  }, [pageNumber, dataProps.groupNumber]);

  useEffect(() => {
    if (wordsData) {
      const setWords = wordsData.filter((el) => checkDifficultWords(deletedWords, el));
      if (setWords.length === 0) {
        setIsThereWords(false);
      } else {
        setIsThereWords(true);
      }
      dispatch(miniGamesActions.setWordsFromTextbook(setWords));
    }
  }, [deletedWords, pageNumber, dataProps.groupNumber, wordsData]);

  return (
    <>
      {
        wordsData
          ? (
            <div className={style.textbook_page_component}>
              {
                wordsData.map((item) => {
                  if (checkDifficultWords(deletedWords, item) ?? isAuth) {
                    return (
                      <div key={item.word}>
                        <TextbookWordComponent
                          word={item}
                          type="normal"
                          difficult={checkDifficultWords(difficultWords, item)}
                        />
                        <hr style={{ width: '100%' }} />
                      </div>
                    );
                  }
                  if (!isAuth) {
                    return (
                      <div key={item.word}>
                        <TextbookWordComponent
                          word={item}
                          type="normal"
                          difficult={checkDifficultWords(difficultWords, item)}
                        />
                        <hr style={{ width: '100%' }} />
                      </div>
                    );
                  }
                  return <div style={{ display: 'none' }} />;
                })
              }
              {
                !isThereWords
                  && (
                  <div className={style.noWords}>
                    <h4>???????? ??????!</h4>
                  </div>
                  )
              }
            </div>
          )
          : (
            <Preloader />
          )
      }
      {
        wordsData
        && (
        <>
          <Pagination setPageNumber={setPageNumber} length={600} />
          <Games type={type} />
        </>
        )
      }
    </>
  );
};

export default TextbookPageComponent;
