import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Types, updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro na atualização do perfil.', 'Confira seus dados.');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)]);
