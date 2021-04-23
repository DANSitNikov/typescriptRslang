import React from 'react';
import style from './health.module.scss';
import src from '../../assets/images/heart/pixel-heart.png';

const HealthBar: React.FC<{lives: number}> = (props) => {
  const { lives } = props;

  return (
    <div className={style.game_hearts_bar}>
      <img src={src} alt="heart" />
      {lives}
    </div>
  );
};

export default HealthBar;
