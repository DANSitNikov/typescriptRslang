import React from 'react';
import style from './Description.module.scss';

const Description = () => (
  <div className={style.description}>
    <h3>RS Lang</h3>
    <div className={style.description__words}>
      <p>
        Начинай учить английский уже сегодня! Rs Lang - это приложение, которое позволяет тебе
        присоедениться к невероятно большому и постоянно ростущему сообществу по всему миру.
        Изучение английского языка с помощью Rs Lang - это легко! В приложении доступно
        несколько игр, в которых ты можешь провести время с пользой (игры ты можешь найти
        в разделе &quot;МИНИ_ИГРЫ&quot;). Также для изучения новых слов зайди в раздел
        &quot;УЧЕБНИК&quot;. С помощью него ты можешь повторять слова, выбирать
        наиболее сложные и вынести их на отдельную страницу. А когда какое-нибудь
        слово станет для тебя знакомым - удали его!
      </p>
      <h4>Добро пожаловать!</h4>
    </div>
    <span className={style.description__word}>Изучай</span>
  </div>
);

export default Description;