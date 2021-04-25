import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch /* useSelector */ } from 'react-redux';
import AudioGame from './pages/AudioGame';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import Login from './pages/Login';
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Textbook from './pages/Textbook';
import StartGallowsGame from './pages/GallowsGame';
import GameSavanna from './pages/GameSavanna';
import { auth } from './actions/userActions';
import StartSprintGame from './pages/Sprint';
import MiniGames from './pages/MiniGames';
import firebaseConfig from './utilities/firebaseSetings';

const App: React.FC = () => {
  const dispatch = useDispatch();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/audio-game">
            <AudioGame />
          </Route>
          <Route path="/sprint-game">
            <StartSprintGame />
          </Route>
          <Route path="/gallows-game">
            <StartGallowsGame />
          </Route>
          <Route path="/savanna-game">
            <GameSavanna />
          </Route>
          <Route path="/mini-games">
            <MiniGames />
          </Route>
          <Route path="/textbook">
            <Textbook />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
