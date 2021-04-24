import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import style from './gameResultWindow.module.scss';
import backImage from '../../assets/backgrounds/bg-result.svg';
import { getGameFromTextbookStatus, getLearnedWords, getUserId } from '../../selectors/selectors';
import checkLearnedWords from '../../utilities/checkLearnedWords';
import dictionaryActions from '../../actions/dictionaryAction';
import { setUserData } from '../../actions/userActions';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

interface Props {
  correctAnswers: Array<Words>
  wrongAnswers: Array<Words>
}

const GameResultWindow: React.FC<Props> = React.memo((props) => {
  const { correctAnswers, wrongAnswers } = props;
  const learnedWords = useSelector(getLearnedWords);
  const textbookStatus = useSelector(getGameFromTextbookStatus);
  const userId = useSelector(getUserId);
  const words = correctAnswers.concat(wrongAnswers);
  const gameWindow = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    gameWindow.current!.style.background = `url('${backImage}')`;
    const setWord = checkLearnedWords(learnedWords, words);
    if (textbookStatus) {
      dispatch(dictionaryActions.addNewLearnedWords(setWord));
      setUserData(userId, [...learnedWords, ...setWord], 'learned');
    }
  }, []);

  const createAnswersMarkDown = (array: Array<Words>) => {
    return array.map((answer: Words, index: number) => (
      <p key={answer.word}>
        {`${index + 1}) ${answer.word}`}
      </p>
    ));
  };

  return (
    <div ref={gameWindow} className={style.gameWindowWrapper}>
      <div className={style.resultWindow}>
        <h4>Результаты</h4>
        <div className={style.content}>
          <div className={style.contentResult}>
            <div className={style.answersHeader}>
              <h5 className={style.blockHeader}>Правильные ответы</h5>
              <ProgressBar className={style.progressResult} variant="success" now={100} label={correctAnswers.length} />
            </div>
            <p>
              {correctAnswers.length ? createAnswersMarkDown(correctAnswers) : 'все неправильно!'}
            </p>
          </div>
          <hr />
          <div className={style.contentResult}>
            <div className={style.answersHeader}>
              <h5 className={style.blockHeader}>Неправильные ответы</h5>
              <ProgressBar className={style.progressResult} variant="danger" now={100} label={wrongAnswers.length} />
            </div>
            <p>
              {wrongAnswers.length ? createAnswersMarkDown(wrongAnswers) : 'все правильно!'}
            </p>
          </div>
        </div>
        <Button className={style.menu}>
          <Link to="/mini-games">Мини игры</Link>
        </Button>
      </div>
    </div>
  );
});

export default GameResultWindow;
