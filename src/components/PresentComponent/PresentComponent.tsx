import React, { useEffect, useRef } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import style from './presentComponent.module.scss';
import { Words } from '../../utilities/checkDeletedAndDifficultWords';

interface Props {
  words: Array<Words>
  setStartGame: (param: boolean) => void
  gameName: string
  gameDescription: string
  gameRules: string
  gameOpportunityOne: string
  gameOpportunityTwo: string
  back: string
  fakeWords: Array<Words>
}

const PresentComponent: React.FC<Props> = (props) => {
  const {
    words, setStartGame, gameName,
    gameDescription, gameRules, gameOpportunityOne,
    gameOpportunityTwo, back, fakeWords,
  } = props;
  const gameBack = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gameBack.current!.style.background = `url('${back}')`;
    gameBack.current!.style.backgroundSize = 'cover';
    gameBack.current!.style.backgroundPosition = 'bottom';
  }, []);

  return (
    <div ref={gameBack} className={style.wrapper}>
      <h2 className={style.header}>{gameName}</h2>
      <h4>{gameDescription}</h4>
      <p>{gameRules}</p>
      <p>{gameOpportunityOne}</p>
      <p>{gameOpportunityTwo}</p>
      {
          (words.length > 0 && fakeWords.length > 0
            ? <Button onClick={() => setStartGame(true)} variant="primary">Начать игру</Button>
            : (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </Button>
            )
          )
        }
    </div>
  );
};

export default PresentComponent;
