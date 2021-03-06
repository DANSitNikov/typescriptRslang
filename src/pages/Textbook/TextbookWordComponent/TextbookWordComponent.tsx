import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl } from 'howler';
import { Button } from 'react-bootstrap';
import style from './TextbookWordComponent.module.scss';
import dictionaryActions from '../../../actions/dictionaryAction';
import checkDeletedAndDifficultWords, { Words } from '../../../utilities/checkDeletedAndDifficultWords';
import {
  getButtonsVisibility,
  getDeletedWords, getDifficultWords, getLearnedWords, getTranslateVisibility, getUserAuth,
} from '../../../selectors/selectors';
import checkLearnedWords from '../../../utilities/checkLearnedWords';
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

interface Props {
  type: string
  word: Words
  difficult: boolean
}

const TextbookWordComponent: React.FC<Props> = (props) => {
  const { type, word, difficult } = props;
  const deletedWords = useSelector(getDeletedWords);
  const difficultWords = useSelector(getDifficultWords);
  const isAuth = useSelector(getUserAuth);
  const learnedWords = useSelector(getLearnedWords);
  const buttonsVisible = useSelector(getButtonsVisibility);
  const translateVisible = useSelector(getTranslateVisibility);
  const textEx = useRef<HTMLParagraphElement | null>(null);
  const textMeaning = useRef<HTMLParagraphElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);
  const dispatch = useDispatch();

  const wordSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audio}`,
  });

  const wordExampleSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioExample}`,
  });

  const wordMeaningSound = new Howl({
    src: `https://newrslangapi.herokuapp.com/${word.audioMeaning}`,
  });

  const onDeleteBtnClick = () => {
    const inDif = checkDeletedAndDifficultWords(difficultWords, word);
    if (!inDif) {
      const array = [];

      for (let i = 0; i < difficultWords.length; i += 1) {
        if (difficultWords[i].word !== wordRef.current!.textContent) {
          array.push(difficultWords[i]);
        }
      }

      dispatch(dictionaryActions.deleteFromHardWords(array));
    }
    if (checkDeletedAndDifficultWords(deletedWords, word)) {
      dispatch(dictionaryActions.addNewRemovedWord(word));
    }
  };

  const onHardBtnClick = () => {
    if (checkDeletedAndDifficultWords(difficultWords, word)) {
      dispatch(dictionaryActions.addNewHardWord(word));
      const setWord = checkLearnedWords(learnedWords, [word]);
      if (setWord.length > 0) {
        dispatch(dictionaryActions.addNewLearnedWords([word]));
      }
    }
  };

  const onRestoreBtnClick = () => {
    if (type === 'hardWord') {
      const array = [];

      for (let i = 0; i < difficultWords.length; i += 1) {
        if (difficultWords[i].word !== wordRef.current!.textContent) {
          array.push(difficultWords[i]);
        }
      }

      dispatch(dictionaryActions.deleteFromHardWords(array));
    } else if (type === 'deletedWord') {
      const array = [];

      for (let i = 0; i < deletedWords.length; i += 1) {
        if (deletedWords[i].word !== wordRef.current!.textContent) {
          array.push(deletedWords[i]);
        }
      }

      dispatch(dictionaryActions.deleteFromRemovedWords(array));
    }
  };

  useEffect(() => {
    textEx.current!.innerHTML = word.textExample;
    textMeaning.current!.innerHTML = word.textMeaning;
  }, []);

  return (
    <div className={style.textbook_word}>
      <div className={style.picture}><img src={`https://newrslangapi.herokuapp.com/${word.image}`} alt="word_image" /></div>
      <div className={style.info}>
        <section>
          <article>
            <div className={style.header}>
              <h4
                ref={wordRef}
                onClick={() => {
                  wordSound.play();
                }}
                className={style.wordWithSound}
              >
                {word.word}
              </h4>
            </div>
            {
              translateVisible
            && (
            <div className={style.transcript}>
              (
              <p>{word.transcription}</p>
              <p>{word.wordTranslate}</p>
              )
            </div>
            )
            }
            <div>
              <div className={style.sentenceAndAudio}>
                <p
                  ref={textMeaning}
                  onClick={() => {
                    wordMeaningSound.play();
                  }}
                  className={style.wordWithSound}
                />
              </div>
              {
                translateVisible
                && (
                <div className={style.sentenceAndAudio}>
                  <p>{word.textMeaningTranslate}</p>
                </div>
                )
              }
              <div className={style.sentenceAndAudio}>
                <p
                  ref={textEx}
                  onClick={() => {
                    wordExampleSound.play();
                  }}
                  className={style.wordWithSound}
                />
              </div>
              {
                translateVisible
                && (
                <div className={style.sentenceAndAudio}>
                  <p>{word.textExampleTranslate}</p>
                </div>
                )
              }
              {
                !difficult
                && <i>?????????????? ??????????!</i>
              }
            </div>
            {
              buttonsVisible
              && (
              <div>
                {
                  type === 'deletedWord'
                    ? <Button disabled={!isAuth} type="button" onClick={() => onRestoreBtnClick()}>????????????????????????</Button>
                    : null
                }
                {
                  type === 'hardWord'
                    ? <Button disabled={!isAuth} type="button" onClick={() => onRestoreBtnClick()}>????????????????????????</Button>
                    : null
                }
                {
                  type === 'normal'
                    ? (
                      <>
                        <Button disabled={!isAuth} variant="danger" onClick={() => onDeleteBtnClick()}>??????????????</Button>
                        <Button
                          disabled={!isAuth || !difficult}
                          onClick={() => onHardBtnClick()}
                        >
                          ?????????????? ??????????
                        </Button>
                      </>
                    )
                    : null
                }
              </div>
              )
            }
          </article>
        </section>
      </div>
    </div>
  );
};

export default TextbookWordComponent;
