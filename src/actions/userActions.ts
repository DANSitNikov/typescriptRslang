import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

import { Dispatch } from 'redux';
import { setUser } from '../reducers/userReducer';
import { Words } from '../utilities/checkDeletedAndDifficultWords';

export const registration = async (email: string, password: string, name: string) => {
  try {
    await axios.post('https://newrslangapi.herokuapp.com/users', {
      email,
      password,
      name,
    });
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      'https://newrslangapi.herokuapp.com/signin',
      {
        email,
        password,
      },
    );
    dispatch(setUser(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (e) {
    console.log(e.response.data.message);
  }
};

export const auth = () => async (dispatch: Dispatch) => {
  const response = localStorage.getItem('user');
  if (response) {
    dispatch(setUser(JSON.parse(response)));
  }
};

export const setUserData = (
  userId: string | undefined, array: Array<Words>, typeOfCollection: string,
) => {
  firebase.database().ref(`users/${userId}/${typeOfCollection}`).set(
    [...array],
  ).catch((err) => console.log(err));
};
