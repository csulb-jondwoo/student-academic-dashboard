import { AUTH } from '../utility/components/constants/actionTypes';
import * as api from '../api/index.js';

// ACTION CREATORS
// -- async action creators must use thunk
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push('/new-student');
  } catch (error) {
    console.log(error);
  }
};

export const login = () => async (dispatch) => {
  try {
    const { data } = await api.googleLogin();
    console.log(data);
    // dispatch({ type: AUTH, data });
  } catch (error) {}
};
