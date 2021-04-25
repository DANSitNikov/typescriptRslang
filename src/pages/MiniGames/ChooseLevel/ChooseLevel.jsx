import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import style from './chooseLevel.module.scss';
import miniGamesActions from '../../../actions/mniGameAction';

const ChooseLevel = (props) => {
  const { setShowPopup, link } = props;
  const [levels] = useState([1, 2, 3, 4, 5, 6]);
  const [disable, setDisable] = useState(true);
  const popup = useRef();
  const cards = useRef([]);
  const dispatch = useDispatch();

  cards.current = levels.map(() => React.createRef());

  const setActiveLevel = (level) => {
    for (let i = 0; i < cards.current.length; i += 1) {
      if (level === Number(cards.current[i].current.innerText)) {
        cards.current[i].current.style.background = '#a0ee1d';
        if (disable) setDisable(false);
      } else {
        cards.current[i].current.style.background = '#5e5eef';
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  return (
    <div ref={popup} className={style.popupWrapper}>
      <div className={style.popup}>
        <Button
          variant="light"
          className={style.closePopup}
          onClick={() => {
            setShowPopup(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-x-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Button>
        <h3>Выберите уровень</h3>
        <div className={style.levels}>
          {levels.map((level, i) => (
            <div
              ref={cards.current[i]}
              key={level}
              className={style.level}
              onClick={() => {
                setActiveLevel(level);
                dispatch(miniGamesActions.setGameLevel(level));
              }}
            >
              {level}
            </div>
          ))}
        </div>
        <Button
          disabled={disable}
          className={style.link}
        >
          {disable && 'Продолжить'}
          {!disable && <Link to={`/${link}`}>Продолжить</Link>}
        </Button>
      </div>
    </div>
  );
};

ChooseLevel.propTypes = {
  setShowPopup: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default ChooseLevel;
