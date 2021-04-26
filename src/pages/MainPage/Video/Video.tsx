import React from 'react';
import style from './Video.module.scss';
import YoutubeVideo from '../../../components/YoutubeVideo/YoutubeVideo';

const Video: React.FC = () => (
  <div className={style.video}>
    <div>
      <h3>Пример использования нашего приложения!</h3>
      <div className={style.video__block}>
        <YoutubeVideo embedId="rokGy0huYEA" />
      </div>
    </div>
  </div>
);

export default Video;
