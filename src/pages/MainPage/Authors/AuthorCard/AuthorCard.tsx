import React from 'react';
import style from './AuthorCard.module.scss';

interface Props {
  name: string
  text: string
  isReverse: boolean
  image: string
}

const AuthorCard: React.FC<Props> = ({
  name, text, isReverse, image,
}) => (
  <div className={style.card}>
    <div className={!isReverse ? `${style.card__block} ${style.card__blockReverse}` : `${style.card__block}`}>
      <div className={style.card__photo}>
        <img src={image} alt="author" className={style.card__author} />
      </div>
      <div className={style.card__info}>
        <div className={style.card__authorInfo}>
          <b>{name}</b>
        </div>
        <div className={style.card__desc}>
          {text}
        </div>
      </div>
    </div>
  </div>
);

export default AuthorCard;
