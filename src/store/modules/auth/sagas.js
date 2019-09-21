import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Types, signInSuccess, signFailure } from './actions';
import api from '~/services/api';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro no login', 'Usuário nao pode ser prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Houve um erro, verifique seus dados');
    yield put(signFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });
  } catch (error) {
    Alert.alert('Falha no cadastro', 'Houve um erro, verifique seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, singIn),
  takeLatest(Types.SIGN_UP_REQUEST, singUp),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(Types.SIGN_OUT, signOut),
]);
