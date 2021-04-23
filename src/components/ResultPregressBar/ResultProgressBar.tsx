import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import style from './resultProgressBar.module.scss';

interface Props {
  correct: number
  wrong: number
  value: number
}

const ResultProgressBar: React.FC<Props> = (props) => {
  const { correct, wrong, value } = props;

  return (
    <ProgressBar className={style.progress}>
      <ProgressBar label={correct} variant="success" now={correct * value} key={1} />
      <ProgressBar label={wrong} variant="danger" now={wrong * value} key={2} />
    </ProgressBar>
  );
};

export default ResultProgressBar;
