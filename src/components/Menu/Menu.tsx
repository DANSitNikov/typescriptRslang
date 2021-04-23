import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, User } from '../../reducers/userReducer';
import style from './menu.module.scss';
import { setHardWords, setLearnedWords, setRemoveWords } from '../../actions/dictionaryAction';
import { GlobalState } from '../../reducers/rootReducer';

const Menu = () => {
  const isAuth = useSelector((state: GlobalState): boolean => state.user.isAuth);
  const user = useSelector((state: GlobalState): User => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <div className={style.navigation}>
      <Navbar bg="dark" variant="dark" expand="md" className={style.menu}>
        <Navbar.Brand className={style.rslang}>
          <Link to="/">Rs Lang</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={style.contentWrapper}>
            <Navbar.Text className={style.content}>
              <Link to="/textbook/1">Учебник</Link>
              <Link to="/mini-games">Мини-игры</Link>
              {!isAuth ? (
                <>
                  <Navbar.Brand>
                    <Link to="/registration">Зарегистрироваться</Link>
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <Link to="/login">Войти</Link>
                  </Navbar.Brand>
                </>
              ) : (
                <>
                  <Navbar.Brand>
                    {`Привет, ${user.name}`}
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <Link
                      to="/"
                      onClick={() => {
                        dispatch(logout());
                        dispatch(setHardWords([]));
                        dispatch(setRemoveWords([]));
                        dispatch(setLearnedWords([]));
                      }}
                    >
                      Выйти
                    </Link>
                  </Navbar.Brand>
                </>
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
