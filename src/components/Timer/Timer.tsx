import React, { useEffect, useRef } from 'react';
import style from './timer.module.scss';

const Timer: React.FC<{value: number}> = ({ value }) => {
  const timer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const secondDeg = (360 / 60) * value;
    timer.current!.style.transform = `rotate(-${secondDeg}deg)`;
  }, [value]);

  return (
    <div className={style.second}>
      <div ref={timer} />
      <span>{value}</span>
    </div>
  );
};

export default Timer;
