import React, { useEffect, useRef, useState } from 'react';
import {
  Link, Switch, Route,
} from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import style from './Textbook.module.scss';
import TextbookPageComponent from './TextbookPageComponent';
import Dictionary from './Dictionary';
import dictionaryActions from '../../actions/dictionaryAction';
import {
  getDeletedWords, getDifficultWords, getLearnedWords, getUserAuth, getUserId,
} from '../../selectors/selectors';
import { setUserData } from '../../actions/userActions';
import miniGamesActions from '../../actions/mniGameAction';
import footerActions from '../../actions/footerAction';
import Preloader from '../../components/Preloader/Preloader';
import TextbookSettings from './Settings';

const Textbook = () => {
  const userId = useSelector(getUserId);
  const difficultWords = useSelector(getDifficultWords);
  const deletedWords = useSelector(getDeletedWords);
  const learnedWords = useSelector(getLearnedWords);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const menu = useRef();
  const isAuth = useSelector(getUserAuth);
  const pagesArray = [1, 2, 3, 4, 5, 6];

  useEffect(async () => {
    dispatch(miniGamesActions.setGameFromTextbookStatus(true));
    if (difficultWords.length === 0 && deletedWords.length === 0
      && learnedWords.length === 0 && isAuth) {
      if (userId) {
        await firebase.database().ref(`/users/${userId}/deleted`).once('value')
          .then((snapshot) => snapshot.val())
          .then((res) => dispatch(dictionaryActions.setRemoveWords(res || [])));

        await firebase.database().ref(`/users/${userId}/hard`).once('value')
          .then((snapshot) => snapshot.val())
          .then((res) => dispatch(dictionaryActions.setHardWords(res || [])));

        await firebase.database().ref(`/users/${userId}/learned`).once('value')
          .then((snapshot) => snapshot.val())
          .then((res) => dispatch(dictionaryActions.setLearnedWords(res || [])));

        setIsFetching(true);
      }
    } else {
      setIsFetching(true);
    }
  }, [userId]);

  useEffect(() => {
    if (difficultWords.length > 0) {
      setUserData(userId, difficultWords, 'hard');
      setUserData(userId, [...learnedWords, ...difficultWords], 'learned');
    }
  }, [difficultWords]);

  useEffect(() => {
    if (deletedWords.length > 0) {
      setUserData(userId, deletedWords, 'deleted');
    }
  }, [deletedWords]);

  useEffect(() => {
    dispatch(footerActions.toggleShowStatus(true));
  }, []);

  const showMenu = () => {
    menu.current.classList.add(style.show);
  };
  const closeMenu = () => {
    menu.current.classList.remove(style.show);
  };

  return (
    isFetching
      ? (
        <div className={style.textbook}>
          <Button className={style.showBtn} onClick={() => showMenu()}>Меню</Button>
          <ListGroup className={style.nav} ref={menu}>
            {
              pagesArray.map((item) => (
                <ListGroup.Item key={item}>
                  <Link id={item} to={`/textbook/${item}`}>{`Группа ${item}`}</Link>
                </ListGroup.Item>
              ))
            }
            <ListGroup.Item>
              <Link to="/textbook/dictionary/learning">Словарь</Link>
            </ListGroup.Item>
            <ListGroup.Item className={style.settings}>
              <TextbookSettings />
            </ListGroup.Item>
            <ListGroup.Item className={style.closeWrapper}>
              <Button variant="danger" onClick={() => closeMenu()}>Закрыть</Button>
            </ListGroup.Item>
          </ListGroup>
          <div className={style.textbook_content}>
            <Switch>
              {
                pagesArray.map((item, index) => (
                  <Route key={item} path={`/textbook/${item}`}>
                    <TextbookPageComponent
                      groupNumber={index}
                    />
                  </Route>
                ))
              }
              <Route path="/textbook/dictionary/learning">
                <Dictionary pageNumber={1} />
              </Route>
            </Switch>
          </div>
        </div>
      )
      : (
        <Preloader />
      )
  );
};

export default Textbook;
