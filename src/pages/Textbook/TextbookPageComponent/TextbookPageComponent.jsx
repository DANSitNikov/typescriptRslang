import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './TextbookPageComponent.module.scss';
import TextbookWordComponent from '../TextbookWordComponent';
import checkDifficultWords from '../../../utilities/checkDeletedAndDifficultWords';
import { getDeletedWords, getDifficultWords } from '../../../selectors/selectors';
import Pagination from '../../../components/Pagination/Pagination';

const TextbookPageComponent = (props) => {
  const dataProps = props;
  const [wordsData, setWordData] = useState();
  const deletedWords = useSelector(getDeletedWords);
  const difficultWords = useSelector(getDifficultWords);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    try {
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${dataProps.groupNumber}&page=${pageNumber - 1}`)
        .then((response) => response.json())
        .then((response) => setWordData(response));
    } catch (e) {
      console.log(e);
    }
  }, [pageNumber]);

  return (
    <>
      {
        wordsData
          ? (
            <div className={style.textbook_page_component}>
              {
                wordsData.map((item, index) => {
                  if (checkDifficultWords(deletedWords, item)) {
                    return (
                      <>
                        <TextbookWordComponent
                          word={item}
                          type="normal"
                          key={item.word}
                          difficult={checkDifficultWords(difficultWords, item)}
                        />
                        {
                          index !== wordsData.length - 1
                            ? <br />
                            : null
                        }
                      </>
                    );
                  }
                  return <div style={{ display: 'none' }} />;
                })
              }
            </div>
          )
          : ('...загрузка...')
      }
      <Pagination setPageNumber={setPageNumber} length={600} />
    </>
  );
};

export default TextbookPageComponent;
