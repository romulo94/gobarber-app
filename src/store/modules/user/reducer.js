import produce from 'immer';

import { Types as TypesAuth } from '~/store/modules/auth/actions';
import { Types as TypesUser } from '~/store/modules/user/actions';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TypesAuth.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case TypesUser.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case TypesAuth.SIGN_OUT: {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
