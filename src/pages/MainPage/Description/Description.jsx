import React from 'react';
import style from './Description.module.scss';

const Description = () => (
  <div className={style.description}>
    <div className={style.description__block}>
      <h3 className={style.description__title}>
        RS Lang
      </h3>
      <p className={style.description__p}>
        Start learning english today! RS Lang is an app that allows you to join huge and
        permanently growing community around the globe. Learning english with RS Lang is
        easy! There are several games available for you to enjoy. All of them you can
        find at the upper part of site. You can play different games to learn and
        repeat new words. Or maybe you want to see all you statistics? Know which
        words are most difficult for you? Then page of statistics is for you please!
        You can also learn new words the olw-fashioned way: through our dictionary!
        All in all - you are most welcomed!
      </p>
      <span className={style.description__word}>Learn</span>
    </div>
  </div>
);

export default Description;
