import produce from 'immer';

import { Types as TypesAuth } from './actions';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TypesAuth.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }

      case TypesAuth.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case TypesAuth.SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }

      case TypesAuth.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }

      case TypesAuth.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }

      default:
    }
  });
}
