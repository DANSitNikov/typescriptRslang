import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import footerActions from '../../actions/footerAction';
import Description from './Description';
import Video from './Video';
import Authors from './Authors';
import style from './mainPage.module.scss';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(footerActions.toggleShowStatus(true));
  }, []);

  return (
    <div className={style.mainPage}>
      <Description />
      <Video />
      <Authors />
    </div>
  );
};

export default MainPage;
